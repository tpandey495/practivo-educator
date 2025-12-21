import { Box, Paper, Radio, FormControlLabel, Typography } from "@mui/material";
import SettingsIcon from "@icons/SettingsIcon";
import { SettingsTab } from "../SettingsTab";

interface NavigationSectionProps {
  selected: string;
  setSelected: (value: string) => void;
}

export const NavigationSection = ({ selected, setSelected }: NavigationSectionProps) => (
  <SettingsTab
    iconBgColor="#E9F9FF"
    icon={<SettingsIcon color="#1781A7" />}
    title="Course Navigation"
    subTitle="Determine how your learners will navigate through the course."
  >
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      pl="54px"
      borderRadius={3}
      bgcolor="#f9f9fb"
      gap={2}
    >
      <Box
        mt={1}
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <NavigationOption
          selected={selected}
          value="free"
          title="Free Flow"
          description="Learners can navigate the course in any order."
          onClick={() => setSelected("free")}
        />
        <NavigationOption
          selected={selected}
          value="restricted"
          title="Restricted"
          description="Learners can navigate the course in a sequential order only."
          onClick={() => setSelected("restricted")}
        />
      </Box>
    </Box>
  </SettingsTab>
);

interface NavigationOptionProps {
  selected: string;
  value: string;
  title: string;
  description: string;
  onClick: () => void;
}

const NavigationOption = ({
  selected,
  value,
  title,
  description,
  onClick,
}: NavigationOptionProps) => (
  <Paper
    elevation={0}
    onClick={onClick}
    sx={{
      p: 2,
      borderRadius: 2,
      cursor: "pointer",
      border: selected === value ? "1.5px solid #7e22ce" : "1.5px solid transparent",
    }}
  >
    <FormControlLabel
      value={value}
      control={
        <Radio
          checked={selected === value}
          onChange={onClick}
          sx={{
            color: "#7e22ce",
            "&.Mui-checked": {
              color: "#7e22ce",
            },
          }}
        />
      }
      label={
        <Box>
          <Typography fontWeight={600} fontSize="16px" color="#4D4D4D">
            {title}
          </Typography>
          <Typography variant="body2" color="#666666" fontSize="14px">
            {description}
          </Typography>
        </Box>
      }
    />
  </Paper>
);
