import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Card, CardContent, Button, Divider, Avatar } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { useUser } from '../context/UserContext';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';

// Product Image Assets Mapping
import Draw1 from '../assets/product/draw1.jpg';
import Draw2 from '../assets/product/draw2.jpg';
import Draw3 from '../assets/product/draw3.jpg';
import Draw4 from '../assets/product/draw4.jpg';
import Draw5 from '../assets/product/draw5.png';
import Draw6 from '../assets/product/draw6.png';
import Draw7 from '../assets/product/draw7.jpg';
import Draw8 from '../assets/product/draw8.jpg';
import Draw9 from '../assets/product/draw9.png';
import Draw10 from '../assets/product/draw10.png';
import Draw11 from '../assets/product/draw11.png';
import Draw12 from '../assets/product/draw12.png';
import Draw13 from '../assets/product/draw13.png';
import Draw14 from '../assets/product/draw14.png';
import Draw15 from '../assets/product/draw15.jpg';

import Paint1 from '../assets/product/paint1.jpg';
import Paint2 from '../assets/product/paint2.jpg';
import Paint3 from '../assets/product/paint3.jpg';
import Paint4 from '../assets/product/paint4.jpg';
import Paint5 from '../assets/product/paint5.jpg';
import Paint6 from '../assets/product/paint6.jpg';
import Paint7 from '../assets/product/paint7.jpg';
import Paint8 from '../assets/product/paint8.jpg';
import Paint9 from '../assets/product/paint9.jpg';
import Paint10 from '../assets/product/paint10.jpg';
import Paint11 from '../assets/product/paint11.jpg';
import Paint12 from '../assets/product/paint12.jpg';
import Paint13 from '../assets/product/paint13.jpg';
import Paint14 from '../assets/product/paint14.jpg';
import Paint15 from '../assets/product/paint15.jpg';

import Sculp1 from '../assets/product/sculp1.jpg';
import Sculp2 from '../assets/product/sculp2.png';
import Sculp3 from '../assets/product/sculp3.jpg';
import Sculp4 from '../assets/product/sculp4.jpg';
import Sculp5 from '../assets/product/sculp5.jpg';
import Sculp6 from '../assets/product/sculp6.jpg';
import Sculp7 from '../assets/product/sculp7.jpg';
import Sculp8 from '../assets/product/sculp8.jpg';
import Sculp9 from '../assets/product/sculp9.jpg';
import Sculp10 from '../assets/product/sculp10.jpg';
import Sculp11 from '../assets/product/sculp11.jpg';
import Sculp12 from '../assets/product/sculp12.jpg';
import Sculp13 from '../assets/product/sculp13.jpg';
import Sculp14 from '../assets/product/sculp14.jpg';
import Sculp15 from '../assets/product/sculp15.jpg';

const imageMap = {
  draw1: Draw1, draw2: Draw2, draw3: Draw3, draw4: Draw4, draw5: Draw5, draw6: Draw6, draw7: Draw7, draw8: Draw8, draw9: Draw9, draw10: Draw10, draw11: Draw11, draw12: Draw12, draw13: Draw13, draw14: Draw14, draw15: Draw15,
  paint1: Paint1, paint2: Paint2, paint3: Paint3, paint4: Paint4, paint5: Paint5, paint6: Paint6, paint7: Paint7, paint8: Paint8, paint9: Paint9, paint10: Paint10, paint11: Paint11, paint12: Paint12, paint13: Paint13, paint14: Paint14, paint15: Paint15,
  sculp1: Sculp1, sculp2: Sculp2, sculp3: Sculp3, sculp4: Sculp4, sculp5: Sculp5, sculp6: Sculp6, sculp7: Sculp7, sculp8: Sculp8, sculp9: Sculp9, sculp10: Sculp10, sculp11: Sculp11, sculp12: Sculp12, sculp13: Sculp13, sculp14: Sculp14, sculp15: Sculp15
};

