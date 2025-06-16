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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-100">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-500 via-purple-500 to-purple-700 py-16 mb-10 shadow-lg">
        <div className="max-w-3xl mx-auto text-center text-white px-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to My Blog</h1>
          <p className="text-xl mb-6">Discover articles about technology, programming, and more. Powered by Storyblok & React.</p>
          <div className="flex justify-center gap-4">
            <a
              href="#posts"
              className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-orange-50 transition"
            >
              Explore Posts
            </a>
            <a
              href="https://www.storyblok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-800 transition"
            >
              What is Storyblok?
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="max-w-3xl mx-auto mb-12 px-4">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-2 text-orange-700">About This Blog</h2>
          <p className="text-gray-600">
            Hi! I'm Estefania Castro. Here I share my thoughts and tutorials on web and mobile development, Java, React, and more.  
            Enjoy reading and feel free to connect!
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section id="posts" className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">Latest Posts</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-0 flex flex-col overflow-hidden"
              aria-label={`Read post: ${post.content.title}`}
            >
              {post.content.image?.filename && (
                <img
                  src={post.content.image.filename}
                  alt={post.content.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-orange-700 mb-2 group-hover:underline">{post.content.title}</h3>
                <p className="text-gray-600 flex-1 mb-4 line-clamp-3">
                  {post.content.excerpt || 'Read more...'}
                </p>
                <span className="mt-auto inline-block text-purple-600 font-semibold group-hover:text-orange-600 transition">
                  Read More →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-16 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Estefania Castro. Powered by React & Storyblok.
      </footer>
    </div>
  );
}

export default Home;
