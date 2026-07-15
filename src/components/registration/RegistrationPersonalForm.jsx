import { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RegistrationStepper from './RegistrationStepper';
import SocialRegister from './SocialRegister';

const RegistrationPersonalForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const validateMobile = (val) => {
    return /^[6-9]\d{9}$/.test(val); // 10 digit Indian mobile starting with 6-9
  };

  const validatePassword = (val) => {
    // 8+ characters, at least 1 capital letter, 1 number
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[A-Za-z]+$/.test(firstName.trim())) {
      newErrors.firstName = 'First name must contain only letters';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[A-Za-z]+$/.test(lastName.trim())) {
      newErrors.lastName = 'Last name must contain only letters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(mobile.trim())) {
      newErrors.mobile = 'Mobile must be a valid 10-digit number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be 8+ chars with 1 uppercase & 1 number';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    sessionStorage.setItem('reg_personal', JSON.stringify({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      password
    }));
    
    navigate('/Login2');
  };

  const handleGoogleSignup = () => {
    sessionStorage.setItem('reg_personal', JSON.stringify({
      firstName: 'Google',
      lastName: 'User',
      email: 'google_user@gmail.com',
      mobile: '9999999999',
      password: 'GoogleUserPassword123'
    }));
    navigate('/Login2');
  };
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Common styles for all text fields to match the design's gray background
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
        maxWidth: { xs: '100%', md: 600 }, // Slightly wider max-width than login
        p: { xs: 3, sm: 5, md: 6 },
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
        Create Account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Join ColorFrame and discover amazing artworks
      </Typography>

      <RegistrationStepper />
      <SocialRegister onGoogleClick={handleGoogleSignup} />

      <Box component="form" onSubmit={handleContinue} noValidate sx={{ width: '100%' }}>
        {/* First Name & Last Name row */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>First Name *</Typography>
            <TextField fullWidth id="firstName" placeholder="John" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={!!errors.firstName} helperText={errors.firstName} sx={textFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Last Name *</Typography>
            <TextField fullWidth id="lastName" placeholder="Doe" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} error={!!errors.lastName} helperText={errors.lastName} sx={textFieldStyles} />
          </Grid>
        </Grid>

        {/* Email */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Email *</Typography>
          <TextField fullWidth id="email" placeholder="john@example.com" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} sx={textFieldStyles} />
        </Box>

        {/* Mobile Number */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Mobile Number *</Typography>
          <TextField
            fullWidth
            id="mobile"
            placeholder="9876543210"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={textFieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1, borderRight: '1px solid #E0E0E0', pr: 1 }}>
                    +91
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Password Field with Strength Meter */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Password *</Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Create password"
            variant="outlined"
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              
              // Dynamic clear error if valid
              if (validatePassword(val)) {
                setErrors(prev => {
                  const newErrs = { ...prev };
                  delete newErrs.password;
                  return newErrs;
                });
              } else if (errors.password) {
                setErrors(prev => ({
                  ...prev,
                  password: 'Password must be 8+ chars with 1 uppercase & 1 number'
                }));
              }
            }}
            error={!!errors.password}
            helperText={errors.password}
            sx={textFieldStyles}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
          {password && !validatePassword(password) && !errors.password && (
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
              8+ chars, 1 number, 1 capital letter
            </Typography>
          )}
        </Box>

        {/* Confirm Password Field with Error State */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={labelStyles}>Confirm Password *</Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              if (val === password) {
                setErrors(prev => {
                  const newErrs = { ...prev };
                  delete newErrs.confirmPassword;
                  return newErrs;
                });
              }
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            sx={textFieldStyles}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                      {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': { backgroundColor: '#333333' }
          }}
        >
          Continue to Address
        </Button>
      </Box>
    </Paper>
  );
};

export default RegistrationPersonalForm;