import React from "react";
import { Box } from "@mui/material";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = "Write something...",
}) => {
    return (
        <Box flex={1}>
            <ReactQuill
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="custom-quill"
            />
            <style>{`
        .custom-quill .ql-toolbar {
          background: #fff;
          border-radius: 12px;
          padding: 15px;
          border: none;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(16, 30, 54, 0.08);
        }
        .custom-quill .ql-container {
          background: #fff;
          border-radius: 12px;
          border: none;
          min-height: 200px;
          box-shadow: 0 2px 8px rgba(16, 30, 54, 0.08);
          font-size: 18px;
        }
        .custom-quill .ql-editor {
          min-height: 180px;
          padding: 24px;
          border-radius: 12px;
          font-size: 18px;
        }
        .custom-quill .ql-container.ql-snow {
          border: none;
        }
        .custom-quill .ql-editor.ql-blank::before {
          color: rgba(0, 0, 0, 0.2);
          font-size: 18px;
          padding-left: 8px;
        }
      `}</style>
        </Box>
    );
};

export default RichTextEditor;
