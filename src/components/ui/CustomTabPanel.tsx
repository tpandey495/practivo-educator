import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { COLORS, SHADOWS } from "../../theme/colors";
import { SxProps, Theme } from "@mui/system";

// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  idPrefix?: string;
  boxSx?: SxProps<Theme>;
  divStyle?: React.CSSProperties;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, idPrefix = "custom", boxSx = { p: 0, mt: "10px" }, divStyle, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idPrefix}-tabpanel-${index}`}
      aria-labelledby={`${idPrefix}-tab-${index}`}
      style={divStyle}
      {...other}
    >
      {value === index && <Box sx={boxSx}>{children}</Box>}
    </div>
  );
}

export default CustomTabPanel;
// Styled Tab with conditional styles for active/inactive state
const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'selectedtab',
})<{ selectedtab: boolean }>(
  ({ selectedtab }) => ({
    textTransform: "none",
    fontWeight: selectedtab ? "600" : "500",
    color: selectedtab ? COLORS.primary : COLORS.text.muted,
    transition: "all 0.2s ease",
    "&:hover": {
      color: COLORS.primary,
    },
  })
);

// Reusable Tabs component
interface CustomTabsProps {
  tabs: string[];
  panels: React.ReactNode[];
}

export function CustomTabs({ tabs, panels }: CustomTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            background: COLORS.background.white,
            borderRadius: "16px",
            width: "fit-content",
            p: "0px 20px",
            boxShadow: SHADOWS.sm,
            border: `1px solid ${COLORS.border.light}`,
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "24px",
              background: COLORS.primary,
            },
          }}
        >
          {tabs.map((label, index) => (
            <StyledTab
              key={index}
              label={label}
              selectedtab={value === index}
              id={`custom-tab-${index}`}
              aria-controls={`custom-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {panels.map((content, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
