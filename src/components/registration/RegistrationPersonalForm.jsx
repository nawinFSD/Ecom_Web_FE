import { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RegistrationStepper from './RegistrationStepper';
import SocialRegister from './SocialRegister';

const RegistrationPersonalForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        Join PureFrame and discover amazing artworks
      </Typography>

      <RegistrationStepper />
      <SocialRegister />

      <Box component="form" noValidate sx={{ width: '100%' }}>
        {/* First Name & Last Name row */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>First Name *</Typography>
            <TextField fullWidth id="firstName" placeholder="John" variant="outlined" sx={textFieldStyles} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={labelStyles}>Last Name *</Typography>
            <TextField fullWidth id="lastName" placeholder="Doe" variant="outlined" sx={textFieldStyles} />
          </Grid>
        </Grid>

        {/* Email with 60s Button */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Email *</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth id="email" placeholder="john@example.com" variant="outlined" sx={textFieldStyles} />
            <Button 
              variant="contained" 
              disabled 
              sx={{ 
                minWidth: '80px', 
                backgroundColor: '#757575 !important', // Forced gray for design match
                color: '#FFFFFF !important', 
                borderRadius: 1.5,
                textTransform: 'none'
              }}
            >
              60s
            </Button>
          </Box>
        </Box>

        {/* Mobile Number with Verify Button */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Mobile Number *</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              id="mobile"
              placeholder="9876543210"
              variant="outlined"
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
            <Button 
              variant="contained" 
              sx={{ 
                minWidth: '80px', 
                backgroundColor: '#000000', 
                color: '#FFFFFF', 
                borderRadius: 1.5,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              Verify
            </Button>
          </Box>
        </Box>

        {/* Password Field with Strength Meter */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={labelStyles}>Password *</Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Create password"
            variant="outlined"
            sx={textFieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Password Strength Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Box sx={{ flexGrow: 1, height: 4, backgroundColor: '#00C853', borderRadius: 2 }} />
            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'text.primary' }}>
              Strong
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
            8+ chars, 1 number, 1 capital letter
          </Typography>
        </Box>

        {/* Confirm Password Field with Error State */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={labelStyles}>Confirm Password *</Typography>
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            variant="outlined"
            error // Matches the red error state in the design
            sx={textFieldStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                    {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption" sx={{ color: '#d32f2f', fontSize: '0.65rem', mt: 0.5, display: 'block' }}>
            Passwords do not match
          </Typography>
        </Box>

        {/* Submit Button (Disabled state based on design) */}
        <Button
          fullWidth
          variant="contained"
          disabled
          sx={{
            py: 1.5,
            backgroundColor: '#757575 !important', // Grayed out
            color: '#FFFFFF !important',
            textTransform: 'none',
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          Continue to Address
        </Button>
      </Box>
    </Paper>
  );
};

export default RegistrationPersonalForm;