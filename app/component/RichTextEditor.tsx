import React from "react";
import Quill from "quill";
import { Delta } from "quill";
import Link from "quill/formats/link";
export default function RichTestEditor() {
  const quill = new Quill("#editor");
  const options = {
    debug: "info" as "info",
    modules: {
      toolbar: true,
    },
    placeholder: "Compose an epic...",
    theme: "snow",
  };
  const quill = new Quill("#editor", options);
  return <div id="#editor">RichTestEditor</div>;
}
