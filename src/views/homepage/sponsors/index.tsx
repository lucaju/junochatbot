import { Box, Container, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import Partners from './Partners';
import Sponsorship from './Sponsorship';

const Sponsors: FC = () => {
  const theme = useTheme();
  const isMobileMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="sponsors" display="flex" alignItems="flext-start" pb={10}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 15 }} />
        <Stack
          direction={isMobileMD ? 'column' : 'row'}
          justifyContent="space-evenly"
          divider={
            <Divider
              flexItem
              orientation={isMobileMD ? 'horizontal' : 'vertical'}
              variant={isMobileMD ? 'middle' : 'fullWidth'}
            />
          }
          spacing={isMobileMD ? 5 : 1}
        >
          <Box>
            <Partners />
          </Box>
          <Box>
            <Sponsorship />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Sponsors;
