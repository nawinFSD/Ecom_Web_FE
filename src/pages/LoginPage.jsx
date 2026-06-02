// import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import BrandLogo from '../components/common/BrandLogo';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  const theme = useTheme();
  // Responsiveness checks
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Header height responsiveness
  const getHeaderHeight = () => {
    if (isMobile) return 56;
    if (isTablet) return 64;
    return 72; // laptop/desktop
  };

  // Header padding responsiveness
  const getHeaderPadding = () => {
    if (isMobile) return theme.spacing(1, 2);
    if (isTablet) return theme.spacing(1.5, 3);
    return theme.spacing(2, 4); // laptop/desktop
  };

  // Signup text size and text responsiveness for smaller screens
  const getSignupTypography = () => {
    if (isMobile) {
      return {
        textVariant: 'caption',
        linkVariant: 'caption',
        text: '', // Hide question on very small screens to keep clean
        linkText: 'Sign Up',
      };
    }
    return {
      textVariant: 'body2',
      linkVariant: 'body2',
      text: "Don't have an account?",
      linkText: 'Sign Up',
    };
  };

  const { textVariant, linkVariant, text, linkText } = getSignupTypography();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      
      {/* Header Container - Fixed top on all devices, with responsive styling */}
      <Container maxWidth={false} sx={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 1100, boxSizing: 'border-box' }}>
        <Box
          sx={{
            py: getHeaderPadding(),
            px: { xs: 2, md: 4 }, // consistent horizontal padding
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: getHeaderHeight(),
            boxSizing: 'border-box'
          }}
        >
          {/* Top-Left: Asset-Based Logo & Name (responsive) */}
          <BrandLogo size="medium" />

          {/* Top-Right: Sign Up Text (responsive) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {text && (
              <Typography variant={textVariant} color="text.secondary" sx={{ letterSpacing: '0.01em', fontSize: isTablet ? '0.8rem' : '0.875rem' }}>
                {text}
              </Typography>
            )}
            <Link href="/create-account" variant={linkVariant} color="primary" fontWeight={600} underline="none" sx={{ '&:hover': { color: 'primary.dark' }, fontSize: isTablet ? '0.8rem' : '0.875rem' }}>
              {linkText}
            </Link>
          </Box>
        </Box>
      </Container>

      {/* Main Content Area - Responsive centering & padding */}
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 4, sm: 6, md: 8 }, pb: { xs: 6, sm: 10, md: 12 }, boxSizing: 'border-box' }}>
        <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          {/* Centered Login Form Content (responsive width & card padding) */}
          <Grid item xs={11} sm={9} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <LoginForm />
          </Grid>
          
        </Grid>
      </Container>
      
    </Box>
  );
};

export default LoginPage;