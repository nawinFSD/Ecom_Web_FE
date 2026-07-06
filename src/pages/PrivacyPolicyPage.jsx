import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const PrivacyPolicyPage = () => {
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
              Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Last Updated: July 2, 2026
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  1. Introduction
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Welcome to ColorFrame. We value your trust and are committed to protecting your personal information. This Privacy Policy describes how we collect, use, share, and safeguard your data when you visit our website or interact with our services.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  2. Information We Collect
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
                  We may collect personal data directly from you or automatically during your visits:
                </Typography>
                <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                  <li><strong>Personal Identifier:</strong> Name, email address, phone number, and mailing address.</li>
                  <li><strong>Commercial Data:</strong> Order details, purchase history, and billing records.</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, operating system, and pages viewed.</li>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  3. How We Use Information
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
                  We process your information to deliver premium art and photography services, specifically:
                </Typography>
                <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                  <li>To fulfill, ship, and verify orders or gallery bookings.</li>
                  <li>To communicate customer service updates, confirmations, or promotions.</li>
                  <li>To optimize, secure, and debug our website experience.</li>
                </Box>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  4. Cookies & Tracking
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  We utilize cookies and pixel tags to analyze navigation trends, recognize user preferences, and remember items placed in your shopping cart. You can customize cookie preferences through your web browser preferences.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  5. Third-Party Sharing
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  ColorFrame does not sell your personal data. We share details only with trusted shipping partners, payment processors, and analytics providers necessary to support core e-commerce interactions.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  6. Contact Us
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  If you have questions about this policy or wish to exercise your data rights, please contact our support team at <strong>support@ColorFrame.com</strong>.
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

export default PrivacyPolicyPage;
