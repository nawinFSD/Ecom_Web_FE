// import React from 'react';
import { Box, Typography, Button, Select, MenuItem, Pagination, PaginationItem } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

// Asset Imports
import Product1 from '../../assets/product/product1.png';
import Product2 from '../../assets/product/product2.png';
import Product3 from '../../assets/product/product3.png';
import Product4 from '../../assets/product/product4.png';
import Product5 from '../../assets/product/product5.png';
import Product6 from '../../assets/product/product6.png';
import Product7 from '../../assets/product/product7.png';
import Product8 from '../../assets/product/product8.png';
import Product9 from '../../assets/product/product9.png';
import Product10 from '../../assets/product/product10.png';
import Product11 from '../../assets/product/product11.png';
import Product12 from '../../assets/product/product12.png';

import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

// Custom Star Rating implementation using your assets
const ListStarRating = ({ rating }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, mr: 0.5 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <img 
        key={star} 
        src={star <= Math.floor(rating) ? BrightStar : BrightlessStar} 
        alt="star" 
        style={{ width: 10, height: 10, objectFit: 'contain' }} 
      />
    ))}
  </Box>
);

// We use the same data, but mapped to the horizontal layout
const productsData = [
  { id: 1, img: Product1, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 2, img: Product2, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 3, img: Product3, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE', outOfStock: true },
  { id: 4, img: Product4, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 5, img: Product5, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 6, img: Product6, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380 },
  { id: 7, img: Product7, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 8, img: Product8, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 9, img: Product9, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE', outOfStock: true },
  { id: 10, img: Product10, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 11, img: Product11, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' },
  { id: 12, img: Product12, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 290, oldPrice: 380, badge: 'SALE' }
];

const ProductListView = () => {
  return (
    <Box sx={{ width: '100%' }}>
      
      {/* Top Controls Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500 }}>Paintings</Typography>
          <Typography variant="body2" color="text.secondary">(12 products)</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">Sort by:</Typography>
            <Select defaultValue="Popularity" size="small" sx={{ fontSize: '0.85rem', height: 32, borderRadius: 0, '& fieldset': { borderColor: '#E0E0E0' } }}>
              <MenuItem value="Popularity">Popularity</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', border: '1px solid #E0E0E0', borderRadius: 1, overflow: 'hidden' }}>
            {/* Grid Icon is now grey (inactive) */}
            <Box sx={{ backgroundColor: '#FFFFFF', color: '#757575', p: 0.5, cursor: 'pointer', display: 'flex' }}>
              <GridViewIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
            {/* List Icon is now black (active) */}
            <Box sx={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', p: 0.5, cursor: 'pointer', display: 'flex' }}>
              <ViewListIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product List Vertical Stack */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {productsData.map((prod) => (
          <Box 
            key={prod.id} 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              border: '1px solid #E0E0E0', 
              p: 2, 
              backgroundColor: '#FFFFFF',
              gap: { xs: 2, sm: 4 },
              position: 'relative'
            }}
          >
            {/* Left Box: Image Frame */}
            <Box sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 240, sm: 180 }, flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <img src={prod.img} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {prod.outOfStock && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 500 }}>Out of Stock</Typography>
                </Box>
              )}
            </Box>

            {/* Middle Box: Content & Details */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { sm: 1 } }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.5 }}>{prod.title}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{prod.artist}</Typography>
              
              {/* Star Rating Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <ListStarRating rating={prod.rating} />
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{prod.rating}</Typography>
              </Box>

              {/* Badge */}
              {prod.badge && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'inline-block', backgroundColor: '#1A1A1A', px: 1, py: 0.25, borderRadius: 0.5 }}>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: '#FFFFFF' }}>{prod.badge}</Typography>
                  </Box>
                </Box>
              )}

              {/* Pricing */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 'auto' }}>
                <Typography variant="body1" fontWeight={700}>${prod.price}</Typography>
                {prod.oldPrice && (
                  <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>${prod.oldPrice}</Typography>
                )}
              </Box>
            </Box>

            {/* Right Box: Floating Layout Actions */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'row', sm: 'column' }, 
                justifyContent: 'space-between', 
                alignItems: { xs: 'center', sm: 'flex-end' },
                mt: { xs: 1, sm: 0 },
                py: { sm: 1 }
              }}
            >
              {/* Top Right: Icons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '50%', p: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { backgroundColor: '#F5F5F5' } }}>
                  <FavoriteBorderIcon sx={{ fontSize: '1.1rem', color: '#757575' }} />
                </Box>
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '50%', p: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { backgroundColor: '#F5F5F5' } }}>
                  <VisibilityOutlinedIcon sx={{ fontSize: '1.1rem', color: '#757575' }} />
                </Box>
                <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '50%', p: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { backgroundColor: '#F5F5F5' } }}>
                  <BarChartOutlinedIcon sx={{ fontSize: '1.1rem', color: '#757575' }} />
                </Box>
              </Box>

              {/* Bottom Right: Add to Cart */}
              <Button 
                variant="contained" 
                disabled={prod.outOfStock}
                sx={{ 
                  backgroundColor: prod.outOfStock ? '#E0E0E0' : '#1A1A1A', 
                  color: prod.outOfStock ? '#9E9E9E' : '#FFFFFF', 
                  textTransform: 'none', 
                  borderRadius: 0, 
                  fontSize: '0.8rem', 
                  px: 2.5, 
                  py: 1, 
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: prod.outOfStock ? '#E0E0E0' : '#333333', boxShadow: 'none' } 
                }}
              >
                Add to Cart
              </Button>
            </Box>

          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Pagination 
          count={10} 
          shape="rounded" 
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                borderRadius: 0,
                border: item.type === 'page' ? '1px solid #E0E0E0' : 'none',
                mx: 0.5,
                '&.Mui-selected': { backgroundColor: '#000000', color: '#FFFFFF', '&:hover': { backgroundColor: '#222222' } }
              }}
            />
          )}
        />
      </Box>

    </Box>
  );
};

export default ProductListView;