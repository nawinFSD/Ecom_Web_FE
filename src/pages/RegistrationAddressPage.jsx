// import React from 'react';
import { Box, Container, Grid, Typography, Link, useTheme, useMediaQuery } from '@mui/material';
import BrandLogo from '../components/common/BrandLogo';
import RegistrationAddressForm from '../components/registration/RegistrationAddressForm';

const RegistrationAddressPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      
      {/* Structural Global Navigation Header */}
      <Container maxWidth={false} sx={{ borderBottom: '1px solid #E0E0E0', backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 1100, boxSizing: 'border-box' }}>
        <Box
          sx={{
            py: isMobile ? 1 : isTablet ? 1.5 : 2,
            px: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: isMobile ? 56 : isTablet ? 64 : 72,
            boxSizing: 'border-box'
          }}
        >
          <BrandLogo size="medium" />

          {/* Right Layout Portal Links Context Switch */}
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

      {/* Primary Centered Flexbox Body Frame Panel Context viewport */}
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 3, sm: 5, md: 6 }, pb: { xs: 5, sm: 8, md: 10 }, boxSizing: 'border-box' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <Grid item xs={12} sm={11} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <RegistrationAddressForm />
          </Grid>
          
        </Grid>
      </Container>
      
    </Box>
  );
};

export default RegistrationAddressPage;