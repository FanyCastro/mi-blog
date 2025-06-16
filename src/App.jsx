import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './components/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
