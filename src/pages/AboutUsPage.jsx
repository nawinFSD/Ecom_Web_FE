import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const AboutUsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      <HomeNavbar />

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 6, md: 10 }, backgroundColor: '#FAF8F6' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.02)'
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontFamily: 'serif',
                fontWeight: 600,
                mb: 2,
                color: '#1A1A1A',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Connecting exceptional local artists with modern collectors since 2024.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  At ColorFrame, we believe that art is a medium of expression that enriches daily lives. Our platform serves as a bridge, allowing local talent, photographers, and independent painters in India to display their premium expressions directly to collectors.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  A Legacy of Curation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Starting as a wedding and candid photography space in Coimbatore, we have grown into a curated fine art hub. Every single canvas, print, or sculpture featured in our galleries undergoes meticulous verification of texture and quality.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      <FloatingActions />
      <HomeFooter />
    </Box>
  );
};

export default AboutUsPage;
