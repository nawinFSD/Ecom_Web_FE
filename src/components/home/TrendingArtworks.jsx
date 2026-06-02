// import React from 'react';
import { Box, Container, Grid, Typography, Button, Link, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import VisibilityIcon from '../../assets/person-icon.png'; // Reusing visibility approach if asset icon is native, else fallback to material icon below
import VisibilityMuiIcon from '@mui/icons-material/Visibility';

// Asset Imports
import Trend1 from '../../assets/trend1.png';
import Trend2 from '../../assets/trend2.png';
import Trend3 from '../../assets/trend3.png';
import Trend4 from '../../assets/trend4.png';

const trendingProducts = [
  { id: 1, img: Trend1, title: 'Ocean Waves', artist: 'Thomas Miller', specs: 'Oil on canvas, 2023', rating: 4.9, price: 450 },
  { id: 2, img: Trend2, title: 'City Lights', artist: 'Sarah Johnson', specs: 'Acrylic on wood, 2023', rating: 4.6, price: 320 },
  { id: 3, img: Trend3, title: 'Forest Path', artist: 'Michael Brown', specs: 'Watercolor, 2023', rating: 4.8, price: 380 },
  { id: 4, img: Trend4, title: 'Desert Sunset', artist: 'Lisa Wang', specs: 'Digital art, 2023', rating: 4.7, price: 290 },
];

const TrendingArtworks = () => {
  return (
    <Box sx={{ backgroundColor: '#FAF8F6', py: { xs: 6, md: 4 }, width: '100%' }}>
      <Container maxWidth="lg">
        
        {/* Header Control Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
            Trending Artworks
          </Typography>
          <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', '&:hover': { color: 'text.primary' } }}>
            View All &nbsp; 🡦
          </Link>
        </Box>

        {/* Product Cards Row */}
        <Grid container spacing={4}>
          {trendingProducts.map((art) => (
            <Grid item xs={12} sm={6} md={4} key={art.id}>
              <Box sx={{ backgroundColor: '#FFFFFF', p: 1, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                
                {/* Floating Wishlist Action Floating Overlays */}
                <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: '0px 2px 6px rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex' }}>
                    <FavoriteBorderIcon sx={{ fontSize: '0.9rem', color: '#1A1A1A' }} />
                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: '0px 2px 6px rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex' }}>
                    <VisibilityMuiIcon sx={{ fontSize: '0.9rem', color: '#1A1A1A' }} />
                  </Box>
                </Box>

                {/* Primary Canvas Box Wrapper */}
                <Box sx={{ width: '100%', height: { xs: 100, sm: 140, md: 200 }, overflow: 'hidden', backgroundColor: '#F0F0F0', mb: 2 }}>
                  <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>

                {/* Info Text Nodes */}
                <Typography variant="body1" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 0.25 }}>{art.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25, fontWeight: 500 }}>{art.artist}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.7rem' }}>{art.specs}</Typography>

                {/* Star Metrics Indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3, mt: 'auto' }}>
                  <Rating value={art.rating} precision={0.1} readOnly size="small" sx={{ color: '#000000', fontSize: '0.75rem' }} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{art.rating}</Typography>
                </Box>

                {/* Actions Bottom Baseline Row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight={700}>${art.price}</Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: '#000000', 
                      color: '#FFFFFF', 
                      textTransform: 'none', 
                      borderRadius: 0, 
                      fontSize: '0.7rem', 
                      px: 2, 
                      py: 0.75, 
                      '&:hover': { backgroundColor: '#222222' } 
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>

              </Box>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default TrendingArtworks;