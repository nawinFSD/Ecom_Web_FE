// import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

// Asset Imports
import HomeBannerImg from '../../assets/home-banner.jpg';
import LeftArrowImg from '../../assets/left-arrow.png';
import RightArrowImg from '../../assets/right-arrow.png';

const HomeBanner = () => {
  const arrowStyle = {
    width: { xs: 32, sm: 40 },
    height: { xs: 32, sm: 40 },
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.05)' }
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'relative', 
        backgroundImage: `url(${HomeBannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 300, sm: 420, md: 500 },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Arrow Asset */}
        <Box sx={arrowStyle}>
          <img src={LeftArrowImg} alt="Previous" style={{ width: '40%' }} />
        </Box>

        {/* Center Typography Hero Details */}
        <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto', px: 2 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 400, fontFamily: 'serif', mb: 1, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.25rem' } }}>
            Flash Sale
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            Discover exceptional artworks from talented artists worldwide
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#000000', 
              color: '#FFFFFF', 
              textTransform: 'none', 
              px: 4, 
              py: 1.25,
              borderRadius: 0,
              fontSize: '0.8rem',
              fontWeight: 500,
              '&:hover': { backgroundColor: '#222222' }
            }}
          >
            Shop Now
          </Button>
        </Box>

        {/* Right Arrow Asset */}
        <Box sx={arrowStyle}>
          <img src={RightArrowImg} alt="Next" style={{ width: '40%' }} />
        </Box>

        {/* Slider Pagination Indicators (Bottom Center) */}
        <Box sx={{ position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#BDBDBD', cursor: 'pointer' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#BDBDBD', cursor: 'pointer' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#000000', cursor: 'pointer' }} />
        </Box>

      </Container>
    </Box>
  );
};

export default HomeBanner;