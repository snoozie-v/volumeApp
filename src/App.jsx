import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NoPage from './pages/NoPage.jsx';
import SweeperTrack from './pages/SweeperTrack.jsx';
import SweeperTrackB from './pages/SweeperTrackB.jsx';
import TopicZero from './pages/TopicZero.jsx';
import Testing from './pages/Testing.jsx'

function App() {
 

  return (
    <Routes>
      <Route path ='/' element={<Layout />}>
        <Route path ='/home' element = {<Home />} />
        <Route path ='/wallet' element = {<About />} />
        <Route path ='/topiczero' element = {<TopicZero />} />
        <Route path ='/sweepertrack' element = {<SweeperTrack />} />
        <Route path ="/sweepertrackb" element = {<SweeperTrackB />} />
        <Route path ="/testing" element = {<Testing />} />
        <Route path ='*' element = {<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
