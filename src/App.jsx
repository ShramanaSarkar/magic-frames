// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import your custom Material-UI theme
import Header from './components/Header'; // Import the Header component
import CreateFrame from './pages/CreateFrame'; // Import the CreateFrame page
import { FrameProvider } from './contexts/FrameContext'; // Import FrameProvider

function App() {
  return (
    // ThemeProvider applies the Material-UI theme to all components within it
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a consistent baseline for styling across browsers */}
      <CssBaseline />
      {/* Router enables client-side routing */}
      <Router>
        {/* Header component will be visible on all pages */}
        <Header />
        {/* FrameProvider wraps the routes that need access to the frame context */}
        <FrameProvider>
          {/* Routes define the different paths in your application */}
          <Routes>
            {/* Define the route for the CreateFrame page */}
            {/* The exact keyword ensures that the component is only rendered when the path is exactly '/' */}
            <Route path="/" element={<CreateFrame />} />
            {/* You can add more routes here for other pages like Home, Order History, etc. */}
            {/* For example: <Route path="/home" element={<HomePage />} /> */}
            {/* For example: <Route path="/order-history" element={<OrderHistoryPage />} /> */}
          </Routes>
        </FrameProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;