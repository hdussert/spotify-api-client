import React , { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import SpotifyWebAPI from 'spotify-web-api-node';
import Player from './Player';
import Menu from './Menu';
import Search from './Search';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Playlist from './Playlist';

export const spotifyAPI = new SpotifyWebAPI({
  clientId: '🤡'
})

const Spotify = ({code}) => {
  const [accessTokenIsSet, setAccessTokenIsSet] = useState(false);
  const accessToken = useAuth(code);

  const [playingTrack, setPlayingTrack] = useState();

  useEffect(()=> {
    if (!accessToken) return;   
    spotifyAPI.setAccessToken(accessToken);
    setAccessTokenIsSet(true);
  }, [accessToken])

  return (
    <div className='spotify'>
        {accessTokenIsSet ? 
          <div className='spotify-dashboard'>
            <Menu spotifyAPI={spotifyAPI} />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/search' element={<Search spotifyAPI={spotifyAPI} changePlayingTrack={setPlayingTrack} />}/>
              <Route path='/playlist/:playlistId' element={<Playlist spotifyAPI={spotifyAPI} changePlayingTrack={setPlayingTrack} />}/>
            </Routes>
            
          </div>
          :
          <div>No access token.</div>
        }
      <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
    </div>
  )
}

export default Spotify;