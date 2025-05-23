// src/hooks/useFrameCalculations.js
import { PIXELS_PER_INCH } from '../utils/constants';

/**
 * Custom React Hook for performing frame-related dimension calculations.
 * @returns {Object} An object containing utility functions for dimension conversions.
 */
const useFrameCalculations = () => {
  /**
   * Converts a value from inches to pixels based on a predefined PIXELS_PER_INCH constant.
   * @param {number} inches - The value in inches to convert.
   * @returns {number} The converted value in pixels.
   */
  const inchesToPixels = (inches) => {
    if (typeof inches !== 'number' || isNaN(inches)) {
      console.warn("Invalid input for inchesToPixels. Expected a number.");
      return 0;
    }
    return inches * PIXELS_PER_INCH;
  };

  /**
   * Converts a value from pixels to inches based on a predefined PIXELS_PER_INCH constant.
   * @param {number} pixels - The value in pixels to convert.
   * @returns {number} The converted value in inches.
   */
  const pixelsToInches = (pixels) => {
    if (typeof pixels !== 'number' || isNaN(pixels)) {
      console.warn("Invalid input for pixelsToInches. Expected a number.");
      return 0;
    }
    return pixels / PIXELS_PER_INCH;
  };

  return {
    inchesToPixels,
    pixelsToInches,
  };
};

export default useFrameCalculations;