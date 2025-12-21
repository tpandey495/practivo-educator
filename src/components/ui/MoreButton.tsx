import { ReusablePopper } from "@components/ui/popper/ReusablePopper";
import InfoCircleIcon from "@icons/InfoCircleIcon";
import DeleteIcon from "@icons/DeleteIcon";
import DocumentCopyIcon from "@icons/DocumentCopyIcon";
import DocumentText from "@icons/DocumentText";
import NotificationIcon from "@icons/NotificationIcon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
const MoreButton = () => {
  type ClockItem = {
    id: number;
    title: string;
    icon?: React.ReactNode;
    color?: string;
  };
  const items: ClockItem[] = [
    { id: 1, title: "Notification Settings", icon: <NotificationIcon /> },
    { id: 2, title: "Clone Course", icon: <DocumentCopyIcon /> },
    { id: 3, title: "Audit Log", icon: <DocumentText /> },
    { id: 4, title: "About", icon: <InfoCircleIcon color="#4d4d4d" /> },
    {
      id: 5,
      title: "Delete Course",
      icon: <DeleteIcon />,
      color: "#C54644",
    },
  ];
  const handleItemClick = (_item: ClockItem) => {
  };
  return (
    <ReusablePopper
      trigger={
        <Button
          variant="outlined"
          sx={{
            width: "40px",
            height: "40px",
            minWidth: "40px",
            padding: "0px",
            color: "#475467",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            borderRadius: "12px",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#4F39F6",
              color: "#4F39F6",
              boxShadow: "0 6px 16px rgba(79, 57, 246, 0.18)",
              backgroundColor: "rgba(79, 57, 246, 0.04)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0 0 0 3px rgba(79, 57, 246, 0.1)",
            },
          }}
        >
          <MoreHorizIcon sx={{ color: "inherit", fontSize: "1.25rem" }} />
        </Button>
      }
      content={
        <List
          sx={{
            width: "100%",
            p: 0,
            // display: "flex",
            // flexDirection: "column",
            // gap: "16px",
          }}
        >
          {items.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              sx={{
                cursor: "pointer",
                p: "12px",
                // px: 0,
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderRadius: 2,
                },
              }}
            >
              <ListItemIcon
                sx={{ minWidth: 32, color: item.color, mr: "16px" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontSize: "16px", color: item.color ?? "#4D4D4D" }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      }
      backgroundColor="#fff"
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
export default MoreButton;
