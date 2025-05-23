// src/components/FrameTypeSelector.jsx
import React from 'react';
import { Box, Typography, Grid, Paper, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useFrame } from '../contexts/FrameContext';

// Use actual image paths from your assets/frames folder
const frameTypes = [
  { id: 'inlay', name: 'Inlay', image: '/assets/frames/Inlay.png', width: '1 inch' },
  { id: 'vshape', name: 'V Shape', image: '/assets/frames/V-shape.png', width: '2 inch' },
  { id: 'mani', name: 'Mani', image: '/assets/frames/Mani.png', width: '2 inch' },
  { id: 'ashta_lakshmi', name: 'Ashta Lakshmi', image: '/assets/frames/Ashta Lakshmi.png', width: '3 inch' },
  { id: 'dasha_avatar', name: 'Dasha Avatar', image: '/assets/frames/Dasha Avatar.png', width: '3 inch' },
  { id: 'garuda_beruda', name: 'Garuda Beruda', image: '/assets/frames/Garuda Beruda.png', width: '3 inch' },
];

const FrameTypeSelector = () => {
  const { selectedFrameType, setSelectedFrameType } = useFrame();

  return (
    <Box sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Select your Frame Type</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {frameTypes.map((frame) => (
          <Grid item key={frame.id} xs={6} sm={4} md={2}>
            <Paper
              elevation={selectedFrameType?.id === frame.id ? 6 : 1}
              onClick={() => setSelectedFrameType(frame)}
              sx={{
                p: 1.5,
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedFrameType?.id === frame.id ? '2px solid #1976d2' : '2px solid transparent',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '150px',
              }}
            >
              <Checkbox
                checked={selectedFrameType?.id === frame.id}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon color="primary" />}
                sx={{ position: 'absolute', top: 5, right: 5, p: 0 }}
                readOnly
              />
              {/* Ensure image paths are correct */}
              <img src={frame.image} alt={frame.name} style={{ maxWidth: '90%', maxHeight: '100px', objectFit: 'contain', marginBottom: '8px' }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{frame.name}</Typography>
              <Typography variant="caption" color="text.secondary">{frame.width} Frame width</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FrameTypeSelector;