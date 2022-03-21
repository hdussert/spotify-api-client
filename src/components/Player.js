import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  
  useEffect(()=>{
    if (!trackUri) return;
    setPlay(true);
  }, [trackUri])
  
  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      play={play}
      uris={trackUri ? [trackUri] : null}
      syncExternalDevice
      callback={state => {
        if (!state.isPlaying) setPlay(false);
        console.log(state);
       }}
      showSaveIcon
      magnifySliderOnHover
      styles={{
        sliderColor: '#1eba55',
        sliderHandleColor: '#eee',
        sliderTrackColor: '#888',
        bgColor: '#181818',
        trackNameColor: '#eee',
        trackArtistColor: '#888',
        color: '#888',
      }}
    />
  )
}

export default Player;