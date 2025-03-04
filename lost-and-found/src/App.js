import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Import components
import Header from './components/Header';
import Home from './components/Home';
import ReportLostItem from './components/ReportLostItem';
import ReportFoundItem from './components/ReportFoundItem';
import SearchItems from './components/SearchItems';
import MapView from './components/MapView';
import Profile from './components/Profile';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report-lost" element={<ReportLostItem />} />
            <Route path="/report-found" element={<ReportFoundItem />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
