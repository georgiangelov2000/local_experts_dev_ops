export default function ProjectsTab({ projects, onChange, onAdd, onRemove, onFileChange }) {
    return (
      <div className="space-y-4">
        {projects.map((proj, index) => (
          <div key={proj.id} className="border rounded p-3 space-y-2">
            <input
              type="text"
              placeholder="Project Name"
              value={proj.project_name}
              onChange={(e) => onChange(index, "project_name", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            <textarea
              placeholder="Description"
              value={proj.description}
              onChange={(e) => onChange(index, "description", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            <div className="flex gap-2">
              <input
                type="datetime-local"
                value={proj.date_start}
                onChange={(e) => onChange(index, "date_start", e.target.value)}
                className="w-1/2 border border-gray-300 rounded p-2 text-sm"
              />
              <input
                type="datetime-local"
                value={proj.date_end}
                onChange={(e) => onChange(index, "date_end", e.target.value)}
                className="w-1/2 border border-gray-300 rounded p-2 text-sm"
              />
            </div>
            <select
              value={proj.status}
              onChange={(e) => onChange(index, "status", parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileChange(index, "image", e.target.files[0])}
                />
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => onFileChange(index, "video", e.target.files[0])}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 text-xs hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        {projects.length < 3 && (
          <button
            type="button"
            onClick={onAdd}
            className="bg-green-600 text-white p-3 rounded hover:bg-green-700 cursor-pointer"
          >
            Add Project
          </button>
        )}
      </div>
    );
  }
  