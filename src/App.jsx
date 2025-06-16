import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './components/Post';
import AllPosts from './pages/AllPosts';
import Profile from './pages/Profile';
import SavedPosts from './pages/SavedPosts';

function App() {
  return (
    <BrowserRouter>
      <div role="main" aria-label="Mi Blog">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/blog/all-posts" element={<AllPosts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/saved-posts" element={<SavedPosts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
