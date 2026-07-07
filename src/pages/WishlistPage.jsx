import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  IconButton, 
  Divider
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

// Layout Components
import HomeNavbar from '../components/common/HomeNavbar';
import HomeFooter from '../components/common/HomeFooter';

// Context Hooks
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

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

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAF8F6' }}>
      <HomeNavbar />

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        
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
          Back to Store
        </Button>

        <Typography variant="h4" component="h1" fontWeight={850} letterSpacing="-0.02em" sx={{ mb: 5 }}>
          My Wishlist
        </Typography>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
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
            <FavoriteIcon sx={{ fontSize: 64, color: '#F8B7B7', mb: 3 }} />
            <Typography variant="h5" fontWeight={750} color="text.primary" sx={{ mb: 1 }}>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360 }}>
              Keep track of the artworks you love by clicking the heart icon on any piece.
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
          /* Wishlist Items Grid */
          <Grid container spacing={3}>
            {wishlistItems.map((item) => {
              const displayImg = item.img || imageMap[item.imageKey];
              const cartItem = cartItems.find((ci) => ci.productId === item.id);
              const quantityInCart = cartItem ? cartItem.quantity : 0;

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Box
                    sx={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EAEAEA',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      '&:hover': {
                        boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
                        transform: 'translateY(-4px)',
                        borderColor: '#BBB',
                      }
                    }}
                  >
                    {/* Trash remove icon floating on top left */}
                    <IconButton
                      onClick={() => toggleWishlist(item)}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#E03C3C',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        '&:hover': { backgroundColor: '#FFFFFF', color: '#B32D2D' }
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    {/* Image Area */}
                    <Box sx={{ width: '100%', height: 260, overflow: 'hidden', backgroundColor: '#F0F0F0' }}>
                      <img 
                        src={displayImg} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </Box>

                    {/* Text Details */}
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight={750} color="text.primary" sx={{ mb: 0.5, lineHeight: 1.2 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        by {item.artist}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                        {item.medium}
                      </Typography>

                      <Divider sx={{ my: 1.5 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Typography variant="subtitle1" fontWeight={850} color="text.primary">
                          ₹{item.price}
                        </Typography>
                        
                        <Button
                          variant="contained"
                          disabled={item.outOfStock}
                          onClick={(e) => handleAddToCart(e, item)}
                          startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: '0.9rem' }} />}
                          sx={{
                            backgroundColor: '#1A1A1A',
                            color: '#FFFFFF',
                            borderRadius: '0px',
                            px: 1.5,
                            py: 0.8,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            boxShadow: 'none',
                            textTransform: 'uppercase',
                            '&:hover': { backgroundColor: '#333333', boxShadow: 'none' }
                          }}
                        >
                          {item.outOfStock ? 'Out' : (quantityInCart > 0 ? `Added (${quantityInCart})` : 'Add')}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}

      </Container>
      <HomeFooter />
    </Box>
  );
};

export default WishlistPage;
