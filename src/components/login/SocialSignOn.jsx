import { Box, Typography, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const SocialSignOn = ({ onGoogleClick }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, sm: 1.5 }, width: '100%', mb: { xs: 2.5, sm: 3, md: 4 }, alignItems: 'center' }}>
      
      {/* Official Google Login Button */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              onGoogleClick(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.error('Google Sign In failed');
          }}
          useOneTap
        />
      </Box>

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