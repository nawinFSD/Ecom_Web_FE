import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const ShippingInfoPage = () => {
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
              Shipping Info
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Learn more about how we package, handle, and deliver your premium artworks.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Packaging with Care
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  All delicate paintings and sketches are wrapped in acid-free tissue paper, layered inside bubble wrap casing, and shipped in sturdy multi-layered cardboard boxes or protective wooden crates.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Delivery Timelines
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
                  Estimated times depend on framing requirements and location:
                </Typography>
                <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                  <li><strong>Domestic Shipping (India):</strong> 4 to 7 business days.</li>
                  <li><strong>International Shipping:</strong> 10 to 18 business days.</li>
                  <li><strong>Custom Framed Artworks:</strong> Add 3 business days for mounting.</li>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Insurance & Tracking
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  To ensure complete security, every single shipment is fully insured during transit. A direct signature is required upon delivery for premium artworks.
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

export default ShippingInfoPage;
