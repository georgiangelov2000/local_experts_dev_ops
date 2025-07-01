export default function ProjectsTab({ projects }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
              <img
                src={project.image_url || "https://media.istockphoto.com/id/1444666625/photo/online-advertising-concept-ad-on-internet.jpg?s=612x612&w=0&k=20&c=Lp2QzOAMWOt4QaJRyk5aBUIkw6EgnsjcvDuDIktJ8yY="}
                alt={project.project_name}
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <h4 className="font-medium text-sm mb-1">{project.project_name}</h4>
                <p className="text-xs text-gray-600 mb-1">{project.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(project.date_start).toLocaleDateString()} - {new Date(project.date_end).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No projects available.</div>
        )}
      </div>
    );
  }
  