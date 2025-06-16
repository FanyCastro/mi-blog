import { useEffect, useState } from 'react';
import { useStoryblokApi } from '@storyblok/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

function Profile() {
  const storyblokApi = useStoryblokApi();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    storyblokApi
      .get('cdn/stories/profile')
      .then(({ data }) => setProfile(data.story));
  }, []);

  // Definir estilos comunes
  const pageContainerClasses = cn(
    "min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-10"
  );
  const contentWrapperClasses = cn(
    "max-w-4xl mx-auto px-4"
  );
  const backLinkClasses = cn(
    "inline-flex items-center text-purple-600 hover:text-purple-800",
    "mb-6 transition-colors duration-200"
  );
  const cardClasses = cn(
    "bg-white rounded-xl shadow-xl p-8 lg:p-10",
    "border border-purple-200"
  );
  const titleClasses = cn(
    "text-4xl font-extrabold text-purple-800 mb-2"
  );
  const subtitleClasses = cn(
    "text-xl text-indigo-600 mb-8"
  );
  const sectionTitleClasses = cn(
    "text-2xl font-bold text-purple-700 mb-4 mt-8"
  );
  const paragraphClasses = cn(
    "text-gray-700 leading-relaxed mb-4"
  );
  const skillTagClasses = cn(
    "inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
  );
  const linkClasses = cn(
    "text-indigo-600 hover:text-indigo-800 font-medium",
    "transition-colors duration-200"
  );

  if (!profile) return (
    <div className={cn("p-6 min-h-screen flex items-center justify-center bg-purple-50")}>
      Loading...
    </div>
  );

  const { name, role, bio, skills, experience, education, contact } = profile.content;

  return (
    <div className={pageContainerClasses}>
      <div className={contentWrapperClasses}>
        <Link to="/home" className={backLinkClasses}>
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
          Back to Home
        </Link>

        <div className={cardClasses}>
          <h1 className={titleClasses}>{name}</h1>
          <h2 className={subtitleClasses}>{role}</h2>
          
          <p className={paragraphClasses}>{bio}</p>

          <h3 className={sectionTitleClasses}>Skills</h3>
          <div className="mb-8">
            {skills.map((skill, index) => (
              <span key={index} className={skillTagClasses}>
                {skill}
              </span>
            ))}
          </div>

          <h3 className={sectionTitleClasses}>Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-700">{exp.title}</h4>
              <p className="text-gray-600 mb-2">{exp.company} • {exp.period}</p>
              <p className={paragraphClasses}>{exp.description}</p>
            </div>
          ))}

          <h3 className={sectionTitleClasses}>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-700">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institution} • {edu.year}</p>
            </div>
          ))}

          <h3 className={sectionTitleClasses}>Contact</h3>
          <div className="space-y-2">
            {contact.email && (
              <p>
                <span className="font-medium">Email: </span>
                <a href={`mailto:${contact.email}`} className={linkClasses}>
                  {contact.email}
                </a>
              </p>
            )}
            {contact.linkedin && (
              <p>
                <span className="font-medium">LinkedIn: </span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {contact.linkedin.split('//')[1]}
                </a>
              </p>
            )}
            {contact.github && (
              <p>
                <span className="font-medium">GitHub: </span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {contact.github.split('//')[1]}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 