import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Box, Typography, Button, Select, MenuItem, Pagination, PaginationItem } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

// Load from JSON (single source of truth)
import productsJson from '../../data/products.json';

// Product Detail Modal
import ProductDetailModal from './ProductDetailModal';

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

const ProductListView = ({
  filters = { priceRange: [0, 2000], brands: [], ratings: [], availability: [] }
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const listRef = useRef(null);

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

  // Page limit of 7 items
  const pageSize = 7;
  const pageCount = Math.ceil(sortedProducts.length / pageSize) || 1;
  
  // Constrain page to bounds based on filtered length
  useEffect(() => {
    if (sortedProducts.length === 0) {
      setPage(1);
    } else {
      if (page > pageCount) {
        setPage(1);
      }
    }
  }, [pageCount, page]);

  const paginatedProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (listRef.current) {
      const rows = listRef.current.querySelectorAll('.list-card-item');
      if (rows.length > 0) {
        gsap.fromTo(rows,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }
        );
      }
    }
  }, [page, sortBy, filters, searchQuery]);

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
            <Box sx={{ backgroundColor: '#FFFFFF', color: '#757575', p: 0.5, cursor: 'pointer', display: 'flex' }}>
              <GridViewIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
            <Box sx={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', p: 0.5, cursor: 'pointer', display: 'flex' }}>
              <ViewListIcon sx={{ fontSize: '1.2rem' }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} ref={listRef}>
        {paginatedProducts.map((prod) => {
          const displayImg = imageMap[prod.imageKey];

          return (
            <Box
              key={prod.id}
              onClick={() => setSelectedProduct({ ...prod, img: displayImg })}
              className="list-card-item"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                border: '1px solid #E0E0E0',
                p: 2,
                backgroundColor: '#FFFFFF',
                gap: { xs: 2, sm: 4 },
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
                  transform: 'translateY(-2px)',
                  borderColor: '#BDBDBD',
                },
              }}
            >
              {/* Image */}
              <Box sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 240, sm: 180 }, flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                <img
                  src={displayImg}
                  alt={prod.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                {prod.outOfStock && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 500 }}>Out of Stock</Typography>
                  </Box>
                )}
              </Box>

              {/* Content */}
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { sm: 1 } }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.5 }}>{prod.title}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{prod.artist}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <ListStarRating rating={prod.rating} />
                  <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{prod.rating}</Typography>
                </Box>

                {prod.badge && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'inline-block', backgroundColor: '#1A1A1A', px: 1, py: 0.25, borderRadius: 0.5 }}>
                      <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: '#FFFFFF' }}>{prod.badge}</Typography>
                    </Box>
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: { xs: 'none', sm: 'block' }, lineHeight: 1.6 }}>
                  {prod.description ? prod.description.slice(0, 110) + '...' : ''}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 'auto' }}>
                  <Typography variant="body1" fontWeight={700}>₹{prod.price}</Typography>
                  {prod.oldPrice && (
                    <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>₹{prod.oldPrice}</Typography>
                  )}
                </Box>
              </Box>

              {/* Actions */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-end' }, mt: { xs: 1, sm: 0 }, py: { sm: 1 } }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[FavoriteBorderIcon, VisibilityOutlinedIcon, BarChartOutlinedIcon].map((Icon, i) => (
                    <Box key={i} onClick={(e) => e.stopPropagation()} sx={{ border: '1px solid #E0E0E0', borderRadius: '50%', p: 0.6, cursor: 'pointer', display: 'flex', '&:hover': { backgroundColor: '#F5F5F5' } }}>
                      <Icon sx={{ fontSize: '1.1rem', color: '#757575' }} />
                    </Box>
                  ))}
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
                    fontSize: '0.8rem',
                    px: 2.5,
                    py: 1,
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: prod.outOfStock ? '#E0E0E0' : '#333333', boxShadow: 'none' },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>

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
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
};

export default ProductListView;