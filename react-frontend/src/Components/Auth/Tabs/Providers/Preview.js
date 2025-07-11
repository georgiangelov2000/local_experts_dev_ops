import React from "react";

export default function Preview({ data }) {
  if (!data) return <div className="text-center text-gray-500">No data to preview.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Business Profile Preview</h2>
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold">Business Info</h3>
        <div className="text-sm text-gray-700">
          <div><span className="font-medium">Name:</span> {data.business_name}</div>
          <div><span className="font-medium">Email:</span> {data.email}</div>
          <div><span className="font-medium">Category:</span> {data.category_name || data.category_id}</div>
          <div><span className="font-medium">Description:</span> {data.description}</div>
        </div>
      </div>
      {data.projects && Array.isArray(data.projects) && data.projects.length > 0 && (
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <ul className="space-y-2">
            {data.projects.map((proj, idx) => (
              <li key={proj.id || idx} className="bg-gray-50 p-3 rounded">
                <div className="font-medium">{proj.project_name}</div>
                <div className="text-xs text-gray-600">{proj.description}</div>
                <div className="text-xs text-gray-400">{proj.date_start} - {proj.date_end}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.services && Array.isArray(data.services) && data.services.length > 0 && (
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="space-y-2">
            {data.services.map((service, idx) => (
              <li key={service.id || idx} className="bg-gray-50 p-3 rounded">
                <div className="font-medium">{service.description}</div>
                <div className="text-xs text-gray-600">Price: {service.price}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0 && (
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">Certifications</h3>
          <ul className="space-y-2">
            {data.certifications.map((cert, idx) => (
              <li key={cert.id || idx} className="bg-gray-50 p-3 rounded">
                <div className="font-medium">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.contacts && (
        <div>
          <h3 className="text-lg font-semibold">Contact Info</h3>
          <div className="text-sm text-gray-700">
            <div><span className="font-medium">Phone:</span> {data.contacts.phone}</div>
            <div><span className="font-medium">Email:</span> {data.contacts.email}</div>
            <div><span className="font-medium">Facebook:</span> {data.contacts.facebook}</div>
            <div><span className="font-medium">Instagram:</span> {data.contacts.instagram}</div>
            <div><span className="font-medium">Website:</span> {data.contacts.website}</div>
            <div><span className="font-medium">Address:</span> {data.contacts.address}</div>
          </div>
        </div>
      )}
    </div>
  );
} 