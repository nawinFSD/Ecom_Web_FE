import { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Button, Link, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityMuiIcon from '@mui/icons-material/Visibility';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asset Imports
import Trend1 from '../../assets/home/trend1.png';
import Trend2 from '../../assets/home/trend2.png';
import Trend3 from '../../assets/home/trend3.png';
import Trend4 from '../../assets/home/trend4.png';

// Product Detail Modal
import ProductDetailModal from '../products/ProductDetailModal';

gsap.registerPlugin(ScrollTrigger);

const trendingProducts = [
  {
    id: 1,
    imageKey: 'draw10',
    img: Trend1,
    title: 'Ocean Waves',
    artist: 'Thomas Miller',
    description: 'An immersive study of the ocean\'s raw, kinetic power. The artist spent months on the Cornish coast to achieve the authentic movement and translucency of breaking waves.',
    medium: 'Oil on canvas',
    dimensions: '30" × 40" (76 × 102 cm)',
    year: 2023,
    rating: 4.9,
    price: 450,
    oldPrice: null,
    badge: null,
    outOfStock: false,
    category: 'Paintings',
  },
  {
    id: 2,
    imageKey: 'draw11',
    img: Trend2,
    title: 'City Lights',
    artist: 'Sarah Johnson',
    description: 'A luminous nocturnal cityscape where thousands of lights blur into rivers of color. Inspired by late-night walks through Tokyo.',
    medium: 'Acrylic on wood',
    dimensions: '24" × 30" (61 × 76 cm)',
    year: 2023,
    rating: 4.6,
    price: 320,
    oldPrice: null,
    badge: null,
    outOfStock: false,
    category: 'Digital Art',
  },
  {
    id: 3,
    imageKey: 'draw12',
    img: Trend3,
    title: 'Forest Path',
    artist: 'Michael Brown',
    description: 'A contemplative journey through an ancient woodland. Dappled light filters through a cathedral of trees, illuminating a path that beckons the viewer forward.',
    medium: 'Watercolor',
    dimensions: '20" × 28" (51 × 71 cm)',
    year: 2023,
    rating: 4.8,
    price: 1380,
    oldPrice: null,
    badge: null,
    outOfStock: false,
    category: 'Paintings',
  },
  {
    id: 4,
    imageKey: 'draw13',
    img: Trend4,
    title: 'Desert Sunset',
    artist: 'Lisa Wang',
    description: 'A stunning capture of the Sonoran Desert at dusk, where the sky ignites in an explosion of orange, pink, and violet over saguaro cacti silhouettes.',
    medium: 'Digital art',
    dimensions: '16" × 20" (41 × 51 cm)',
    year: 2023,
    rating: 4.7,
    price: 1290,
    oldPrice: null,
    badge: null,
    outOfStock: false,
    category: 'Digital Art',
  },
];

const TrendingArtworks = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
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

    // Cards staggered transition on enter
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.trend-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
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
    <Box id="sculpture-section" sx={{ backgroundColor: '#FAF8F6', py: { xs: 6, md: 8 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl">

        {/* Section Header */}
        <Box ref={headerRef} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4, px: { xs: 1, md: 3 } }}>
          <Typography variant="h4" sx={{ fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Trending Artworks
          </Typography>
          <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', '&:hover': { color: 'text.primary' } }}>
            View All &nbsp; 🡦
          </Link>
        </Box>

        {/* Product Cards Row: exactly 4 cards in single row on desktop (md={3}) */}
        <Grid container spacing={3} ref={containerRef} sx={{ justifyContent: 'center', px: { xs: 1, md: 3 } }}>
          {trendingProducts.map((art) => (
            <Grid item xs={12} sm={6} md={3} key={art.id} className="trend-card">
              <Box
                onClick={() => setSelectedProduct(art)}
                sx={{
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  border: '1px solid #EAEAEA',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                    borderColor: '#CCC',
                  },
                }}
              >
                {/* Image Container going flush edge-to-edge at top, left, and right */}
                <Box sx={{ width: '100%', height: 260, overflow: 'hidden', backgroundColor: '#F0F0F0', position: 'relative' }}>
                  <img
                    src={art.img}
                    alt={art.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />

                  {/* Floating Action Icons over the image */}
                  <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        p: 0.6,
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        transition: 'all 0.2s',
                        '&:hover': { backgroundColor: '#FFF', transform: 'scale(1.1)' }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        p: 0.6,
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        transition: 'all 0.2s',
                        '&:hover': { backgroundColor: '#FFF', transform: 'scale(1.1)' }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <VisibilityMuiIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                    </Box>
                  </Box>
                </Box>

                {/* Content Block below image with custom padding */}
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  {/* Title */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      mb: 0.5,
                      color: '#1A1A1A'
                    }}
                  >
                    {art.title}
                  </Typography>

                  {/* Artist */}
                  <Typography variant="body2" sx={{ color: '#555555', fontWeight: 500, mb: 0.25 }}>
                    {art.artist}
                  </Typography>

                  {/* Specs */}
                  <Typography variant="caption" sx={{ color: '#888888', display: 'block', mb: 2 }}>
                    {art.medium}, {art.year}
                  </Typography>

                  {/* Star Rating aligned with black stars */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3, mt: 'auto' }}>
                    <Rating
                      value={art.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{ color: '#000000', fontSize: '0.85rem' }}
                    />
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ fontSize: '0.75rem', ml: 0.5 }}>
                      {art.rating}
                    </Typography>
                  </Box>

                  {/* Footer actions row with price and Add to Cart button */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: '#1A1A1A'
                      }}
                    >
                      ₹{art.price}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        borderRadius: '0px', // sharp corners
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        px: 2.5,
                        py: 1,
                        boxShadow: 'none',
                        '&:hover': {
                          backgroundColor: '#333333',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>

              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
};

export default TrendingArtworks;