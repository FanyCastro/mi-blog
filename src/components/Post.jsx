// components/Post.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoryblokApi, useStoryblokState, renderRichText } from '@storyblok/react';

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

  if (!liveStory) return <div className="p-6 min-h-screen flex items-center justify-center bg-purple-50" role="status" aria-label="Cargando...">Loading...</div>;

  const { title, content, image } = liveStory.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-10">
      <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 lg:p-10 border border-purple-200" role="article" aria-label={`Post: ${title}`}>
        <h1 className="text-4xl font-extrabold text-purple-800 mb-6 leading-tight">{title}</h1>
        {image?.filename && (
          <img
            src={image.filename}
            alt={title}
            className="rounded-lg max-w-full h-auto mx-auto my-8 shadow-md"
            aria-label={`Imagen de ${title}`}
          />
        )}
        {/* Display the richtext content */}
        <div className="prose lg:prose-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderRichText(content) }} aria-label="Contenido del post" />
      </article>
    </div>
  );
}

export default Post;
