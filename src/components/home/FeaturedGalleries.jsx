import { useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asset Imports
import Gallery1 from '../../assets/home/gallery1.png';
import Gallery2 from '../../assets/home/gallery2.png';
import Gallery3 from '../../assets/home/gallery3.png';
import Gallery4 from '../../assets/home/gallery4.png';

gsap.registerPlugin(ScrollTrigger);

const galleries = [
  { id: 1, img: Gallery1 },
  { id: 2, img: Gallery2 },
  { id: 3, img: Gallery3 },
  { id: 4, img: Gallery4 }
];

const FeaturedGalleries = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Staggered text fade in
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Logos stagger reveal
    if (containerRef.current) {
      const logos = containerRef.current.querySelectorAll('.gallery-logo-card');
      gsap.fromTo(logos,
        { opacity: 0, scale: 0.85, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 6, md: 8 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        {/* Header Block */}
        <Box ref={textRef} sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, mb: 1.5, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Featured Galleries
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', px: 2, lineHeight: 1.6 }}>
            Discover exceptional artworks from our partner galleries and renowned art institutions worldwide
          </Typography>
        </Box>

        {/* Gallery Items Grid */}
        <Grid container spacing={4} ref={containerRef} sx={{ justifyContent: 'center' }}>
          {galleries.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id} className="gallery-logo-card">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.03)' }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 60, sm: 80, md: 100 },
                    overflow: 'hidden',
                    backgroundColor: '#F5F5F5',
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    border: '1px solid #EAEAEA',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      borderColor: '#BBB'
                    }
                  }}
                >
                  <img src={item.img} alt="Gallery Hub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Link
                  onClick={() => navigate('/products')}
                  underline="always"
                  color="text.secondary"
                  sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
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