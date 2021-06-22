// import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import YouTube from 'react-youtube';

interface PlayerProps {
  youtubeVideoId: string;
}

// const useStyles = makeStyles(() => ({
//   player: { width: '100%' },
// }));

const Player: FC<PlayerProps> = ({ youtubeVideoId }) => {

  return (
    <YouTube
      videoId={youtubeVideoId} // defaults -> null
      // id={string} // defaults -> null
      // className={classes.player} // defaults -> null
      // style={{ width: '100%'}}
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

export default Player;
