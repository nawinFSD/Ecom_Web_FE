import { useEffect, useRef } from 'react';
import { Box, Grid, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asset Imports
import Shop1 from '../../assets/home/shop1.png';
import Shop2 from '../../assets/home/shop2.png';
import Shop3 from '../../assets/home/shop3.png';
import Shop4 from '../../assets/home/shop4.png';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 1, img: Shop1, title: 'Paintings', sectionId: 'paintings-section' },
  { id: 2, img: Shop2, title: 'Sculptures', sectionId: 'sculpture-section' },
  { id: 3, img: Shop3, title: 'Photography', sectionId: 'photography-section' },
  { id: 4, img: Shop4, title: 'Digital Art', sectionId: 'digital-art-section' }
];

const ShopByCategory = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header trigger animation
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Categories staggered entrance animation on scroll
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.category-item-card');
      gsap.fromTo(items,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.2)',
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
    <Container maxWidth="xl" sx={{ my: { xs: 6, md: 10 } }}>
      {/* Header Row */}
      <Box ref={headerRef} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
        <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
          Shop by Category
        </Typography>
        <Link 
          onClick={() => navigate('/products')}
          color="text.secondary" 
          underline="none" 
          sx={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
        >
          View All &nbsp; 🡦
        </Link>
      </Box>

      {/* Grid Elements Container centered */}
      <Grid container spacing={3} ref={containerRef} sx={{ justifyContent: 'center' }}>
        {categories.map((item) => (
          <Grid
            item
            xs={12}   // Mobile = 1 item
            sm={6}    // Tablet = 2 items
            md={6}    // Medium tablet = 2 items
            lg={3}    // Laptop/Desktop = 4 items
            key={item.id}
            className="category-item-card"
          >
            <Box
              id={item.sectionId}
              onClick={() => navigate('/products')}
              sx={{
                width: "100%",
                cursor: "pointer",
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                }
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: 220, // Mobile
                    sm: 250, // Tablet
                    lg: 180, // Desktop
                  },
                  overflow: "hidden",
                  backgroundColor: "#F5F5F5",
                  mb: 1.5,
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </Box>

              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  fontFamily: "serif",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                  },
                  textAlign: "center",
                  color: '#1A1A1A',
                  letterSpacing: '0.02em'
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopByCategory;