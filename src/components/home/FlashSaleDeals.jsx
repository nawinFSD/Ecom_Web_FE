import { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Button, Link, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asset Imports
import Flash1 from '../../assets/home/flash1.png';
import Flash2 from '../../assets/home/flash2.png';
import Flash3 from '../../assets/home/flash3.png';

// Product Detail Modal
import ProductDetailModal from '../products/ProductDetailModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

gsap.registerPlugin(ScrollTrigger);

const flashProducts = [
  {
    id: 201,
    imageKey: 'draw6',
    img: Flash1,
    title: 'Abstract Canvas',
    artist: 'Maria Santos',
    description: 'A vibrant exploration of color and form that captures the essence of human emotion. Each brushstroke tells a unique story — a captivating centerpiece for any modern interior.',
    medium: 'Oil on Canvas',
    dimensions: '24" × 36" (61 × 91 cm)',
    year: 2023,
    rating: 4.8,
    price: 299,
    oldPrice: 399,
    badge: 'SALE',
    outOfStock: false,
    category: 'Paintings',
  },
  {
    id: 202,
    imageKey: 'draw5',
    img: Flash2,
    title: 'Modern Sculpture',
    artist: 'David Chen',
    description: 'A striking contemporary sculpture that redefines the relationship between form and negative space. Handcrafted with precision from premium composite materials.',
    medium: 'Mixed Media Sculpture',
    dimensions: '12" × 8" × 20" (30 × 20 × 51 cm)',
    year: 2023,
    rating: 4.9,
    price: 299,
    oldPrice: 399,
    badge: 'SALE',
    outOfStock: false,
    category: 'Sculptures',
  },
  {
    id: 203,
    imageKey: 'sculp2',
    img: Flash3,
    title: 'Vintage Print',
    artist: 'Elena Rodriguez',
    description: 'A masterfully restored vintage print capturing a timeless Parisian scene. Limited to 30 numbered copies, each signed by the artist on acid-free archival paper.',
    medium: 'Giclée Print on Archival Paper',
    dimensions: '18" × 24" (46 × 61 cm)',
    year: 2022,
    rating: 4.7,
    price: 299,
    oldPrice: 399,
    badge: 'SALE',
    outOfStock: false,
    category: 'Photography',
  },
];

const FlashSaleDeals = () => {
  const { cartItems, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    addToCart(prod);
  };

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Header trigger
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
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.flash-sale-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, []);

  return (
    <Box id="drawings-section" ref={sectionRef} sx={{ backgroundColor: '#FAF8F6', py: { xs: 6, md: 8 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="lg">

        {/* Section Header */}
        <Box ref={headerRef} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
            Flash Sale
          </Typography>
          <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.8rem', fontWeight: 600, '&:hover': { color: 'text.primary' } }}>
            View All Deals
          </Link>
        </Box>

        <Grid container spacing={3} ref={cardsContainerRef} sx={{ justifyContent: 'center' }}>
          {flashProducts.map((prod) => {
            const cartItem = cartItems.find((ci) => ci.productId === prod.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <Grid item xs={12} sm={6} md={4} key={prod.id} className="flash-sale-card">
              <Box
                onClick={() => setSelectedProduct(prod)}
                sx={{
                  backgroundColor: '#FFFFFF',
                  p: 2,
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  border: '1px solid #EAEAEA',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                    borderColor: '#CCC',
                  },
                }}
              >
                {/* Badge */}
                <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, backgroundColor: '#FFD54F', px: 1.2, py: 0.4, borderRadius: '2px' }}>
                  <Typography sx={{ fontSize: '0.65rem', fontWeight: 850, letterSpacing: '0.05em', color: '#000000' }}>SALE</Typography>
                </Box>

                {/* Quick Action Icons */}
                <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      p: 0.6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      display: 'flex',
                      transition: 'all 0.2s',
                      '&:hover': { backgroundColor: '#FFF', transform: 'scale(1.1)' }
                    }}
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(prod); }}
                    >
                      {isInWishlist(prod.id) ? (
                        <FavoriteIcon sx={{ fontSize: '0.95rem', color: '#E03C3C' }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: '0.95rem', color: '#1A1A1A' }} />
                      )}
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      p: 0.6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      display: 'flex',
                      transition: 'all 0.2s',
                      '&:hover': { backgroundColor: '#FFF', transform: 'scale(1.1)' }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <VisibilityIcon sx={{ fontSize: '0.95rem', color: '#1A1A1A' }} />
                  </Box>
                </Box>

                {/* Image */}
                <Box sx={{ width: '100%', height: 240, overflow: 'hidden', backgroundColor: '#F5F5F5', mb: 2, borderRadius: '2px' }}>
                  <img
                    src={prod.img}
                    alt={prod.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </Box>

                <Typography variant="body1" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.25, color: '#1A1A1A' }}>{prod.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 500 }}>{prod.artist}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <Rating value={prod.rating} precision={0.1} readOnly size="small" sx={{ color: '#FFB300', fontSize: '0.85rem' }} />
                  <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ fontSize: '0.75rem' }}>{prod.rating}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="body1" fontWeight={800} color="#1A1A1A">₹{prod.price}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>₹{prod.oldPrice}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={(e) => handleAddToCart(e, prod)}
                    sx={{
                      backgroundColor: '#1A1A1A',
                      color: '#FFFFFF',
                      textTransform: 'none',
                      borderRadius: '2px',
                      fontSize: '0.7rem',
                      px: 2,
                      py: 0.9,
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#333', boxShadow: 'none' }
                    }}
                  >
                    {prod.outOfStock ? 'Out of Stock' : (quantity > 0 ? `Added (${quantity})` : 'Add to Cart')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          )})}
        </Grid>
      </Container>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
};

export default FlashSaleDeals;