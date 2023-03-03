import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NoPage from './pages/NoPage';
import SweeperTrack from './pages/SweeperTrack';
import SweeperTrackB from './pages/SweeperTrackB';

function App() {
 

  return (
    <Routes>
      <Route path ='/' element={<Layout />}>
        <Route path ='/home' element = {<Home />} />
        <Route path ='/about' element = {<About />} />
        <Route path ='/sweepertrack' element = {<SweeperTrack />} />
        <Route path ="/sweepertrackb" element = {<SweeperTrackB />} />
        <Route path ='*' element = {<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
