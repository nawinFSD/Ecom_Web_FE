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
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

// Import all product images
import Product1 from '../../assets/product/product1.png';
import Product2 from '../../assets/product/product2.png';
import Product3 from '../../assets/product/product3.png';
import Product4 from '../../assets/product/product4.png';
import Product5 from '../../assets/product/product5.png';
import Product6 from '../../assets/product/product6.png';
import Product7 from '../../assets/product/product7.png';
import Product8 from '../../assets/product/product8.png';
import Product9 from '../../assets/product/product9.png';
import Product10 from '../../assets/product/product10.png';
import Product11 from '../../assets/product/product11.png';
import Product12 from '../../assets/product/product12.png';

import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

const imageMap = {
  product1: Product1,
  product2: Product2,
  product3: Product3,
  product4: Product4,
  product5: Product5,
  product6: Product6,
  product7: Product7,
  product8: Product8,
  product9: Product9,
  product10: Product10,
  product11: Product11,
  product12: Product12,
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
                  label={`₹{discount}% OFF`}
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
              {product.outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            <IconButton
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
              <FavoriteBorderIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailModal;
