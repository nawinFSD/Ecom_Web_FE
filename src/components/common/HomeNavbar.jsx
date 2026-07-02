// import React from 'react';
import { Box, Container, Link, useTheme, useMediaQuery } from '@mui/material';
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

  const iconStyle = {
    width: 20,
    height: 20,
    cursor: 'pointer',
    objectFit: 'contain'
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
                  href={`#₹{link.id}`}
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
            <img src={SearchIconImg} alt="Search" style={iconStyle} />
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
                href={`#₹{link.id}`}
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