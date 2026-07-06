import { Box, Container, Typography, Paper, Divider, Button, TextField, Grid } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const ContactUsPage = () => {
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
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Get in touch with the ColorFrame team or visit our Coimbatore gallery space.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Our Gallery Location
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                  ColorFrame Gallery<br />
                  102, Avinashi Road,<br />
                  Coimbatore, Tamil Nadu - 641018
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  <strong>Email:</strong> support@ColorFrame.com<br />
                  <strong>Phone:</strong> +91 98765 43210
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Send a Message
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField size="small" placeholder="Your Name" fullWidth variant="outlined" />
                  <TextField size="small" placeholder="Email Address" fullWidth variant="outlined" />
                  <TextField size="small" placeholder="Your Message" multiline rows={4} fullWidth variant="outlined" />
                  <Button variant="contained" sx={{ backgroundColor: '#000000', color: '#FFFFFF', borderRadius: 0, textTransform: 'none', '&:hover': { backgroundColor: '#333333' } }}>
                    Send Message
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <FloatingActions />
      <HomeFooter />
    </Box>
  );
};

export default ContactUsPage;
