import { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
  Rating,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { gsap } from 'gsap';

// Import all product images
import Draw1 from '../../assets/product/draw1.jpg';
import Draw2 from '../../assets/product/draw2.jpg';
import Draw3 from '../../assets/product/draw3.jpg';
import Draw4 from '../../assets/product/draw4.jpg';
import Draw5 from '../../assets/product/draw5.png';
import Draw6 from '../../assets/product/draw6.png';
import Draw7 from '../../assets/product/draw7.jpg';
import Draw8 from '../../assets/product/draw8.jpg';
import Draw9 from '../../assets/product/draw9.png';
import Draw10 from '../../assets/product/draw10.png';
import Draw11 from '../../assets/product/draw11.png';
import Draw12 from '../../assets/product/draw12.png';
import Draw13 from '../../assets/product/draw13.png';
import Draw14 from '../../assets/product/draw14.png';
import Draw15 from '../../assets/product/draw15.jpg';

import Paint1 from '../../assets/product/paint1.jpg';
import Paint2 from '../../assets/product/paint2.jpg';
import Paint3 from '../../assets/product/paint3.jpg';
import Paint4 from '../../assets/product/paint4.jpg';
import Paint5 from '../../assets/product/paint5.jpg';
import Paint6 from '../../assets/product/paint6.jpg';
import Paint7 from '../../assets/product/paint7.jpg';
import Paint8 from '../../assets/product/paint8.jpg';
import Paint9 from '../../assets/product/paint9.jpg';
import Paint10 from '../../assets/product/paint10.jpg';
import Paint11 from '../../assets/product/paint11.jpg';
import Paint12 from '../../assets/product/paint12.jpg';
import Paint13 from '../../assets/product/paint13.jpg';
import Paint14 from '../../assets/product/paint14.jpg';
import Paint15 from '../../assets/product/paint15.jpg';

import Sculp1 from '../../assets/product/sculp1.jpg';
import Sculp2 from '../../assets/product/sculp2.png';
import Sculp3 from '../../assets/product/sculp3.jpg';
import Sculp4 from '../../assets/product/sculp4.jpg';
import Sculp5 from '../../assets/product/sculp5.jpg';
import Sculp6 from '../../assets/product/sculp6.jpg';
import Sculp7 from '../../assets/product/sculp7.jpg';
import Sculp8 from '../../assets/product/sculp8.jpg';
import Sculp9 from '../../assets/product/sculp9.jpg';
import Sculp10 from '../../assets/product/sculp10.jpg';
import Sculp11 from '../../assets/product/sculp11.jpg';
import Sculp12 from '../../assets/product/sculp12.jpg';
import Sculp13 from '../../assets/product/sculp13.jpg';
import Sculp14 from '../../assets/product/sculp14.jpg';
import Sculp15 from '../../assets/product/sculp15.jpg';

import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

const imageMap = {
  draw1: Draw1, draw2: Draw2, draw3: Draw3, draw4: Draw4, draw5: Draw5, draw6: Draw6, draw7: Draw7, draw8: Draw8, draw9: Draw9, draw10: Draw10, draw11: Draw11, draw12: Draw12, draw13: Draw13, draw14: Draw14, draw15: Draw15,
  paint1: Paint1, paint2: Paint2, paint3: Paint3, paint4: Paint4, paint5: Paint5, paint6: Paint6, paint7: Paint7, paint8: Paint8, paint9: Paint9, paint10: Paint10, paint11: Paint11, paint12: Paint12, paint13: Paint13, paint14: Paint14, paint15: Paint15,
  sculp1: Sculp1, sculp2: Sculp2, sculp3: Sculp3, sculp4: Sculp4, sculp5: Sculp5, sculp6: Sculp6, sculp7: Sculp7, sculp8: Sculp8, sculp9: Sculp9, sculp10: Sculp10, sculp11: Sculp11, sculp12: Sculp12, sculp13: Sculp13, sculp14: Sculp14, sculp15: Sculp15
};

const StarRating = ({ rating }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <img
        key={star}
        src={star <= Math.floor(rating) ? BrightStar : BrightlessStar}
        alt="star"
        style={{ width: 14, height: 14, objectFit: 'contain' }}
      />
    ))}
  </Box>
);

