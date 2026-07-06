import { useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeBanner from '../components/home/HomeBanner';
import ShopByCategory from '../components/home/ShopByCategory';
import FlashSaleDeals from '../components/home/FlashSaleDeals';

// Components
import FeaturedGalleries from '../components/home/FeaturedGalleries';
import TrendingArtworks from '../components/home/TrendingArtworks';
import LimitedEdition from '../components/common/LimitedEdition';
import Newsletter from '../components/common/Newsletter';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll entrance animation for the button
    gsap.fromTo(buttonRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Gentle floating loop for geometric shapes
    gsap.to('.floating-shape-inner', {
      y: 'random(-12, 12)',
      x: 'random(-8, 8)',
      rotation: 'random(-30, 30)',
      duration: 'random(2.5, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.08
    });
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      backgroundColor: '#333333',
      boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: '#1A1A1A',
      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Magnetic Button logic
    if (buttonRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left - rect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top - rect.top + btnRect.height / 2;
      
      const distToBtn = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);
      
      if (distToBtn < 180) {
        const pullX = (mouseX - btnCenterX) * 0.22;
        const pullY = (mouseY - btnCenterY) * 0.22;
        
        gsap.to(buttonRef.current, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    }

    // Repel Grid dots and Floating shapes logic
    const elements = containerRef.current.querySelectorAll('.grid-dot, .floating-shape');
    elements.forEach((el) => {
      const elRect = el.getBoundingClientRect();
      const elCenterX = elRect.left - rect.left + elRect.width / 2;
      const elCenterY = elRect.top - rect.top + elRect.height / 2;
      
      const dx = elCenterX - mouseX;
      const dy = elCenterY - mouseY;
      const dist = Math.hypot(dx, dy);
      
      const repelRadius = 140;
      if (dist < repelRadius) {
        const force = (repelRadius - dist) / repelRadius;
        const repelX = (dx / dist) * force * 35;
        const repelY = (dy / dist) * force * 35;
        
        gsap.to(el, {
          x: repelX,
          y: repelY,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  };

  const handleMouseLeaveContainer = () => {
    // Reset all offsets when leaving the container
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
    
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.grid-dot, .floating-shape');
      elements.forEach((el) => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Sticky Navigation Layer */}
      <HomeNavbar />

      {/* Main Blocks */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HomeBanner />

        {/* Highlighted Shop All Button Section with Magnetic Repel Grid and Floating Geometric Shapes */}
        <Box 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeaveContainer}
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            py: { xs: 8, sm: 10 }, 
            backgroundColor: '#FAF8F6', 
            borderBottom: '1px solid #EAEAEA',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '240px',
            userSelect: 'none'
          }}
        >
          {/* Subtle Repel Dot Grid */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(20, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '10px',
              opacity: 0.12,
              pointerEvents: 'none',
              zIndex: 1,
              p: 3
            }}
          >
            {Array.from({ length: 120 }).map((_, i) => (
              <Box
                key={i}
                className="grid-dot"
                sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: '#1A1A1A',
                  justifySelf: 'center',
                  alignSelf: 'center'
                }}
              />
            ))}
          </Box>

          {/* Floating Geometric Shapes (Left Side) */}
          <Box className="floating-shape" sx={{ position: 'absolute', left: 'calc(50% - 280px)', top: '35%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #1A1A1A' }} />
          </Box>

          <Box className="floating-shape" sx={{ position: 'absolute', left: 'calc(50% - 190px)', top: '65%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 14, height: 14, backgroundColor: '#E0A96D' }} />
          </Box>

          <Box className="floating-shape" sx={{ position: 'absolute', left: 'calc(50% - 320px)', top: '60%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 16, height: 16, backgroundColor: '#1A1A1A', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </Box>

          {/* Floating Geometric Shapes (Right Side) */}
          <Box className="floating-shape" sx={{ position: 'absolute', right: 'calc(50% - 210px)', top: '30%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 14, height: 14, border: '2px solid #E0A96D', transform: 'rotate(45deg)' }} />
          </Box>

          <Box className="floating-shape" sx={{ position: 'absolute', right: 'calc(50% - 160px)', top: '60%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1A1A1A' }} />
          </Box>

          <Box className="floating-shape" sx={{ position: 'absolute', right: 'calc(50% - 290px)', top: '45%', pointerEvents: 'none', zIndex: 2 }}>
            <Box className="floating-shape-inner" sx={{ width: 6, height: 22, backgroundColor: '#1A1A1A', borderRadius: '4px' }} />
          </Box>

          {/* Magnetic Explore Button */}
          <Button
            ref={buttonRef}
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            sx={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontWeight: 750,
              letterSpacing: '0.12em',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              borderRadius: '2px',
              px: { xs: 4, sm: 6 },
              py: { xs: 1.5, sm: 2 },
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              transform: 'none',
              zIndex: 3
            }}
          >
            Explore All Artworks
          </Button>
        </Box>

        <ShopByCategory />
        <FlashSaleDeals />
        
        {/* Additional Sections */}
        <FeaturedGalleries />
        <TrendingArtworks />
        <LimitedEdition />
        <Newsletter />
      </Box>

      {/* Shared Interactive widgets */}
      <FloatingActions />

      {/* Footer */}
      <HomeFooter />
    </Box>
  );
};

export default HomePage;