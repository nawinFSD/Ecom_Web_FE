import React from 'react';
import { Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, Link } from '@mui/material';

// Asset Imports for Custom Rating
import BrightStar from '../../assets/product/bright-star.png';
import BrightlessStar from '../../assets/product/brightless-star.png';

// Helper component to render custom star assets
const CustomStarRating = ({ rating }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <img 
          key={star} 
          src={star <= Math.floor(rating) ? BrightStar : BrightlessStar} 
          alt={star <= rating ? "Star" : "Empty Star"} 
          style={{ width: 12, height: 12, objectFit: 'contain' }} 
        />
      ))}
    </Box>
  );
};

const ProductSidebar = () => {
  const [priceRange, setPriceRange] = React.useState([0, 1000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const labelStyle = { fontSize: '0.85rem', color: '#424242' };
  const headerStyle = { fontWeight: 600, mb: 1.5, mt: 3, fontSize: '0.95rem' };

  return (
    <Box sx={{ backgroundColor: '#FAF8F6', p: 3, borderRadius: 1, width: '100%', height: '100%' }}>
      
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} id='sculpture-section'>
        <Typography variant="subtitle1" fontWeight={700}>Filters</Typography>
        <Link href="#" underline="none" sx={{ fontSize: '0.75rem', color: '#757575', '&:hover': { color: '#000' } }}>
          Clear All
        </Link>
      </Box>

      {/* Price Range */}
      <Typography sx={headerStyle}>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        min={0}
        max={1000}
        sx={{ 
          color: '#000000', 
          '& .MuiSlider-thumb': { backgroundColor: '#000000' },
          '& .MuiSlider-rail': { backgroundColor: '#E0E0E0' }
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">${priceRange[0]}</Typography>
        <Typography variant="body2" color="text.secondary">${priceRange[1]}</Typography>
      </Box>

      {/* Brands */}
      <Typography sx={headerStyle}>Brands</Typography>
      <FormGroup>
        {['Gallery One', 'Modern Arts', 'Art House', 'Classic Studio'].map((brand) => (
          <FormControlLabel 
            key={brand} 
            control={<Checkbox size="small" sx={{ color: '#BDBDBD', '&.Mui-checked': { color: '#000000' } }} />} 
            label={<Typography sx={labelStyle}>{brand}</Typography>} 
          />
        ))}
      </FormGroup>

      {/* Customer Rating */}
      <Typography sx={headerStyle}>Customer Rating</Typography>
      <FormGroup>
        {[
          { label: '4.5 & up', val: 4.5 },
          { label: '4 & up', val: 4 },
          { label: '3 & up', val: 3 },
          { label: '2 & up', val: 2 }
        ].map((item, idx) => (
          <FormControlLabel 
            key={idx}
            control={<Checkbox size="small" sx={{ color: '#BDBDBD', '&.Mui-checked': { color: '#000000' } }} />} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomStarRating rating={item.val} />
                <Typography sx={labelStyle}>{item.label}</Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>

      {/* Availability */}
      <Typography sx={headerStyle}>Availability</Typography>
      <FormGroup>
        {['In Stock', 'On Sale', 'New Arrivals'].map((status) => (
          <FormControlLabel 
            key={status} 
            control={<Checkbox size="small" sx={{ color: '#BDBDBD', '&.Mui-checked': { color: '#000000' } }} />} 
            label={<Typography sx={labelStyle}>{status}</Typography>} 
          />
        ))}
      </FormGroup>

    </Box>
  );
};

export default ProductSidebar;