const ProductDetailModal = ({ product, onClose }) => {
  const { cartItems, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    addToCart(product);
  };

  const cartItem = product ? cartItems.find((ci) => ci.productId === product.id) : null;
  const quantity = cartItem ? cartItem.quantity : 0;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const productImage = product.img || imageMap[product.imageKey] || Product1;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1300,
          animation: 'fadeIn 0.25s ease',
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      />

      {/* Modal Panel */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1400,
          width: { xs: '95vw', sm: '88vw', md: '820px' },
          maxHeight: { xs: '90vh', md: '85vh' },
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          '@keyframes slideUp': {
            from: { opacity: 0, transform: 'translate(-50%, calc(-50% + 40px))' },
            to: { opacity: 1, transform: 'translate(-50%, -50%)' },
          },
        }}
      >
        {/* Left: Product Image */}
        <Box
          sx={{
            width: { xs: '100%', md: '45%' },
            minHeight: { xs: 260, md: 'auto' },
            flexShrink: 0,
            backgroundColor: '#F7F5F2',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={productImage}
            alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
              }}
            >
              {product.badge.split(' ').map((b) => (
                <Chip
                  key={b}
                  label={b}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    backgroundColor: b === 'NEW' ? '#1A1A1A' : '#E53935',
                    color: '#FFFFFF',
                    borderRadius: '2px',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Out of stock overlay */}
          {product.outOfStock && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Out of Stock
              </Typography>
            </Box>
          )}

          {/* Wishlist button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(4px)',
              width: 36,
              height: 36,
              '&:hover': { backgroundColor: '#FFFFFF' },
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: '1.1rem', color: '#1A1A1A' }} />
          </IconButton>
        </Box>

        {/* Right: Product Details */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: { xs: 2.5, sm: 3.5 },
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              color: '#666',
              '&:hover': { color: '#000', backgroundColor: '#F5F5F5' },
            }}
          >
            <CloseIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>

          {/* Category */}
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#888',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            {product.category}
          </Typography>

          {/* Title */}
          <Typography
            sx={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 600,
              fontSize: { xs: '1.45rem', sm: '1.7rem' },
              color: '#1A1A1A',
              lineHeight: 1.2,
              mb: 0.5,
              pr: 4,
            }}
          >
            {product.title}
          </Typography>

          {/* Artist */}
          <Typography sx={{ fontSize: '0.88rem', color: '#666', mb: 1.5 }}>
            by <strong>{product.artist}</strong>
          </Typography>

          {/* Rating Row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <StarRating rating={product.rating} />
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>
              {product.rating}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>
              (124 reviews)
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
            <Typography
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                fontWeight: 800,
                color: '#1A1A1A',
              }}
            >
              ₹{product.price}
            </Typography>
            {product.oldPrice && (
              <>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    color: '#999',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{product.oldPrice}
                </Typography>
                <Chip
                  label={`${discount}% OFF`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    backgroundColor: '#FFF3E0',
                    color: '#E65100',
                    borderRadius: '2px',
                  }}
                />
              </>
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Description */}
          <Typography
            sx={{
              fontSize: '0.87rem',
              color: '#555',
              lineHeight: 1.7,
              mb: 2.5,
            }}
          >
            {product.description}
          </Typography>

          {/* Specs Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1.5,
              mb: 2.5,
              p: 2,
              backgroundColor: '#F9F9F7',
              borderRadius: '2px',
            }}
          >
            {[
              { label: 'Medium', value: product.medium },
              { label: 'Dimensions', value: product.dimensions },
              { label: 'Year', value: product.year },
              { label: 'Availability', value: product.outOfStock ? 'Out of Stock' : 'In Stock' },
            ].map(({ label, value }) => (
              <Box key={label}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.3 }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#333' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Trust Badges */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            {[
              { icon: <LocalShippingOutlinedIcon sx={{ fontSize: '0.9rem' }} />, text: 'Free Delivery' },
              { icon: <VerifiedOutlinedIcon sx={{ fontSize: '0.9rem' }} />, text: 'Authenticated' },
            ].map(({ icon, text }) => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Box sx={{ color: '#555' }}>{icon}</Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#666', fontWeight: 500 }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            <Button
              variant="contained"
              disabled={product.outOfStock}
              onClick={handleAddToCart}
              startIcon={<ShoppingCartOutlinedIcon />}
              fullWidth
              sx={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                py: 1.4,
                borderRadius: '2px',
                boxShadow: 'none',
                letterSpacing: '0.03em',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#333',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#9E9E9E',
                },
              }}
            >
              {product.outOfStock ? 'Out of Stock' : (quantity > 0 ? `Added to Cart (${quantity})` : 'Add to Cart')}
            </Button>

            <IconButton
              onClick={() => toggleWishlist(product)}
              sx={{
                border: '1.5px solid #E0E0E0',
                borderRadius: '2px',
                width: 52,
                height: 52,
                flexShrink: 0,
                '&:hover': {
                  borderColor: '#1A1A1A',
                  backgroundColor: '#FAFAFA',
                },
              }}
            >
              {isInWishlist(product.id) ? (
                <FavoriteIcon sx={{ fontSize: '1.1rem', color: '#E03C3C' }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: '1.1rem', color: '#1A1A1A' }} />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailModal;
