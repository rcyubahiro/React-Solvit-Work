import { useParams, useNavigate } from "react-router-dom";
import { useGetRecipeQuery } from "@/app/api/recipe";
import Navbar from "@/components/Navbar";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading, error } = useGetRecipeQuery(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
          <p className="font-semibold">Error loading recipe</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Prep Time</p>
                <p className="text-xl font-semibold text-gray-800">
                  {recipe.prepTimeMinutes} min
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Cook Time</p>
                <p className="text-xl font-semibold text-gray-800">
                  {recipe.cookTimeMinutes} min
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Servings</p>
                <p className="text-xl font-semibold text-gray-800">{recipe.servings}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Calories</p>
                <p className="text-xl font-semibold text-gray-800">
                  {recipe.caloriesPerServing}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center">
                <span className="text-3xl text-yellow-500">★</span>
                <span className="ml-2 text-2xl font-semibold text-gray-800">
                  {recipe.rating}
                </span>
                <span className="ml-2 text-gray-600">({recipe.reviewCount} reviews)</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                  {recipe.difficulty}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
                  {recipe.cuisine}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
