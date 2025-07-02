import React from "react";

export default function ProjectsTab({ fields, register, remove, append }) {
  return (
    <div className="space-y-4">
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Добавете до 3 проекта, с които да демонстрирате опита си.
      </p>
      {fields.map((proj, index) => (
        <div key={proj.id} className="border rounded p-3 space-y-2">
          <input
            type="text"
            {...register(`projects.${index}.project_name`, { required: "Project name is required" })}
            placeholder="Project Name"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
          <textarea
            {...register(`projects.${index}.description`)}
            placeholder="Description"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />

          <div className="flex gap-2">
            <input
              type="datetime-local"
              {...register(`projects.${index}.date_start`)}
              className="w-1/2 border border-gray-300 rounded p-2 text-sm"
            />

            <input
              type="datetime-local"
              {...register(`projects.${index}.date_end`)}
              className="w-1/2 border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <select
            {...register(`projects.${index}.status`)}
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
                {...register(`projects.${index}.image`)}
              />
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="video/*"
                {...register(`projects.${index}.video`)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-xs hover:underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
      {fields.length < 3 && (
        <button
          type="button"
          onClick={() =>
            append({
              project_name: "",
              description: "",
              date_start: "",
              date_end: "",
              status: 1,
              image: null,
              video: null,
            })
          }
          className="bg-green-600 text-white p-3 hover:bg-green-700 cursor-pointer"
        >
          Add Project
        </button>
      )}
    </div>
  );
}
