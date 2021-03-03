import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import YouTube from 'react-youtube';

const useStyles = makeStyles(() => ({
  player: { width: '100%' },
}));

const Player = ({ youtubeVideoId }) => {
  const classes = useStyles();

  return (
    <YouTube
      videoId={youtubeVideoId} // defaults -> null
      // id={string} // defaults -> null
      className={classes.player} // defaults -> null
      // containerClassName={string} // defaults -> ''
      // opts={opts} // defaults -> {}
      // onReady={func} // defaults -> noop
      // onPlay={func} // defaults -> noop
      // onPause={func} // defaults -> noop
      // onEnd={func} // defaults -> noop
      // onError={func} // defaults -> noop
      // onStateChange={func} // defaults -> noop
      // onPlaybackRateChange={func} // defaults -> noop
      // onPlaybackQualityChange={func} // defaults -> noop
    />
  );
};

Player.propTypes = {
  youtubeVideoId: PropTypes.string,
};

export default Player;
