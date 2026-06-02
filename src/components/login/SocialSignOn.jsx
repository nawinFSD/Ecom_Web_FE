// import React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
// Adjust paths to your assets
import GoogleIcon from '../../assets/home/G-icon.png';
import FacebookIcon from'../../assets/home/F-icon.png';

const SocialSignOn = () => {
  // Common button styles for responsiveness
  const buttonStyle = {
    justifyContent: 'flex-start',
    textTransform: 'none',
    borderColor: 'divider',
    fontWeight: 400,
    color: 'text.secondary',
    px: { xs: 1.5, sm: 2, md: 2.5 }, // responsive horizontal padding
    py: { xs: 1.25, sm: 1.5 }, // responsive vertical padding
    fontSize: { xs: '0.9rem', sm: '1rem' }, // responsive text size
    '&:hover': { borderColor: 'text.secondary' },
  };

  const iconStyle = {
    width: { xs: 20, sm: 24 }, // responsive icon size
    height: { xs: 20, sm: 24 },
    marginRight: '8px',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, sm: 1.5 }, width: '100%', mb: { xs: 2.5, sm: 3, md: 4 } }}>
      {/* Google Button with Asset Icon */}
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        sx={buttonStyle}
        startIcon={<img src={GoogleIcon} alt="Google" style={iconStyle} />}
      >
        Continue with Google
      </Button>

      {/* Facebook Button with Asset Icon */}
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        sx={buttonStyle}
        startIcon={<img src={FacebookIcon} alt="Facebook" style={iconStyle} />}
      >
        Continue with Facebook
      </Button>

      {/* "or" Divider with responsive margins */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: { xs: 0.5, sm: 1 } }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ mx: { xs: 1.5, sm: 2 }, textTransform: 'uppercase', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
          or
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
    </Box>
  );
};

export default SocialSignOn;