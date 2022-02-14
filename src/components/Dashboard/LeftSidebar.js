import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import { MenuItem } from "@mui/material";
import "./styles/LeftSidebar.css";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Add from "@mui/icons-material/Add";
import {useNavigate} from 'react-router-dom';

const data = [
  { icon: <DataUsageIcon />, label: "Dashboard", to: "/" },
  { icon: <FormatListNumberedOutlinedIcon />, label: "All Tasks", to: "/tasks" },
  { icon: < Add/>, label: "Add Task", to: "/new"},
  { icon: <DateRangeOutlinedIcon />, label: "Calender", to: "/calender"},
  // { icon: <Public />, label: "Hosting", to: "/"},
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function LeftSidebar({selected, setSelected}) {

	const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "light",
            primary: { main: "#000" },
            background: { paper: "#fff" },
            color: { color: "#000" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256, minWidth:256 }} style={{marginTop:"20px"}}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Task Studio"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />

            {/* <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Project Overview"
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  size="large"
                  sx={{
                    "& svg": {
                      color: "#222",
                      transition: "0.2s",
                      transform: "translateX(0) rotate(0)",
                    },
                    "&:hover, &:focus": {
                      bgcolor: "unset",
                      "& svg:first-of-type": {
                        transform: "translateX(-4px) rotate(-20deg)",
                      },
                      "& svg:last-of-type": {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      height: "80%",
                      display: "block",
                      left: 0,
                      width: "1px",
                      bgcolor: "divider",
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight
                    sx={{ position: "absolute", right: 4, opacity: 0 }}
                  />
                </IconButton>
              </Tooltip>
            </ListItem> */}
            <Divider />
            <Box
              sx={{
                bgcolor: open ? "#222" : null,
                pb: open ? 2 : 0,
                backgroundColor: "#fff",
              }}
              style={{paddingTop:"35px"}}
            >
              {data.map((item, index) => (
                <MenuItem onClick={()=>{navigate(item.to)}}  selected={selected === item.to} key={item.label}>
                  <ListItemButton sx={{ py: 0, minHeight: 82 }}>
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                      }}
                    />
                  </ListItemButton>
                </MenuItem>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
