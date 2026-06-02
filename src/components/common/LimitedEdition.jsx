// import React from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Asset Imports
import LimitedEditionImg from '../../assets/home/limited-edition.png';

const LimitedEdition = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 10 }, width: '100%', position: 'relative' }}>
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: { xs: 4, md: 8 },
            position: 'relative',
            px: { xs: 2, sm: 6, md: 8 }
          }}
        >
          
          {/* Left Absolute Layout Arrow Trigger Overlay */}
          <IconButton 
            sx={{ 
              position: 'absolute', 
              left: 0, 
              top: { xs: '30%', md: '50%' }, 
              transform: 'translateY(-50%)',
              border: '1px solid #E0E0E0', 
              width: 40, 
              height: 40,
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              '&:hover': { backgroundColor: '#F5F5F5' }
            }}
          >
            <ChevronLeftIcon sx={{ color: '#000000' }} />
          </IconButton>

          {/* Left Grid Half: Hero Presentation Image Showcase */}
          <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }} id='paintings-section' >
            <Box sx={{ width: '100%', maxWidth: 460, height: { xs: 280, sm: 360, md: 400 }, overflow: 'hidden', backgroundColor: '#F9FAFB' }}>
              <img src={LimitedEditionImg} alt="Limited Collectible Artwork" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Box>

          {/* Right Grid Half: Commercial Product Focus Data Descriptor Content Column */}
          <Box sx={{ width: { xs: '100%', md: '45%' }, textAlign: { xs: 'center', md: 'left' } }}>
            <Box 
              sx={{ 
                display: 'inline-block', 
                backgroundColor: '#F5F5F5', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 0.5, 
                mb: 2 
              }}
            >
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', color: '#666666' }}>
                LIMITED EDITION
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 2, fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>
              Digital Art
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, maxWidth: { xs: '100%', md: 400 } }}>
              Limited to 50 pieces worldwide. Experience unmatched performance and style.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 4 }}>
              <Typography variant="h4" fontWeight={700}>₹599</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>USD</Typography>
            </Box>

            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#000000', 
                color: '#FFFFFF', 
                textTransform: 'uppercase', 
                fontWeight: 600, 
                letterSpacing: '0.05em',
                fontSize: '0.85rem',
                borderRadius: 0, 
                px: { xs: 6, sm: 8 }, 
                py: 1.75,
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { backgroundColor: '#222222' } 
              }}
            >
              Claim Yours
            </Button>
          </Box>

          {/* Right Absolute Layout Arrow Trigger Overlay */}
          <IconButton 
            sx={{ 
              position: 'absolute', 
              right: 0, 
              top: { xs: '30%', md: '50%' }, 
              transform: 'translateY(-50%)',
              border: '1px solid #E0E0E0', 
              width: 40, 
              height: 40,
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              '&:hover': { backgroundColor: '#F5F5F5' }
            }}
          >
            <ChevronRightIcon sx={{ color: '#000000' }} />
          </IconButton>

        </Box>

        {/* Carousel Linear Line Indicators Base Segment Footer row */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 5, md: 6 } }}>
          <Box sx={{ width: 40, height: 2, backgroundColor: '#000000', cursor: 'pointer' }} />
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{ width: 40, height: 2, backgroundColor: '#E0E0E0', cursor: 'pointer', '&:hover': { backgroundColor: '#BDBDBD' } }} />
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default LimitedEdition;