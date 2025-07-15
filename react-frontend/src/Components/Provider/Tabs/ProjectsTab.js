import { useTranslation } from 'react-i18next';

export default function ProjectsTab({ projects }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {projects?.length > 0 ? (
        projects.map((project) => (
          <div
            key={project.id}
            className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200"
          >
            <img
              src={
                project.image_url ||
                "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY="
              }
              alt={project.project_name}
              className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay with info */}
            <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1">{project.project_name}</h4>
              <p className="text-xs sm:text-sm text-gray-200 mb-1">{project.description}</p>
              <p className="text-xs sm:text-sm text-gray-300 mb-2">
                {new Date(project.date_start).toLocaleDateString(i18n.language)} - {new Date(project.date_end).toLocaleDateString(i18n.language)}
              </p>
              <a
                href={`/projects/${project.id}`}
                className="text-xs sm:text-sm font-medium text-blue-300 hover:underline"
              >
                {t('view_project')} →
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500">{t('no_projects_available')}</div>
      )}
    </div>
  );
}
