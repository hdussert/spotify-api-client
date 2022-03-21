import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?\
client_id=🤡\
&response_type=code\
&redirect_uri=http://localhost:3000\
&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private"

const Login = () => {
    return (
      <div className='login'>
        <a href={AUTH_URL}>Login with Spotify</a>
      </div>
    )
}

export default Login;