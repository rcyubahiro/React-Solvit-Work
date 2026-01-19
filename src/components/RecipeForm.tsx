import { useState } from "react";
import type { Recipe } from "@/types/recipeType";   

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: Partial<Recipe>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RecipeForm({ recipe, onSubmit, onCancel, isLoading }: RecipeFormProps) {
  const [formData, setFormData] = useState<Partial<Recipe>>({
    name: recipe?.name || "",
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
    prepTimeMinutes: recipe?.prepTimeMinutes || 0,
    cookTimeMinutes: recipe?.cookTimeMinutes || 0,
    servings: recipe?.servings || 1,
    difficulty: recipe?.difficulty || "",
    cuisine: recipe?.cuisine || "",
    caloriesPerServing: recipe?.caloriesPerServing || 0,
    tags: recipe?.tags || [],
    image: recipe?.image || "",
    mealType: recipe?.mealType || [],
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("Time") || name === "servings" || name === "caloriesPerServing" 
        ? Number(value) 
        : value
    }));
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), ingredientInput.trim()]
      }));
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients?.filter((_, i) => i !== index)
    }));
  };

  const handleAddInstruction = () => {
    if (instructionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        instructions: [...(prev.instructions || []), instructionInput.trim()]
      }));
      setInstructionInput("");
    }
  };

  const handleRemoveInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions?.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {recipe ? "Edit Recipe" : "Create New Recipe"}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Recipe Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            title="Select difficulty level"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="prepTimeMinutes" className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min)</label>
          <input
            type="number"
            id="prepTimeMinutes"
            name="prepTimeMinutes"
            value={formData.prepTimeMinutes}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="cookTimeMinutes" className="block text-sm font-medium text-gray-700 mb-2">Cook Time (min)</label>
          <input
            type="number"
            id="cookTimeMinutes"
            name="cookTimeMinutes"
            value={formData.cookTimeMinutes}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="caloriesPerServing" className="block text-sm font-medium text-gray-700 mb-2">Calories Per Serving</label>
        <input
          type="number"
          id="caloriesPerServing"
          name="caloriesPerServing"
          value={formData.caloriesPerServing}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Ingredients */}
      <div>
        <label htmlFor="ingredient-input" className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="ingredient-input"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
            placeholder="Add ingredient..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {formData.ingredients?.map((ingredient, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
              <span>{ingredient}</span>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <label htmlFor="instruction-input" className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
        <div className="flex gap-2 mb-2">
          <textarea
            id="instruction-input"
            value={instructionInput}
            onChange={(e) => setInstructionInput(e.target.value)}
            placeholder="Add instruction step..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
          />
          <button
            type="button"
            onClick={handleAddInstruction}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {formData.instructions?.map((instruction, index) => (
            <li key={index} className="flex justify-between items-start bg-gray-50 px-3 py-2 rounded">
              <span className="flex-1">
                <strong>Step {index + 1}:</strong> {instruction}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveInstruction(index)}
                className="text-red-600 hover:text-red-800 ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tag-input" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="tag-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add tag..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="text-blue-600 hover:text-blue-800 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Saving..." : recipe ? "Update Recipe" : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
