import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const useStyles = makeStyles(() => ({
  player: { width: '100%' },
}));

//REGEX
// extract the ID from the url
//anything after the character "=", exclusively;
//ex: https://www.youtube.com/watch?v=2MQx0SXLCcE -> 2MQx0SXLCcE
const regex = /(?<==)(.*)/g; //

const Player = ({ provider, source }) => {
  const classes = useStyles();
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (source === '' || source === null) return setVideoId(null);
    const id = source.match(regex);
    setVideoId(id[0]);
    return () => {};
  }, [source]);

  return (
    <>
      {videoId && provider === 'youtube' && (
        <YouTube
          videoId={videoId} // defaults -> null
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
      )}
    </>
  );
};

Player.propTypes = {
  provider: PropTypes.string,
  source: PropTypes.string,
};

export default Player;
