import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './components/Post';
import AllPosts from './pages/AllPosts';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div role="main" aria-label="Mi Blog">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
