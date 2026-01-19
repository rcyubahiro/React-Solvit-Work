import type { Recipe } from "@/types/recipeType";

interface RecipeCardProps {
  recipe: Recipe;
  onView?: (id: number) => void;
}

export default function RecipeCard({ recipe, onView }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-bold text-gray-800">{recipe.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 h-14">{recipe.name}</h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
            {recipe.cuisine}
          </span>
          <span className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
            {recipe.difficulty}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-1">
            <span className="text-lg">⏱️</span>
            <span className="font-medium">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">🍽️</span>
            <span className="font-medium">{recipe.servings} servings</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{recipe.reviewCount}</span> reviews
          </div>
          {onView && (
            <button
              onClick={() => onView(recipe.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
