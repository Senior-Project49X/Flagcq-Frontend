"use client";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Link from "@tiptap/extension-link";
import { useEditor, EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import Underline from "@tiptap/extension-underline";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import StarterKit from "@tiptap/starter-kit";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import FormatClearRoundedIcon from "@mui/icons-material/FormatClearRounded";
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  // Helper function to pre vent default and run command
  const preventDefault = (callback: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    callback();
  };
  if (editor === null) {
    return;
  }
  const setLink = () => {
    if (editor === null) {
      return;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert(String(e));
      }
    }
  };

  return (
    <div className="flex item-center">
      <div className="pt-1 mx-2">
        <button
          onClick={preventDefault(() =>
            editor.chain().focus().toggleBold().run()
          )}
          className={`mr-1 ${editor.isActive("bold") ? "is-active" : ""}`}
        >
          <FormatBoldIcon />
        </button>
        <button
          onClick={preventDefault(() =>
            editor.chain().focus().toggleItalic().run()
          )}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`mr-1 ${editor.isActive("italic") ? "is-active" : ""}`}
        >
          <FormatItalicIcon />
        </button>

        <button
          onClick={preventDefault(() =>
            editor.chain().focus().toggleUnderline().run()
          )}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FormatUnderlinedRoundedIcon />
        </button>
      </div>
      <div className="pt-1 mx-2">
        <button
          onClick={preventDefault(() =>
            editor.chain().focus().toggleBulletList().run()
          )}
          className={editor?.isActive("bulletList") ? "is-active mr-1" : "mr-1"}
        >
          <FormatListBulletedRoundedIcon />
        </button>
        <button
          onClick={preventDefault(() =>
            editor.chain().focus().toggleOrderedList().run()
          )}
          className={
            editor.isActive("orderedList") ? "is-active mr-1" : " mr-1"
          }
        >
          <FormatListNumberedRoundedIcon />
        </button>
        <button
          onClick={preventDefault(() => {
            editor.isActive("code")
              ? editor.chain().focus().unsetAllMarks().run()
              : editor.chain().focus().setCode().run();
          })}
          // disabled={editor.isActive("code")}
          className={`${editor.isActive("code") && "is-active"} `}
        >
          <CodeRoundedIcon />
        </button>
      </div>
      <div>
        <button
          onClick={preventDefault(setLink)}
          className=" hover:bg-gray-100 rounded"
          title="Insert Link"
        >
          <InsertLinkIcon />
        </button>
        <button
          onClick={preventDefault(() =>
            editor?.chain().focus().unsetLink().run()
          )}
          disabled={!editor?.isActive("link")}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <LinkOffIcon />
        </button>
      </div>
      <div className="pt-1 mx-2">
        <button
          onClick={preventDefault(() =>
            editor.chain().focus().unsetAllMarks().run()
          )}
        >
          <FormatClearRoundedIcon />
        </button>
      </div>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-5",
          },
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-5",
          },
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Link,
      Underline,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Handle manual resize
  useEffect(() => {
    let isResizing = false;
    let startY = 0;
    let startHeight = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isResizing = true;
      startY = e.clientY;
      startHeight = containerRef.current?.offsetHeight || 0;

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaY = e.clientY - startY;
      const newHeight = Math.max(100, Math.min(500, startHeight + deltaY)); // Min 100px, Max 500px

      if (containerRef.current) {
        containerRef.current.style.height = `${newHeight}px`;
      }
    };

    const handleMouseUp = () => {
      isResizing = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const resizeHandle = resizeRef.current;
    if (resizeHandle) {
      resizeHandle.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative border border-gray-300 rounded overflow-hidden"
      >
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="p-2 w-full h-full rich-text bg-white overflow-auto"
        />

        <div
          ref={resizeRef}
          className="absolute bottom-0 w-full h-2 cursor-row-resize hover:bg-gray-200"
          style={{ left: 0 }}
        />
      </div>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
};

export default RichTextEditor;
