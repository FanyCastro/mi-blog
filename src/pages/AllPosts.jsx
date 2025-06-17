import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { getSavedPostIds, savePostId, removeSavedPostId } from '../utils/localStorage';
import { getPlainTextFromRichText } from '../utils/textUtils';

function AllPosts() {
  const storyblokApi = useStoryblokApi();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const postsPerPage = 5;

  useEffect(() => {
    storyblokApi.get('cdn/stories', {
      starts_with: 'blog/',
      sort_by: 'first_published_at:desc',
      per_page: 100,
    }).then(({ data }) => {
      setPosts(data.stories);
      setLikedPostIds(getSavedPostIds()); // Load liked post IDs on fetch
    });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handler to toggle like status of a post
  const handleToggleLike = (postId) => {
    if (likedPostIds.includes(postId)) {
      removeSavedPostId(postId);
      setLikedPostIds(getSavedPostIds());
    } else {
      savePostId(postId);
      setLikedPostIds(getSavedPostIds());
    }
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
    "bg-white rounded-xl shadow-md p-6 border border-purple-200",
    "hover:shadow-xl hover:ring-2 hover:ring-purple-300 transition-all duration-300 transform hover:-translate-y-1",
    "flex flex-col md:flex-row md:items-center gap-4",
    "relative" // Added for positioning the like button
  );
  const postTitleClasses = cn("text-2xl font-extrabold text-indigo-800 group-hover:underline");
  const postDateClasses = cn("text-gray-500 text-sm");
  const postExcerptClasses = cn("text-gray-700 line-clamp-2 text-base mt-2");
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

  // Like button styles
  const likeButtonClasses = (isLiked) => cn(
    "absolute top-4 right-4 p-2 rounded-full shadow-md",
    "transition-all duration-300 transform hover:scale-110",
    isLiked ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
                  <div className="flex-grow pr-12">
                    <h2 className={postTitleClasses}>{post.content.title}</h2>
                    <p className={postDateClasses}>
                      {formatDate(post.first_published_at)}
                    </p>
                    <p className={postExcerptClasses}>
                      {post.content.excerpt || getPlainTextFromRichText(post.content.content)}
                    </p>
                  </div>
                </div>
              </Link>
              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigating to post detail
                  e.stopPropagation(); // Prevent Link click from bubbling up
                  handleToggleLike(post.id);
                }}
                className={likeButtonClasses(likedPostIds.includes(post.id))}
                aria-label={likedPostIds.includes(post.id) ? "Unlike post" : "Like post"}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {likedPostIds.includes(post.id) ? (
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    ></path>
                  ) : (
                    <path
                      d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.46L5.78 11.23a4.016 4.016 0 010-5.66c.94-.94 2.45-.94 3.39 0L12 7.74l2.83-2.83c.94-.94 2.45-.94 3.39 0 .94.94.94 2.45 0 3.39L12.09 18.47c-.01.01-.01.01-.02.01-.01.01-.01.01-.02.01z"
                    ></path>
                  )}
                </svg>
              </button>
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