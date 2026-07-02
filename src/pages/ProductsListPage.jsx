import { useState } from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

// Shared Components (Unmodified)
import HomeNavbar from '../components/common/HomeNavbar';
import LimitedEdition from '../components/common/LimitedEdition';
import Newsletter from '../components/common/Newsletter';
import HomeFooter from '../components/common/HomeFooter';
import ProductBanner from '../components/common/ProductBanner';
import ProductSidebar from '../components/common/ProductSidebar';
import FloatingActions from '../components/common/FloatingActions';

// Page-Specific Components
import ProductListView from '../components/products/ProductListView';

const ProductsListPage = () => {
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

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* Sticky Top Navbar with existing smooth scroll */}
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
            <Typography variant="caption" fontWeight={700} color="text.primary" sx={{ fontSize: '0.8rem' }}>Paintings</Typography>
          </Box>

          {/* Strict Flex Layout to ensure sidebar and list view align perfectly */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, lg: 5 }, 
              alignItems: 'flex-start' 
            }}
          >
            
            {/* Left Box: Fixed Width Sidebar */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '280px' }, 
                flexShrink: 0 
              }}
            >
              <ProductSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
            </Box>
            
            {/* Right Box: Fluid Width Product List */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                minWidth: 0, 
                width: '100%' 
              }}
            >
              <ProductListView filters={filters} />
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

export default ProductsListPage;