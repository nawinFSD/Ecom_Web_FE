import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  IconButton, 
  TextField, 
  Divider, 
  Card, 
  CardContent, 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  CircularProgress,
  Collapse
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Layout Components
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';

// Cart Context
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

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

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isLoading, 
    usingFallback, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  const { user } = useUser();

  const triggerConfetti = () => {
    const colors = ['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#4CAF50', '#FFEB3B', '#FF9800'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.style.position = 'fixed';
      piece.style.width = `${gsap.utils.random(8, 14)}px`;
      piece.style.height = `${gsap.utils.random(8, 14)}px`;
      piece.style.backgroundColor = gsap.utils.random(colors);
      piece.style.left = '50vw';
      piece.style.top = '40vh';
      piece.style.borderRadius = gsap.utils.random(0, 100) > 50 ? '50%' : '2px';
      piece.style.zIndex = 99999;
      piece.style.pointerEvents = 'none';
      document.body.appendChild(piece);

      const angle = gsap.utils.random(240, 300) * (Math.PI / 180);
      const velocity = gsap.utils.random(250, 500);
      const xDest = Math.cos(angle) * velocity;
      const yDest = Math.sin(angle) * velocity;

      gsap.to(piece, {
        x: `+=${xDest}`,
        y: `+=${yDest}`,
        rotation: gsap.utils.random(180, 720),
        duration: gsap.utils.random(0.6, 1.2),
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(piece, {
            y: '+=500',
            opacity: 0,
            rotation: '+=360',
            duration: gsap.utils.random(1.2, 1.8),
            ease: 'power1.in',
            onComplete: () => piece.remove()
          });
        }
      });
    }
  };

  // Auto clear alerts
  useEffect(() => {
    if (couponError) {
      const t = setTimeout(() => setCouponError(''), 4000);
      return () => clearTimeout(t);
    }
  }, [couponError]);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'ART20') {
      setDiscountPercent(20);
      setCouponSuccess('20% Discount applied successfully!');
      setCouponError('');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponSuccess('10% Discount applied successfully!');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try ART20 or WELCOME10');
      setCouponSuccess('');
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCheckoutLoading(false);
    setOrderComplete(true);
    triggerConfetti();
    // Clear cart on backend and state
    await clearCart();
  };

  const handleCloseCheckout = () => {
    setOrderComplete(false);
    setCheckoutOpen(false);
    navigate('/home');
  };

  // Calculations
  const shippingFee = cartSubtotal > 500 ? 0 : (cartItems.length > 0 ? 25 : 0);
  const tax = Math.round(cartSubtotal * 0.08);
  const discountAmount = Math.round(cartSubtotal * (discountPercent / 100));
  const orderTotal = cartSubtotal - discountAmount + shippingFee + tax;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAF8F6' }}>
      <HomeNavbar />

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        
        {/* Fallback Notice Banner */}
        {usingFallback && (
          <Box 
            sx={{ 
              mb: 4, 
              p: 2, 
              backgroundColor: '#FFF2E6', 
              borderLeft: '4px solid #FF8000', 
              color: '#B35900',
              borderRadius: '2px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            ⚠️ Backend server is offline. Operations will run in LocalStorage fallback mode. Run <strong>npm run dev</strong> in the Ecom_BE folder to start database sync.
          </Box>
        )}

        {/* Back Button */}
        <Button 
          startIcon={<KeyboardBackspaceIcon />} 
          onClick={() => navigate('/products')}
          sx={{ 
            color: '#1A1A1A', 
            textTransform: 'none', 
            fontWeight: 600,
            mb: 4,
            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
          }}
        >
          Back to Art Catalog
        </Button>

        <Typography variant="h4" component="h1" fontWeight={800} letterSpacing="-0.02em" sx={{ mb: 5 }}>
          Your Cart
        </Typography>

        {isLoading && cartItems.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 3, 
              backgroundColor: '#FFFFFF', 
              borderRadius: '4px',
              border: '1px solid #E0E0E0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: '#AEAEAE', mb: 3 }} />
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
              Your shopping bag is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360 }}>
              Before you can checkout, you must add some beautiful artworks to your shopping cart.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontWeight: 700,
                borderRadius: '0px',
                px: 5,
                py: 1.5,
                letterSpacing: '0.08em',
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              Explore Collection
            </Button>
          </Box>
        ) : (
          /* Cart Content Layout */
          <Grid container spacing={5}>
            
            {/* Left: Cart Items List */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                {cartItems.map((item) => {
                  const resolvedImg = imageMap[item.imageKey];
                  return (
                    <Box 
                      key={item.productId}
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        p: 2.5,
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#1A1A1A',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
                        }
                      }}
                    >
                      {/* Product Image */}
                      <Box 
                        sx={{ 
                          width: { xs: '100%', sm: 110 }, 
                          height: 110, 
                          backgroundColor: '#F5F5F5',
                          borderRadius: '1px',
                          overflow: 'hidden',
                          mr: { sm: 3 },
                          mb: { xs: 2, sm: 0 },
                          flexShrink: 0
                        }}
                      >
                        <img 
                          src={resolvedImg} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ flexGrow: 1, pr: { xs: 5, sm: 6 } }}>
                        <Typography variant="h6" fontWeight={750} color="text.primary" sx={{ mb: 0.5, lineHeight: 1.2 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          by {item.artist}
                        </Typography>

                        {/* Quantity and Price Row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                          {/* Quantity Selector */}
                          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E0E0E0', borderRadius: '1px' }}>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              sx={{ borderRadius: 0, p: 0.8 }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, fontWeight: 700, fontSize: '0.9rem' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              sx={{ borderRadius: 0, p: 0.8 }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          {/* Price */}
                          <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                            ₹{item.price * item.quantity}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Delete Button */}
                      <IconButton 
                        onClick={() => removeFromCart(item.productId)}
                        sx={{ 
                          position: 'absolute', 
                          top: 16, 
                          right: 16, 
                          color: '#8E8E8E',
                          '&:hover': { color: '#E03C3C', backgroundColor: '#FDF2F2' } 
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            </Grid>

            {/* Right: Order Summary Panel */}
            <Grid item xs={12} lg={4}>
              <Card 
                sx={{ 
                  borderRadius: '2px', 
                  border: '1px solid #E5E5E5', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  backgroundColor: '#FFFFFF',
                  position: 'sticky',
                  top: 96
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 3, letterSpacing: '0.02em' }}>
                    Order Summary
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">₹{cartSubtotal}</Typography>
                    </Box>

                    {discountAmount > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#1B9A5B' }}>
                        <Typography variant="body2">Discount ({discountPercent}%)</Typography>
                        <Typography variant="body2" fontWeight={600}>-₹{discountAmount}</Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Estimated Shipping</Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Estimated Tax (8%)</Typography>
                      <Typography variant="body2" fontWeight={600} color="text.primary">₹{tax}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight={850}>Total</Typography>
                    <Typography variant="h5" fontWeight={850} color="#1A1A1A">₹{orderTotal}</Typography>
                  </Box>

                  {/* Coupon Code Panel */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField 
                        placeholder="Coupon Code" 
                        size="small"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        sx={{ 
                          flexGrow: 1,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '0px',
                            backgroundColor: '#FAF8F6'
                          }
                        }}
                      />
                      <Button 
                        variant="outlined" 
                        onClick={handleApplyCoupon}
                        sx={{ 
                          color: '#1A1A1A', 
                          borderColor: '#1A1A1A', 
                          borderRadius: '0px', 
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          px: 2,
                          '&:hover': {
                            backgroundColor: '#FAF8F6',
                            borderColor: '#1A1A1A'
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                    
                    {/* Coupon Messages */}
                    {couponError && (
                      <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1, fontWeight: 500 }}>
                        {couponError}
                      </Typography>
                    )}
                    {couponSuccess && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#1B9A5B', fontWeight: 600 }}>
                  {couponSuccess}
                      </Typography>
                    )}
                  </Box>

                  {/* Checkout Action */}
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={() => setCheckoutOpen(true)}
                    sx={{ 
                      backgroundColor: '#1A1A1A', 
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      fontWeight: 750,
                      py: 1.8,
                      borderRadius: '0px',
                      boxShadow: 'none',
                      letterSpacing: '0.08em',
                      '&:hover': {
                        backgroundColor: '#333333',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        )}

      </Container>

      {/* Checkout simulated loading / success modal */}
      <Dialog 
        open={checkoutOpen} 
        disableEscapeKeyDown
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && !checkoutLoading) {
            setCheckoutOpen(false);
          }
        }}
        PaperProps={{
          sx: { 
            borderRadius: '16px', 
            p: { xs: 3, sm: 4.5 }, 
            width: '100%', 
            maxWidth: 500,
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        {!orderComplete ? (
          !user ? (
            /* User must be logged in to checkout */
            <>
              <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', pb: 2, px: 0, textAlign: 'center', fontFamily: '"Outfit", sans-serif' }}>
                Sign In Required
              </DialogTitle>
              <DialogContent sx={{ p: 0, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 1, lineHeight: 1.6 }}>
                  Please sign in to your ColorFrame account to place your order and use your saved delivery address.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{
                      backgroundColor: '#1A1A1A',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      py: 1.6,
                      fontWeight: 700,
                      boxShadow: 'none',
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#333333', boxShadow: 'none' }
                    }}
                  >
                    Go to Sign In
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setCheckoutOpen(false)}
                    sx={{ color: '#777777', textTransform: 'none', fontWeight: 600 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </DialogContent>
            </>
          ) : (
            /* Logged in checkout confirmation popup */
            <>
              <DialogTitle sx={{ fontWeight: 850, fontSize: '1.65rem', pb: 0.5, px: 0, fontFamily: '"Outfit", sans-serif', color: '#1A1A1A' }}>
                Confirm Order
              </DialogTitle>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'block', mb: 3.5, fontSize: '0.85rem' }}>
                Please review your saved delivery details below.
              </Typography>

              <DialogContent sx={{ p: 0, overflowY: 'visible' }}>
                {checkoutLoading ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <CircularProgress color="inherit" sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      Processing secure transaction...
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Delivery address display card */}
                    <Box 
                      sx={{ 
                        p: 3, 
                        backgroundColor: '#FAF9F8', 
                        border: '1px solid #EAEAEA', 
                        borderRadius: '12px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.75
                      }}
                    >
                      <Typography variant="caption" fontWeight={800} color="#777777" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                        DELIVERY DETAILS
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                        <Typography variant="body1" fontWeight={750} color="#1A1A1A" sx={{ fontSize: '1.05rem' }}>
                          {user.firstName} {user.lastName}
                        </Typography>
                        
                        <Typography variant="body2" color="#4A4A4A" sx={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
                          {user.addressLine1}
                          {user.addressLine2 ? `, ${user.addressLine2}` : ''}
                          {user.area ? `, ${user.area}` : ''}
                          <br />
                          {user.city}, {user.stateProvince} - {user.pincode}
                          <br />
                          <strong>{user.country}</strong>
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 0.5, borderColor: '#EAEAEA' }} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.8rem', display: 'block' }}>
                          <strong>Phone:</strong> +91 {user.mobile}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666666', fontSize: '0.8rem', display: 'block' }}>
                          <strong>Email:</strong> {user.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', px: 1, lineHeight: 1.5 }}>
                      By confirming, your order will be instantly placed and dispatched to the address listed above.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Button 
                        variant="outlined" 
                        onClick={() => setCheckoutOpen(false)}
                        fullWidth
                        sx={{ 
                          borderRadius: '8px', 
                          py: 1.4, 
                          textTransform: 'none', 
                          fontWeight: 700, 
                          color: '#555555', 
                          borderColor: '#D0D0D0',
                          '&:hover': { borderColor: '#1A1A1A', color: '#1A1A1A', backgroundColor: '#FAF8F6' }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={handleCheckout}
                        fullWidth
                        sx={{ 
                          borderRadius: '8px', 
                          py: 1.4, 
                          textTransform: 'none', 
                          fontWeight: 700, 
                          backgroundColor: '#1A1A1A', 
                          color: '#FFFFFF', 
                          boxShadow: 'none', 
                          '&:hover': { backgroundColor: '#333333', boxShadow: 'none' } 
                        }}
                      >
                        Confirm & Place Order (₹{orderTotal})
                      </Button>
                    </Box>
                  </Box>
                )}
              </DialogContent>
            </>
          )
        ) : (
          <>
            <DialogContent sx={{ pt: 3, px: 0, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: '#1B9A5B', mb: 2 }} />
              <Typography variant="h5" fontWeight={850} sx={{ mb: 1.5 }}>
                Order Completed!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 2 }}>
                Thank you for your purchase. Your mock order has been placed successfully and the database cart has been reset.
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleCloseCheckout}
                fullWidth
                sx={{ 
                  backgroundColor: '#1A1A1A', 
                  color: '#FFFFFF',
                  borderRadius: '0px',
                  py: 1.5,
                  fontWeight: 700,
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#333333', boxShadow: 'none' }
                }}
              >
                Go Back to Store
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>

      <HomeFooter />
    </Box>
  );
};

export default CartPage;
