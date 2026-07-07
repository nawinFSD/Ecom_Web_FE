import { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, Checkbox, FormControlLabel, MenuItem, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddressStepper from './AddressStepper';
import { useUser } from '../../context/UserContext';
import { gsap } from 'gsap';

const interestCategories = [
  'Paintings', 'Arts', 'Drawings', 'Sculptures', 'Frames', 'Crafts', 'Photography', 'Others'
];

const statesByCountry = {
  India: [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal"
  ],
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming"
  ],
  "United Kingdom": [
    "England", "Scotland", "Wales", "Northern Ireland"
  ]
};

const RegistrationAddressForm = () => {
  const [addressType, setAddressType] = useState('Home');
  const [country, setCountry] = useState('India');
  const [stateProvince, setStateProvince] = useState('');
  const [language, setLanguage] = useState('English');

  // Input states
  const [pincode, setPincode] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const { register } = useUser();
  const navigate = useNavigate();

  const triggerConfetti = () => {
    const colors = ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#4CAF50', '#FFEB3B', '#FF9800'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.style.position = 'fixed';
      piece.style.width = `${gsap.utils.random(8, 14)}px`;
      piece.style.height = `${gsap.utils.random(8, 14)}px`;
      piece.style.backgroundColor = gsap.utils.random(colors);
      piece.style.left = '50vw';
      piece.style.top = '40vh';
      piece.style.borderRadius = gsap.utils.random(0, 100) > 50 ? '50%' : '2px';
      piece.style.zIndex = 99999;
      piece.style.pointerEvents = 'none';
      document.body.appendChild(piece);

      const angle = gsap.utils.random(240, 300) * (Math.PI / 180);
      const velocity = gsap.utils.random(250, 500);
      const xDest = Math.cos(angle) * velocity;
      const yDest = Math.sin(angle) * velocity;

      gsap.to(piece, {
        x: `+=${xDest}`,
        y: `+=${yDest}`,
        rotation: gsap.utils.random(180, 720),
        duration: gsap.utils.random(0.6, 1.2),
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(piece, {
            y: '+=500',
            opacity: 0,
            rotation: '+=360',
            duration: gsap.utils.random(1.2, 1.8),
            ease: 'power1.in',
            onComplete: () => piece.remove()
          });
        }
      });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    const newErrors = {};
    
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    } else if (addressLine1.trim().length < 5) {
      newErrors.addressLine1 = 'Address must be at least 5 characters';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!stateProvince.trim()) {
      newErrors.stateProvince = 'State is required';
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    // Retrieve step 1 info
    const personalInfoStr = sessionStorage.getItem('reg_personal');
    if (!personalInfoStr) {
      setSubmitError('Personal details not found. Please go back and fill step 1.');
      return;
    }
    
    let personalInfo = {};
    try {
      personalInfo = JSON.parse(personalInfoStr);
    } catch (err) {
      setSubmitError('Failed to parse registration details.');
      return;
    }
    
    const registrationData = {
      ...personalInfo,
      addressType,
      pincode: pincode.trim(),
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim(),
      area: area.trim(),
      city: city.trim(),
      stateProvince,
      country,
      language,
      marketingOptIn
    };
    
    const res = await register(registrationData);
    if (res.success) {
      triggerConfetti();
      sessionStorage.removeItem('reg_personal');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } else {
      setSubmitError(res.message);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F5F5F5',
      fontSize: '0.9rem',
      borderRadius: 1.5,
      '& fieldset': { borderColor: 'transparent' },
      '&:hover fieldset': { borderColor: '#E0E0E0' },
      '&.Mui-focused fieldset': { borderColor: '#BDBDBD' },
      '&.Mui-error fieldset': { borderColor: '#d32f2f' },
    },
    '& .MuiInputBase-input::placeholder': { color: '#9E9E9E', opacity: 1 },
  };

  const labelStyles = { mb: 0.75, display: 'block', fontWeight: 600, fontSize: '0.75rem', color: 'text.primary' };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 600 },
        p: { xs: 3, sm: 5, md: 6 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
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

      <Box component="form" onSubmit={handleRegisterSubmit} noValidate>
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
            <TextField fullWidth placeholder="400001" variant="outlined" value={pincode} onChange={(e) => setPincode(e.target.value)} error={!!errors.pincode} helperText={errors.pincode} sx={textFieldStyles} />
          </Grid>
        </Grid>

        {/* Row 2: Address Line 1 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Address Line 1 *</Typography>
          <TextField fullWidth placeholder="House number, building name" variant="outlined" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} error={!!errors.addressLine1} helperText={errors.addressLine1} sx={textFieldStyles} />
        </Box>

        {/* Row 3: Address Line 2 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Address Line 2</Typography>
          <TextField fullWidth placeholder="Street, area, landmark (optional)" variant="outlined" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} sx={textFieldStyles} />
        </Box>

        {/* Row 4: Area / Locality */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Area / Locality</Typography>
          <TextField fullWidth placeholder="Enter area, locality" variant="outlined" value={area} onChange={(e) => setArea(e.target.value)} sx={textFieldStyles} />
        </Box>

        {/* Row 5: Country & State */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Country *</Typography>
            <TextField
              select
              fullWidth
              value={country}
              onChange={(e) => { setCountry(e.target.value); setStateProvince(''); }}
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
              error={!!errors.stateProvince}
              helperText={errors.stateProvince}
              variant="outlined"
              sx={textFieldStyles}
            >
              <MenuItem value="" disabled><span style={{ color: '#9E9E9E' }}>Select state</span></MenuItem>
              {(statesByCountry[country] || []).map((state) => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Row 6: City & Landmark */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>City *</Typography>
            <TextField fullWidth placeholder="Enter city" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} error={!!errors.city} helperText={errors.city} sx={textFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Landmark</Typography>
            <TextField fullWidth placeholder="Near by location" variant="outlined" value={landmark} onChange={(e) => setLandmark(e.target.value)} sx={textFieldStyles} />
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
            control={<Checkbox checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} size="small" color="primary" />}
            label={<Typography variant="body2" fontWeight={500} color="text.primary" sx={{ fontSize: '0.75rem' }}>Receive latest deals, order updates, and personalized offers</Typography>}
          />
        </Box>

        {/* Terms & Conditions Container Segment */}
        <Box sx={{ backgroundColor: '#F9FAFB', border: '1px solid #E0E0E0', borderRadius: 1.5, p: 1.5, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <FormControlLabel
            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} size="small" color="primary" />}
            label={<Typography variant="body2" fontWeight={500} color="text.primary" sx={{ fontSize: '0.75rem' }}>I agree to the Terms & Conditions and Privacy Policy</Typography>}
          />
          {errors.termsAccepted && (
            <Typography variant="caption" color="error" sx={{ ml: 3.5, mt: 0.5 }}>
              {errors.termsAccepted}
            </Typography>
          )}
        </Box>

        {submitError && (
          <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: 500, align: 'center', display: 'block' }}>
            {submitError}
          </Typography>
        )}

        {/* Master Active Step Form Action Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            backgroundColor: '#5D5B59',
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