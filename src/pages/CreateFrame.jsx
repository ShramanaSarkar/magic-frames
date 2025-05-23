// src/pages/CreateFrame.jsx
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { FrameProvider } from '../contexts/FrameContext';
import DimensionsForm from '../components/DimensionsForm';
import FrameTypeSelector from '../components/FrameTypeSelector';
import GodSelector from '../components/GodSelector';
import GodConfigurator from '../components/GodConfigurator'; // For resizing individual gods
import FramePreview from '../components/FramePreview';
import Sidebar from '../components/Sidebar'; // Assuming you'll create this or use existing

const CreateFrame = () => {
  return (
    <FrameProvider>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar Section */}
          <Grid item xs={12} sm={3} md={2}> {/* Responsive sizing for sidebar */}
            <Sidebar />
          </Grid>
          {/* Main Content Section */}
          <Grid item xs={12} sm={9} md={10}>
            <Typography variant="h4" gutterBottom>
              Create a Frame
            </Typography>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <FramePreview />
            </Paper>

            {/* Render different sections based on sidebar selection or as a flow */}
            <DimensionsForm />
            <FrameTypeSelector />
            <GodSelector />
            <GodConfigurator />
            {/* Add other components for Finish, Accessories here */}
          </Grid>
        </Grid>
      </Box>
    </FrameProvider>
  );
};

export default CreateFrame;