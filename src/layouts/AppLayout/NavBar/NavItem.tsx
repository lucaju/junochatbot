import { Box, Button, useTheme } from '@mui/material';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

interface NavItemProps {
  icon: any;
  isCompact: boolean;
  path: string;
  title: string;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, isCompact, path, title }) => {
  const { story } = useAppState();
  const theme = useTheme();

  if (path.includes(':storyId')) {
    const storyID = story.currentStory?.id;
    path = storyID ? path.replace(':storyId', storyID.toString()) : '/app';
  }

  const isStoryPublished = story.currentStory?.published ?? false;
  const navToIntact = path.includes('/story/');

  return (
    <>
      {isCompact ? (
        <Button
          color={navToIntact ? 'primary' : 'inherit'}
          component={RouterLink}
          fullWidth
          sx={{
            width: '100%',
            padding: '10px 8px',
            color: navToIntact ? 'primary' : 'text.secondary',
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: '10px',
            letterSpacing: 0,
            textTransform: 'none',
            textAlign: 'center',
            lineHeight: '12px',
          }}
          target={navToIntact ? '_blank' : ''}
          to={!navToIntact ? path : isStoryPublished ? path : `${path}?draft=true`}
        >
          <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
            {Icon && <Icon size="20" />}
            <Box component="span" sx={{ mt: 0.5, textTransform: 'capitalize' }}>
              {title}
            </Box>
          </Box>
        </Button>
      ) : (
        <Button
          color={navToIntact ? 'primary' : 'inherit'}
          component={RouterLink}
          fullWidth
          sx={{
            width: '100%',
            py: 1.25,
            px: 1,
            color: navToIntact ? 'primary' : 'text.secondary',
            fontWeight: theme.typography.fontWeightMedium,
            letterSpacing: 0,
            textTransform: 'none',
            justifyContent: 'flex-start',
          }}
          target={navToIntact ? '_blank' : ''}
          to={!navToIntact ? path : isStoryPublished ? path : `${path}?draft=true`}
        >
          {Icon && <Icon sx={{ mr: 1 }} size="20" />}
          <Box
            component="span"
            sx={{
              mr: 'auto',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Box>
        </Button>
      )}
    </>
  );
};

export default NavItem;
