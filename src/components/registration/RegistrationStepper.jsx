// import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const RegistrationStepper = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: { xs: 3, sm: 4 } }}>
      
      {/* Step 1: Account (Active) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          1
        </Box>
        <Typography variant="caption" fontWeight={600} color="text.primary">
          Account
        </Typography>
      </Box>

      {/* Divider Line */}
      <Divider sx={{ width: { xs: 30, sm: 50 }, mx: 2, borderColor: '#E0E0E0' }} />

      {/* Step 2: Address (Inactive) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#F5F5F5',
            color: '#9E9E9E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}
        >
          2
        </Box>
        <Typography variant="caption" fontWeight={500} color="text.secondary">
          Address
        </Typography>
      </Box>

    </Box>
  );
};

export default RegistrationStepper;