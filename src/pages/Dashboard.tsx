import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { logout } from "@/app/features/auth/authSlice";
import { useGetCurrentUserQuery } from "@/app/api/auth";
import {
  useGetRecipesQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/app/api/recipe";
import RecipeCard from "@/components/RecipeCard";
import RecipeForm from "@/components/RecipeForm";
import Toast from "@/components/Toast";
import ConfirmModal from "@/components/ConfirmModal";
import type { Recipe } from "@/types/recipeType";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; recipeId: number | null }>({
    isOpen: false,
    recipeId: null,
  });

  const itemsPerPage = 8;

  const { data: userData, isLoading: userLoading } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const { data, isLoading, refetch } = useGetRecipesQuery(
    {
      limit: itemsPerPage,
      skip: currentPage * itemsPerPage,
      q: searchQuery || undefined,
    },
    {
      // Auto-refresh every 5 seconds to stay synced across users
      pollingInterval: 5000,
      // Force refetch on mount and arg change
      refetchOnMountOrArgChange: true,
      // Refetch on window focus
      refetchOnFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
    }
  );

  const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
  const [updateRecipe, { isLoading: isUpdating }] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ message, type });
  };

  const handleCreateRecipe = async (data: Partial<Recipe>) => {
    try {
      const result = await createRecipe(data).unwrap();
      setShowForm(false);
      showToast(`Recipe "${result.name}" created successfully! 🎉`, "success");
      // Force immediate refetch to show the new recipe
      refetch();
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to create recipe. Please try again.", "error");
      setShowForm(false);
    }
  };

  const handleUpdateRecipe = async (data: Partial<Recipe>) => {
    if (!editingRecipe) return;
    try {
      const result = await updateRecipe({ id: editingRecipe.id, data }).unwrap();
      setEditingRecipe(null);
      setShowForm(false);
      showToast(`Recipe "${result.name}" updated successfully! ✓`, "success");
      // Force immediate refetch to show the updates
      refetch();
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to update recipe. Please try again.", "error");
      setEditingRecipe(null);
      setShowForm(false);
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    setDeleteConfirm({ isOpen: true, recipeId: id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.recipeId) return;
    try {
      await deleteRecipe(deleteConfirm.recipeId).unwrap();
      showToast("Recipe deleted successfully! 🗑️", "success");
      // Force immediate refetch to update the list
      refetch();
    } catch (error: any) {
      showToast(error?.data?.message || "Failed to delete recipe. Please try again.", "error");
    } finally {
      setDeleteConfirm({ isOpen: false, recipeId: null });
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleViewRecipe = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Recipe Dashboard</h1>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline"
            >
              View Landing Page
            </button>
          </div>
          <div className="flex items-center gap-4">
            {userData && (
              <div className="flex items-center gap-2">
                <img
                  src={userData.image}
                  alt={userData.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-sm text-gray-600">@{userData.username}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Real-time Sync Notice */}
        <div className="bg-green-50 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <p className="font-semibold mb-1">Real-time Sync Active</p>
              <p className="text-sm">
                Dashboard auto-refreshes every 5 seconds. Changes from any user will appear automatically. 
                <span className="font-semibold"> Note:</span> DummyJSON is a demo API - changes won't persist after page refresh.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        {!showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => {
                  setEditingRecipe(null);
                  setShowForm(true);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
              >
                + Create New Recipe
              </button>
            </div>
          </div>
        )}

        {/* Recipe Form */}
        {showForm && (
          <div className="mb-8">
            <RecipeForm
              recipe={editingRecipe || undefined}
              onSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
              onCancel={() => {
                setShowForm(false);
                setEditingRecipe(null);
              }}
              isLoading={isCreating || isUpdating}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && !showForm && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Recipes Grid */}
        {!showForm && data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.recipes.map((recipe) => (
                <div key={recipe.id} className="relative">
                  <RecipeCard recipe={recipe} onView={handleViewRecipe} />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEditRecipe(recipe)}
                      className="bg-blue-600 text-white px-3 py-1 rounded shadow-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded shadow-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.total > itemsPerPage && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded-lg">
                  Page {currentPage + 1} of {Math.ceil(data.total / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={(currentPage + 1) * itemsPerPage >= data.total}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, recipeId: null })}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
