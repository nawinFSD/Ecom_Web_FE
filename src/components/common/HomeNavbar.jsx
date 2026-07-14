import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Link, useTheme, useMediaQuery, TextField, Badge } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BrandLogo from './BrandLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { gsap } from 'gsap';

// Asset Imports
import SearchIconImg from '../../assets/home/search-icon.png';
import TrolleyIconImg from '../../assets/home/trolly-icon.png';
import PersonIconImg from '../../assets/home/person-icon.png';

// Define the links and their corresponding filters
const navLinks = [
  { name: 'PAINTINGS', filter: 'paint' },
  { name: 'DRAWINGS', filter: 'draw' },
  { name: 'SCULPTURE', filter: 'sculp' },
  { name: 'ARTISTS', filter: 'artists' }
];

const HomeNavbar = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearch, setShowSearch] = useState(!!searchParams.get('search'));
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');
  const { totalQuantity } = useCart();
  const { wishlistItems } = useWishlist();

  // Refs for icon hover animations
  const searchIconRef = useRef(null);
  const cartIconRef = useRef(null);
  const personIconRef = useRef(null);
  const wishlistIconRef = useRef(null);

  // Refs for gooey blob
  const navContainerRef = useRef(null);
  const blobRef = useRef(null);
  const linkRefs = useRef([]);

  const iconStyle = {
    width: 20,
    height: 20,
    cursor: 'pointer',
    objectFit: 'contain'
  };

  // ─── GSAP Icon Hover Handlers ───
  const handleIconEnter = useCallback((ref, variant = 'default') => {
    if (!ref.current) return;
    const tl = gsap.timeline();
    if (variant === 'cart') {
      // Cart gets a playful bounce sequence
      tl.to(ref.current, {
        scale: 1.3,
        rotation: -12,
        y: -4,
        duration: 0.25,
        ease: 'back.out(3)',
      })
      .to(ref.current, {
        rotation: 12,
        duration: 0.15,
        ease: 'power2.inOut',
      })
      .to(ref.current, {
        rotation: 0,
        duration: 0.2,
        ease: 'elastic.out(1, 0.4)',
      });
    } else if (variant === 'search') {
      // Search gets a pulse ring + scale
      tl.to(ref.current, {
        scale: 1.25,
        rotation: 15,
        y: -3,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    } else if (variant === 'wishlist') {
      // Wishlist heart gets a heartbeat pulse
      tl.to(ref.current, {
        scale: 1.3,
        y: -3,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(ref.current, {
        scale: 1.1,
        duration: 0.1,
        ease: 'power2.in',
      })
      .to(ref.current, {
        scale: 1.35,
        duration: 0.15,
        ease: 'power2.out',
      });
    } else {
      // Default: person icon
      tl.to(ref.current, {
        scale: 1.3,
        rotation: -15,
        y: -3,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, []);

  const handleIconLeave = useCallback((ref) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      rotation: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  // Track which link is currently hovered for text color
  const [activeNavIndex, setActiveNavIndex] = useState(-1);

  // ─── Gooey Blob Handlers ───
  const handleNavLinkEnter = useCallback((index) => {
    const linkEl = linkRefs.current[index];
    const container = navContainerRef.current;
    const blob = blobRef.current;
    if (!linkEl || !container || !blob) return;

    setActiveNavIndex(index);

    const containerRect = container.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    // Position blob relative to container
    const targetX = linkRect.left - containerRect.left;
    const targetWidth = linkRect.width;

    // First stretch horizontally (viscous rubber-band), then settle
    const tl = gsap.timeline();
    tl.to(blob, {
      x: targetX - 12,
      width: targetWidth + 24,
      opacity: 1,
      scaleY: 1,
      scaleX: 1.15,
      duration: 0.3,
      ease: 'power3.out',
    })
    .to(blob, {
      x: targetX - 10,
      width: targetWidth + 20,
      scaleX: 1,
      duration: 0.45,
      ease: 'elastic.out(1.2, 0.4)',
    });
  }, []);

  const handleNavContainerLeave = useCallback(() => {
    const blob = blobRef.current;
    if (!blob) return;
    setActiveNavIndex(-1);
    gsap.to(blob, {
      opacity: 0,
      scaleY: 0.6,
      scaleX: 0.8,
      duration: 0.3,
      ease: 'power2.in',
    });
  }, []);

  // Initialize blob as hidden
  useEffect(() => {
    if (blobRef.current) {
      gsap.set(blobRef.current, { opacity: 0, scaleY: 0.6, scaleX: 0.8 });
    }
  }, []);

  const handleSearchChange = (val) => {
    setSearchVal(val);
    const path = window.location.pathname;
    if (path.startsWith('/products') || path.startsWith('/productsList')) {
      if (val) {
        setSearchParams({ search: val });
      } else {
        searchParams.delete('search');
        setSearchParams(searchParams);
      }
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const path = window.location.pathname;
      const targetPath = path.startsWith('/productsList') ? '/productsList' : '/products';
      navigate(`${targetPath}?search=${encodeURIComponent(searchVal)}`);
    }
  };

  const handleProfileClick = () => {
    const savedUser = localStorage.getItem('ecom_user');
    if (savedUser) {
      navigate('/profile');
    } else {
      navigate('/');
    }
  };

  // NavLink click handler to switch views across all pages
  const handleNavLinkClick = (event, link) => {
    event.preventDefault();
    const path = window.location.pathname;
    const targetPath = path.startsWith('/productsList') ? '/productsList' : '/products';
    navigate(`${targetPath}?filter=${link.filter}`);
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        width: '100%'
      }}
    >
      {/* SVG Goo Filter — hidden, used by the blob */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="goo-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <Container maxWidth="xl">
        {/* Main Navbar Top Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>

          {/* Left: Logo */}
          <BrandLogo size="medium" />

          {/* Center-Right (Laptop Only): Menu Links with Gooey Blob */}
          {!isMobileOrTablet && (
            <Box
              ref={navContainerRef}
              onMouseLeave={handleNavContainerLeave}
              sx={{
                display: 'flex',
                gap: 4,
                ml: 'auto',
                mr: 4,
                position: 'relative',
                alignItems: 'center',
                py: 1,
              }}
            >
              {/* Gooey Blob Element — light dark background */}
              <Box
                ref={blobRef}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  height: 36,
                  borderRadius: '18px',
                  background: '#2A2A2A',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                  filter: 'url(#goo-filter)',
                }}
              />

              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  ref={(el) => (linkRefs.current[index] = el)}
                  href={`/products?filter=${link.filter}`}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  onMouseEnter={() => handleNavLinkEnter(index)}
                  underline="none"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                    px: 1.5,
                    py: 0.5,
                    color: activeNavIndex === index ? '#FFFFFF' : '#1A1A1A',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          )}

          {/* Right: Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
            {showSearch && (
              <TextField
                placeholder="Search art, artists..."
                variant="outlined"
                size="small"
                value={searchVal}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                autoFocus
                sx={{
                  width: { xs: 120, sm: 180, md: 220 },
                  '& .MuiOutlinedInput-root': {
                    height: 32,
                    borderRadius: 1,
                    fontSize: '0.8rem',
                    backgroundColor: '#FAF8F6',
                    '& fieldset': { borderColor: '#E0E0E0' },
                    '&:hover fieldset': { borderColor: '#BDBDBD' },
                    '&.Mui-focused fieldset': { borderColor: '#1A1A1A' }
                  }
                }}
              />
            )}

            {/* Search Icon */}
            <Box
              ref={searchIconRef}
              onClick={() => setShowSearch(!showSearch)}
              onMouseEnter={() => handleIconEnter(searchIconRef, 'search')}
              onMouseLeave={() => handleIconLeave(searchIconRef)}
              sx={{ display: 'inline-flex', cursor: 'pointer', p: 0.5, borderRadius: '50%' }}
            >
              <img
                src={SearchIconImg}
                alt="Search"
                style={{ ...iconStyle, pointerEvents: 'none' }}
              />
            </Box>

            {/* Wishlist Icon */}
            <Badge
              badgeContent={wishlistItems.length}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#E03C3C',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  height: 16,
                  minWidth: 16,
                  padding: '0 4px',
                }
              }}
            >
              <Box
                ref={wishlistIconRef}
                onMouseEnter={() => handleIconEnter(wishlistIconRef, 'wishlist')}
                onMouseLeave={() => handleIconLeave(wishlistIconRef)}
                sx={{ display: 'inline-flex' }}
              >
                <FavoriteBorderIcon
                  sx={{
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    color: '#1A1A1A',
                  }}
                  onClick={() => navigate('/wishlist')}
                />
              </Box>
            </Badge>

            {/* Cart Icon */}
            <Badge
              badgeContent={totalQuantity}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#1A1A1A',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  height: 16,
                  minWidth: 16,
                  padding: '0 4px',
                }
              }}
            >
              <Box
                ref={cartIconRef}
                onClick={() => navigate('/cart')}
                onMouseEnter={() => handleIconEnter(cartIconRef, 'cart')}
                onMouseLeave={() => handleIconLeave(cartIconRef)}
                sx={{ display: 'inline-flex', cursor: 'pointer', p: 0.5, borderRadius: '50%' }}
              >
                <img
                  src={TrolleyIconImg}
                  alt="Cart"
                  style={{ ...iconStyle, pointerEvents: 'none' }}
                />
              </Box>
            </Badge>

            {/* Person Icon */}
            <Box
              ref={personIconRef}
              onClick={handleProfileClick}
              onMouseEnter={() => handleIconEnter(personIconRef, 'default')}
              onMouseLeave={() => handleIconLeave(personIconRef)}
              sx={{ display: 'inline-flex', cursor: 'pointer', p: 0.5, borderRadius: '50%' }}
            >
              <img
                src={PersonIconImg}
                alt="Profile"
                style={{ ...iconStyle, pointerEvents: 'none' }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom Scrollable Navigation Container (Mobile & Tablet View Only) */}
        {isMobileOrTablet && (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              pb: 1.5,
              pt: 0.5,
              webkitOverflowScrolling: 'touch', // Native momentum scrolling for mobile touch
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={`/products?filter=${link.filter}`}
                onClick={(e) => handleNavLinkClick(e, link)}
                underline="none"
                color="text.primary"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  px: 1,
                  cursor: 'pointer'
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomeNavbar;