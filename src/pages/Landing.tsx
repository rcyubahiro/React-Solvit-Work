import { useState, useEffect } from "react";
import { useGetRecipesQuery } from "@/app/api/recipe";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const itemsPerPage = 12;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(0); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = useGetRecipesQuery({
    limit: itemsPerPage,
    skip: currentPage * itemsPerPage,
    q: debouncedSearch || undefined,
    sortBy,
    order,  }, {
    // Auto-refresh every 10 seconds
    pollingInterval: 10000,
    // Refetch on window focus
    refetchOnFocus: true,  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  const handleViewRecipe = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 fade-in">
            Discover Amazing Recipes
          </h1>
          <p className="text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world and create your own culinary masterpieces
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Go to Dashboard →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-xl">🔍</span>
                Search Recipes
              </label>
              <input
                type="text"
                placeholder="Search by name, ingredients, cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none hover:border-gray-400"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-xl">⚙️</span>
                Sort By
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none hover:border-gray-400 font-medium"
                  title="Sort recipes by"
                >
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                  <option value="prepTimeMinutes">Prep Time</option>
                  <option value="caloriesPerServing">Calories</option>
                </select>
                <button
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-bold text-lg shadow-md hover:shadow-lg transform hover:scale-105"
                  title={order === "asc" ? "Ascending" : "Descending"}
                >
                  {order === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          {data && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {currentPage * itemsPerPage + 1} -{" "}
              {Math.min((currentPage + 1) * itemsPerPage, data.total)} of {data.total} recipes
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            Error loading recipes. Please try again later.
          </div>
        )}

        {/* Recipes Grid */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onView={handleViewRecipe}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
                >
                  ← Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i;
                    } else if (currentPage < 3) {
                      pageNum = i;
                    } else if (currentPage > totalPages - 4) {
                      pageNum = totalPages - 5 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-3 rounded-xl transition-all font-semibold shadow-md ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110 shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
