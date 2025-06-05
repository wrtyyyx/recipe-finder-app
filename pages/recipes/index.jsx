import Head from 'next/head';
import RecipeCard from '../../components/RecipeCard';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx) => {
  const { query = '', cuisine = '', maxReadyTime = '' } = ctx.query;
  const apiKey = process.env.SPOONACULAR_API_KEY || '';

  if (!apiKey) {
    return {
      props: {
        recipes: [],
        error: 'SPOONACULAR_API_KEY is not defined',
      },
    };
  }

  const spParams = new URLSearchParams();
  if (query) spParams.append('query', query);
  if (cuisine) spParams.append('cuisine', cuisine);
  if (maxReadyTime) spParams.append('maxReadyTime', maxReadyTime);
  spParams.append('apiKey', apiKey);

  try {
    const response = await fetch(
      `${process.env.SPOONACULAR_BASE_URL}/recipes/complexSearch?${spParams.toString()}`
    );
    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`);
    }
    const data = await response.json();

    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=59'
    );

    return {
      props: {
        recipes: data.results || [],
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        recipes: [],
        error: err.message || 'Unknown error',
      },
    };
  }
};

const RecipesPage = ({ recipes, error }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Recipe Results</title>
        <meta
          name="description"
          content={
            error
              ? 'Ошибка при получении рецептов'
              : 'Результаты поиска рецептов'
          }
        />
      </Head>

      <main className="min-h-screen bg-gray-100 p-6">
        <a
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="text-blue-500 hover:underline cursor-pointer border-2 rounded bg-gradient-to-br text-2xl"
        >
          ← Back
        </a>
        {error ? (
          <div className="text-center text-red-600">
            <p>Error fetching recipes: {error}</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center text-gray-700">
            <p>No recipes found for these filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((r) => (
              <RecipeCard
                key={r.id}
                id={r.id}
                title={r.title}
                image={r.image}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default RecipesPage;
