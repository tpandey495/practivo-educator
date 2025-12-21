// src/theme.ts
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      highlight: string;
      danger: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      highlight: string;
      danger: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F39F6",
      dark: "#3E2DC4",
    },
    text: {
      secondary: "#000000",
    },
    background: {
      default: "#F7F7F7",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: 500,
          textTransform: "none", // optional: removes uppercase text
          borderRadius: "8px", // optional: rounded corners
          padding: "10px 20px", // optional: custom padding
          "&:hover": {
            backgroundColor: "#3E2DC4",
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      highlight: string;
      danger: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      highlight: string;
      danger: string;
    };
  }
}

// Optional: App-level wrapper
export const AppThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default theme;
