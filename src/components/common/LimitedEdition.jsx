import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Multiple images for the carousel
import LimitedEditionImg from '../../assets/home/limited-edition.png';
import Trend1 from '../../assets/home/trend1.png';
import Trend2 from '../../assets/home/trend2.png';
import Trend3 from '../../assets/home/trend3.png';
import Gallery1 from '../../assets/product/draw10.png';
import Flash1 from '../../assets/home/flash1.png';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    img: LimitedEditionImg,
    badge: 'LIMITED EDITION',
    title: 'Digital Art',
    subtitle: 'Limited to 50 pieces worldwide. Experience unmatched performance and style.',
    price: '₹1599',
    currency: 'RUPEES',
  },
  {
    id: 2,
    img: Trend1,
    badge: 'EXCLUSIVE PIECE',
    title: 'Ocean Waves',
    subtitle: 'A breathtaking study of the ocean\'s raw, kinetic power. Only 20 prints available worldwide.',
    price: '₹1450',
    currency: 'RUPEES',
  },
  {
    id: 3,
    img: Trend2,
    badge: 'COLLECTOR\'S ITEM',
    title: 'City Lights',
    subtitle: 'A luminous nocturnal cityscape capturing the magic of Tokyo at night. Signed by the artist.',
    price: '₹1320',
    currency: 'RUPEES',
  },
  {
    id: 4,
    img: Trend3,
    badge: 'RARE FIND',
    title: 'Forest Path',
    subtitle: 'An ancient woodland rendered in extraordinary detail. One of only 15 prints in existence.',
    price: '₹1380',
    currency: 'RUPEES',
  },
  {
    id: 5,
    img: Gallery1,
    badge: 'GALLERY SPECIAL',
    title: 'Abstract Vision',
    subtitle: 'Directly from our partner gallery in New York — a defining work of contemporary abstraction.',
    price: '₹1650',
    currency: 'RUPEES',
  },
  {
    id: 6,
    img: Flash1,
    badge: 'FLASH EXCLUSIVE',
    title: 'Abstract Canvas',
    subtitle: 'A vibrant explosion of color available for 48 hours only. Handcrafted by Maria Santos.',
    price: '₹1299',
    currency: 'RUPEES',
  },
];

const LimitedEdition = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageBoxRef = useRef(null);
  const contentBoxRef = useRef(null);
  const sectionRef = useRef(null);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 250);
  };

  const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1);
  const next = () => goTo(current === slides.length - 1 ? 0 : current + 1);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // GSAP Entrance triggers on scroll
  useEffect(() => {
    // Image box entering from left
    gsap.fromTo(imageBoxRef.current,
      { opacity: 0, x: -60, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Content entering from right
    gsap.fromTo(contentBoxRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, []);

  const slide = slides[current];

  const arrowBtnStyle = {
    border: '1px solid #E0E0E0',
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: '#1A1A1A',
      borderColor: '#1A1A1A',
      color: '#FFFFFF',
      transform: 'scale(1.08)'
    },
  };

  return (
    <Box ref={sectionRef} sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 10 }, width: '100%', position: 'relative', overflow: 'hidden' }} id="artists-section">
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 4, md: 8 },
            position: 'relative',
            px: { xs: 2, sm: 6, md: 8 },
          }}
        >
          {/* Left Arrow */}
          <IconButton onClick={prev} sx={{ ...arrowBtnStyle, position: 'absolute', left: 0, top: { xs: '30%', md: '50%' }, transform: 'translateY(-50%)', zIndex: 10 }}>
            <ChevronLeftIcon sx={{ color: 'inherit' }} />
          </IconButton>

          {/* Left: Carousel Image */}
          <Box
            ref={imageBoxRef}
            sx={{
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 460,
                height: { xs: 280, sm: 360, md: 420 },
                overflow: 'hidden',
                backgroundColor: '#F9FAFB',
                position: 'relative',
                boxShadow: '0 16px 48px rgba(0,0,0,0.08)',
                borderRadius: '4px'
              }}
            >
              {slides.map((s, i) => (
                <Box
                  key={s.id}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: i === current ? 1 : 0,
                    transform: i === current ? 'scale(1)' : 'scale(1.05)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}

              {/* Slide counter on image */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 14,
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '2px',
                  px: 1.2,
                  py: 0.4,
                }}
              >
                <Typography sx={{ fontSize: '0.65rem', color: '#FFF', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right: Content */}
          <Box
            ref={contentBoxRef}
            sx={{
              width: { xs: '100%', md: '45%' },
              textAlign: { xs: 'center', md: 'left' },
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#F5F5F5',
                px: 1.5,
                py: 0.5,
                borderRadius: 0.5,
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: '#666666' }}>
                {slide.badge}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 500,
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.5rem' },
                color: '#1A1A1A'
              }}
            >
              {slide.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.7, maxWidth: { xs: '100%', md: 400 } }}
            >
              {slide.subtitle}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 4,
              }}
            >
              <Typography variant="h4" fontWeight={800} color="#1A1A1A">{slide.price}</Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>{slide.currency}</Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.06em',
                fontSize: '0.85rem',
                borderRadius: 0,
                px: { xs: 6, sm: 8 },
                py: 1.8,
                width: { xs: '100%', sm: 'auto' },
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#222222',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              Claim Yours
            </Button>
          </Box>

          {/* Right Arrow */}
          <IconButton onClick={next} sx={{ ...arrowBtnStyle, position: 'absolute', right: 0, top: { xs: '30%', md: '50%' }, transform: 'translateY(-50%)', zIndex: 10 }}>
            <ChevronRightIcon sx={{ color: 'inherit' }} />
          </IconButton>
        </Box>

        {/* Dot Line Indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 5, md: 6 } }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: i === current ? 48 : 32,
                height: 3,
                borderRadius: 2,
                backgroundColor: i === current ? '#000000' : '#E0E0E0',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': { backgroundColor: i === current ? '#000000' : '#BDBDBD' },
              }}
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default LimitedEdition;