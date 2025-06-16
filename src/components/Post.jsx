// components/Post.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStoryblokApi, useStoryblokState, renderRichText } from '@storyblok/react';
import { cn } from '../utils/cn';
import { isPostSaved, savePostId, removeSavedPostId } from '../utils/localStorage';

function Post() {
  const { slug } = useParams();
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch the story with the given slug
  useEffect(() => {
    storyblokApi
      .get(`cdn/stories/blog/${slug}`)
      .then(({ data }) => {
        setStory(data.story);
        // Check if the fetched post is liked in localStorage
        if (data.story) {
          setIsLiked(isPostSaved(data.story.id));
        }
      });
  }, [slug, storyblokApi]);

  // Optional: Enable real-time editing if using Visual Editor
  const liveStory = useStoryblokState(story);

  // Handler to toggle like status of a post
  const handleToggleLike = (postId) => {
    if (isLiked) {
      removeSavedPostId(postId);
      setIsLiked(false);
    } else {
      savePostId(postId);
      setIsLiked(true);
    }
  };

  // Definir estilos comunes para este componente
  const loadingStateClasses = cn("p-6 min-h-screen flex items-center justify-center bg-purple-50");
  const articleContainerClasses = cn(
    "max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 lg:p-10",
    "border border-purple-200"
  );
  const titleClasses = cn("text-4xl font-extrabold text-purple-800 mb-6 leading-tight");
  const imageClasses = cn("rounded-lg max-w-full h-auto mx-auto my-8 shadow-md");
  const contentClasses = cn("prose lg:prose-xl text-gray-700 leading-relaxed");
  const backLinkClasses = cn(
    "inline-flex items-center text-purple-600 hover:text-purple-800",
    "mb-6 transition-colors duration-200"
  );

  // Styles for the like button (changed from saveButtonClasses)
  const likeButtonClasses = (isLiked) => cn(
    "inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md mb-4",
    "transition-colors duration-200",
    isLiked ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
  );

  if (!liveStory) return (
    <div className={loadingStateClasses} role="status" aria-label="Cargando...">
      Loading...
    </div>
  );

  const { title, content, image } = liveStory.content;

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-10")}>
      <div className="max-w-3xl mx-auto px-4">
        <Link 
          to="/blog/all-posts" 
          className={backLinkClasses}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Back to Posts
        </Link>
        <article className={articleContainerClasses} role="article" aria-label={`Post: ${title}`}>
          {/* Like Button */}
          <button
            onClick={() => handleToggleLike(liveStory.id)}
            className={likeButtonClasses(isLiked)}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isLiked ? (
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                ></path>
              ) : (
                <path
                  d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.46L5.78 11.23a4.016 4.016 0 010-5.66c.94-.94 2.45-.94 3.39 0L12 7.74l2.83-2.83c.94-.94 2.45-.94 3.39 0 .94.94.94 2.45 0 3.39L12.09 18.47c-.01.01-.01.01-.02.01-.01.01-.01.01-.02.01z"
                ></path>
              )}
            </svg>
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <h1 className={titleClasses}>{title}</h1>
          {image?.filename && (
            <img
              src={image.filename}
              alt={title}
              className={imageClasses}
              aria-label={`Imagen de ${title}`}
            />
          )}
          {/* Display the richtext content */}
          <div className={contentClasses} dangerouslySetInnerHTML={{ __html: renderRichText(content) }} aria-label="Contenido del post" />
        </article>
      </div>
    </div>
  );
}

export default Post;