const ProfilePage = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Load orders history based on logged-in user email
  useEffect(() => {
    if (user && user.email) {
      const orderKey = `ecom_orders_${user.email}`;
      const savedOrders = localStorage.getItem(orderKey);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error('Failed to parse order history', e);
        }
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAF8F6' }}>
      <HomeNavbar />

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h4" 
          fontWeight={850} 
          sx={{ mb: 6, letterSpacing: '-0.02em', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}
        >
          My Profile
        </Typography>

        <Grid container spacing={5}>
          {/* Left Side: Personal Details Card */}
          <Grid item xs={12} lg={4}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: '16px', 
                border: '1px solid #EAEAEA', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                p: 4
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar 
                  sx={{ 
                    width: 72, 
                    height: 72, 
                    backgroundColor: '#1A1A1A', 
                    color: '#FFFFFF', 
                    fontSize: '2rem', 
                    fontWeight: 700,
                    mb: 2 
                  }}
                >
                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <Typography variant="h6" fontWeight={750} sx={{ color: '#1A1A1A' }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Personal Info fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                
                {/* Email */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <MailIcon sx={{ color: '#777777', mt: 0.25 }} size="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                      EMAIL
                    </Typography>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Phone */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <PhoneAndroidIcon sx={{ color: '#777777', mt: 0.25 }} size="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                      PHONE
                    </Typography>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      +91 {user.mobile}
                    </Typography>
                  </Box>
                </Box>

                {/* Language */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <TranslateIcon sx={{ color: '#777777', mt: 0.25 }} size="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                      PREFERRED LANGUAGE
                    </Typography>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      {user.language || 'English'}
                    </Typography>
                  </Box>
                </Box>

                {/* Address */}
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <LocationOnIcon sx={{ color: '#777777', mt: 0.25 }} size="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                      SHIPPING ADDRESS ({user.addressType || 'Home'})
                    </Typography>
                    <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ lineHeight: 1.5 }}>
                      {user.addressLine1}
                      {user.addressLine2 ? `, ${user.addressLine2}` : ''}
                      {user.area ? `, ${user.area}` : ''}
                      <br />
                      {user.city}, {user.stateProvince} - {user.pincode}
                      <br />
                      <strong>{user.country || 'India'}</strong>
                    </Typography>
                  </Box>
                </Box>

              </Box>

              <Divider sx={{ my: 4 }} />

              <Button 
                variant="outlined" 
                onClick={handleLogout}
                fullWidth
                sx={{ 
                  borderRadius: '8px', 
                  py: 1.3, 
                  textTransform: 'none', 
                  fontWeight: 700, 
                  color: '#E03C3C', 
                  borderColor: '#FADBD8',
                  backgroundColor: '#FDEDEC',
                  '&:hover': { borderColor: '#E03C3C', backgroundColor: '#FADBD8' }
                }}
              >
                Log Out
              </Button>
            </Card>
          </Grid>

          {/* Right Side: Purchases / Order History */}
          <Grid item xs={12} lg={8}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: '16px', 
                border: '1px solid #EAEAEA', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                p: 4
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight={800} 
                sx={{ mb: 4, fontFamily: '"Outfit", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Order History ({orders.length})
              </Typography>

              {orders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <LocalMallIcon sx={{ fontSize: 48, color: '#BDBDBD', mb: 2 }} />
                  <Typography variant="body1" fontWeight={700} sx={{ mb: 1, color: '#555555' }}>
                    No orders placed yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Browse our gallery collections to find your perfect artwork.
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/products')}
                    sx={{ 
                      backgroundColor: '#1A1A1A', 
                      color: '#FFFFFF', 
                      borderRadius: '8px',
                      px: 4,
                      py: 1.2,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: '#333333', boxShadow: 'none' } 
                    }}
                  >
                    Explore Artworks
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {orders.map((order, idx) => (
                    <Box 
                      key={order.orderId || idx}
                      sx={{ 
                        border: '1px solid #EAEAEA', 
                        borderRadius: '12px',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Order card header details */}
                      <Box 
                        sx={{ 
                          p: 2.5, 
                          backgroundColor: '#FAF9F8', 
                          borderBottom: '1px solid #EAEAEA',
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          gap: 2,
                          alignItems: 'center'
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: { xs: 2.5, sm: 4 } }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                              ORDER ID
                            </Typography>
                            <Typography variant="body2" fontWeight={700}>
                              #{order.orderId}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                              DATE
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {order.date}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                              TOTAL PAID
                            </Typography>
                            <Typography variant="body2" fontWeight={700} color="#1A1A1A">
                              ₹{order.total}
                            </Typography>
                          </Box>
                        </Box>

                        <Box 
                          sx={{ 
                            px: 2, 
                            py: 0.5, 
                            backgroundColor: '#E8F5E9', 
                            color: '#2E7D32',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          Delivered
                        </Box>
                      </Box>

                      {/* Order Items list */}
                      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {order.items.map((item, itemIdx) => (
                          <Grid container spacing={2} key={itemIdx} alignItems="center">
                            <Grid item xs={2} sm={1.5} md={1.2}>
                              <Box 
                                sx={{ 
                                  width: '100%', 
                                  aspectRatio: '1/1', 
                                  backgroundColor: '#F5F5F5',
                                  borderRadius: '6px',
                                  overflow: 'hidden'
                                }}
                              >
                                <img 
                                  src={imageMap[item.imageKey]} 
                                  alt={item.title} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={10} sm={10.5} md={11.8}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                                <Box>
                                  <Typography variant="body2" fontWeight={750}>
                                    {item.title}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    By {item.artist}
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" fontWeight={600}>
                                    ₹{item.price}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Qty: {item.quantity}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>

      <HomeFooter />
    </Box>
  );
};

export default ProfilePage;
