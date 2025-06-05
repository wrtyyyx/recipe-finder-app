import Head from 'next/head';
import SearchForm from '../components/SearchForm';

const Home = () => (
  <>
      <Head>
          <title>Recipe Finder</title>
          <link rel="icon" href="/favicon-32x32.png"/>
          <meta name="description" content="Search for recipes with filters."/>
      </Head>

      <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center pt-12">Recipe Finder</h1>
      <SearchForm />
    </main>
  </>
);

export default Home;
