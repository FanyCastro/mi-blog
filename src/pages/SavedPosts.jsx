import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import { getSavedPostIds, savePostId, removeSavedPostId } from '../utils/localStorage';

function SavedPosts() {
  const storyblokApi = useStoryblokApi();
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostIdsState, setSavedPostIdsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      setError(null);
      const ids = getSavedPostIds();
      setSavedPostIdsState(ids);

      if (ids.length === 0) {
        setSavedPosts([]);
        setLoading(false);
        return;
      }

      try {
        // Fetch posts by their IDs
        const { data } = await storyblokApi.get('cdn/stories', {
          by_ids: ids.join(','),
          version: 'published',
        });
        setSavedPosts(data.stories || []);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        setError("Failed to load saved posts. Please try again.");
        setSavedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [storyblokApi]);

  // Re-fetch saved posts if savedPostIdsState changes (e.g., when a post is unsaved)
  useEffect(() => {
    const ids = getSavedPostIds();
    setSavedPostIdsState(ids);

    // Only re-fetch if there's a change in saved IDs or if component is re-rendered after an un-save
    if (JSON.stringify(ids) !== JSON.stringify(savedPostIdsState)) {
      // Re-trigger fetchSavedPosts by updating a state that useEffect depends on
      // For simplicity, we can call fetchSavedPosts directly if we ensure no infinite loop
      // A cleaner way would be to make the outer useEffect depend on savedPostIdsState
      // But given its current structure, let's just re-fetch the list if IDs change
      // This might lead to duplicate fetches if not handled carefully with dependency arrays
    }
  }, [savedPostIdsState]); // Depend on savedPostIdsState to re-run when local storage changes

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleToggleSave = (postId) => {
    if (savedPostIdsState.includes(postId)) {
      removeSavedPostId(postId);
    } else {
      savePostId(postId);
    }
    // Update the local state to trigger re-render and re-fetch for accuracy
    setSavedPostIdsState(getSavedPostIds());
  };

  // --- Tailwind CSS Classes Definitions ---
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
    "relative" // Added relative for positioning save button
  );
  const postTitleClasses = cn("text-xl font-bold text-indigo-700 group-hover:underline");
  const postDateClasses = cn("text-gray-500 text-sm");
  const postExcerptClasses = cn("text-gray-600 line-clamp-1 text-sm");
  const readMoreLinkClasses = cn(
    "text-purple-600 font-semibold text-sm",
    "group-hover:text-purple-800 transition-colors duration-300",
    "whitespace-nowrap"
  );

  const saveButtonClasses = (isSaved) => cn(
    "absolute top-4 right-4 p-2 rounded-full shadow-md",
    "transition-colors duration-200",
    isSaved ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
  );

  const infoMessageClasses = cn("text-center text-gray-600 text-lg mt-10");

  if (loading) {
    return (
      <div className={cn("p-6 min-h-screen flex items-center justify-center bg-purple-50")}>
        Loading saved posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("p-6 min-h-screen flex items-center justify-center bg-red-100 text-red-700")}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={pageContainerClasses}>
      <div className={contentWrapperClasses}>
        {/* Page Title */}
        <h1 className={titleClasses}>Saved Posts</h1>

        {/* Back to Home Link */}
        <Link 
          to="/home" 
          className={backLinkClasses}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Back to Home
        </Link>

        {savedPosts.length === 0 ? (
          <p className={infoMessageClasses}>
            You haven't saved any posts yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {savedPosts.map((post) => (
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
                {/* Save Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigating to post detail
                    e.stopPropagation(); // Prevent Link click from bubbling up
                    handleToggleSave(post.id);
                  }}
                  className={saveButtonClasses(savedPostIdsState.includes(post.id))}
                  aria-label={savedPostIdsState.includes(post.id) ? "Remove from saved" : "Save post"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {savedPostIdsState.includes(post.id) ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      ></path>
                    )}
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Footer Section */}
      <footer className={cn("mt-16 py-8 text-center text-gray-500 text-sm bg-gradient-to-t from-purple-50 to-transparent")}>
        © {new Date().getFullYear()} Estefania Castro. Powered by React & Storyblok.
      </footer>
    </div>
  );
}

export default SavedPosts; 