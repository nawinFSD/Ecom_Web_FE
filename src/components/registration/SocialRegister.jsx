import { Box, Button, Typography, Divider } from '@mui/material';
import GoogleIcon from '../../assets/home/G-icon.png';

const SocialRegister = ({ onGoogleClick }) => {
  const buttonStyle = {
    width: '100%',
    justifyContent: 'center',
    textTransform: 'none',
    borderColor: '#E0E0E0',
    fontWeight: 650,
    color: 'text.primary',
    py: 1.4,
    fontSize: '0.875rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#BDBDBD', backgroundColor: '#F9FAFB' },
  };

  const iconStyle = { width: 20, height: 20, marginRight: '8px' };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" onClick={onGoogleClick} sx={buttonStyle}>
          <img src={GoogleIcon} alt="Google" style={iconStyle} />
          Sign up with Google
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