import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { COLORS, SHADOWS } from "../../theme/colors";
// Tab panel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, mt: "10px" }}>{children}</Box>}
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
