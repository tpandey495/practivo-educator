import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, SnackbarOrigin } from "@mui/material";

type Severity = "success" | "error" | "warning" | "info";

interface SnackbarOptions {
    message: string;
    severity?: Severity;
    duration?: number;
    position?: SnackbarOrigin; // { vertical: "top" | "bottom", horizontal: "left" | "center" | "right" }
}

interface SnackbarContextType {
    showSnackbar: (options: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<Severity>("success");
    const [duration, setDuration] = useState(4000);
    const [position, setPosition] = useState<SnackbarOrigin>({
        vertical: "bottom",
        horizontal: "center",
    });

    const showSnackbar = ({
        message,
        severity = "success",
        duration = 4000,
        position = { vertical: "bottom", horizontal: "center" },
    }: SnackbarOptions) => {
        setMessage(message);
        setSeverity(severity);
        setDuration(duration);
        setPosition(position);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}
                anchorOrigin={position}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");
    return context;
};
