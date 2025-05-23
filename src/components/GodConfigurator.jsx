// src/components/GodConfigurator.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { useFrame } from '../contexts/FrameContext';

const GodConfigurator = () => {
  const { gods, updateGodDimensions, inchesToPixels, pixelsToInches, frameDimensions } = useFrame();
  const [selectedGodIndex, setSelectedGodIndex] = useState('');
  const [godHeight, setGodHeight] = useState('');
  const [godWidth, setGodWidth] = useState('');
  const [warning, setWarning] = useState('');

  // Update local state when selected god changes or gods array updates
  useEffect(() => {
    if (selectedGodIndex !== '' && gods[selectedGodIndex]) {
      setGodHeight(gods[selectedGodIndex].height.toFixed(2)); // Display with 2 decimal places
      setGodWidth(gods[selectedGodIndex].width.toFixed(2));
    } else {
      setGodHeight('');
      setGodWidth('');
    }
    setWarning(''); // Clear warning on selection change
  }, [selectedGodIndex, gods]);

  const handleUpdateDimensions = () => {
    setWarning(''); // Clear previous warnings

    if (selectedGodIndex === '' || !gods[selectedGodIndex]) {
      setWarning('Please select a God to configure.');
      return;
    }

    const newHeight = Number(godHeight);
    const newWidth = Number(godWidth);

    if (isNaN(newHeight) || newHeight <= 0 || isNaN(newWidth) || newWidth <= 0) {
      setWarning('Please enter valid positive numbers for height and width.');
      return;
    }

    // Get current frame dimensions in inches
    const frameHeightInches = frameDimensions.height;
    const frameWidthInches = frameDimensions.width;

    // Check if new dimensions exceed frame dimensions [cite: 7]
    if (newHeight > frameHeightInches || newWidth > frameWidthInches) {
      setWarning('God size exceeds frame dimensions. The app will scale it proportionally to fit.');
      // The actual scaling logic is handled in the FrameContext's updateGodDimensions
    }

    updateGodDimensions(selectedGodIndex, newHeight, newWidth);
  };

  return (
    <Box sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Adjust God Size</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select God to Configure</InputLabel>
        <Select
          value={selectedGodIndex}
          label="Select God to Configure"
          onChange={(e) => setSelectedGodIndex(e.target.value)}
          disabled={gods.filter(g => g.id).length === 0} // Disable if no gods are selected
        >
          {gods.map((god, index) => (
            god.id ? ( // Only show selected gods
              <MenuItem key={index} value={index}>
                {god.name || `God ${index + 1}`}
              </MenuItem>
            ) : null
          ))}
        </Select>
      </FormControl>

      {selectedGodIndex !== '' && gods[selectedGodIndex] && (
        <Box>
          <TextField
            label="God Height (inches)"
            type="number"
            value={godHeight}
            onChange={(e) => setGodHeight(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: "0.1", step: "0.1" }} // Allow decimals and small steps
          />
          <TextField
            label="God Width (inches)"
            type="number"
            value={godWidth}
            onChange={(e) => setGodWidth(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: "0.1", step: "0.1" }} // Allow decimals and small steps
          />
          {warning && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {warning}
            </Alert>
          )}
          <Button variant="contained" onClick={handleUpdateDimensions} sx={{ mt: 2 }}>
            Update God Size
          </Button>
        </Box>
      )}
      {!gods.filter(g => g.id).length > 0 && selectedGodIndex === '' && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Please select and drop gods into the slots in the "Select Gods" section above to configure them.
        </Typography>
      )}
    </Box>
  );
};

export default GodConfigurator;