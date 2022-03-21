import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MenuLink from './MenuLink';
import Playlist from './Playlist';

const Menu = ({ spotifyAPI }) => {
  const [ userID, setUserID ] = useState();
  const [ userName, setUserName ] = useState();
  const [ userPicture, setUserPicture ] = useState();
  const [ playlists, setPlaylists ] = useState();

  useEffect(() => {
    spotifyAPI.getMe()
    .then(data => {
      setUserID(data.body.id);
      setUserName(data.body.display_name);
      setUserPicture(data.body.images[0].url);
    }, err => {
      console.log(err)
    })
  }, [spotifyAPI])

  useEffect(()=> {
    if (!userID) return;
    spotifyAPI.getUserPlaylists()
    .then(data => {
      console.log(data.body);
      setPlaylists(data.body.items.map(playlist => {
        return {
          id: playlist.id,
          name: playlist.name
        }
      }));
    }, err => {
      console.log(err);
    })
  }, [userID])


  return (
    <div className='menu'>
      
      <div className='menu-profile'>
        <img src={userPicture} style={{width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50px'}} />
        {userName}
      </div>

      <div className='menu-nav'>
        <MenuLink to='/'>
          <svg><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
          Home
        </MenuLink>

        <MenuLink to='/search'>
          <svg><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
          Search
        </MenuLink>

        <MenuLink to='/liked'>
          <svg viewBox="0 0 16 16"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>
          Liked Songs
        </MenuLink>
      </div>
          
      {playlists  ? 
        <div className='menu-playlists'> 
          { playlists.map(p => <MenuLink to={'/playlist/' + p.id} key={p.id}> {p.name} </MenuLink>) }
        </div>    
      : ''} 
    </div>
  )
}

export default Menu