// import React from 'react';
import { Box, Typography} from '@mui/material';
// Adjust path to your asset
import LogoAsset from '../../assets/home/Logo.png'; 

const BrandLogo = ({ textColor = 'text.primary', size = 'medium', withText = true }) => {
  const isLarge = size === 'large';

  // Define responsive sizes for the logo image and text
  const logoWidth = {
    xs: isLarge ? 50 : 30, // mobile
    sm: isLarge ? 60 : 35, // tablet
    md: isLarge ? 70 : 40, // laptop/desktop
  };
  const logoHeight = {
    xs: isLarge ? 50 : 30, 
    sm: isLarge ? 60 : 35,
    md: isLarge ? 70 : 40,
  };
  const logoFontSize = {
    xs: isLarge ? '1rem' : '0.8rem',
    sm: isLarge ? '1.25rem' : '0.9rem',
    md: isLarge ? '1.5rem' : '1rem',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: isLarge ? 2 : 1.5 }, textDecoration: 'none', color: textColor }} component="a" href="/">
      {/* Brand Logo Image Asset - and responsive box */}
      <Box
        sx={{
          width: logoWidth,
          height: logoHeight,
          backgroundColor: isLarge ? '#1A1A1A' : 'transparent',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        //   color: isLarge ? '#FFFFFF' : '#1A1A1A',
          overflow: 'hidden', // Contain the image
          p: isLarge ? 0.5 : 0 // slight padding if it's the dark logo
        }}
      >
          <img src={LogoAsset} alt="PureFrame Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Box>
      {/* Brand Text */}
      {withText && (
        <Typography variant={isLarge ? 'h6' : 'body1'} fontWeight={500} color="inherit" sx={{ letterSpacing: '0.02em', fontSize: logoFontSize }}>
          PureFrame
        </Typography>
      )}
    </Box>
  );
};

export default BrandLogo;