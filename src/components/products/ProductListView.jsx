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

// Asset Imports (images mapped by imageKey from JSON)
import Draw1 from '../../assets/product/draw1.jpg';
import Draw2 from '../../assets/product/draw2.jpg';
import Draw3 from '../../assets/product/draw3.jpg';
import Draw4 from '../../assets/product/draw4.jpg';
import Draw5 from '../../assets/product/draw5.png';
import Draw6 from '../../assets/product/draw6.png';
import Draw7 from '../../assets/product/draw7.jpg';
import Draw8 from '../../assets/product/draw8.jpg';
import Draw9 from '../../assets/product/draw9.png';
import Draw10 from '../../assets/product/draw10.png';
import Draw11 from '../../assets/product/draw11.png';
import Draw12 from '../../assets/product/draw12.png';
import Draw13 from '../../assets/product/draw13.png';
import Draw14 from '../../assets/product/draw14.png';
import Draw15 from '../../assets/product/draw15.jpg';

import Paint1 from '../../assets/product/paint1.jpg';
import Paint2 from '../../assets/product/paint2.jpg';
import Paint3 from '../../assets/product/paint3.jpg';
import Paint4 from '../../assets/product/paint4.jpg';
import Paint5 from '../../assets/product/paint5.jpg';
import Paint6 from '../../assets/product/paint6.jpg';
import Paint7 from '../../assets/product/paint7.jpg';
import Paint8 from '../../assets/product/paint8.jpg';
import Paint9 from '../../assets/product/paint9.jpg';
import Paint10 from '../../assets/product/paint10.jpg';
import Paint11 from '../../assets/product/paint11.jpg';
import Paint12 from '../../assets/product/paint12.jpg';
import Paint13 from '../../assets/product/paint13.jpg';
import Paint14 from '../../assets/product/paint14.jpg';
import Paint15 from '../../assets/product/paint15.jpg';

import Sculp1 from '../../assets/product/sculp1.jpg';
import Sculp2 from '../../assets/product/sculp2.png';
import Sculp3 from '../../assets/product/sculp3.jpg';
import Sculp4 from '../../assets/product/sculp4.jpg';
import Sculp5 from '../../assets/product/sculp5.jpg';
import Sculp6 from '../../assets/product/sculp6.jpg';
import Sculp7 from '../../assets/product/sculp7.jpg';
import Sculp8 from '../../assets/product/sculp8.jpg';
import Sculp9 from '../../assets/product/sculp9.jpg';
import Sculp10 from '../../assets/product/sculp10.jpg';
import Sculp11 from '../../assets/product/sculp11.jpg';
import Sculp12 from '../../assets/product/sculp12.jpg';
import Sculp13 from '../../assets/product/sculp13.jpg';
import Sculp14 from '../../assets/product/sculp14.jpg';
import Sculp15 from '../../assets/product/sculp15.jpg';

import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

const imageMap = {
  draw1: Draw1, draw2: Draw2, draw3: Draw3, draw4: Draw4, draw5: Draw5, draw6: Draw6, draw7: Draw7, draw8: Draw8, draw9: Draw9, draw10: Draw10, draw11: Draw11, draw12: Draw12, draw13: Draw13, draw14: Draw14, draw15: Draw15,
  paint1: Paint1, paint2: Paint2, paint3: Paint3, paint4: Paint4, paint5: Paint5, paint6: Paint6, paint7: Paint7, paint8: Paint8, paint9: Paint9, paint10: Paint10, paint11: Paint11, paint12: Paint12, paint13: Paint13, paint14: Paint14, paint15: Paint15,
  sculp1: Sculp1, sculp2: Sculp2, sculp3: Sculp3, sculp4: Sculp4, sculp5: Sculp5, sculp6: Sculp6, sculp7: Sculp7, sculp8: Sculp8, sculp9: Sculp9, sculp10: Sculp10, sculp11: Sculp11, sculp12: Sculp12, sculp13: Sculp13, sculp14: Sculp14, sculp15: Sculp15
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
  filters = { priceRange: [0, 2000], brands: [], ratings: [], availability: [] },
  showFilters = false,
  onToggleFilters = () => {}
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const listRef = useRef(null);

  // Group by artist (for the artists showcase view)
  const artistsMap = {};
  productsJson.forEach(p => {
    if (!artistsMap[p.artist]) {
      artistsMap[p.artist] = [];
    }
    artistsMap[p.artist].push({ ...p, img: imageMap[p.imageKey] });
  });

  // Dynamic Filtering based on the filters prop, search query, and URL filterParam
  const filteredProducts = productsJson.filter(prod => {
    // URL Category Filter Param match
    if (filterParam === 'paint' && !prod.imageKey.startsWith('paint')) return false;
    if (filterParam === 'draw' && !prod.imageKey.startsWith('draw')) return false;
    if (filterParam === 'sculp' && !prod.imageKey.startsWith('sculp')) return false;

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

  // Page limit of 9 items
  const pageSize = 9;
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

  const getHeaderTitle = () => {
    if (filterParam === 'paint') return 'Paintings';
    if (filterParam === 'draw') return 'Drawings';
    if (filterParam === 'sculp') return 'Sculpture';
    if (filterParam === 'artists') return 'Artists Showcase';
    return 'All Artworks';
  };

  return (
    <Box sx={{ width: '100%' }}>

      {/* Top Controls Row */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'flex-end' }, 
          gap: 2, 
          mb: 3 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500 }}>{getHeaderTitle()}</Typography>
          <Typography variant="body2" color="text.secondary">
            ({filterParam === 'artists' ? Object.keys(artistsMap).length + ' artists' : sortedProducts.length + ' products'})
          </Typography>
        </Box>

        {filterParam !== 'artists' && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 2 }, 
              width: { xs: '100%', sm: 'auto' }, 
              justifyContent: { xs: 'space-between', sm: 'flex-end' },
              flexWrap: 'wrap'
            }}
          >
            <Button
              onClick={onToggleFilters}
              variant="outlined"
              startIcon={<FilterListIcon sx={{ fontSize: '1.1rem' }} />}
              sx={{
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: '#1A1A1A',
                fontSize: '0.85rem',
                height: 32,
                borderRadius: 0,
                px: 2,
                '&:hover': {
                  borderColor: '#1A1A1A',
                  backgroundColor: 'transparent'
                }
              }}
            >
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', md: 'inline' } }}>Sort by:</Typography>
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
        )}
      </Box>

      {/* Product List / Artists Showcase */}
      {filterParam === 'artists' ? (
        <Box sx={{ width: '100%', mt: 2 }}>
          {Object.entries(artistsMap).map(([artistName, artistProds]) => (
            <Box key={artistName} sx={{ mb: 6, pb: 4, borderBottom: '1px solid #F0F0F0', '&:last-child': { borderBottom: 'none' } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'serif', 
                  fontWeight: 600, 
                  color: '#1A1A1A', 
                  mb: 2.5, 
                  fontSize: '1.2rem',
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  '&::after': {
                    content: '""',
                    flexGrow: 1,
                    height: '1px',
                    backgroundColor: '#E5E7EB'
                  }
                }}
              >
                Artist: {artistName}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {artistProds.slice(0, 3).map((prod) => (
                  <Box
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
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
                        src={prod.img}
                        alt={prod.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: { sm: 1 } }}>
                      <Typography variant="subtitle1" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.5 }}>{prod.title}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{prod.artist}</Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <ListStarRating rating={prod.rating} />
                        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.7rem' }}>{prod.rating}</Typography>
                      </Box>
                      
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
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <>
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
        </>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
};

export default ProductListView;