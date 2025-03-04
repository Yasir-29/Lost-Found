import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Box, Paper, Card, CardContent, CardMedia, CardActions, Chip, Divider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const SearchItems = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    category: '',
    dateFrom: null,
    dateTo: null,
    location: '',
    color: '',
    status: 'all' // 'lost', 'found', 'all'
  });

  // Mock data for demonstration
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'iPhone 13 Pro',
      category: 'Electronics',
      description: 'Black iPhone 13 Pro with a blue case. Has a crack on the top right corner of the screen.',
      date: '2023-03-01',
      location: 'Central Park, New York',
      color: 'Black',
      status: 'lost',
      image: 'https://via.placeholder.com/150',
      reward: '$100'
    },
    {
      id: 2,
      name: 'Gold Ring',
      category: 'Jewelry',
      description: 'Gold ring with a small diamond. Has an engraving inside that says "Forever & Always".',
      date: '2023-03-02',
      location: 'Times Square, New York',
      color: 'Gold',
      status: 'found',
      image: 'https://via.placeholder.com/150',
      reward: ''
    },
    {
      id: 3,
      name: 'Leather Wallet',
      category: 'Wallet/Purse',
      description: 'Brown leather wallet with ID, credit cards, and some cash.',
      date: '2023-03-03',
      location: 'Grand Central Station, New York',
      color: 'Brown',
      status: 'lost',
      image: 'https://via.placeholder.com/150',
      reward: '$50'
    }
  ]);

  const categories = [
    'Electronics', 'Jewelry', 'Clothing', 'Accessories', 'Documents', 
    'Keys', 'Wallet/Purse', 'Bag/Backpack', 'Other'
  ];

  const statusOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'lost', label: 'Lost Items' },
    { value: 'found', label: 'Found Items' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleDateFromChange = (date) => {
    setSearchParams({
      ...searchParams,
      dateFrom: date
    });
  };

  const handleDateToChange = (date) => {
    setSearchParams({
      ...searchParams,
      dateTo: date
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search params:', searchParams);
    // Here you would typically fetch data from your backend based on search params
    // For now, we'll just use our mock data
    alert('Search performed!');
  };

  const handleReset = () => {
    setSearchParams({
      keyword: '',
      category: '',
      dateFrom: null,
      dateTo: null,
      location: '',
      color: '',
      status: 'all'
    });
  };

  // Filter results based on status
  const filteredResults = searchParams.status === 'all' 
    ? searchResults 
    : searchResults.filter(item => item.status === searchParams.status);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Lost & Found Items
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Keyword"
                name="keyword"
                value={searchParams.keyword}
                onChange={handleChange}
                placeholder="Search by name, description, etc."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={searchParams.category}
                onChange={handleChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={searchParams.location}
                onChange={handleChange}
                placeholder="City, landmark, etc."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date From"
                  value={searchParams.dateFrom}
                  onChange={handleDateFromChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date To"
                  value={searchParams.dateTo}
                  onChange={handleDateToChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={searchParams.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={searchParams.status}
                onChange={handleChange}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleReset}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom>
        Search Results ({filteredResults.length})
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {filteredResults.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Chip 
                    label={item.status === 'lost' ? 'Lost' : 'Found'} 
                    color={item.status === 'lost' ? 'error' : 'success'} 
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description.substring(0, 100)}...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {item.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Date:</strong> {item.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {item.location}
                </Typography>
                {item.reward && (
                  <Typography variant="body2" color="error">
                    <strong>Reward:</strong> {item.reward}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">View Details</Button>
                <Button size="small" color="primary">Contact</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchItems; 