import { useTranslation } from 'react-i18next';

export default function ProjectsTab({ projects }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects?.length > 0 ? (
        projects.map((project) => {
          const hasLink = !!project.link;
          const image =
            project.image_url ||
            "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY=";
          return (
            <div
              key={project.id}
              className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-shadow duration-300"
            >
              {hasLink ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={image}
                    alt={project.project_name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              ) : (
                <img
                  src={image}
                  alt={project.project_name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {/* Overlay with info at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/10 px-4 py-3">
                <h4 className="text-lg font-bold text-white mb-1 truncate" title={project.project_name}>{project.project_name}</h4>
                <p className="text-xs text-gray-200 mb-1">
                  {new Date(project.date_start).toLocaleDateString(i18n.language)} - {new Date(project.date_end).toLocaleDateString(i18n.language)}
                </p>
              </div>
              {/* Description on hover */}
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <p className="text-sm text-white text-center line-clamp-5">{project.description}</p>
                {hasLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded shadow hover:bg-blue-700 transition-colors duration-200"
                  >
                    {t('view_project')}
                  </a>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-sm text-gray-500">{t('no_projects_available')}</div>
      )}
    </div>
  );
}
