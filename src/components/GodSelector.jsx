// src/components/GodSelector.jsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useFrame } from '../contexts/FrameContext';

// Use actual image paths from your assets/gods folder
const availableGods = [
  { id: 'god1', name: 'GOD1', image: '../assets/gods/GOD1.jpeg' },
  { id: 'god2', name: 'GOD2', image: '../assets/gods/GOD2.jpeg' },
  { id: 'god3', name: 'GOD3', image: '../assets/gods/GOD3.jpeg' },
  { id: 'god4', name: 'GOD4', image: '../assets/gods/GOD4.jpeg' },
  { id: 'lamp1', name: 'Lamp1', image: '../assets/gods/Lamp1.jpeg' },
  { id: 'lamp2', name: 'Lamp2', image: '../assets/gods/Lamp2.jpeg' },
  { id: 'lamp3', name: 'Lamp3', image: '../assets/gods/Lamp3.jpeg' },
  // Ensure Corner1.jpeg is not meant to be a selectable "god" here.
  // If it is, add it: { id: 'corner1', name: 'Corner1', image: '/assets/gods/Corner1.jpeg' },
];

const GodSelector = () => {
  const { gods, setGods, frameDimensions, defaultGodDimensions, inchesToPixels } = useFrame();

  const handleDragStart = (e, godId) => {
    e.dataTransfer.setData('godId', godId);
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    const godId = e.dataTransfer.getData('godId');
    const selectedGodAsset = availableGods.find(god => god.id === godId);

    if (selectedGodAsset) {
      setGods(prevGods => {
        const newGods = [...prevGods];
        for (let i = 0; i < frameDimensions.numberOfGods; i++) {
          if (!newGods[i]) {
            newGods[i] = {};
          }
        }

        newGods[slotIndex] = {
          ...selectedGodAsset,
          // Use default dimensions for a newly dropped god [cite: 21]
          height: defaultGodDimensions.height,
          width: defaultGodDimensions.width,
          x: 0,
          y: 0,
        };

        return newGods.slice(0, frameDimensions.numberOfGods);
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Calculate default slot sizes in pixels once, outside of the JSX
  const defaultSlotWidthPx = inchesToPixels(defaultGodDimensions.width);
  const defaultSlotHeightPx = inchesToPixels(defaultGodDimensions.height);

  return (
    <Box sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Select Gods</Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>Drag and drop gods into the slots below:</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {availableGods.map((god) => (
          <Grid item key={god.id} xs={4} sm={3} md={2}>
            <Paper
              elevation={1}
              draggable
              onDragStart={(e) => handleDragStart(e, god.id)}
              sx={{ p: 1, textAlign: 'center', cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
            >
              {/* Ensure image paths are correct */}
              <img src={god.image} alt={god.name} style={{ width: '100%', height: 'auto', maxHeight: '80px', objectFit: 'contain' }} />
              <Typography variant="body2" sx={{ mt: 0.5 }}>{god.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* God Drop Slots */}
      <Typography variant="body1" sx={{ mb: 2 }}>God Slots:</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: frameDimensions.numberOfGods }).map((_, index) => (
          <Paper
            key={index}
            sx={{
              width: `${defaultSlotWidthPx}px`,
              height: `${defaultSlotHeightPx}px`,
              border: '2px dashed grey',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              bgcolor: gods[index] ? 'transparent' : '#f5f5f5',
              position: 'relative',
              overflow: 'hidden',
            }}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            {gods[index] && gods[index].image ? (
              <img
                src={gods[index].image}
                alt={gods[index].name || `God ${index + 1}`}
                style={{
                  height: `${inchesToPixels(gods[index].height)}px`,
                  width: `${inchesToPixels(gods[index].width)}px`,
                  objectFit: 'contain',
                  maxWidth: '100%', // Ensure it doesn't overflow the slot if its height is small
                  maxHeight: '100%',
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">Drop God {index + 1} Here</Typography>
            )}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default GodSelector;