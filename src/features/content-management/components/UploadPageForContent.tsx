import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadBox from '@components/ui/uploadbox/UploadBox';
import { Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/PlayCircleOutline';

export default function UploadPageForContent() {
    const [editorValue, setEditorValue] = useState('');
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
            gap: "56px",
        }}>
            <Box width={"492px"} height={"201px"}>
                <UploadBox icon={<CloudUploadIcon sx={{ fontSize: 28, color: '#7e22ce' }} />} description={" (Max. File size: 25 MB)"} coloredTitle={"Click to Upload "} title={"or drag and drop"} />
            </Box>
            <Box width={"492px"} height={"201px"}>
                <UploadBox icon={<CloudUploadIcon sx={{ fontSize: 28, color: '#7e22ce' }} />} description={""} coloredTitle={"Embed Video "} title={"From Youtube etc"} />
            </Box>
            <Box flex={1}>
                <ReactQuill
                    value={editorValue}
                    onChange={setEditorValue}
                    placeholder="Write an overview for your course"
                    className="custom-quill"
                />
                <style>{`
                .custom-quill .ql-toolbar {
                    background: #fff;
                    border-radius: 12px;
                    padding: 15px;
                    border: none;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px 0 rgba(16, 30, 54, 0.08);
                }
                .custom-quill .ql-container {
                    background: #fff;
                    border-radius: 12px;
                    border: none;
                    min-height: 200px;
                    box-shadow: 0 2px 8px 0 rgba(16, 30, 54, 0.08);
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
                    padding-left:8px;
                }
        `}</style>
            </Box>
        </Box>
    )
}


