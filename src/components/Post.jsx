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

  if (!liveStory) return <div className="p-6" role="status" aria-label="Cargando...">Loading...</div>;

  const { title, content, image } = liveStory.content;
  
  return (
    <div className="prose lg:prose-xl mx-auto p-6" role="article" aria-label={`Post: ${title}`}>
      <h1>{title}</h1>
      {image?.filename && (
        <img
          src={image.filename}
          alt={title}
          className="rounded-lg max-w-md w-full h-auto mx-auto my-6"
          aria-label={`Imagen de ${title}`}
        />
      )}
      {/* Display the richtext content */}
      <div dangerouslySetInnerHTML={{ __html: renderRichText(content) }} aria-label="Contenido del post" />
    </div>
  );
}

export default Post;
