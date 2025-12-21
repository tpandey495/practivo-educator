import { Modal as ModalComponent, Box } from "@mui/material";
import { ReactNode } from "react";

interface IModalWrapperProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ open, onClose, children }: IModalWrapperProps) {
    return (
        <ModalComponent open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {children}
            </Box>
        </ModalComponent>
    );
};
