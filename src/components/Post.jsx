// components/Post.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStoryblokApi, useStoryblokState, renderRichText } from '@storyblok/react';
import { cn } from '../utils/cn';

function Post() {
  const { slug } = useParams();
  const storyblokApi = useStoryblokApi();
  const [story, setStory] = useState(null);

  // Fetch the story with the given slug
  useEffect(() => {
    storyblokApi
      .get(`cdn/stories/blog/${slug}`)
      .then(({ data }) => setStory(data.story));
  }, [slug, storyblokApi]);

  // Optional: Enable real-time editing if using Visual Editor
  const liveStory = useStoryblokState(story);

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
          to="/all-posts" 
          className={backLinkClasses}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
          Back to Posts
        </Link>
        <article className={articleContainerClasses} role="article" aria-label={`Post: ${title}`}>
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
