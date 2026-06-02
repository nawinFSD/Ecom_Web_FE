// import React from 'react';
import { Box, Grid, Typography, Container, Link } from '@mui/material';

// Asset Imports
import Shop1 from '../../assets/home/shop1.png';
import Shop2 from '../../assets/home/shop2.png';
import Shop3 from '../../assets/home/shop3.png';
import Shop4 from '../../assets/home/shop4.png';

const categories = [
  { id: 1, img: Shop1, title: 'Paintings', sectionId: 'paintings-section' },
  { id: 2, img: Shop2, title: 'Sculptures', sectionId: 'sculpture-section' },
  { id: 3, img: Shop3, title: 'Photography', sectionId: 'photography-section' },
  { id: 4, img: Shop4, title: 'Digital Art', sectionId: 'digital-art-section' }
];

const ShopByCategory = () => {
  return (
    <Container maxWidth="xl" sx={{ my: { xs: 6, md: 10 } }}>
      {/* Header Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 4 }}>
        <Typography variant="h5" sx={{ fontFamily: 'serif', fontWeight: 500, fontSize: { xs: '1.25rem', sm: '1.75rem' } }}>
          Shop by Category
        </Typography>
        <Link href="#" color="text.secondary" underline="none" sx={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', '&:hover': { color: 'text.primary' } }}>
          View All &nbsp; 🡦
        </Link>
      </Box>

      {/* Grid Elements Container wrapper to maintain screenshot layout */}
      <Grid container spacing={3}>
  {categories.map((item) => (
    <Grid
      item
      xs={12}   // Mobile = 1 item
      sm={6}    // Tablet = 2 items
      md={6}    // Medium tablet = 2 items
      lg={3}    // Laptop/Desktop = 4 items
      key={item.id}
    >
      <Box
        id={item.sectionId}
        sx={{
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: {
              xs: 220, // Mobile
              sm: 250, // Tablet
              lg: 180, // Desktop
            },
            overflow: "hidden",
            backgroundColor: "#F5F5F5",
            mb: 1.5,
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            fontFamily: "serif",
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
            },
            textAlign: "center",
          }}
        >
          {item.title}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>
    </Container>
  );
};

export default ShopByCategory;