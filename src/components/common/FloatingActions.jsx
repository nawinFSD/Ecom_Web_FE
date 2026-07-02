import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, Slide, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Product Detail Modal
import ProductDetailModal from '../products/ProductDetailModal';

// Special deal product reference matching product1 details
const specialProduct = {
  id: 1,
  imageKey: 'product1',
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
};

const FloatingActions = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState(86400 * 3 + 15400); // ~3.18 days in seconds
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top scroll observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Countdown timer hook
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (totalSeconds) => {
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0'),
    };
  };

  const time = formatTime(timeLeft);

  const timerBlockStyle = {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    width: { xs: 32, sm: 36 },
    height: { xs: 32, sm: 36 },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
    fontFamily: 'monospace',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  return (
    <Box>
      {/* Floating Reopen Button (expandable on hover) */}
      {!isPopupOpen && (
        <Button
          onClick={() => setIsPopupOpen(true)}
          variant="contained"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1100,
            backgroundColor: '#FFD54F',
            color: '#000000',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '0.8rem',
            width: 52,
            height: 52,
            minWidth: 52,
            borderRadius: '50%',
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            border: '1.5px solid #FFC107',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), borderRadius 0.4s, padding 0.4s',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: '#FFCA28',
              width: 165,
              borderRadius: '26px',
              px: 2,
            },
            '& .expandable-text': {
              maxWidth: 0,
              opacity: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              transition: 'opacity 0.3s ease, max-width 0.3s ease, margin-left 0.3s ease',
              marginLeft: 0,
            },
            '&:hover .expandable-text': {
              maxWidth: 100,
              opacity: 1,
              marginLeft: 1,
            }
          }}
        >
          <AccessTimeIcon />
          <span className="expandable-text">Deal of Month</span>
        </Button>
      )}

      {/* Deals of the Month popup box */}
      <Slide direction="up" in={isPopupOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={12}
          sx={{
            position: 'fixed',
            bottom: { xs: 0, sm: 50 },
            right: { xs: 0, sm: 50 },
            zIndex: 1100,
            width: { xs: '100vw', sm: '360px' },
            borderRadius: { xs: '16px 16px 0 0', sm: '8px' },
            border: '1.5px solid #FFD54F',
            backgroundColor: '#FFFFFF',
            p: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}
        >
          <IconButton
            onClick={() => setIsPopupOpen(false)}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: '#666',
              '&:hover': { color: '#000', backgroundColor: '#F5F5F5' },
            }}
          >
            <CloseIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#D32F2F',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(211,47,47,0.7)' },
                  '70%': { transform: 'scale(1)', boxShadow: '0 0 0 6px rgba(211,47,47,0)' },
                  '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(211,47,47,0)' },
                }
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.12em', color: '#D32F2F', textTransform: 'uppercase' }}>
              Deal Of The Month
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontFamily: 'serif', fontWeight: 600, fontSize: '1.25rem', mb: 1, color: '#1A1A1A' }}>
            Abstract Canvas Special
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5, fontSize: '0.85rem' }}>
            Get our signature Abstract Canvas by Maria Santos with exclusive certificate and premium custom wooden framing.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, fontWeight: 700 }}>
              <AccessTimeIcon sx={{ fontSize: '0.9rem', color: '#D32F2F' }} /> Offer Ends In:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={timerBlockStyle}>{time.days}</Box>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, mt: 0.5, color: '#666' }}>DAYS</Typography>
              </Box>
              <Typography fontWeight={700} sx={{ pb: 2 }}>:</Typography>

              <Box sx={{ textAlign: 'center' }}>
                <Box sx={timerBlockStyle}>{time.hours}</Box>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, mt: 0.5, color: '#666' }}>HRS</Typography>
              </Box>
              <Typography fontWeight={700} sx={{ pb: 2 }}>:</Typography>

              <Box sx={{ textAlign: 'center' }}>
                <Box sx={timerBlockStyle}>{time.minutes}</Box>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, mt: 0.5, color: '#666' }}>MINS</Typography>
              </Box>
              <Typography fontWeight={700} sx={{ pb: 2 }}>:</Typography>

              <Box sx={{ textAlign: 'center' }}>
                <Box sx={timerBlockStyle}>{time.seconds}</Box>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, mt: 0.5, color: '#666' }}>SECS</Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => setSelectedProduct(specialProduct)}
            sx={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              py: 1.2,
              borderRadius: '2px',
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#333', boxShadow: 'none' }
            }}
          >
            Claim Special Deal
          </Button>
        </Paper>
      </Slide>

      {/* Floating Back to Top Button Option (placed dynamically above the clock/reopen button) */}
      <Slide direction="up" in={showBackToTop} mountOnEnter unmountOnExit>
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: isPopupOpen ? { xs: 290, sm: 310 } : 90,
            right: 26,
            zIndex: 1100,
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            width: 48,
            height: 48,
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            transition: 'bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s, transform 0.25s',
            '&:hover': {
              backgroundColor: '#333333',
              transform: 'translateY(-3px)'
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Slide>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
};

export default FloatingActions;
