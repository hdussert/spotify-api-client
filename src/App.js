import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Fragment } from 'react';
import './sass/app.scss';

import Login from './components/Login';
import Spotify from './components/Spotify';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <Router>
      <Fragment>
        {code ? <Spotify code={code} /> : <Login/>}
      </Fragment>
    </Router>
  );
}

export default App;