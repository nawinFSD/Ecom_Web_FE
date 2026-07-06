import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const ReturnsPage = () => {
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
              Returns & Refunds
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Details on our return conditions, damage policies, and refund cycles.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Return Window
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  We want you to love your art. If you are not entirely satisfied, you can initiate a return request within <strong>7 days</strong> of delivery. The art piece must be in its original custom packaging and free of modifications.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Transit Damage Policy
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  If the package arrives damaged, please document the package with photos and notify our gallery immediately at <strong>returns@ColorFrame.com</strong>. We will arrange a courier pickup and issue a full refund or exchange.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Non-Returnable Items
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Please note that custom-commissioned prints, specialized framing selections, and sale items are final sales and cannot be returned unless transit damage has occurred.
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

export default ReturnsPage;
