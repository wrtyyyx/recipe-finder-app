import React from 'react';
import Link from 'next/link';

const RecipeCard = ({ id, title, image }) => {
  return (
    <Link
      href={`/recipes/${id}`}
      className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200"
    >
      {image ? (
        <div className="h-48 w-full relative">
          <img src={image} alt={title} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 truncate">{title}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard;
