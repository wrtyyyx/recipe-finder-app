# Recipe Finder App

A Next.js application to search for recipes using Spoonacular’s API, with filters for cuisine and preparation time. Built with SSR, Tailwind CSS, React Suspense, and 1-minute caching.

---

## Features

- **Search Page** (`/`):

  - Enter a recipe query (e.g. "pasta").
  - Choose a cuisine (Italian, Mexican, Chinese, etc.).
  - Set a maximum preparation time (in minutes).
  - “Next” button navigates to results once at least one filter is filled.

- **Recipes List Page** (`/recipes`):

  - Server-side render (SSR) with query params.
  - Fetch recipes from Spoonacular’s `/complexSearch` endpoint.
  - Cache results for 1 minute (via `Cache-Control` header).
  - Display recipe image + title in a responsive grid.
  - Click on a recipe to view details.

- **Recipe Details Page** (`/recipes/[id]`):

  - SSR fetch from `/recipes/{id}/information`.
  - Show title, image, ingredients, prep time, servings, summary.
  - Cache for 1 minute (via `Cache-Control`).
  - Use React Suspense for any child component lazy loading.

- **Styling**:

  - Tailwind CSS for all UI components.
  - Responsive and accessible design.

- **Code Quality**:
  - ESLint + Prettier configured for consistent style.

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/recipe-finder-app.git
   cd recipe-finder-app
   ```
2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up environment variables**/

- Create a .env.local in the root:
  `SPOONACULAR_API_KEY=YOUR_API_KEY_HERE`
- Replace YOUR_API_KEY_HERE with your Spoonacular key.

4. **Run the development server**

```bash
   npm run build
   npm start
```
