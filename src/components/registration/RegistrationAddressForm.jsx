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
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const { register } = useUser();
  const navigate = useNavigate();

  const handleInterestClick = (category) => {
    setSelectedInterests(prev => {
      if (prev.includes(category)) {
        return prev.filter(item => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const triggerConfetti = () => {
    const colors = ['#D4583A', '#2D7D9A', '#8B5CF6', '#059669', '#DC2626', '#D97706', '#7C3AED', '#0891B2', '#EC4899', '#E11D48'];
    const shapes = ['circle', 'square', 'triangle', 'rectangle'];

    for (let i = 0; i < 80; i++) {
      const piece = document.createElement('div');
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = gsap.utils.random(8, 16);
      const width = randomShape === 'rectangle' ? size * 1.5 : size;
      const height = size;

      piece.style.position = 'fixed';
      piece.style.left = `calc(50vw - ${width / 2}px)`;
      piece.style.top = `calc(45vh - ${height / 2}px)`;
      piece.style.width = `${width}px`;
      piece.style.height = `${height}px`;
      piece.style.backgroundColor = randomColor;
      piece.style.pointerEvents = 'none';
      piece.style.zIndex = '99999';
      piece.style.willChange = 'transform, opacity';
      piece.style.transform = 'scale(0)';

      if (randomShape === 'circle') {
        piece.style.borderRadius = '50%';
      } else if (randomShape === 'triangle') {
        piece.style.width = '0';
        piece.style.height = '0';
        piece.style.backgroundColor = 'transparent';
        piece.style.borderLeft = `${size / 2}px solid transparent`;
        piece.style.borderRight = `${size / 2}px solid transparent`;
        piece.style.borderBottom = `${size}px solid ${randomColor}`;
      }

      document.body.appendChild(piece);

      // Physics angles
      const angle = gsap.utils.random(0, Math.PI * 2);
      const velocity = gsap.utils.random(200, 500);
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - gsap.utils.random(50, 150);

      const tl = gsap.timeline({
        onComplete: () => {
          piece.remove();
        }
      });

      tl.to(piece, {
        scale: gsap.utils.random(0.7, 1.3),
        x: destX,
        y: destY,
        rotation: gsap.utils.random(360, 1080),
        duration: 0.6,
        ease: 'power1.out'
      })
      .to(piece, {
        y: '+=600',
        opacity: 0,
        scale: 0.2,
        rotation: '+=360',
        duration: 1.4,
        ease: 'power2.in'
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
      marketingOptIn,
      interests: selectedInterests
    };
    
    const res = await register(registrationData);
    if (res.success) {
      triggerConfetti();
      sessionStorage.removeItem('reg_personal');
      setShowWelcomeModal(true);
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
    <>
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
              {interestCategories.map((category, index) => {
                const isSelected = selectedInterests.includes(category);
                return (
                  <Box
                    key={index}
                    onClick={() => handleInterestClick(category)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      border: isSelected ? '1px solid #1A1A1A' : '1px solid #E0E0E0',
                      borderRadius: 1,
                      fontSize: '0.65rem',
                      color: isSelected ? '#FFFFFF' : 'text.secondary',
                      backgroundColor: isSelected ? '#1A1A1A' : '#FFFFFF',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: isSelected ? '#333333' : '#F5F5F5', 
                        borderColor: isSelected ? '#1A1A1A' : '#BDBDBD' 
                      }
                    }}
                  >
                    {category}
                  </Box>
                );
              })}
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

      {/* Welcome Dialog Modal - Custom Tailwind CSS */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              setShowWelcomeModal(false);
              navigate('/home');
            }}
          ></div>
          
          {/* Modal Card */}
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative z-10 shadow-2xl border border-slate-100 transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95 duration-300">
            {/* Sparkles / Celebration Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 mb-6">
              <svg className="h-8 w-8 text-indigo-600 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Welcome to ColorFrame!
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Your account has been created successfully. Welcome to our curated community of collectors and independent artists!
            </p>
            <button 
              onClick={() => {
                setShowWelcomeModal(false);
                navigate('/home');
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              Explore the Gallery
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationAddressForm;