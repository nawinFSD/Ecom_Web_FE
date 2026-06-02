// import React from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';

// Asset Imports
import ProductBannerImg from '../../assets/product/product-banner.jpg';
import LeftArrowImg from '../../assets/home/left-arrow.png';
import RightArrowImg from '../../assets/home/right-arrow.png';

const ProductBanner = () => {
  const arrowStyle = {
    width: { xs: 36, sm: 48 },
    height: { xs: 36, sm: 48 },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0E0E0',
    '&:hover': { backgroundColor: '#F5F5F5' },
    boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'relative', 
        backgroundImage: `url(${ProductBannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FDFBF9', // Fallback color matching the wavy background
        py: { xs: 6, md: 10 },
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left Arrow */}
        <IconButton sx={arrowStyle}>
          <img src={LeftArrowImg} alt="Previous" style={{ width: '40%', objectFit: 'contain' }} />
        </IconButton>

        {/* Center Content */}
        <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto', px: 2 }}  id='artists-section'>
          <Typography variant="caption" sx={{ color: '#f3eded', fontWeight: 600, letterSpacing: '0.05em', display: 'block', mb: 1.5 }}>
            September 12-22
          </Typography>
          <Typography variant="h3" component="h1" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 2, fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' }, color: '#1A1A1A' }}>
            Enjoy free home delivery in this summer
          </Typography>
          <Typography variant="body1" sx={{ color: '#f3eded', mb: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Designer Dresses - Pick from trendy Designer Dress.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#000000', 
              color: '#FFFFFF', 
              textTransform: 'none', 
              px: 5, 
              py: 1.5,
              borderRadius: 0,
              fontSize: '0.9rem',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#222222' }
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Right Arrow */}
        <IconButton sx={arrowStyle}>
          <img src={RightArrowImg} alt="Next" style={{ width: '40%', objectFit: 'contain' }} />
        </IconButton>

      </Container>
    </Box>
  );
};

export default ProductBanner;