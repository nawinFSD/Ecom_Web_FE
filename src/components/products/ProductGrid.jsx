import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Box, Grid, Typography, Button, Select, MenuItem, Pagination, PaginationItem } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

// Load product data from JSON (single source of truth)
import productsJson from '../../data/products.json';

// Product Detail Modal
import ProductDetailModal from './ProductDetailModal';

// Asset Imports (images mapped by imageKey from JSON)
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

// New image imports
import New1 from '../../assets/product/new1.jpg';
import New2 from '../../assets/product/new2.jpg';
import New3 from '../../assets/product/new3.jpg';
import New4 from '../../assets/product/new4.jpg';
import New5 from '../../assets/product/new5.jpg';
import New6 from '../../assets/product/new6.jpg';
import New7 from '../../assets/product/new7.jpg';
import New8 from '../../assets/product/new8.jpg';
import New9 from '../../assets/product/new9.jpg';

import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

const imageMap = {
  product1: Product1, product2: Product2, product3: Product3,
  product4: Product4, product5: Product5, product6: Product6,
  product7: Product7, product8: Product8, product9: Product9,
  product10: Product10, product11: Product11, product12: Product12,
  new1: New1, new2: New2, new3: New3,
  new4: New4, new5: New5, new6: New6,
  new7: New7, new8: New8, new9: New9,
};

// Custom Star Rating using project assets
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

