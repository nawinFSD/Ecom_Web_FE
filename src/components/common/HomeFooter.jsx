import { useRef, useCallback } from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { gsap } from 'gsap';

// Asset Imports
import FbIcon from '../../assets/product/fb-icon.png';
import InstaIcon from '../../assets/product/insta-icon.png';
import XIcon from '../../assets/home/x-icon.png';
import LogoAsset from '../../assets/home/Logo.png';

const footerLinks = [
  {
    title: 'Shop',
    links: ['Paintings', 'Sculptures', 'Photography', 'Digital Art']
  },
  {
    title: 'Support',
    links: ['Help Center', 'Shipping Info', 'Returns', 'Contact Us']
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog']
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service']
  }
];

// ─── Directional Underline Link Component ───
const DirectionalUnderlineLink = ({ children, component, to, href, ...props }) => {
  const underlineRef = useRef(null);

  const handleMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    const underline = underlineRef.current;
    if (!underline) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = e.clientX < centerX;

    // Kill existing tweens to avoid conflict
    gsap.killTweensOf(underline);

    // Instantly set origin and scaleX to 0 from the entry side
    gsap.set(underline, {
      transformOrigin: fromLeft ? '0% 50%' : '100% 50%',
      scaleX: 0,
    });

    // Animate in
    gsap.to(underline, {
      scaleX: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const el = e.currentTarget;
    const underline = underlineRef.current;
    if (!underline) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const exitLeft = e.clientX < centerX;

    gsap.killTweensOf(underline);

    // Animate out toward the exit direction
    gsap.to(underline, {
      scaleX: 0,
      transformOrigin: exitLeft ? '0% 50%' : '100% 50%',
      duration: 0.3,
      ease: 'power3.in',
    });
  }, []);

  // Build link props conditionally
  const linkProps = {};
  if (component) linkProps.component = component;
  if (to) linkProps.to = to;
  if (href) linkProps.href = href;

  return (
    <Link
      {...linkProps}
      {...props}
      underline="none"
      color="text.secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        fontSize: '0.95rem',
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        '&:hover': { color: 'text.primary' },
      }}
    >
      {children}
      {/* Directional underline element */}
      <Box
        ref={underlineRef}
        component="span"
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          height: '1.5px',
          backgroundColor: '#1A1A1A',
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </Link>
  );
};

// ─── Directional Underline Title Component ───
const DirectionalUnderlineTitle = ({ children }) => {
  const underlineRef = useRef(null);

  const handleMouseEnter = useCallback((e) => {
    const el = e.currentTarget;
    const underline = underlineRef.current;
    if (!underline) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const fromLeft = e.clientX < centerX;

    gsap.killTweensOf(underline);
    gsap.set(underline, {
      transformOrigin: fromLeft ? '0% 50%' : '100% 50%',
      scaleX: 0,
    });
    gsap.to(underline, {
      scaleX: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const el = e.currentTarget;
    const underline = underlineRef.current;
    if (!underline) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const exitLeft = e.clientX < centerX;

    gsap.killTweensOf(underline);
    gsap.to(underline, {
      scaleX: 0,
      transformOrigin: exitLeft ? '0% 50%' : '100% 50%',
      duration: 0.3,
      ease: 'power3.in',
    });
  }, []);

  return (
    <Typography
      variant="body2"
      fontWeight={600}
      color="text.primary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        mb: 2.5,
        letterSpacing: '0.10em',
        fontSize: '1rem',
        position: 'relative',
        display: 'inline-block',
        cursor: 'default',
      }}
    >
      {children}
      <Box
        ref={underlineRef}
        component="span"
        sx={{
          position: 'absolute',
          bottom: -3,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#1A1A1A',
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </Typography>
  );
};

const HomeFooter = () => {
  const socialIconStyle = {
    width: 25,
    height: 25,
    cursor: 'pointer',
    objectFit: 'contain'
  };

  // Social icon hover
  const socialRefs = useRef([]);
  const handleSocialEnter = useCallback((index) => {
    const el = socialRefs.current[index];
    if (!el) return;
    gsap.to(el, {
      scale: 1.2,
      rotation: 8,
      y: -3,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);
  const handleSocialLeave = useCallback((index) => {
    const el = socialRefs.current[index];
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F9FAFB', pt: { xs: 6, md: 8 }, pb: 4, width: '100%', borderTop: '1px solid #E0E0E0' }}>
      <Container maxWidth="xl">

        <Grid container spacing={14} sx={{ mb: 6 }}>

          {/* Left Column Profile Branding Info Column */}
          <Grid item xs={12} md={4} sx={{ pr: { md: 6 } }}>
            {/* Embedded ColorFrame Text Header Row approximation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <img src={LogoAsset} alt="ColorFrame Logo" style={{ width: '10%', height: '10%', objectFit: 'contain' }} />
              <Typography variant="body1" fontWeight={700} color="text.primary" sx={{ fontSize: '1.25rem' }}>
                ColorFrame
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, maxWidth: 320, textAlign: 'left', fontSize: '0.95rem' }}>
              Crafting lasting memories with expertise and artistry. Your reliable partner for wedding and candid photography in Salem.
            </Typography>

            {/* Target Social Links Block Grid Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {[
                { src: FbIcon, alt: 'Facebook Portal Trigger' },
                { src: InstaIcon, alt: 'Instagram Portal Trigger' },
                { src: XIcon, alt: 'X Twitter Portal Trigger' },
              ].map((social, index) => (
                <Box
                  key={social.alt}
                  ref={(el) => (socialRefs.current[index] = el)}
                  onMouseEnter={() => handleSocialEnter(index)}
                  onMouseLeave={() => handleSocialLeave(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'black',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  <img src={social.src} alt={social.alt} style={socialIconStyle} />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Columns: Nested Sub-Navigation Link Column Lists */}
          <Grid item xs={12} md={10}>
            <Grid container spacing={{ xs: 10, sm: 12 }}>
              {footerLinks.map((col) => (
                <Grid item xs={8} sm={4} key={col.title}>
                  <DirectionalUnderlineTitle>{col.title}</DirectionalUnderlineTitle>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {col.links.map((item) => {
                      const routeMap = {
                        'Privacy Policy': '/privacy',
                        'Terms of Service': '/terms',
                        'Help Center': '/help-center',
                        'Shipping Info': '/shipping-info',
                        'Returns': '/returns',
                        'Contact Us': '/contact-us',
                        'About Us': '/about-us',
                        'Careers': '/careers',
                        'Press': '/press',
                        'Blog': '/blog'
                      };
                      const isRouterLink = Object.prototype.hasOwnProperty.call(routeMap, item);
                      const linkHref = routeMap[item] || '#';

                      const isShopLink = col.title === 'Shop';
                      const shopHref = isShopLink ? '/products' : linkHref;

                      return (
                        <DirectionalUnderlineLink
                          key={item}
                          component={(isRouterLink || isShopLink) ? RouterLink : 'a'}
                          to={(isRouterLink || isShopLink) ? shopHref : undefined}
                          href={(isRouterLink || isShopLink) ? undefined : '#'}
                        >
                          {item}
                        </DirectionalUnderlineLink>
                      );
                    })}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: '#E5E7EB', mb: 3 }} />

        {/* Center-Aligned Copyright Notice Row */}
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', fontSize: '0.85rem', letterSpacing: '0.01em' }}>
          © 2026 ColorFrame. All rights reserved.
        </Typography>

      </Container>
    </Box>
  );
};

export default HomeFooter;