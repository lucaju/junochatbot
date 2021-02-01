import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { MuuriComponent } from 'muuri-react';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Toolbar from './Toolbar';
import IntentCard from './IntentCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  spinner: {
    marginTop: '25%',
  },
}));

const title = 'Screenplay';

const ScreenplayView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await actions.screenplay.getCollection();
      setIsLoaded(true);
      setIsLoading(false);
    };
    fetchData();
    // actions.ui.u
    actions.ui.updateTitle(title);
    return () => {};
  }, []);

  const handleDetailOpen = (id) => {
    // setCurrentUserId(id);
    // setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    // setCurrentUserId(0);
    // setDetailsOpen(false);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        {!isLoaded && isLoading && (
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress
              className={classes.spinner}
              size={60}
              thickness={4}
            />
          </Box>
        )}
        {isLoaded && state.screenplay.collection.length > 0 && (
          <MuuriComponent>
            {state.screenplay.collection.map((intent) => (
              <IntentCard
                className={classes.item}
                key={intent.name}
                intent={intent}
                // triggerEditStory={triggerEditStory}
              />
            ))}
          </MuuriComponent>
        )}
      </Container>
    </Page>
  );
};

export default ScreenplayView;
