import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { gsap } from 'gsap';

// Banner image imports
import BannerImg from '../../assets/home/banner.jpeg';
import HomeBannerImg from '../../assets/home/home-banner.jpg';
import ProductBannerImg from '../../assets/product/product-banner.jpg';

const slides = [
  {
    id: 1,
    img: HomeBannerImg,
    label: 'EXCLUSIVE COLLECTION',
    title: 'Discover Exceptional\nArtworks',
    subtitle: 'Handpicked masterpieces from renowned artists worldwide — elevate your space with original art.',
    cta: 'View Deals',
    overlay: 'rgba(0,0,0,0.25)',
  },
  {
    id: 2,
    img: BannerImg,
    label: 'FLASH SALE — UP TO 40% OFF',
    title: 'Limited Time\nDeals',
    subtitle: 'Premium artworks at unbeatable prices. Every piece is a story waiting to be told.',
    cta: 'View Deals',
    overlay: 'rgba(0,0,0,0.30)',
  },
  {
    id: 3,
    img: ProductBannerImg,
    label: 'FREE HOME DELIVERY',
    title: 'Enjoy Summer\nFree Delivery',
    subtitle: 'Designer art delivered to your door — browse our curated selection of contemporary works.',
    cta: 'View Deals',
    overlay: 'rgba(0,0,0,0.20)',
  },
];

const HeroCarousel = ({ height = { xs: 300, sm: 420, md: 560 } }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  }, [current, goTo]);

  // Auto-play every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = () => {
    navigate('/products');
  };

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.08,
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      backgroundColor: '#2A2A2A',
      color: '#FFFFFF',
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      duration: 0.35,
      ease: 'power2.out'
    });
  };

  // GSAP animation for text transitions on current slide changes
  useEffect(() => {
    const elements = [labelRef.current, titleRef.current, subtitleRef.current, buttonRef.current];

    // Quick reset
    gsap.set(elements, { opacity: 0, y: 15 });

    // Timeline animation
    const tl = gsap.timeline();
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
      .fromTo(titleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(buttonRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.35'
      );
  }, [current]);

  const slide = slides[current];

  const arrowStyle = {
    backgroundColor: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#FFFFFF',
    width: { xs: 36, sm: 48 },
    height: { xs: 36, sm: 48 },
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.3)',
      transform: 'scale(1.08)',
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        height,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Slide Image */}
      {slides.map((s, i) => (
        <Box
          key={s.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('${s.img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1)' : 'scale(1.04)',
            transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)',
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: slide.overlay,
          transition: 'background-color 0.5s ease',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 3, sm: 6 },
        }}
      >
        {/* Label */}
        <Box ref={labelRef}>
          <Typography
            sx={{
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.85)',
              mb: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {slide.label}
          </Typography>
        </Box>

        {/* Title */}
        <Box ref={titleRef}>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 600,
              fontSize: { xs: '1.8rem', sm: '2.8rem', md: '3.5rem' },
              color: '#FFFFFF',
              lineHeight: 1.15,
              mb: 2,
              whiteSpace: 'pre-line',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {slide.title}
          </Typography>
        </Box>

        {/* Subtitle */}
        <Box ref={subtitleRef}>
          <Typography
            sx={{
              fontSize: { xs: '0.82rem', sm: '1rem' },
              color: 'rgba(255,255,255,0.88)',
              mb: 3.5,
              maxWidth: 540,
              mx: 'auto',
              lineHeight: 1.65,
            }}
          >
            {slide.subtitle}
          </Typography>
        </Box>

        {/* CTA Button */}
        <Box ref={buttonRef}>
          <Button
            variant="contained"
            onClick={handleCtaClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
              fontWeight: 700,
              fontSize: { xs: '0.78rem', sm: '0.9rem' },
              textTransform: 'none',
              px: { xs: 3.5, sm: 5 },
              py: { xs: 1.2, sm: 1.6 },
              borderRadius: '2px',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            }}
          >
            {slide.cta}
          </Button>
        </Box>
      </Box>

      {/* Left Arrow */}
      <IconButton
        onClick={prev}
        sx={{
          ...arrowStyle,
          position: 'absolute',
          left: { xs: 12, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' } }} />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={next}
        sx={{
          ...arrowStyle,
          position: 'absolute',
          right: { xs: 12, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
        }}
      >
        <ChevronRightIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' } }} />
      </IconButton>

      {/* Dot Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, sm: 24 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 4,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === current ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.75)',
              },
            }}
          />
        ))}
      </Box>

      {/* Slide counter */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 28 },
          zIndex: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.06em',
          }}
        >
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
