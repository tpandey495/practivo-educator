import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { cloneElement, isValidElement, useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarMenu = ({ routes, open }: any) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const isRouteActive = (route: any): boolean => {
    if (route.path) return location.pathname === route.path;
    if (route.children) {
      return route.children.some(
        (child: any) => child.path && location.pathname.startsWith(child.path)
      );
    }

    return false;
  };
// children control
const HIDE_CHILDREN_IN_SIDEBAR = ["My Courses", "Question Bank"];
  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const ACTIVE_COLOR = "rgba(79, 57, 246, 1)";
  const INACTIVE_COLOR = "rgba(51, 51, 51, 1)";

  const renderIconWithColor = (icon: any, color: string) => {
    if (!icon) return null;
    if (isValidElement(icon)) {
      const existingSx = (icon as any)?.props?.sx || undefined;
      const mergedSx = existingSx ? { ...existingSx, color } : { color };
      return cloneElement(icon as any, { color, sx: mergedSx });
    }
    return icon;
  };
  
  return (
    <List>
      {routes.map((route: any) => {
        // const hasChildren = Array.isArray(route.children);/
        const hasChildren =
          Array.isArray(route.children) &&
          !HIDE_CHILDREN_IN_SIDEBAR.includes(route.label);

        return (
          <Box key={route.label}>
            <ListItemButton
              onClick={() => {
                if (route.onClick) {
                  route.onClick();
                } else if (hasChildren) {
                  toggleExpand(route.label);
                } else if (route.path) {
                  navigate(route.path);
                }
              }}
              sx={{
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: !open ? "min-content" : "35px",
                }}
              >
                {renderIconWithColor(
                  route.icon,
                  isRouteActive(route) ? ACTIVE_COLOR : INACTIVE_COLOR
                )}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={route.label}
                  sx={{
                    color: isRouteActive(route)
                      ? "rgba(79, 57, 246, 1)"
                      : "rgba(28, 28, 28, 1)",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "20px",
                  }}
                />
              )}
              {hasChildren &&
                open &&
                (expanded[route.label] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={expanded[route.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {route.children.map((child: any) => (
                    <ListItemButton
                      key={child.label}
                      onClick={() => navigate(child.path)}
                      sx={{ pl: 3 }}
                    >
                      <ListItemIcon sx={{ minWidth: "35px" }}>
                        {renderIconWithColor(
                          child.icon,
                          location.pathname.startsWith(child.path)
                            ? ACTIVE_COLOR
                            : INACTIVE_COLOR
                        )}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={child.label}
                          sx={{
                            color: location.pathname.startsWith(child.path)
                              ? ACTIVE_COLOR
                              : "rgba(28, 28, 28, 1)",
                          }}
                        />
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        );
      })}
    </List>
  );
};

export default SidebarMenu;
