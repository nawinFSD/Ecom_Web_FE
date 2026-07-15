import { useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
// Adjust path to your asset
import LogoAsset from '../../assets/home/Logo.png';

// Art-inspired color palette for letter morphing
const morphColors = ['#D4583A', '#2D7D9A', '#8B5CF6', '#059669', '#DC2626', '#D97706', '#7C3AED', '#0891B2', '#EC4899', '#E11D48'];

const BrandLogo = ({ textColor = 'text.primary', size = 'medium', withText = true }) => {
  const isLarge = size === 'large';
  const letterRefs = useRef([]);
  const logoImgRef = useRef(null);

  // Define responsive sizes for the logo image and text
  const logoWidth = {
    xs: isLarge ? 50 : 30, // mobile
    sm: isLarge ? 60 : 35, // tablet
    md: isLarge ? 70 : 40, // laptop/desktop
  };
  const logoHeight = {
    xs: isLarge ? 50 : 30,
    sm: isLarge ? 60 : 35,
    md: isLarge ? 70 : 40,
  };
  const logoFontSize = {
    xs: isLarge ? '1.15rem' : '0.95rem',
    sm: isLarge ? '1.4rem' : '1.1rem',
    md: isLarge ? '1.65rem' : '1.2rem',
  };

  const brandName = 'ColorFrame';

  // ─── Liquid Letter Morph on Hover ───
  const handleBrandEnter = useCallback(() => {
    // Animate the logo image with a playful rotation
    if (logoImgRef.current) {
      gsap.to(logoImgRef.current, {
        rotation: 360,
        scale: 1.1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
    }

    // Stagger-animate each letter
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      const tl = gsap.timeline();
      tl.to(el, {
        scaleY: 1.45,
        scaleX: 0.85,
        skewX: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-8, 8),
        color: morphColors[i % morphColors.length],
        y: gsap.utils.random(-4, -8),
        duration: 0.3,
        ease: 'back.out(2)',
        delay: i * 0.04,
      })
      .to(el, {
        scaleY: 1,
        scaleX: 1,
        skewX: 0,
        rotation: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.4)',
      });
    });
  }, []);

  const handleBrandLeave = useCallback(() => {
    // Reset logo image
    if (logoImgRef.current) {
      gsap.to(logoImgRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    }

    // Spring-back all letters to original
    letterRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scaleY: 1,
        scaleX: 1,
        skewX: 0,
        rotation: 0,
        color: morphColors[i % morphColors.length],
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)',
        delay: i * 0.02,
      });
    });
  }, []);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: isLarge ? 2 : 1.5 }, textDecoration: 'none', color: textColor, cursor: 'pointer' }}
      component="a"
      href="/"
      onMouseEnter={handleBrandEnter}
      onMouseLeave={handleBrandLeave}
    >
      {/* Brand Logo Image Asset - and responsive box */}
      <Box
        sx={{
          width: logoWidth,
          height: logoHeight,
          backgroundColor: isLarge ? '#1A1A1A' : 'transparent',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // Contain the image
          p: isLarge ? 0.5 : 0 // slight padding if it's the dark logo
        }}
      >
        <img
          ref={logoImgRef}
          src={LogoAsset}
          alt="ColorFrame Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
      {/* Brand Text — split into individual letter spans for morph */}
      {withText && (
        <Typography
          variant={isLarge ? 'h6' : 'body1'}
          fontWeight={500}
          color="inherit"
          sx={{
            letterSpacing: '0.02em',
            fontSize: logoFontSize,
            display: 'inline-flex',
            overflow: 'visible',
          }}
        >
          {brandName.split('').map((letter, index) => (
            <Box
              key={index}
              component="span"
              ref={(el) => (letterRefs.current[index] = el)}
              sx={{
                display: 'inline-block',
                willChange: 'transform',
                transformOrigin: 'bottom center',
                color: morphColors[index % morphColors.length]
              }}
            >
              {letter}
            </Box>
          ))}
        </Typography>
      )}
    </Box>
  );
};

export default BrandLogo;