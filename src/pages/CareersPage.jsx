import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const CareersPage = () => {
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
              Careers
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Join us in shaping the future of art curation and collection.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Our Culture
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  We are a passionate collective of creators, tech engineers, and gallery specialists. We foster a collaborative, remote-friendly environment built on creativity, trust, and continuous design learning.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: '#1A1A1A' }}>
                  Open Opportunities
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1 }}>
                  Find a role that fits your ambition:
                </Typography>
                <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                  <li><strong>Gallery Curator (Coimbatore/Hybrid):</strong> Lead catalog collections, coordinate exhibitions, and manage artist communication.</li>
                  <li><strong>Frontend Developer (React/Vite) (Remote):</strong> Craft fluid, animated e-commerce interfaces using GSAP and Material-UI.</li>
                  <li><strong>Customer Support Specialist (Coimbatore):</strong> Help collectors manage orders and returns.</li>
                </Box>
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

export default CareersPage;
