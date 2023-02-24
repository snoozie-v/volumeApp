import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

function App() {
 

  return (
    <Routes>
      <Route path ='/' element={<Layout />}>
        <Route path ='/home' element = {<Home />} />
        <Route path ='*' element = {<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
