"use client";
import { useEffect, useRef, useState } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isSettingContent, setIsSettingContent] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      import("quill").then(({ default: Quill }) => {
        quillRef.current = new Quill(editorRef.current!, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
              // ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
              ["link"],
            ],
          },
          formats: [
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "link",
            "formula",
            "blockquote",
            "code-block",
          ],
        });

        quillRef.current.root.innerHTML = value;
        quillRef.current.on("text-change", () => {
          if (!isSettingContent) {
            onChange(quillRef.current?.root.innerHTML ?? "");
          }
        });
      });
    }
  }, [isSettingContent, onChange, value]);

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      setIsSettingContent(true);
      quillRef.current.root.innerHTML = value;
      setTimeout(() => setIsSettingContent(false), 0);
    }
  }, [value]);

  return <div ref={editorRef} className="bg-white" />;
};

export default RichTextEditor;
