import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Link, useTheme, useMediaQuery, TextField } from '@mui/material';
import BrandLogo from './BrandLogo';

// Asset Imports
import SearchIconImg from '../../assets/home/search-icon.png';
import TrolleyIconImg from '../../assets/home/trolly-icon.png';
import PersonIconImg from '../../assets/home/person-icon.png';

// Define the links and their corresponding HTML element IDs
const navLinks = [
  { name: 'PAINTINGS', id: 'paintings-section' },
  { name: 'DRAWINGS', id: 'drawings-section' },
  { name: 'SCULPTURE', id: 'sculpture-section' },
  { name: 'ARTISTS', id: 'artists-section' }
];

const HomeNavbar = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearch, setShowSearch] = useState(!!searchParams.get('search'));
  const [searchVal, setSearchVal] = useState(searchParams.get('search') || '');

  const iconStyle = {
    width: 20,
    height: 20,
    cursor: 'pointer',
    objectFit: 'contain'
  };

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

  // Smooth scroll handler targeting the center of the viewport
  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Centers the targeted element on the screen
      });
    }
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
      <Container maxWidth="xl">
        {/* Main Navbar Top Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>

          {/* Left: Logo */}
          <BrandLogo size="medium" />

          {/* Center-Right (Laptop Only): Menu Links */}
          {!isMobileOrTablet && (
            <Box sx={{ display: 'flex', gap: 4, ml: 'auto', mr: 4 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  underline="none"
                  color="text.primary"
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    '&:hover': { color: 'text.secondary' }
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
            <img 
              src={SearchIconImg} 
              alt="Search" 
              style={iconStyle} 
              onClick={() => setShowSearch(!showSearch)}
            />
            <img src={TrolleyIconImg} alt="Cart" style={iconStyle} />
            <img src={PersonIconImg} alt="Profile" style={iconStyle} />
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
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
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