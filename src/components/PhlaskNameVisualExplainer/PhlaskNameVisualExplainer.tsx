import { Box, Stack, Typography } from '@mui/material';
import PhlaskIcon from 'icons/PhlaskV2';

const BORDER_RADIUS = '10px';
const PADDING_BLOCK = 2.7;
const PADDING_INLINE = 7;
const FONT_FAMILY = "'Exo', sans-serif";
const BLUE = '#10B6FF';
const SYMBOL_COLOR = '#60718C';

const PhlaskNameVisualExplainer = () => {
  return (
    <Stack
      direction={{ lg: 'row', md: 'column', sm: 'column' }}
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        paddingInline: 2,
        maxHeight: { md: 'auto', lg: '90px' }
      }}
    >
      <Box
        sx={{
          paddingInline: PADDING_INLINE,
          paddingBlock: PADDING_BLOCK,
          border: `1px solid ${BLUE}`,
          borderRadius: BORDER_RADIUS,
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <Typography
          sx={{
            color: BLUE,
            fontSize: '2rem',
            fontFamily: FONT_FAMILY
          }}
        >
          PHL
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: SYMBOL_COLOR,
            fontSize: '2.5rem',
            fontFamily: FONT_FAMILY
          }}
        >
          +
        </Typography>
      </Box>
      <Box
        sx={{
          paddingInline: PADDING_INLINE,
          paddingBlock: PADDING_BLOCK,
          backgroundColor: BLUE,
          borderRadius: BORDER_RADIUS,
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <Typography
          sx={{
            color: '#ffffff',
            fontFamily: FONT_FAMILY,
            fontSize: '2rem'
          }}
        >
          ASK
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: SYMBOL_COLOR,
            fontFamily: FONT_FAMILY,
            fontSize: '2.5rem'
          }}
        >
          =
        </Typography>
      </Box>
      <Box
        sx={{
          paddingInline: PADDING_INLINE,
          paddingBlock: PADDING_BLOCK,
          borderRadius: BORDER_RADIUS,
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <PhlaskIcon width="154" height="39" />
      </Box>
    </Stack>
  );
};

export default PhlaskNameVisualExplainer;
