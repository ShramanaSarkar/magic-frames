// src/components/DimensionsForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useFrame } from '../contexts/FrameContext';

const DimensionsForm = () => {
  const { frameDimensions, setFrameDimensions } = useFrame();
  // Initialize state with values from context [cite: 10]
  const [height, setHeight] = useState(frameDimensions.height);
  const [width, setWidth] = useState(frameDimensions.width);
  const [numberOfGods, setNumberOfGods] = useState(frameDimensions.numberOfGods);

  // Update local state if context changes (e.g., reset button elsewhere)
  useEffect(() => {
    setHeight(frameDimensions.height);
    setWidth(frameDimensions.width);
    setNumberOfGods(frameDimensions.numberOfGods);
  }, [frameDimensions]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update context with new dimensions
    setFrameDimensions({ height: Number(height), width: Number(width), numberOfGods: Number(numberOfGods) });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Frame Dimensions</Typography>
      <TextField
        label="Frame Height (inches)"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: "1" }} // Minimum value 1
      />
      <TextField
        label="Frame Width (inches)"
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: "1" }} // Minimum value 1
      />
      <TextField
        label="Number of Gods"
        type="number"
        value={numberOfGods}
        onChange={(e) => setNumberOfGods(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: "1", max: "5" }} // Assuming a reasonable max, can be adjusted
        helperText="Enter 1 to 5 gods"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Set Dimensions
      </Button>
    </Box>
  );
};

export default DimensionsForm;