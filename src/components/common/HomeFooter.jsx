import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Asset Imports
import FbIcon from '../../assets/product/fb-icon.png';
import InstaIcon from '../../assets/product/insta-icon.png';
import XIcon from '../../assets/home/x-icon.png';
import LogoAsset from '../../assets/home/Logo.png'; 

const footerLinks = [
  {
    title: 'Shop',
    links: ['Paintings', 'Sculptures', 'Photography', 'Digital Art']
  },
  {
    title: 'Support',
    links: ['Help Center', 'Shipping Info', 'Returns', 'Contact Us']
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog']
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service']
  }
];

const HomeFooter = () => {
  const socialIconStyle = {
    width: 25,
    height: 25,
    cursor: 'pointer',
    objectFit: 'contain'
  };

  return (
    <Box sx={{ backgroundColor: '#F9FAFB', pt: { xs: 6, md: 8 }, pb: 4, width: '100%', borderTop: '1px solid #E0E0E0' }}>
      <Container maxWidth="xl">
        
        <Grid container spacing={14} sx={{ mb: 6 }}>
          
          {/* Left Column Profile Branding Info Column */}
          <Grid item xs={12} md={4} sx={{ pr: { md: 6 } }}>
            {/* Embedded PureFrame Text Header Row approximation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
               <img src={LogoAsset} alt="PureFrame Logo" style={{ width: '10%', height: '10%', objectFit: 'contain' }} />
              <Typography variant="body1" fontWeight={700} color="text.primary">
                PureFrame
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, maxWidth: 320, textAlign:'left'}}>
              Capturing eternal moments with passion and creativity. Your trusted partner for wedding and candid photography in Coimbatore.
            </Typography>

            {/* Target Social Links Block Grid Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black', borderRadius:'5px' }}>
                <img src={FbIcon} alt="Facebook Portal Trigger" style={socialIconStyle} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black', borderRadius:'5px'}}>
                <img src={InstaIcon} alt="Instagram Portal Trigger" style={socialIconStyle} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black', borderRadius:'5px' }}>
                <img src={XIcon} alt="X Twitter Portal Trigger" style={socialIconStyle} />
              </Box>
            </Box>
          </Grid>

          {/* Right Columns: Nested Sub-Navigation Link Column Lists */}
          <Grid item xs={12} md={10}>
            <Grid container spacing={{ xs: 10, sm: 12 }}>
              {footerLinks.map((col) => (
                <Grid item xs={8} sm={4} key={col.title}>
                  <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ mb: 2.5, letterSpacing: '0.10em' }}>
                    {col.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {col.links.map((item) => {
                      const routeMap = {
                        'Privacy Policy': '/privacy',
                        'Terms of Service': '/terms',
                        'Help Center': '/help-center',
                        'Shipping Info': '/shipping-info',
                        'Returns': '/returns',
                        'Contact Us': '/contact-us',
                        'About Us': '/about-us',
                        'Careers': '/careers',
                        'Press': '/press',
                        'Blog': '/blog'
                      };
                      const isRouterLink = Object.prototype.hasOwnProperty.call(routeMap, item);
                      const linkHref = routeMap[item] || '#';
                      
                      const isShopLink = col.title === 'Shop';
                      const shopIdMap = {
                        'Paintings': 'paintings-section',
                        'Sculptures': 'sculpture-section',
                        'Photography': 'photography-section',
                        'Digital Art': 'digital-art-section'
                      };
                      const shopHref = isShopLink ? `/home#${shopIdMap[item]}` : linkHref;

                      return (
                        <Link 
                          key={item} 
                          component={(isRouterLink || isShopLink) ? RouterLink : 'a'}
                          to={(isRouterLink || isShopLink) ? shopHref : undefined}
                          href={(isRouterLink || isShopLink) ? undefined : '#'}
                          onClick={(e) => {
                            if (isShopLink) {
                              const targetId = shopIdMap[item];
                              const element = document.getElementById(targetId);
                              if (element) {
                                e.preventDefault();
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }
                          }}
                          underline="none" 
                          color="text.secondary" 
                          sx={{ fontSize: '0.85rem', '&:hover': { color: 'text.primary' } }}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

        </Grid>

        <Divider sx={{ borderColor: '#E5E7EB', mb: 3 }} />

        {/* Center-Aligned Copyright Notice Row */}
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.01em' }}>
          © 2024 PureFrame. All rights reserved.
        </Typography>

      </Container>
    </Box>
  );
};

export default HomeFooter;