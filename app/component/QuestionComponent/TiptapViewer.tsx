"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapViewerProps {
  content: string | undefined;
}

const TiptapViewer: React.FC<TiptapViewerProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="text-white text-lg leading-relaxed break-words rich-text">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapViewer;
