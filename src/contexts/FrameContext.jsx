// src/contexts/FrameContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { PIXELS_PER_INCH } from '../utils/constants';

const FrameContext = createContext();

export const FrameProvider = ({ children }) => {
  const [frameDimensions, setFrameDimensions] = useState({
    width: 10, // Default Width: 10 inches [cite: 20]
    height: 20, // Default Height: 20 inches [cite: 20]
    numberOfGods: 3, // Default from example image [cite: 10]
  });
  const [selectedFrameType, setSelectedFrameType] = useState(null);
  const [gods, setGods] = useState([]); // Array to store god objects with their own dimensions and positions

  // Function to convert inches to pixels
  const inchesToPixels = (inches) => {
    if (typeof inches !== 'number' || isNaN(inches)) return 0;
    return inches * PIXELS_PER_INCH;
  };

  // Function to convert pixels to inches
  const pixelsToInches = (pixels) => {
    if (typeof pixels !== 'number' || isNaN(pixels)) return 0;
    return pixels / PIXELS_PER_INCH;
  };

  // Default God dimensions as per requirement [cite: 21]
  const defaultGodDimensions = {
    height: 10, // inches [cite: 21]
    width: 6, // inches [cite: 21]
  };

  const updateGodDimensions = (index, newHeightInches, newWidthInches) => {
    setGods(prevGods => {
      const updatedGods = [...prevGods];
      if (!updatedGods[index]) return prevGods;

      const frameHeightInches = frameDimensions.height;
      const frameWidthInches = frameDimensions.width;

      let adjustedHeight = newHeightInches;
      let adjustedWidth = newWidthInches;

      // Get the aspect ratio of the god. If the god doesn't have a width or height yet,
      // use the default or a sensible fallback to avoid division by zero.
      const currentGodAspectRatio = updatedGods[index].width && updatedGods[index].height
          ? updatedGods[index].width / updatedGods[index].height
          : defaultGodDimensions.width / defaultGodDimensions.height;

      // Edge Case: Exceeding Frame Dimensions [cite: 7]
      // Scale down to fit within the frame while maintaining proportions [cite: 7]

      // Determine the limiting factor
      const heightRatio = frameHeightInches / newHeightInches;
      const widthRatio = frameWidthInches / newWidthInches;

      if (newHeightInches > frameHeightInches || newWidthInches > frameWidthInches) {
          // If both are too large, scale by the smaller ratio to fit both
          if (heightRatio < widthRatio) {
              adjustedHeight = frameHeightInches;
              adjustedWidth = adjustedHeight * currentGodAspectRatio;
          } else {
              adjustedWidth = frameWidthInches;
              adjustedHeight = adjustedWidth / currentGodAspectRatio;
          }
      }

      updatedGods[index] = {
        ...updatedGods[index],
        height: adjustedHeight,
        width: adjustedWidth,
      };

      return updatedGods;
    });
  };

  return (
    <FrameContext.Provider
      value={{
        frameDimensions,
        setFrameDimensions,
        selectedFrameType,
        setSelectedFrameType,
        gods,
        setGods,
        inchesToPixels,
        pixelsToInches,
        defaultGodDimensions,
        updateGodDimensions,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
};

export const useFrame = () => useContext(FrameContext);