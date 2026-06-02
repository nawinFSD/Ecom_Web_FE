// import React from 'react';
import { Box, Container, Grid, Typography, Button, Link, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Asset Imports
import Flash1 from '../../assets/flash1.png';
import Flash2 from '../../assets/flash2.png';
import Flash3 from '../../assets/flash3.png';

const products = [
  { id: 1, img: Flash1, title: 'Abstract Canvas', artist: 'Maria Santos', rating: 4.8, currentPrice: 299, originalPrice: 399 },
  { id: 2, img: Flash2, title: 'Modern Sculpture', artist: 'David Chen', rating: 4.9, currentPrice: 299, originalPrice: 399 },
  { id: 3, img: Flash3, title: 'Vintage Print', artist: 'Elena Rodriguez', rating: 4.7, currentPrice: 299, originalPrice: 399 },
];

const FlashSaleDeals = () => {
  const timerBlockStyle = {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.9rem',
    fontFamily: 'monospace'
  };

  return (
    <Box sx={{ backgroundColor: '#FAF8F6', py: { xs: 6, md: 8 }, width: '100%' }}>
      <Container maxWidth="lg">
        
        {/* Main Section Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
            Flash Sale
          </Typography>
          <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.8rem', fontWeight: 600, '&:hover': { color: 'text.primary' } }}>
            View All Deals
          </Link>
        </Box>

        {/* Master Layout Grid */}
        <Grid container spacing={5}>
          
          {/* Left Grid Column: 3 Products Side-by-Side on Laptop and Tablet */}
          <Grid item xs={12} md={9} id="drawings-section">
            <Grid container spacing={3}>
              {products.map((prod) => (
                <Grid item xs={12} sm={4} key={prod.id}>
                  <Box sx={{ backgroundColor: '#FFFFFF', p: 2, position: 'relative' }}>
                    
                    {/* Badge */}
                    <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, backgroundColor: '#E0E0E0', px: 1, py: 0.25, borderRadius: 0.5 }}>
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>SALE</Typography>
                    </Box>

                    {/* Quick Access Floating Icons */}
                    <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.5, boxShadow: 1, cursor: 'pointer', display: 'flex' }}>
                        <FavoriteBorderIcon sx={{ fontSize: '0.9rem', color: '#757575' }} />
                      </Box>
                      <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.5, boxShadow: 1, cursor: 'pointer', display: 'flex' }}>
                        <VisibilityIcon sx={{ fontSize: '0.9rem', color: '#757575' }} />
                      </Box>
                    </Box>

                    {/* Image Framework Container */}
                    <Box sx={{ width: '100%', height: 240, overflow: 'hidden', backgroundColor: '#F5F5F5', mb: 2 }}>
                      <img src={prod.img} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>

                    {/* Content Meta Text Block */}
                    <Typography variant="body1" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 0.25 }}>{prod.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{prod.artist}</Typography>
                    
                    {/* Star Row metrics */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <Rating value={prod.rating} precision={0.1} readOnly size="small" sx={{ color: '#000000', fontSize: '0.8rem' }} />
                      <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{prod.rating}</Typography>
                    </Box>

                    {/* Pricing Actions Row Grid */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography variant="body1" fontWeight={700}>${prod.currentPrice}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>${prod.originalPrice}</Typography>
                      </Box>
                      <Button variant="contained" sx={{ backgroundColor: '#000000', color: '#FFFFFF', textTransform: 'none', borderRadius: 0, fontSize: '0.7rem', px: 1.5, py: 0.75, '&:hover': { backgroundColor: '#222222' } }}>
                        Add to Cart
                      </Button>
                    </Box>

                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Grid Column: "Deals Of The Month" Panel */}
          {/* Aligns horizontally on Laptop (md/lg), and stacks neatly below on Tablet (sm) and Mobile (xs) */}
          <Grid 
            item 
            xs={12} 
            md={3} 
            id="artists-section" 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: { xs: 'center', md: 'center' }, 
              textAlign: { xs: 'center', md: 'center' }, 
              pl: { md: 12 } 
            }}
          >
            <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, mb: 2, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
              Deals Of The Month
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: { xs: 500, md: '100%' }, lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
            </Typography>
            
            <Button variant="outlined" sx={{ borderColor: '#000000', color: '#000000', borderRadius: 0, textTransform: 'none', px: 4, py: 1, mb: 4, fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#333333', backgroundColor: 'rgba(0,0,0,0.02)' } }}>
              Buy Now
            </Button>

            <Typography variant="caption" fontWeight={700} color="text.primary" sx={{ display: 'block', mb: 1.5, letterSpacing: '0.02em' }}>
              Hurry, Before It's Too Late!
            </Typography>

            {/* Countdown Box Indicators Wrapper Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={timerBlockStyle}>23</Box>
              <Typography fontWeight={700}>:</Typography>
              <Box sx={timerBlockStyle}>45</Box>
              <Typography fontWeight={700}>:</Typography>
              <Box sx={timerBlockStyle}>20</Box>
            </Box>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};

export default FlashSaleDeals;