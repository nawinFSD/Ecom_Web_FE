// import React from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';

const Newsletter = () => {
  return (
    <Box sx={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', py: { xs: 6, sm: 8 }, width: '100%', textAlign: 'center' }}>
      <Container maxWidth="md">
        
        <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 400, mb: 1.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Stay Updated
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#BDBDBD', mb: 4, px: 2, maxWidth: 540, mx: 'auto', lineHeight: 1.6 }}>
          Subscribe to our newsletter and be the first to know about new arrivals, exclusive collections, and special offers
        </Typography>

        {/* Form Container Row */}
        <Box 
          component="form" 
          noValidate 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'center', 
            gap: { xs: 1.5, sm: 0 }, 
            maxWidth: 500, 
            mx: 'auto',
            px: 2
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter your email address"
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
                borderRadius: { xs: 1, sm: '4px 0 0 ' + '4px' },
                height: 46,
                fontSize: '0.9rem',
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              }
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#616161',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              px: 4,
              height: 46,
              borderRadius: { xs: 1, sm: '0 4px 4px 0' },
              boxShadow: 'none',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: '#424242', boxShadow: 'none' }
            }}
          >
            Subscribe
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default Newsletter;