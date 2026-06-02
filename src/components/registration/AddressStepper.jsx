// import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const AddressStepper = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: { xs: 4, sm: 5 } }}>
      
      {/* Step 1: Account (Completed/Active) */}
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

      {/* Active Dark Connecting Line */}
      <Divider sx={{ width: { xs: 40, sm: 60 }, mx: 1.5, borderColor: '#1A1A1A', borderBottomWidth: 2 }} />

      {/* Step 2: Address (Active) */}
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
          2
        </Box>
        <Typography variant="caption" fontWeight={600} color="text.primary">
          Address
        </Typography>
      </Box>

    </Box>
  );
};

export default AddressStepper;