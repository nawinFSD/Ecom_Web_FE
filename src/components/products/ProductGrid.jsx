import { useState } from 'react';
import { Box, Grid, Typography, Button, Select, MenuItem, Pagination, PaginationItem } from '@mui/material';
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
const GridStarRating = ({ rating }) => (
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

const productsData = [
  { id: 1, img: Product1, title: 'Abstract Harmony', artist: 'Maria Santos', rating: 4.8, price: 450, oldPrice: 599, badge: 'SALE' },
  { id: 2, img: Product2, title: 'Urban Dreams', artist: 'David Chen', rating: 4.6, price: 320, oldPrice: null, badge: 'NEW' },
  { id: 3, img: Product3, title: 'Coastal Breeze', artist: 'Elena Rodriguez', rating: 4.9, price: 280, oldPrice: 350, badge: 'SALE', outOfStock: true },
  { id: 4, img: Product4, title: 'Mountain Vista', artist: 'Thomas Miller', rating: 4.7, price: 520, oldPrice: null },
  { id: 5, img: Product5, title: 'City Lights', artist: 'Sarah Johnson', rating: 4.5, price: 380, oldPrice: 480, badge: 'SALE NEW' },
  { id: 6, img: Product6, title: 'Forest Path', artist: 'Michael Brown', rating: 4.8, price: 420, oldPrice: null },
  { id: 7, img: Product7, title: 'Desert Sunset', artist: 'Lisa Wang', rating: 4.6, price: 350, oldPrice: 450, badge: 'SALE' },
  { id: 8, img: Product8, title: 'Ocean Waves', artist: 'Robert Davis', rating: 4.9, price: 480, oldPrice: null, badge: 'NEW' },
  { id: 9, img: Product9, title: 'Autumn Colors', artist: 'Jennifer Lee', rating: 4.4, price: 290, oldPrice: 380, badge: 'SALE', outOfStock: true },
  { id: 10, img: Product10, title: 'Night Sky', artist: 'Alex Turner', rating: 4.7, price: 550, oldPrice: null },
  { id: 11, img: Product11, title: 'Spring Garden', artist: 'Emma Wilson', rating: 4.6, price: 320, oldPrice: 420, badge: 'SALE' },
  { id: 12, img: Product12, title: 'Winter Landscape', artist: 'James Anderson', rating: 4.8, price: 460, oldPrice: null }
];

const ProductGrid = () => {
  // 1. ADDED STATE: Tracks whether 'grid' or 'list' is active
  const [viewMode, setViewMode] = useState('grid'); 

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
          
          {/* 2. UPDATED TOGGLE ICONS: Click handlers and dynamic coloring based on viewMode state */}
          <Box sx={{ display: 'flex', border: '1px solid #E0E0E0', borderRadius: 1, overflow: 'hidden' }}>
            <Box 
              onClick={() => setViewMode('grid')}
              sx={{ 
                backgroundColor: viewMode === 'grid' ? '#1A1A1A' : '#FFFFFF', 
                color: viewMode === 'grid' ? '#FFFFFF' : '#757575', 
                p: 0.5, cursor: 'pointer', display: 'flex' 
              }}
            >
              <GridViewIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
            <Box 
              onClick={() => setViewMode('list')}
              sx={{ 
                backgroundColor: viewMode === 'list' ? '#1A1A1A' : '#FFFFFF', 
                color: viewMode === 'list' ? '#FFFFFF' : '#757575', 
                p: 0.5, cursor: 'pointer', display: 'flex' 
              }}
            >
              <ViewListIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
          </Box>

        </Box>
      </Box>

      {/* Product Area */}
      <Grid container spacing={3}>
        {productsData.map((prod) => (
          
          /* 3. DYNAMIC LAYOUT: Grid sizes dynamically update based on view mode */
          <Grid item xs={12} sm={viewMode === 'list' ? 12 : 6} md={viewMode === 'list' ? 12 : 4} key={prod.id}>
            
            <Box 
              sx={{ 
                border: '1px solid #F0F0F0', 
                p: 1.5, 
                position: 'relative', 
                height: '100%', 
                display: 'flex', 
                // Switches to a horizontal row if in list mode on tablet/desktop screens
                flexDirection: viewMode === 'list' ? { xs: 'column', sm: 'row' } : 'column',
                gap: viewMode === 'list' ? 3 : 0
              }}
            >
              
              {/* Badges */}
              {prod.badge && (
                <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {prod.badge.split(' ').map((b) => (
                    <Box key={b} sx={{ backgroundColor: '#FFFFFF', px: 1, py: 0.25, borderRadius: 0.5, boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }}>
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: '#666' }}>{b}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Image Container with Out of Stock Overlay */}
              <Box 
                sx={{ 
                  width: viewMode === 'list' ? { xs: '100%', sm: 260 } : '100%', 
                  height: 260, 
                  overflow: 'hidden', 
                  backgroundColor: '#F5F5F5', 
                  mb: viewMode === 'list' ? { xs: 2, sm: 0 } : 2, 
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                <img src={prod.img} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {prod.outOfStock && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>Out of Stock</Typography>
                  </Box>
                )}

                {/* Hover Icons Overlay moved inside Image for List View cleanliness, acts exactly the same */}
                <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }}>
                    <FavoriteBorderIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }}>
                    <VisibilityOutlinedIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }}>
                    <BarChartOutlinedIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                </Box>

              </Box>

              {/* Content Description Area */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, py: viewMode === 'list' ? { xs: 0, sm: 2 } : 0 }}>
                <Typography variant="body1" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 0.25, fontSize: viewMode === 'list' ? '1.25rem' : '1rem' }}>{prod.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: viewMode === 'list' ? 1.5 : 0.5, fontSize: viewMode === 'list' ? '0.85rem' : '0.75rem' }}>{prod.artist}</Typography>
                
                {viewMode === 'list' && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: { xs: 'none', sm: 'block' } }}>
                    Discover exquisite detailing and premium craftsmanship with this stunning artwork. A perfect addition to elevate any modern or classic interior space.
                  </Typography>
                )}

                {/* Asset Star Rating Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: viewMode === 'list' ? 0 : 'auto' }}>
                  <GridStarRating rating={prod.rating} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{prod.rating}</Typography>
                </Box>

                {/* Pricing & Add to Cart Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: viewMode === 'list' ? 'auto' : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="body1" fontWeight={700} sx={{ fontSize: viewMode === 'list' ? '1.15rem' : '1rem' }}>${prod.price}</Typography>
                    {prod.oldPrice && (
                      <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>${prod.oldPrice}</Typography>
                    )}
                  </Box>
                  <Button 
                    variant="contained" 
                    disabled={prod.outOfStock}
                    sx={{ 
                      backgroundColor: prod.outOfStock ? '#E0E0E0' : '#1A1A1A', 
                      color: prod.outOfStock ? '#9E9E9E' : '#FFFFFF', 
                      textTransform: 'none', 
                      borderRadius: 0, 
                      fontSize: viewMode === 'list' ? '0.85rem' : '0.7rem', 
                      px: viewMode === 'list' ? 3 : 1.5, 
                      py: 0.75, 
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: prod.outOfStock ? '#E0E0E0' : '#333333', boxShadow: 'none' } 
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>

            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Container Matching Exact Screenshot Styles */}
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

export default ProductGrid;