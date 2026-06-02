// import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

// Asset Imports
import Gallery1 from '../../assets/gallery1.png';
import Gallery2 from '../../assets/gallery2.png';
import Gallery3 from '../../assets/gallery3.png';
import Gallery4 from '../../assets/gallery4.png';

const galleries = [
  { id: 1, img: Gallery1 },
  { id: 2, img: Gallery2 },
  { id: 3, img: Gallery3 },
  { id: 4, img: Gallery4 }
];

const FeaturedGalleries = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 6, md: 8 }, width: '100%' }}>
      <Container maxWidth="xl">
        {/* Header Block */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Featured Galleries
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', px: 2, lineHeight: 1.6 }}>
            Discover exceptional artworks from our partner galleries and renowned art institutions worldwide
          </Typography>
        </Box>

        {/* Gallery Items Grid */}
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {galleries.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: { xs: 60, sm: 80, md: 100 }, 
                    overflow: 'hidden', 
                    backgroundColor: '#F5F5F5',
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={item.img} alt="Gallery Hub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Link 
                  href="#" 
                  underline="always" 
                  color="text.secondary" 
                  sx={{ fontSize: '0.75rem', letterSpacing: '0.02em', '&:hover': { color: 'text.primary' } }}
                >
                  Explore Now
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedGalleries;