import { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressStepper from './AddressStepper';

const interestCategories = [
  'Home & Kitchen', 'Toys', 'Electronics', 'Fashion', 'Books', 'Home & Kitchen',
  'Sports', 'Beauty', 'Automotive', 'Toys', 'Health', 'Electronics', 'Sports',
  'Fashion', 'Sports', 'Beauty'
];

const RegistrationAddressForm = () => {
  const [addressType, setAddressType] = useState('Home');
  const [country, setCountry] = useState('India');
  const [stateProvince, setStateProvince] = useState('');
  const [language, setLanguage] = useState('English');

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F5F5F5',
      fontSize: '0.9rem',
      borderRadius: 1.5,
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: '#E0E0E0' },
      '&.Mui-focused fieldset': { borderColor: '#BDBDBD' },
    },
    '& .MuiInputBase-input::placeholder': { color: '#9E9E9E', opacity: 1 },
  };

  const labelStyles = { mb: 0.75, display: 'block', fontWeight: 600, fontSize: '0.75rem', color: 'text.primary' };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 720 }, // Slightly optimized container frame width for longer nested content
        p: { xs: 2.5, sm: 5, md: 6 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Create Account</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Join ColorFrame and discover amazing artworks
        </Typography>
        <AddressStepper />
      </Box>

      {/* Form Action Controls Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Shipping Address & Preferences
        </Typography>
        <Link component={RouterLink} to="/login" variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', '&:hover': { color: 'text.primary' } }}>
          <ArrowBackIcon sx={{ fontSize: '0.9rem' }} /> Back
        </Link>
      </Box>

      {/* Tab Treatment Header matching the figma selection marker */}
      <Box sx={{ borderBottom: '1px solid #E0E0E0', mb: 3 }}>
        <Typography
          variant="body2"
          fontWeight={700}
          color="primary"
          sx={{ display: 'inline-block', pb: 1, borderBottom: '2px solid #0066CC', mb: '-1px', cursor: 'pointer' }}
        >
          Primary Shipping Address
        </Typography>
      </Box>

      <Box component="form" noValidate>
        {/* Row 1: Address Type & Pincode */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Address Type *</Typography>
            <TextField
              select
              fullWidth
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              variant="outlined"
              sx={textFieldStyles}
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Pincode / ZIP *</Typography>
            <TextField fullWidth placeholder="400001" variant="outlined" sx={textFieldStyles} />
          </Grid>
        </Grid>

        {/* Row 2: Address Line 1 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Address Line 1 *</Typography>
          <TextField fullWidth placeholder="House number, building name" variant="outlined" sx={textFieldStyles} />
        </Box>

        {/* Row 3: Address Line 2 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Address Line 2</Typography>
          <TextField fullWidth placeholder="Street, area, landmark (optional)" variant="outlined" sx={textFieldStyles} />
        </Box>

        {/* Row 4: Area / Locality */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Area / Locality</Typography>
          <TextField fullWidth placeholder="Enter area, locality" variant="outlined" sx={textFieldStyles} />
        </Box>

        {/* Row 5: Country & State */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Country *</Typography>
            <TextField
              select
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              variant="outlined"
              sx={textFieldStyles}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="United States">United States</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>State / Province *</Typography>
            <TextField
              select
              fullWidth
              value={stateProvince}
              onChange={(e) => setStateProvince(e.target.value)}
              displayEmpty
              variant="outlined"
              sx={textFieldStyles}
            >
              <MenuItem value="" disabled><span style={{ color: '#9E9E9E' }}>Select state</span></MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Row 6: City & Landmark */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>City *</Typography>
            <TextField fullWidth placeholder="Enter city" variant="outlined" sx={textFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Landmark</Typography>
            <TextField fullWidth placeholder="Near by location" variant="outlined" sx={textFieldStyles} />
          </Grid>
        </Grid>

        {/* Save Default Checkbox */}
        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" color="primary" />}
            label={<Typography variant="body2" fontWeight={500} color="text.primary" sx={{ fontSize: '0.75rem' }}>Save as default shipping address</Typography>}
          />
        </Box>

        {/* Shopping Preferences Sub-Section Outer Box */}
        <Box sx={{ border: '1px solid #E0E0E0', borderRadius: 2, p: { xs: 2, sm: 3 }, mb: 4 }}>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 2 }}>Shopping Preferences</Typography>

          {/* Preferred Language Option */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="caption" sx={labelStyles}>Preferred Language</Typography>
            <TextField
              select
              fullWidth
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              variant="outlined"
              sx={textFieldStyles}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </TextField>
          </Box>

          {/* Interests Tags Grid */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={labelStyles}>Shopping Interests (Optional)</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1.5 }}>
              {interestCategories.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    border: '1px solid #E0E0E0',
                    borderRadius: 1,
                    fontSize: '0.65rem',
                    color: 'text.secondary',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    userSelect: 'none',
                    '&:hover': { backgroundColor: '#F5F5F5', borderColor: '#BDBDBD' }
                  }}
                >
                  {category}
                </Box>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 2 }}>
              Select categories you're interested in for personalized recommendations
            </Typography>
          </Box>

          {/* Marketing Content Checkbox */}
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" color="primary" />}
            label={<Typography variant="body2" fontWeight={500} color="text.primary" sx={{ fontSize: '0.75rem' }}>Receive latest deals, order updates, and personalized offers</Typography>}
          />
        </Box>

        {/* Terms & Conditions Container Segment */}
        <Box sx={{ backgroundColor: '#F9FAFB', border: '1px solid #E0E0E0', borderRadius: 1.5, p: 1.5, mb: 4, display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox size="small" color="primary" />}
            label={<Typography variant="body2" fontWeight={500} color="text.primary" sx={{ fontSize: '0.75rem' }}>I agree to the Terms & Conditions and Privacy Policy</Typography>}
          />
        </Box>

        {/* Master Active Step Form Action Button */}
        <Button
          component={RouterLink}
          to="/home"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            backgroundColor: '#5D5B59', // Dark Grayish Brown active block fill color matching design exactly
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: '0.95rem',
            mb: 2,
            '&:hover': { backgroundColor: '#4A4846' },
          }}
        >
          Create Account & Continue
        </Button>

        {/* Bottom Small Warning Disclosure */}
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.01em' }}>
          By creating an account, you'll enjoy faster checkout and personalized shopping experience
        </Typography>

      </Box>
    </Paper>
  );
};

export default RegistrationAddressForm;