import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Stack,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
  Zoom,
} from '@mui/material';
import Page from '@src/components/Page';
import { useAppState } from '@src/overmind';
import { RoleType } from '@src/types';
import React, { FC, MouseEvent, ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Item from './Item';
import Topbar from './topbar';

const BASE_URL = '/assets/pedagogical/tutorial';

interface Item {
  id: string;
  path: string;
  title: string;
  userTypeAllowed?: RoleType[];
}

interface Props {
  children?: ReactElement;
}

const TutorialVIew: FC<Props> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppState().session;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const items: Item[] = [
    {
      id: 'introduction',
      path: `${BASE_URL}/introduction`,
      title: t('tutorial:introduction'),
      userTypeAllowed: [RoleType.ADMIN, RoleType.INSTRUCTOR],
    },
    { id: 'signup', path: `${BASE_URL}/signup`, title: t('tutorial:signing_up') },
    { id: 'creation', path: `${BASE_URL}/creation`, title: t('tutorial:creating_stories') },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    navigate('/tutorial', { replace: true });
  }, []);

  const getItems = () => {
    const _items: Item[] = [];
    items.forEach((item) => {
      //public
      if (!item.userTypeAllowed) {
        _items.push(item);
        return;
      }
      //retrict
      if (!user) return;
      if (item.userTypeAllowed.includes(user.roleTypeId)) _items.push(item);
    });
    return _items;
  };

  const ScrollTo = (event: MouseEvent<HTMLElement>, anchorName?: string) => {
    if (!anchorName) anchorName = 'top';
    const anchor = ((event.target as HTMLElement).ownerDocument || document).querySelector(
      `#${anchorName}`
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const location = anchorName === 'top' ? '/tutorial' : `/tutorial/#${anchorName}`;
      navigate(location, { replace: true });
    }
  };

  const ScrollTop = ({ children }: Props) => {
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

    return (
      <Zoom in={trigger}>
        <Box
          onClick={(event) => ScrollTo(event)}
          role="presentation"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    );
  };

  return (
    <Page title={t('common:tutorial')}>
      <Topbar />
      <Box
        py={12}
        sx={{
          backgroundColor: ({ palette }) =>
            palette.mode === 'dark' ? palette.grey[900] : palette.grey[100],
        }}
      >
        <Container maxWidth="md">
          <Stack id="top" alignItems="center" spacing={3} mb={5}>
            <Button
              color="inherit"
              onClick={() => navigate('/', { replace: true })}
              startIcon={<ArrowBackIcon />}
            >
              {t('common:homepage')}
            </Button>
            <Typography component="h1" sx={{ textTransform: 'capitalize' }} variant="h2">
              {t('common:tutorial')}
            </Typography>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              divider={<Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />}
              spacing={isMobile ? 0 : 2}
            >
              {getItems().map(({ id, title }) => (
                <Button key={id} onClick={(event) => ScrollTo(event, id)}>
                  {title}
                </Button>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={isMobile ? 10 : 20}>
            {getItems().map(({ id, path }) => (
              <Item key={id} id={id} path={path} />
            ))}
          </Stack>
          <ScrollTop {...props}>
            <Fab aria-label="scroll back to top" color="secondary" size="small">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>s
        </Container>
      </Box>
    </Page>
  );
};

export default TutorialVIew;
