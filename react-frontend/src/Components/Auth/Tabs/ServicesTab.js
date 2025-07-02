import React from "react";

export default function ServicesListTab({ fields, register, append, remove, errors }) {
  return (
    <div className="space-y-4">
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Добавете услугите, които предлагате на клиентите.
      </p>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded p-3 space-y-2">
          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register(`services.${index}.price`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
            {errors.services?.[index]?.price && (
              <p className="text-red-500 text-xs mt-1">{errors.services[index].price.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-xs text-gray-500">Description</label>
            <textarea
              {...register(`services.${index}.description`)}
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
            ></textarea>
            {errors.services?.[index]?.description && (
              <p className="text-red-500 text-xs mt-1">{errors.services[index].description.message}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-xs hover:underline cursor-pointer"
          >
            Remove Service
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ price: "", description: "" })}
        className="bg-green-600 text-white p-2 hover:bg-green-700 cursor-pointer"
      >
        Add Service
      </button>
    </div>
  );
}
