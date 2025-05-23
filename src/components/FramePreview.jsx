// src/components/FramePreview.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useFrame } from '../contexts/FrameContext';

const FramePreview = () => {
  const { frameDimensions, selectedFrameType, gods, inchesToPixels } = useFrame();

  // Frame dimensions in pixels
  const frameWidthPx = inchesToPixels(frameDimensions.width);
  const frameHeightPx = inchesToPixels(frameDimensions.height);

  // Constants for illustrative frame border widths (adjust as per your frame assets)
  // Assuming a visual border width that affects the "work area"
  const frameBorderVisualWidthInches = selectedFrameType?.width ? parseFloat(selectedFrameType.width.split(' ')[0]) : 2; // e.g., "2 inch" -> 2
  const frameBorderVisualHeightInches = frameBorderVisualWidthInches; // Assuming square frame border

  // Calculate the 'work area' dimensions inside the frame in inches
  const workAreaWidthInches = frameDimensions.width - (2 * frameBorderVisualWidthInches);
  const workAreaHeightInches = frameDimensions.height - (2 * frameBorderVisualHeightInches);

  // Calculate individual image area width based on number of gods
  const spaceBetweenGodsInches = 1; // Example: 1 inch space between gods
  const totalSpaceBetweenGods = frameDimensions.numberOfGods > 1 ? (frameDimensions.numberOfGods - 1) * spaceBetweenGodsInches : 0;
  const totalGodsWidthInches = workAreaWidthInches - totalSpaceBetweenGods;
  const imageAreaWidthPerGodInches = totalGodsWidthInches / frameDimensions.numberOfGods;


  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Frame Preview
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: frameWidthPx,
          height: frameHeightPx,
          maxWidth: '100%', // Make the frame responsive and fit within its parent
          maxHeight: 'calc(100vh - 250px)', // Prevent frame from taking up too much vertical space
          overflow: 'hidden', // Crucial for preventing content from overflowing
          bgcolor: '#f5f5f5', // Fallback background if no frame selected
          minHeight: '150px', // Minimum height for smaller frames
          minWidth: '200px', // Minimum width for smaller frames
          mx: 'auto', // Center the frame preview in its container

          // Apply frame background image (if selected)
          backgroundImage: selectedFrameType ? `url(${selectedFrameType.image})` : 'none',
          backgroundSize: '100% 100%', // Stretch background image to cover the frame
          backgroundRepeat: 'no-repeat',
          border: selectedFrameType ? 'none' : '1px solid #ccc', // Fallback border
        }}
      >
        {/* Inch Measurements (as per image) */}
        <Typography
          sx={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          Frame Width ({frameDimensions.width} Inches)
        </Typography>
        <Typography
          sx={{ position: 'absolute', left: -70, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '0.8rem', color: 'text.secondary', whiteSpace: 'nowrap' }}
        >
          Frame Height ({frameDimensions.height} Inches)
        </Typography>

        {/* Inner Work Area for Gods */}
        <Box
          sx={{
            position: 'absolute',
            top: inchesToPixels(frameBorderVisualHeightInches),
            left: inchesToPixels(frameBorderVisualWidthInches),
            width: inchesToPixels(workAreaWidthInches),
            height: inchesToPixels(workAreaHeightInches),
            display: 'flex',
            justifyContent: 'space-around', // Distribute space around image areas
            alignItems: 'center',
            gap: inchesToPixels(spaceBetweenGodsInches), // Gap between god slots
            bgcolor: '#000', // Black background for the image area as per image [cite: 12]
            p: 1, // Small padding inside work area
          }}
        >
          {/* Dynamic Image Area Slots */}
          {Array.from({ length: frameDimensions.numberOfGods }).map((_, index) => {
            const god = gods[index];
            // Calculate individual god dimensions in pixels (if god exists)
            const godWidthPx = god ? inchesToPixels(god.width) : 0;
            const godHeightPx = god ? inchesToPixels(god.height) : 0;

            return (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  flexGrow: 1, // Allow slots to grow and fill space
                  // Use a fixed aspect ratio or max dimensions derived from work area if needed
                  height: '100%', // Take full height of work area
                  minWidth: inchesToPixels(imageAreaWidthPerGodInches * 0.8), // A minimum width to prevent collapse
                  maxWidth: inchesToPixels(imageAreaWidthPerGodInches * 1.2), // A maximum width
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px dashed #aaa',
                  bgcolor: '#fff', // White background for the image area placeholder
                  position: 'relative',
                  overflow: 'hidden', // Crucial for god image
                }}
              >
                {god && god.image ? (
                  <img
                    src={god.image}
                    alt={god.name || `God ${index + 1}`}
                    style={{
                      // Scale god image to fit within its defined dimensions, or fill its slot if no custom size
                      width: godWidthPx > 0 ? godWidthPx : '100%',
                      height: godHeightPx > 0 ? godHeightPx : '100%',
                      objectFit: 'contain', // Ensures the whole image is visible
                      maxWidth: '100%', // Ensures it doesn't overflow its Paper slot
                      maxHeight: '100%', // Ensures it doesn't overflow its Paper slot
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 1, textAlign: 'center' }}>
                    Image Area<br />({imageAreaWidthPerGodInches.toFixed(1)} inches)
                  </Typography>
                )}
              </Paper>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default FramePreview;