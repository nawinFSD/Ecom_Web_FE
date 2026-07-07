import { Box, Button, Typography, Divider } from '@mui/material';
import GoogleIcon from '../../assets/home/G-icon.png';

const SocialSignOn = ({ onGoogleClick }) => {
  const buttonStyle = {
    justifyContent: 'center',
    textTransform: 'none',
    borderColor: 'divider',
    fontWeight: 650,
    color: 'text.secondary',
    px: { xs: 1.5, sm: 2, md: 2.5 },
    py: { xs: 1.25, sm: 1.5 },
    fontSize: { xs: '0.9rem', sm: '1rem' },
    borderRadius: '4px',
    boxShadow: 'none',
    '&:hover': { borderColor: 'text.secondary', backgroundColor: '#F9FAFB' },
  };

  const iconStyle = {
    width: { xs: 20, sm: 24 },
    height: { xs: 20, sm: 24 },
    marginRight: '8px',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, sm: 1.5 }, width: '100%', mb: { xs: 2.5, sm: 3, md: 4 } }}>
      {/* Google Button with Asset Icon */}
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        onClick={onGoogleClick}
        sx={buttonStyle}
        startIcon={<img src={GoogleIcon} alt="Google" style={iconStyle} />}
      >
        Continue with Google
      </Button>

      {/* "or" Divider with responsive margins */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: { xs: 0.5, sm: 1 } }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ mx: { xs: 1.5, sm: 2 }, textTransform: 'uppercase', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
          or
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
    </Box>
  );
};

export default SocialSignOn;