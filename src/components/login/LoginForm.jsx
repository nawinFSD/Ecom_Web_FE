import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Link, Paper, TextField, Typography, IconButton, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BrandLogo from '../common/BrandLogo';
import SocialSignOn from './SocialSignOn';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const { login, register, googleLogin } = useUser();
  const navigate = useNavigate();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleGoogleLogin = async (credential) => {
    if (!credential) {
      setErrorText('Google sign in did not return valid credentials.');
      return;
    }
    setErrorText('');
    const res = await googleLogin(credential);
    if (res.success) {
      navigate('/home');
    } else {
      setErrorText(res.message || 'Google sign in failed');
    }
  };

  const theme = useTheme();
  // Check screen size
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setErrorText('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorText('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorText('Password must be at least 6 characters.');
      return;
    }
    setErrorText('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/home');
    } else {
      setErrorText(res.message);
    }
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    if (!resetEmail.trim()) {
      setErrorText('Please enter your email address.');
      return;
    }
    if (!validateEmail(resetEmail)) {
      setErrorText('Please enter a valid email address.');
      return;
    }
    setErrorText('');
    setResetSuccess(true);
  };

  // Define dynamic font sizes based on screen size
  const getHeaderVariant = () => {
    if (isMobile) return 'h6';
    if (isTablet) return 'h5';
    return 'h5'; // for laptop/desktop
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 680 }, // Limit width on large screens
        p: { xs: 3.5, sm: 6, md: 12 }, // responsive padding
        borderRadius: { xs: 1, sm: 2 },
        border: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      {/* Card Header with Large Asset Logo */}
      <Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
        <BrandLogo withText={false} />
      </Box>
      <Typography variant={getHeaderVariant()} fontWeight={600} gutterBottom sx={{ mb: 0.5, letterSpacing: '0.01em', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        {isForgotPassword ? 'Reset Password' : 'Welcome Back'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 3, sm: 4 }, letterSpacing: '0.01em', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
        {isForgotPassword ? 'Receive a link to reset your account credentials' : 'Sign in to your ColorFrame account'}
      </Typography>

      {!isForgotPassword ? (
        <>
          {/* Social Buttons & Divider (Asset based & responsive) */}
          <SocialSignOn onGoogleClick={handleGoogleLogin} />

          {/* Main Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            {/* Email Address Field & Label - responsive typography */}
            <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ mb: 0.75, display: 'block', letterSpacing: '0.01em', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
              Email Address
            </Typography>
            <TextField
              margin="none"
              required
              fullWidth
              id="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: { xs: 1.5, sm: 2 },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F5F5F5',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: '#E0E0E0' },
                },
                '& .MuiInputBase-input::placeholder': { color: '#9E9E9E', opacity: 1 },
              }}
            />

            {/* Password Field & Label - responsive typography & show/hide */}
            <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ mb: 0.75, display: 'block', letterSpacing: '0.01em', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
              Password
            </Typography>
            <TextField
              margin="none"
              required
              fullWidth
              name="password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
              sx={{
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F5F5F5',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'transparent' },
                  '&.Mui-focused fieldset': { borderColor: '#E0E0E0' },
                },
                '& .MuiInputBase-input::placeholder': { color: '#9E9E9E', opacity: 1 },
              }}
            />

            {/* Controls: Remember me / Forgot password - responsive layout & text */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center', width: '100%', mb: { xs: 2, sm: 2.5, md: 3 } }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" size="small" />}
                label={<Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Remember me</Typography>}
                sx={{ marginLeft: isMobile ? '-4px' : '-8px' }} // slight adjustment for mobile checkbox
              />
              <Link 
                component="button"
                type="button"
                onClick={() => {
                  setIsForgotPassword(true);
                  setErrorText('');
                }}
                variant="body2" 
                color="text.secondary" 
                fontWeight={500} 
                underline="none" 
                sx={{ '&:hover': { color: 'text.primary' }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, textAlign: 'right', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Forgot password?
              </Link>
            </Box>

            {errorText && (
              <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: 500, fontSize: '0.85rem' }}>
                {errorText}
              </Typography>
            )}

            {/* Submit Button - responsive size & typography */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: { xs: 2.5, sm: 3 },
                py: { xs: 1.25, sm: 1.5 },
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                textTransform: 'none',
                borderRadius: 1,
                fontWeight: 600,
                fontSize: { xs: '0.95rem', sm: '1rem' },
                '&:hover': { backgroundColor: '#333333' },
              }}
            >
              Sign In
            </Button>

            {/* Card Footer: Don't have an account? - responsive text & link */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
              <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ letterSpacing: '0.02em', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Don't have an account?
              </Typography>
              <Link href="/login" variant="caption" fontWeight={600} underline="none" color="primary" sx={{ '&:hover': { color: 'primary.dark' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Sign up
              </Link>
            </Box>
          </Box>
        </>
      ) : (
        /* Forgot Password Form */
        <Box component="form" onSubmit={handleResetSubmit} noValidate sx={{ width: '100%' }}>
          {!resetSuccess ? (
            <>
              <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ mb: 0.75, display: 'block', letterSpacing: '0.01em', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                Email Address
              </Typography>
              <TextField
                margin="none"
                required
                fullWidth
                id="reset-email"
                placeholder="Enter your registered email"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                sx={{
                  mb: { xs: 2.5, sm: 3 },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'transparent' },
                    '&.Mui-focused fieldset': { borderColor: '#E0E0E0' },
                  },
                  '& .MuiInputBase-input::placeholder': { color: '#9E9E9E', opacity: 1 },
                }}
              />

              {errorText && (
                <Typography variant="body2" color="error" sx={{ mb: 2, fontWeight: 500, fontSize: '0.85rem' }}>
                  {errorText}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mb: { xs: 2.5, sm: 3 },
                  py: { xs: 1.25, sm: 1.5 },
                  backgroundColor: '#1A1A1A',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  borderRadius: 1,
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  '&:hover': { backgroundColor: '#333333' },
                }}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            <Box sx={{ mb: 3, textAlign: 'center', p: 2, backgroundColor: '#E8F5E9', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 600 }}>
                Simulated password reset link has been sent to {resetEmail}!
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link 
              component="button"
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setResetSuccess(false);
                setErrorText('');
              }}
              variant="caption" 
              fontWeight={600} 
              underline="none" 
              color="primary" 
              sx={{ '&:hover': { color: 'primary.dark' }, fontSize: { xs: '0.75rem', sm: '0.8rem' }, border: 'none', background: 'none', cursor: 'pointer' }}
            >
              Back to Login
            </Link>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default LoginForm;