const ProductGrid = ({ 
  filters = { priceRange: [0, 2000], brands: [], ratings: [], availability: [] } 
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const handleProductClick = (prod) => {
    setSelectedProduct({ ...prod, img: imageMap[prod.imageKey] });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const gridRef = useRef(null);

  // Dynamic Filtering based on the filters prop and search query
  const filteredProducts = productsJson.filter(prod => {
    // Search match (title, artist, description)
    const searchMatches = !searchQuery || 
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // Price match
    const priceMatches = prod.price >= filters.priceRange[0] && prod.price <= filters.priceRange[1];

    // Brand match
    const brandMatches = filters.brands.length === 0 || filters.brands.includes(prod.brand);

    // Rating match
    const ratingMatches = filters.ratings.length === 0 || filters.ratings.some(val => prod.rating >= val);

    // Availability match
    let availabilityMatches = true;
    if (filters.availability.length > 0) {
      availabilityMatches = filters.availability.some(status => {
        if (status === 'In Stock') return !prod.outOfStock;
        if (status === 'On Sale') return prod.badge === 'SALE';
        if (status === 'New Arrivals') return prod.badge === 'NEW';
        return false;
      });
    }

    return searchMatches && priceMatches && brandMatches && ratingMatches && availabilityMatches;
  });

  // Dynamic Sorting based on sortBy state
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.price - b.price;
    }
    if (sortBy === 'Price: High to Low') {
      return b.price - a.price;
    }
    // Popularity: sort by rating descending
    return b.rating - a.rating;
  });

  // Active Pagination logic
  const pageSize = 6;
  const pageCount = Math.ceil(sortedProducts.length / pageSize) || 1;

  useEffect(() => {
    if (page > pageCount) {
      setPage(1);
    }
  }, [pageCount, page]);

  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.grid-card-item');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }
        );
      }
    }
  }, [viewMode, page, sortBy, filters, searchQuery]);

  return (
    <Box sx={{ width: '100%' }}>

      {/* Top Controls Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500 }}>Paintings</Typography>
          <Typography variant="body2" color="text.secondary">({sortedProducts.length} products)</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">Sort by:</Typography>
            <Select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              size="small" 
              sx={{ fontSize: '0.85rem', height: 32, borderRadius: 0, '& fieldset': { borderColor: '#E0E0E0' } }}
            >
              <MenuItem value="Popularity">Popularity</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', border: '1px solid #E0E0E0', borderRadius: 1, overflow: 'hidden' }}>
            <Box
              onClick={() => setViewMode('grid')}
              sx={{ backgroundColor: viewMode === 'grid' ? '#1A1A1A' : '#FFFFFF', color: viewMode === 'grid' ? '#FFFFFF' : '#757575', p: 0.5, cursor: 'pointer', display: 'flex' }}
            >
              <GridViewIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
            <Box
              onClick={() => setViewMode('list')}
              sx={{ backgroundColor: viewMode === 'list' ? '#1A1A1A' : '#FFFFFF', color: viewMode === 'list' ? '#FFFFFF' : '#757575', p: 0.5, cursor: 'pointer', display: 'flex' }}
            >
              <ViewListIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product Cards */}
      <Grid container spacing={3} ref={gridRef}>
        {paginatedProducts.map((prod) => (
          <Grid item xs={12} sm={viewMode === 'list' ? 12 : 6} md={viewMode === 'list' ? 12 : 4} key={prod.id} className="grid-card-item">
            <Box
              onClick={() => handleProductClick(prod)}
              sx={{
                border: '1px solid #F0F0F0',
                p: 1.5,
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: viewMode === 'list' ? { xs: 'column', sm: 'row' } : 'column',
                gap: viewMode === 'list' ? 3 : 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                  transform: 'translateY(-3px)',
                  borderColor: '#D0D0D0',
                },
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

              {/* Image Container */}
              <Box
                sx={{
                  width: viewMode === 'list' ? { xs: '100%', sm: 260 } : '100%',
                  height: 260,
                  overflow: 'hidden',
                  backgroundColor: '#F5F5F5',
                  mb: viewMode === 'list' ? { xs: 2, sm: 0 } : 2,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <img
                  src={imageMap[prod.imageKey]}
                  alt={prod.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                {prod.outOfStock && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 500 }}>Out of Stock</Typography>
                  </Box>
                )}

                {/* Hover Icons Overlay */}
                <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                    <FavoriteBorderIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                    <VisibilityOutlinedIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                  <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '50%', p: 0.6, boxShadow: 1, cursor: 'pointer', display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                    <BarChartOutlinedIcon sx={{ fontSize: '1rem', color: '#1A1A1A' }} />
                  </Box>
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, py: viewMode === 'list' ? { xs: 0, sm: 2 } : 0 }}>
                <Typography variant="body1" sx={{ fontFamily: 'serif', fontWeight: 500, mb: 0.25, fontSize: viewMode === 'list' ? '1.25rem' : '1rem' }}>
                  {prod.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: viewMode === 'list' ? 1.5 : 0.5, fontSize: viewMode === 'list' ? '0.85rem' : '0.75rem' }}>
                  {prod.artist}
                </Typography>

                {viewMode === 'list' && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: { xs: 'none', sm: 'block' }, lineHeight: 1.6 }}>
                    {prod.description ? prod.description.slice(0, 120) + '...' : ''}
                  </Typography>
                )}

                {/* Star Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: viewMode === 'list' ? 0 : 'auto' }}>
                  <GridStarRating rating={prod.rating} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {prod.rating}
                  </Typography>
                </Box>

                {/* Price & Cart */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: viewMode === 'list' ? 'auto' : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="body1" fontWeight={700} sx={{ fontSize: viewMode === 'list' ? '1.15rem' : '1rem' }}>
                      ₹{prod.price}
                    </Typography>
                    {prod.oldPrice && (
                      <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        ₹{prod.oldPrice}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    disabled={prod.outOfStock}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      backgroundColor: prod.outOfStock ? '#E0E0E0' : '#1A1A1A',
                      color: prod.outOfStock ? '#9E9E9E' : '#FFFFFF',
                      textTransform: 'none',
                      borderRadius: 0,
                      fontSize: viewMode === 'list' ? '0.85rem' : '0.7rem',
                      px: viewMode === 'list' ? 3 : 1.5,
                      py: 0.75,
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: prod.outOfStock ? '#E0E0E0' : '#333333', boxShadow: 'none' },
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

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, val) => setPage(val)}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                borderRadius: 0,
                border: item.type === 'page' ? '1px solid #E0E0E0' : 'none',
                mx: 0.5,
                '&.Mui-selected': { backgroundColor: '#000000', color: '#FFFFFF', '&:hover': { backgroundColor: '#222222' } },
              }}
            />
          )}
        />
      </Box>

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </Box>
  );
};

export default ProductGrid;