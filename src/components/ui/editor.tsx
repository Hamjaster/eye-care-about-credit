import {
  useEditor,
  EditorContent,
  type Editor as EditorType,
} from "@tiptap/react";
import JoditEditor from "jodit-react";

import { useMemo, useRef, useState } from "react";

export function Editor({
  defaultValue = "",
  className,
  value,
  setValue,
}: {
  defaultValue?: string;
  className?: string;
  value: string;
  setValue: any;
}) {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: defaultValue,
  //   editorProps: {
  //     attributes: {
  //       class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none",
  //     },
  //   },
  // });
  const options = [
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "fullsize",
    "hr",
    "link",
    "|",
    "undo",
    "redo",
  ];
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );

  return (
    <div className={className}>
      <JoditEditor
        ref={editor}
        value={value || ""}
        config={config}
        onChange={(htmlString) => {
          console.log(htmlString, "IN THE EDITOR");
          setValue(htmlString);
        }}
        onBlur={(newContent) => {
          // console.log(newContent, "IN THE EDITOR");
        }} // preferred to use only this option to update the content for performance reasons
      />
    </div>
  );
}

export type { EditorType };
