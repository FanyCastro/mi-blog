import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

function AllPosts() {
  const storyblokApi = useStoryblokApi();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
      sort_by: 'first_published_at:desc',
      per_page: 100,
    }).then(({ data }) => {
      setPosts(data.stories);
    });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Definir estilos comunes para este componente
  const pageContainerClasses = cn("min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-10");
  const contentWrapperClasses = cn("max-w-4xl mx-auto px-4");
  const titleClasses = cn("text-4xl font-extrabold text-purple-800 mb-8 text-center");
  const backLinkClasses = cn(
    "inline-flex items-center text-purple-600 hover:text-purple-800",
    "mb-6 transition-colors duration-200"
  );
  const listItemClasses = cn(
    "bg-white rounded-lg shadow-md p-4 border border-purple-200",
    "hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5",
    "flex flex-col md:flex-row md:items-center gap-4"
  );
  const postTitleClasses = cn("text-xl font-bold text-indigo-700 group-hover:underline");
  const postDateClasses = cn("text-gray-500 text-sm");
  const postExcerptClasses = cn("text-gray-600 line-clamp-1 text-sm");
  const readMoreLinkClasses = cn(
    "text-purple-600 font-semibold text-sm",
    "group-hover:text-purple-800 transition-colors duration-300",
    "whitespace-nowrap"
  );
  const footerClasses = cn("mt-16 py-8 text-center text-gray-500 text-sm bg-gradient-to-t from-purple-50 to-transparent");

  // Pagination styles
  const paginationContainerClasses = cn(
    "flex justify-center items-center space-x-2 mt-8"
  );
  const paginationButtonClasses = cn(
    "px-3 py-1 rounded-md text-sm font-medium",
    "transition-colors duration-200"
  );
  const activePageButtonClasses = cn(
    paginationButtonClasses,
    "bg-purple-600 text-white hover:bg-purple-700"
  );
  const inactivePageButtonClasses = cn(
    paginationButtonClasses,
    "bg-white text-purple-600 hover:bg-purple-50 border border-purple-200"
  );

  return (
    <div className={pageContainerClasses}>
      <div className={contentWrapperClasses}>
        <h1 className={titleClasses}>All Blog Posts</h1>
        <Link 
          to="/home" 
          className={backLinkClasses}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Back to Home
        </Link>
        
        <ul className="space-y-3">
          {currentPosts.map((post) => (
            <li key={post.id} className={listItemClasses}>
              <Link to={`/blog/${post.slug}`} className="block group flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex-grow">
                    <h2 className={postTitleClasses}>{post.content.title}</h2>
                    <p className={postDateClasses}>
                      {formatDate(post.first_published_at)}
                    </p>
                    <p className={postExcerptClasses}>
                      {post.content.excerpt || 'Click to read more...'}
                    </p>
                  </div>
                  <span className={readMoreLinkClasses}>
                    Read Post →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={paginationContainerClasses}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                paginationButtonClasses,
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-50'
              )}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? activePageButtonClasses : inactivePageButtonClasses}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                paginationButtonClasses,
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-50'
              )}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <footer className={footerClasses}>
        © {new Date().getFullYear()} Estefania Castro. Powered by React & Storyblok.
      </footer>
    </div>
  );
}

export default AllPosts; 