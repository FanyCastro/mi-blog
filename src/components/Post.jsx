// components/Post.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoryblokApi, useStoryblokState } from '@storyblok/react';

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

  if (!liveStory) return <div className="p-6">Loading...</div>;

  const { title, content, image } = liveStory.content;

  return (
    <div className="prose lg:prose-xl mx-auto p-6">
      <h1>{title}</h1>
      {image?.filename && (
        <img
          src={image.filename}
          alt={title}
          className="rounded-lg max-w-full h-auto"
        />
      )}
      {/* Display the richtext content */}
      <div dangerouslySetInnerHTML={{ __html: content?.content }} />
    </div>
  );
}

export default Post;
