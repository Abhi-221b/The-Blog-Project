import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { useId } from "react";

type RichTextProps = {
  name: string;
  label?: string;
  control: Control;
  defaultValue: string;
};

export default function RichText({
  name,
  label,
  control,
  defaultValue = "",
}: RichTextProps) {
  let id = useId();
  return (
    <>
      <div className="mb-5">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            {label}
          </label>
        )}

        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              onEditorChange={(content) => onChange(content)}
              value={value}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          )}
        />
      </div>
    </>
  );
}
