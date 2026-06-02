// import React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import GoogleIcon from '../../assets/home/G-icon.png';
import FacebookIcon from '../../assets/home/F-icon.png';

const SocialRegister = () => {
  const buttonStyle = {
    flex: 1,
    justifyContent: 'center',
    textTransform: 'none',
    borderColor: '#E0E0E0',
    fontWeight: 500,
    color: 'text.primary',
    py: 1.25,
    fontSize: '0.875rem',
    backgroundColor: '#FFFFFF',
    '&:hover': { borderColor: '#BDBDBD', backgroundColor: '#F9FAFB' },
  };

  const iconStyle = { width: 20, height: 20, marginRight: '8px' };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Button variant="outlined" sx={buttonStyle}>
          <img src={GoogleIcon} alt="Google" style={iconStyle} />
          Google
        </Button>

        <Button variant="outlined" sx={buttonStyle}>
          <img src={FacebookIcon} alt="Facebook" style={iconStyle} />
          Facebook
        </Button>
      </Box>

      {/* "or" Divider */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 3 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ mx: 2 }}>
          or
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
    </Box>
  );
};

export default SocialRegister;