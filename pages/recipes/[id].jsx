import React, { Suspense } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import {useRouter} from "next/router";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const detailUrl = `${process.env.SPOONACULAR_BASE_URL}/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(detailUrl);
    if (!response.ok) {
      throw new Error(`Spoonacular detail API error: ${response.status}`);
    }
    const detailData = await response.json();

    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=59'
    );

    return {
      props: {
        detail: detailData,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        detail: null,
        error: err.message || 'Unknown error',
      },
    };
  }
};

const RecipeDetails = ({ detail, error }) => {
  const router = useRouter()
  if (error) {
    return (
      <div className="text-center text-red-600 mt-12">
        <p>Error loading recipe: {error}</p>
      </div>
    );
  }
  if (!detail) {
    return null;
  }

  return (
      <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-lg shadow">
        <a
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="text-blue-500 hover:underline cursor-pointer rounded bg-gradient-to-br text-2xl"
        >
          ← Back
        </a>
        <h1 className="text-2xl font-bold mb-4">{detail.title}</h1>

        {detail.image && (
            <img
                src={detail.image}
                alt={detail.title}
                className="w-full h-64 object-cover rounded mb-6"
            />
        )}

        <div className="mb-4">
          <p>
            <span className="font-semibold">Ready in:</span>{' '}
            {detail.readyInMinutes} minutes
          </p>
          <p>
            <span className="font-semibold">Servings:</span> {detail.servings}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1">
            {detail.extendedIngredients.map((ing) => (
                <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>

        {detail.summary && (
            <div className="prose prose-sm sm:prose lg:prose-lg">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <div dangerouslySetInnerHTML={{__html: detail.summary}}/>
            </div>
        )}
      </div>
  );
};

const DetailPageWrapper = (props) => (
    <Suspense fallback={<LoadingSpinner/>}>
      <RecipeDetails {...props} />
    </Suspense>
);

export default DetailPageWrapper;
