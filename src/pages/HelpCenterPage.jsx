import { Box, Container, Typography, Paper, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const HelpCenterPage = () => {
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
              Help Center
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              How can we assist you today? Find answers to frequently asked questions.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Accordion sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>How do I track my art shipment?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Once your order is processed and handed off to our carrier partners, you will receive a tracking link via email. You can also view shipping status in your customer profile.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>What payment methods do you accept?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    We support major credit cards (Visa, MasterCard, Amex), UPI transactions, Net Banking, and secure checkout through standard gateways.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Can I modify or cancel my order?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Orders can be modified or cancelled within 2 hours of placement. Because each painting is carefully packed and secured, cancel requests cannot be handled after shipping labels are printed.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>Do you offer custom framing?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Yes! You can contact us for custom framing options, choice of glass (UV protect, anti-glare), and coordinate mounts matching your wall styling.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Paper>
        </Container>
      </Box>

      <FloatingActions />
      <HomeFooter />
    </Box>
  );
};

export default HelpCenterPage;
