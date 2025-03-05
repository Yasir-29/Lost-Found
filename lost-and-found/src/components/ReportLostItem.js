import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Box, Paper } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    description: '',
    dateLost: null,
    location: '',
    color: '',
    uniqueIdentifiers: '',
    contactInfo: '',
    reward: '',
    image: null
  });

  // Load form data from local storage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('lostItemFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      // Convert date string back to Date object if it exists
      if (parsedData.dateLost) {
        parsedData.dateLost = new Date(parsedData.dateLost);
      }
      // We can't store the image in localStorage, so it will remain null
      setFormData(parsedData);
    }
  }, []);

  const categories = [
    'Electronics', 'Jewelry', 'Clothing', 'Accessories', 'Documents', 
    'Keys', 'Wallet/Purse', 'Bag/Backpack', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    
    // Save to local storage (excluding the image)
    const dataForStorage = { ...updatedFormData };
    delete dataForStorage.image;
    localStorage.setItem('lostItemFormData', JSON.stringify(dataForStorage));
  };

  const handleDateChange = (date) => {
    const updatedFormData = {
      ...formData,
      dateLost: date
    };
    setFormData(updatedFormData);
    
    // Save to local storage (excluding the image)
    const dataForStorage = { ...updatedFormData };
    delete dataForStorage.image;
    localStorage.setItem('lostItemFormData', JSON.stringify(dataForStorage));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
      // We don't save the image to localStorage as it's not serializable
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Generate a unique ID for the item
    const itemId = Date.now();
    
    // Create a new item object with additional fields
    const newItem = {
      id: itemId,
      name: formData.itemName,
      category: formData.category,
      description: formData.description,
      date: formData.dateLost ? formData.dateLost.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      location: formData.location,
      color: formData.color,
      uniqueIdentifiers: formData.uniqueIdentifiers,
      contactInfo: formData.contactInfo,
      reward: formData.reward,
      status: 'lost',
      isResolved: false,
      image: formData.image ? URL.createObjectURL(formData.image) : 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString()
    };
    
    // Get existing lost items from localStorage or initialize empty array
    const existingLostItems = JSON.parse(localStorage.getItem('userLostItems') || '[]');
    
    // Add new item to the array
    const updatedLostItems = [newItem, ...existingLostItems];
    
    // Save updated array back to localStorage
    localStorage.setItem('userLostItems', JSON.stringify(updatedLostItems));
    
    // Clear the form data from local storage after successful submission
    localStorage.removeItem('lostItemFormData');
    
    // Reset the form
    setFormData({
      itemName: '',
      category: '',
      description: '',
      dateLost: null,
      location: '',
      color: '',
      uniqueIdentifiers: '',
      contactInfo: '',
      reward: '',
      image: null
    });
    
    alert('Your lost item has been reported. We will notify you if someone finds it!');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Report a Lost Item
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Please provide as much detail as possible to help us find your item.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your item in detail (size, brand, model, etc.)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date Lost"
                  value={formData.dateLost}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location Lost"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Be as specific as possible"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unique Identifiers"
                name="uniqueIdentifiers"
                value={formData.uniqueIdentifiers}
                onChange={handleChange}
                placeholder="Serial number, engravings, distinctive marks, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Contact Information"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Phone number or email address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reward (Optional)"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                placeholder="Amount or description of reward"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ height: '56px' }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Submit Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReportLostItem; 