// pages/Home.jsx
import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

function Home() {
  const storyblokApi = useStoryblokApi();
  const [posts, setPosts] = useState([]);

  // Fetch all stories under "blog/" folder (make sure you use this structure in Storyblok)
  useEffect(() => {
    storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
      sort_by: 'first_published_at:desc',
      per_page: 5,
    }).then(({ data }) => {
      setPosts(data.stories);
    });
  }, []);

  // Definir estilos comunes
  const pageContainerClasses = cn("min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200");
  const headerClasses = cn("bg-gradient-to-r from-purple-800 to-indigo-900 py-16 mb-10 shadow-lg");
  const headerContentClasses = cn("max-w-3xl mx-auto text-center text-white px-4");
  const headerTitleClasses = cn("text-5xl font-extrabold mb-4 drop-shadow-lg");
  const headerSubtitleClasses = cn("text-xl mb-6 opacity-90");
  const headerButtonsContainerClasses = cn("flex justify-center gap-4");
  const primaryButtonClasses = cn(
    "bg-white text-purple-700 font-semibold px-6 py-2 rounded-full shadow",
    "hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
  );
  const secondaryButtonClasses = cn(
    "bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow",
    "hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
  );

  const aboutSectionClasses = cn("max-w-3xl mx-auto mb-12 px-4");
  const aboutCardClasses = cn("bg-white rounded-xl shadow-lg p-6 text-center border border-purple-200");
  const aboutTitleClasses = cn("text-2xl font-bold mb-2 text-purple-800");
  const aboutTextClasses = cn("text-gray-700");
  const profileLinkClasses = cn(
    "text-purple-600 hover:text-purple-800 font-semibold",
    "transition-colors duration-200"
  );

  const postsSectionClasses = cn("max-w-6xl mx-auto px-4 py-8");
  const postsTitleClasses = cn("text-3xl font-bold text-indigo-900 mb-8 text-center");
  const postsGridClasses = cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3");
  const postCardClasses = cn(
    "group bg-white rounded-xl shadow-xl hover:shadow-2xl",
    "transition-all duration-300 transform hover:-translate-y-1 p-0 flex flex-col overflow-hidden",
    "border border-purple-200 hover:border-purple-400"
  );
  const postImageClasses = cn("h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300");
  const postContentClasses = cn("p-6 flex-1 flex flex-col");
  const postTitleClasses = cn("text-xl font-bold text-purple-700 mb-2 group-hover:underline");
  const postExcerptClasses = cn("text-gray-600 flex-1 mb-4 line-clamp-3");
  const postReadMoreClasses = cn(
    "mt-auto inline-block text-indigo-600 font-semibold",
    "group-hover:text-purple-800 transition-colors duration-300"
  );

  const viewAllCardClasses = cn(
    "group bg-purple-600 text-white rounded-xl shadow-xl hover:shadow-2xl",
    "transition-all duration-300 transform hover:-translate-y-1 p-6 flex flex-col items-center justify-center text-center",
    "border border-purple-400 hover:border-purple-600"
  );
  const viewAllIconClasses = cn("w-16 h-16 mb-4");
  const viewAllTitleClasses = cn("text-2xl font-bold mb-2 group-hover:underline");
  const viewAllTextClasses = cn("text-purple-200");

  const footerClasses = cn("mt-16 py-8 text-center text-gray-500 text-sm bg-gradient-to-t from-purple-50 to-transparent");

  return (
    <div className={pageContainerClasses}>
      {/* Hero Section */}
      <header className={headerClasses}>
        <div className={headerContentClasses}>
          <h1 className={headerTitleClasses}>Welcome to My Blog</h1>
          <p className={headerSubtitleClasses}>Discover articles about technology, programming, and more. Powered by Storyblok & React.</p>
          <div className={headerButtonsContainerClasses}>
            <a
              href="#posts"
              className={primaryButtonClasses}
            >
              Explore Posts
            </a>
            <a
              href="https://www.storyblok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClasses}
            >
              What is Storyblok?
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className={aboutSectionClasses}>
        <div className={aboutCardClasses}>
          <h2 className={aboutTitleClasses}>About This Blog</h2>
          <p className={aboutTextClasses}>
            Hi! I'm <Link to="/profile" className={profileLinkClasses}>Estefania Castro</Link>. Here I share my thoughts and tutorials on web and mobile development, Java, React, and more.  
            Enjoy reading and feel free to connect!
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section id="posts" className={postsSectionClasses}>
        <h2 className={postsTitleClasses}>Latest Posts</h2>
        <div className={postsGridClasses}>
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={postCardClasses}
              aria-label={`Read post: ${post.content.title}`}
            >
              {post.content.image?.filename && (
                <img
                  src={post.content.image.filename}
                  alt={post.content.title}
                  className={postImageClasses}
                />
              )}
              <div className={postContentClasses}>
                <h3 className={postTitleClasses}>{post.content.title}</h3>
                <p className={postExcerptClasses}>
                  {post.content.excerpt || 'Click to read more...'}
                </p>
                <span className={postReadMoreClasses}>
                  Read More →
                </span>
              </div>
            </Link>
          ))}

          <Link
            to="/all-posts"
            className={viewAllCardClasses}
            aria-label="View all blog posts"
          >
            <svg className={viewAllIconClasses} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
            <h3 className={viewAllTitleClasses}>View All Posts</h3>
            <p className={viewAllTextClasses}>Browse our complete archive of articles.</p>
          </Link>
        </div>
      </section>

      <footer className={footerClasses}>
        © {new Date().getFullYear()} Estefania Castro. Powered by React & Storyblok.
      </footer>
    </div>
  );
}

export default Home;
