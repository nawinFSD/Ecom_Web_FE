import { Box } from '@mui/material';
import HomeNavbar from '../components/common/HomeNavbar';
import HomeBanner from '../components/home/HomeBanner';
import ShopByCategory from '../components/home/ShopByCategory';
import FlashSaleDeals from '../components/home/FlashSaleDeals';

// Components
import FeaturedGalleries from '../components/home/FeaturedGalleries';
import TrendingArtworks from '../components/home/TrendingArtworks';
import LimitedEdition from '../components/common/LimitedEdition';
import Newsletter from '../components/common/Newsletter';
import HomeFooter from '../components/common/HomeFooter';
import FloatingActions from '../components/common/FloatingActions';

const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Sticky Navigation Layer */}
      <HomeNavbar />

      {/* Main Blocks */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HomeBanner />
        <ShopByCategory />
        <FlashSaleDeals />
        
        {/* Additional Sections */}
        <FeaturedGalleries />
        <TrendingArtworks />
        <LimitedEdition />
        <Newsletter />
      </Box>

      {/* Shared Interactive widgets */}
      <FloatingActions />

      {/* Footer */}
      <HomeFooter />
    </Box>
  );
};

export default HomePage;