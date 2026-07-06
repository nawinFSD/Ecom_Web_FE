// import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import BrandLogo from '../components/common/BrandLogo';
import RegistrationPersonalForm from '../components/registration/RegistrationPersonalForm';

const RegistrationPersonalPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const getHeaderHeight = () => {
    if (isMobile) return 56;
    if (isTablet) return 64;
    return 72;
  };

  const getHeaderPadding = () => {
    if (isMobile) return theme.spacing(1, 2);
    if (isTablet) return theme.spacing(1.5, 3);
    return theme.spacing(2, 4);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      
      {/* Header Container */}
      <Container maxWidth={false} sx={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 1100, boxSizing: 'border-box' }}>
        <Box
          sx={{
            py: getHeaderPadding(),
            px: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: getHeaderHeight(),
            boxSizing: 'border-box'
          }}
        >
          <BrandLogo size="medium" />

          {/* Top-Right: Sign In Text */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {!isMobile && (
              <Typography variant="body2" color="text.secondary" sx={{ letterSpacing: '0.01em', fontSize: isTablet ? '0.8rem' : '0.875rem' }}>
                Already have an account?
              </Typography>
            )}
            <Link href="/" variant="body2" color="primary" fontWeight={600} underline="none" sx={{ '&:hover': { color: 'primary.dark' }, fontSize: isTablet ? '0.8rem' : '0.875rem' }}>
              Sign In
            </Link>
          </Box>
        </Box>
      </Container>

      {/* Main Content Area */}
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 4, sm: 6, md: 8 }, pb: { xs: 6, sm: 10, md: 12 }, boxSizing: 'border-box' }}>
        <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <Grid item xs={11} sm={10} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <RegistrationPersonalForm />
          </Grid>
          
        </Grid>
      </Container>
      
    </Box>
  );
};

export default RegistrationPersonalPage;