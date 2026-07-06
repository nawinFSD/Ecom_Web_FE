import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const PressPage = () => {
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
              Press & Media
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Discover media resources, gallery announcements, and news releases.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  ColorFrame in the News
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Our gallery and curation process have been featured in regional design magazines, noting our dedication to bringing localized, independent Coimbatore painters to international collections.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Media Contact
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  For press inquiries, high-resolution media resources, or scheduling interviews with our lead curators, please contact us at <strong>press@ColorFrame.com</strong>.
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

export default PressPage;
