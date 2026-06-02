// import React from 'react';
import { Box } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeBanner from '../components/home/HomeBanner';
import ShopByCategory from '../components/home/ShopByCategory';
import FlashSaleDeals from '../components/home/FlashSaleDeals';

// New Screenshots Code Additions
import FeaturedGalleries from '../components/home/FeaturedGalleries';
import TrendingArtworks from '../components/home/TrendingArtworks';
import LimitedEdition from '../components/common/LimitedEdition';
import Newsletter from '../components/common/Newsletter';
import HomeFooter from '../components/common/HomeFooter';

const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Sticky Navigation Layer */}
      <HomeNavbar />

      {/* Main Framework Streams Block Array */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HomeBanner />
        <ShopByCategory />
        <FlashSaleDeals />
        
        {/* Additional Mock-Ups Blocks Content Array */}
        <FeaturedGalleries />
        <TrendingArtworks />
        <LimitedEdition />
        <Newsletter />
      </Box>

      {/* Persistent Extended Directory Index Map Footer Layout */}
      <HomeFooter />
    </Box>
  );
};

export default HomePage;