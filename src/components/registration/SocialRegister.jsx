import { Box, Typography, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const SocialRegister = ({ onGoogleClick }) => {
  return (
    <Box sx={{ width: '100%', mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Official Google Signup Button */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              onGoogleClick(credentialResponse.credential);
            }
          }}
          onError={() => {
            console.error('Google Sign Up failed');
          }}
          text="signup_with"
          useOneTap
        />
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