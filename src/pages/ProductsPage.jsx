import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Link as MuiLink, Drawer, useMediaQuery, useTheme } from '@mui/material';

// Shared Components
import HomeNavbar from '../components/common/HomeNavbar';
import LimitedEdition from '../components/common/LimitedEdition';
import Newsletter from '../components/common/Newsletter';
import HomeFooter from '../components/common/HomeFooter';
import ProductBanner from '../components/common/ProductBanner';
import ProductSidebar from '../components/common/ProductSidebar';
import FloatingActions from '../components/common/FloatingActions';

// Page-Specific Components
import ProductGrid from '../components/products/ProductGrid';

const ProductsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || '';

  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    brands: [],
    ratings: [],
    availability: []
  });

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleClearAll = () => {
    setFilters({
      priceRange: [0, 2000],
      brands: [],
      ratings: [],
      availability: []
    });
  };

  const getCategoryTitle = () => {
    if (filterParam === 'paint') return 'Paintings';
    if (filterParam === 'draw') return 'Drawings';
    if (filterParam === 'sculp') return 'Sculpture';
    if (filterParam === 'artists') return 'Artists';
    return 'All Artworks';
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* Sticky Top Navbar retains its smooth scroll capabilities */}
      <HomeNavbar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Wavy Top Hero Segment */}
        <ProductBanner />

        {/* Catalog Main Interface */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          
          {/* Breadcrumb Row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
            <MuiLink href="/" underline="hover" color="text.secondary" sx={{ fontSize: '0.8rem' }}>Home</MuiLink>
            <Typography variant="caption" color="text.secondary">/</Typography>
            <MuiLink href="#" underline="hover" color="text.secondary" sx={{ fontSize: '0.8rem' }}>Categories</MuiLink>
            <Typography variant="caption" color="text.secondary">/</Typography>
            <Typography variant="caption" fontWeight={700} color="text.primary" sx={{ fontSize: '0.8rem' }}>{getCategoryTitle()}</Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, // Stacks on mobile, side-by-side on desktop
              gap: { xs: 4, lg: 5 }, 
              alignItems: 'flex-start' 
            }}
          >
            
            {/* Desktop Sidebar: Shows inline on the left if showFilters is true */}
            {showFilters && (
              <Box 
                sx={{ 
                  width: '280px', 
                  flexShrink: 0,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <ProductSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
              </Box>
            )}

            {/* Mobile/Tablet Drawer: Slides in when showFilters is true */}
            {isMobile && (
              <Drawer
                anchor="left"
                open={showFilters}
                onClose={() => setShowFilters(false)}
                sx={{ 
                  '& .MuiDrawer-paper': { width: 280, p: 2, boxSizing: 'border-box' }
                }}
              >
                <ProductSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
              </Drawer>
            )}
            
            {/* Right Box: Fluid Width Product Grid */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                minWidth: 0, // Critical: Prevents large child elements from breaking the flex container
                width: '100%' 
              }}
            >
              <ProductGrid 
                filters={filters} 
                showFilters={showFilters} 
                onToggleFilters={() => setShowFilters(!showFilters)} 
              />
            </Box>

          </Box>
          
        </Container>

        {/* Existing Shared Layout Elements */}
        <LimitedEdition />
        <Newsletter />
      </Box>

      {/* Shared Interactive widgets */}
      <FloatingActions />

      {/* Bottom Legal Navigation Foot */}
      <HomeFooter />
      
    </Box>
  );
};

export default ProductsPage;