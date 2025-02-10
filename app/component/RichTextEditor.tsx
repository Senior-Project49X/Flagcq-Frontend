"use client";
import { useEffect, useRef } from "react";
import type Quill from "quill"; // Only type import, no runtime code.
import "quill/dist/quill.snow.css"; // CSS import is safe if handled in client bundles.

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // Dynamically import Quill to avoid SSR issues.
      import("quill").then(({ default: Quill }) => {
        quillRef.current = new Quill(editorRef.current!, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
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
          ],
        });
        // Set initial content using prop value.
        quillRef.current.root.innerHTML = value;
        quillRef.current.on("text-change", () => {
          onChange(quillRef.current?.root.innerHTML ?? "");
        });
      });
    }
  }, []); // run only on mount

  // Update editor content when external value changes.
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div>
      <div>
        <div ref={editorRef} className="bg-white" />
      </div>
    </div>
  );
};

export default RichTextEditor;
