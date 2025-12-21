import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ReactNode, useState } from "react";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";

interface SettingsTabProps {
  iconBgColor: string;
  icon: ReactNode;
  title: string;
  subTitle: string;
  children: ReactNode;
}

export const SettingsTab = ({
  iconBgColor,
  icon,
  title,
  subTitle,
  children,
}: SettingsTabProps) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: "#f8fafc",
        p: { xs: 1.5, sm: 2 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, sm: 2 },
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: "space-between",
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Box display="flex" alignItems="center" gap={{ xs: 1.5, sm: 2 }} flex={1} minWidth={0}>
          <Box
            sx={{
              bgcolor: iconBgColor,
              p: { xs: 1, sm: 1.2 },
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              '& svg': {
                width: { xs: 20, sm: 24 },
                height: { xs: 20, sm: 24 }
              }
            }}
          >
            {icon}
          </Box>
          <Box minWidth={0} flex={1}>
            <Typography sx={{
              fontWeight: 600,
              fontSize: { xs: "16px", sm: "18px" },
              lineHeight: 1.2,
              mb: 0.5
            }}>
              {title}
            </Typography>
            <Typography sx={{
              color: "#64748b",
              fontSize: { xs: "12px", sm: "14px" },
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, sm: 1 },
              WebkitBoxOrient: 'vertical'
            }}>
              {subTitle}
            </Typography>
          </Box>
        </Box>

        <Button
          onClick={() => setExpanded(!expanded)}
          variant="outlined"
          size={isSmallScreen ? "medium" : "small"}
          fullWidth={isSmallScreen}
          sx={{
            borderColor: "#7c3aed",
            color: "#7c3aed",
            textTransform: "none",
            fontWeight: 500,
            fontSize: { xs: "14px", sm: "12px" },
            borderRadius: 2,
            px: { xs: 2, sm: "20px" },
            py: { xs: 1.2, sm: "10px" },
            minHeight: { xs: 44, sm: 'auto' },
            flexShrink: 0,
            "&:hover": {
              borderColor: "#5b21b6",
              backgroundColor: "#f3e8ff",
              color: "#5b21b6",
            },
          }}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Paper>
  );
};
