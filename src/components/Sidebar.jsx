// src/components/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DimensionsIcon from '@mui/icons-material/Straighten'; // Dimensions
import FrameIcon from '@mui/icons-material/CropDin'; // Frame
import FinishIcon from '@mui/icons-material/ColorLens'; // Finish
import GodsIcon from '@mui/icons-material/SelfImprovement'; // Gods
import AccessoriesIcon from '@mui/icons-material/Extension'; // Accessories (Addons)

const Sidebar = () => {
  // In a real app, you'd manage an active step state and likely navigate with react-router-dom
  const navItems = [
    { text: 'Dimensions', icon: <DimensionsIcon />, path: '/' }, // Assuming Dimensions is default '/'
    { text: 'Frame', icon: <FrameIcon />, path: '/frame' },
    { text: 'Finish', icon: <FinishIcon />, path: '/finish' },
    { text: 'Gods', icon: <GodsIcon />, path: '/gods' },
    { text: 'Accessories', icon: <AccessoriesIcon />, path: '/accessories' },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper', borderRadius: 2, p: 1, boxShadow: 3 }}>
      <List component="nav">
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              // In a real app, use react-router-dom's Link component or onClick to change state
              // component={Link} to={item.path}
              // selected={location.pathname === item.path}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;