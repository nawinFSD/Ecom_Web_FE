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
import { useCart } from '../../context/CartContext';

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
  filters = { priceRange: [0, 2000], brands: [], ratings: [], availability: [] },
  showFilters = false,
  onToggleFilters = () => {}
}) => {
  const { cartItems, addToCart } = useCart();
  
  const handleAddToCart = (e, prod) => {
    e.stopPropagation();
    gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    addToCart(prod);
  };

  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const handleProductClick = (prod) => {
    setSelectedProduct({ ...prod, img: imageMap[prod.imageKey] });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const gridRef = useRef(null);

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

  // Active Pagination logic
  const pageSize = 8;
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
        )}
      </Box>

      {/* Product Showcase / Cards Grid */}
      {filterParam === 'artists' ? (
        <div className="w-full mt-4">
          {Object.entries(artistsMap).map(([artistName, artistProds]) => (
            <div key={artistName} className="mb-12 pb-8 border-b border-slate-100 last:border-b-0">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3 after:content-[''] after:flex-grow after:h-[1px] after:bg-slate-200">
                Artist: {artistName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {artistProds.slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id}
                    onClick={() => handleProductClick(prod)}
                    className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200 group"
                  >
                    {/* Badge */}
                    {prod.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                          {prod.badge}
                        </span>
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="w-full aspect-[4/5] relative bg-slate-50 overflow-hidden rounded-xl mb-4 shrink-0">
                      <img 
                        src={prod.img} 
                        alt={prod.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-grow">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mb-3">
                        {prod.medium}
                      </p>
                      
                      <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{prod.price}
                        </span>
                        {prod.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{prod.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={viewMode === 'list' ? "flex flex-col gap-6" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"} ref={gridRef}>
            {paginatedProducts.map((prod) => {
              const cartItem = cartItems.find((ci) => ci.productId === prod.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <div 
                  key={prod.id}
                  onClick={() => handleProductClick(prod)}
                  className={`bg-white border border-slate-100 rounded-2xl p-4 flex cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200 group ${
                    viewMode === 'list' ? 'flex-col sm:flex-row gap-6 w-full' : 'flex-col h-full w-full'
                  }`}
                >
                  {/* Image Container */}
                  <div className={`relative bg-slate-50 overflow-hidden rounded-xl shrink-0 ${
                    viewMode === 'list' ? 'w-full sm:w-64 aspect-[4/5]' : 'w-full aspect-[4/5] mb-4'
                  }`}>
                    {/* Badges */}
                    {prod.badge && (
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                        {prod.badge.split(' ').map((b) => (
                          <span key={b} className="bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                    <img
                      src={imageMap[prod.imageKey]}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col flex-grow">
                    {/* Rating row */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <GridStarRating rating={prod.rating} />
                      <span className="text-xs text-slate-500 font-medium">
                        ({prod.rating})
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                      {prod.title}
                    </h4>

                    {/* Medium/Type details */}
                    <p className="text-xs text-slate-500 truncate mb-3">
                      {prod.medium}
                    </p>

                    {/* Description (List view only) */}
                    {viewMode === 'list' && (
                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {prod.description}
                      </p>
                    )}

                    {/* Bottom Row: Price and Add to Cart pinned to bottom */}
                    <div className="mt-auto pt-4 border-t border-slate-100/60 flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{prod.price}
                        </span>
                        {prod.oldPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{prod.oldPrice}
                          </span>
                        )}
                      </div>

                      <button
                        disabled={prod.outOfStock}
                        onClick={(e) => handleAddToCart(e, prod)}
                        className={`text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all duration-200 cursor-pointer ${
                          prod.outOfStock 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : quantity > 0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                              : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                        }`}
                      >
                        {prod.outOfStock ? 'Out of Stock' : (quantity > 0 ? `Added (${quantity})` : 'Add to Cart')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </Box>
  );
};

export default ProductGrid;