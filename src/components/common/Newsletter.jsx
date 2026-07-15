import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const containerRef = useRef(null);
  const clickCoordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    // Zoom/scale animation on scroll reveal
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.94, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, []);

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const triggerConfetti = () => {
    const coords = clickCoordRef.current;
    const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
    
    const originX = (coords && typeof coords.x === 'number' && !isNaN(coords.x)) 
      ? coords.x 
      : (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const originY = (coords && typeof coords.y === 'number' && !isNaN(coords.y)) 
      ? coords.y 
      : (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    // Reset coordinates ref
    clickCoordRef.current = null;

    const colors = ['#D4583A', '#2D7D9A', '#8B5CF6', '#059669', '#DC2626', '#D97706', '#7C3AED', '#0891B2', '#EC4899', '#E11D48'];
    const shapes = ['circle', 'square', 'triangle', 'rectangle'];

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const size = gsap.utils.random(8, 16);
      const width = randomShape === 'rectangle' ? size * 1.5 : size;
      const height = size;

      particle.style.position = 'fixed';
      particle.style.left = `${originX - width / 2}px`;
      particle.style.top = `${originY - height / 2}px`;
      particle.style.width = `${width}px`;
      particle.style.height = `${height}px`;
      particle.style.backgroundColor = randomColor;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '99999';
      particle.style.willChange = 'transform, opacity';
      particle.style.transform = 'scale(0)';

      if (randomShape === 'circle') {
        particle.style.borderRadius = '50%';
      } else if (randomShape === 'triangle') {
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.backgroundColor = 'transparent';
        particle.style.borderLeft = `${size / 2}px solid transparent`;
        particle.style.borderRight = `${size / 2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${randomColor}`;
      }

      document.body.appendChild(particle);

      // Random path physics animation
      const angle = gsap.utils.random(0, Math.PI * 2);
      const velocity = gsap.utils.random(150, 450);
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - gsap.utils.random(100, 200); // bias upwards

      // Timeline for shooting and falling
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.removeChild(particle);
        }
      });

      tl.to(particle, {
        scale: gsap.utils.random(0.6, 1.4),
        x: destX,
        y: destY,
        rotation: gsap.utils.random(360, 1080),
        duration: 0.6,
        ease: 'power1.out'
      })
      .to(particle, {
        y: '+=600',
        opacity: 0,
        scale: 0.2,
        rotation: '+=360',
        duration: 1.2,
        ease: 'power2.in'
      });
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorText('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorText('Please enter a valid email address.');
      return;
    }

    setErrorText('');

    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      // Success
      setSuccessText(data.message || 'Thank you for subscribing to ColorFrame Gallery!');
      setPreviewUrl(data.previewUrl || '');
      triggerConfetti();
      setEmail('');
    } catch (err) {
      setErrorText(err.message || 'Server error. Please try again later.');
    }
  };

  return (
    <>
      <Box ref={containerRef} sx={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', py: { xs: 6, sm: 8 }, width: '100%', textAlign: 'center', overflow: 'hidden' }}>
        <Container maxWidth="md">
          
          <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, mb: 1.5, fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
            Stay Updated
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#BDBDBD', mb: 4, px: 2, maxWidth: 540, mx: 'auto', lineHeight: 1.6, fontSize: '1rem' }}>
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive collections, and special offers
          </Typography>

          {/* Form Container Row */}
          <Box 
            component="form" 
            onSubmit={handleSubscribe}
            noValidate 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              justifyContent: 'center', 
              gap: { xs: 1.5, sm: 0 }, 
              maxWidth: 500, 
              mx: 'auto',
              px: 2
            }}
          >
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorText) setErrorText('');
                }}
                error={!!errorText}
                helperText={errorText}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: { xs: 1, sm: '4px 0 0 ' + '4px' },
                    height: 46,
                    fontSize: '1rem',
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'transparent' },
                    '&.Mui-focused fieldset': { borderColor: 'transparent' },
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#EF4444',
                    mt: 0.5,
                    textAlign: 'left',
                    position: { sm: 'absolute' },
                    bottom: { sm: -24 }
                  }
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              onClick={(e) => {
                clickCoordRef.current = { x: e.clientX, y: e.clientY };
              }}
              sx={{
                backgroundColor: '#616161',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                px: 4,
                height: 46,
                borderRadius: { xs: 1, sm: '0 4px 4px 0' },
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: '#424242', boxShadow: 'none' }
              }}
            >
              Subscribe
            </Button>
          </Box>

        </Container>
      </Box>

      {/* Success Dialog Modal - Custom Tailwind CSS (outside animated Box to prevent overflow clipping) */}
      {successText && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              setSuccessText('');
              setPreviewUrl('');
            }}
          ></div>
          
          {/* Modal Card */}
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative z-10 shadow-2xl border border-slate-100 transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
            {/* Green Checkmark Badge */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Subscription Successful!
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              {successText}
            </p>
            
            {previewUrl && (
              <div className="mb-6 p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl text-left">
                <p className="text-xs font-semibold text-indigo-900 mb-1 flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Mock Inbox Delivery
                </p>
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-bold inline-flex items-center gap-1"
                >
                  View Sent Welcome Email ↗
                </a>
              </div>
            )}

            <button 
              onClick={() => {
                setSuccessText('');
                setPreviewUrl('');
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              Great
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletter;