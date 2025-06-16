// pages/Home.jsx
import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';

function Home() {
  const storyblokApi = useStoryblokApi();
  const [posts, setPosts] = useState([]);

  // Fetch all stories under "blog/" folder (make sure you use this structure in Storyblok)
  useEffect(() => {
    storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
    }).then(({ data }) => {
      setPosts(data.stories);
    });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Blog</h1>
      {posts.map((post) => (
        <a
          key={post.id}
          href={`/${post.slug}`}
          className="block p-4 mb-4 bg-white shadow rounded hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">{post.content.title}</h2>
        </a>
      ))}
    </div>
  );
}

export default Home;
