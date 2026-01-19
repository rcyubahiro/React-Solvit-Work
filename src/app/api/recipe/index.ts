import { apiSlice } from "../apiEntry";
import type { Recipe, RecipesResponse, RecipeQueryParams } from "@/types/recipeType";

export const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all recipes with pagination, search, and sorting
    getRecipes: builder.query<RecipesResponse, RecipeQueryParams>({
      query: (params = {}) => {
        const { limit = 10, skip = 0, q, sortBy, order } = params;
        let url = `/recipes?limit=${limit}&skip=${skip}`;
        
        if (q) {
          url = `/recipes/search?q=${q}&limit=${limit}&skip=${skip}`;
        }
        
        if (sortBy && order) {
          url += `&sortBy=${sortBy}&order=${order}`;
        }
        
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.recipes.map(({ id }) => ({ type: 'Recipe' as const, id })),
              { type: 'Recipe', id: 'LIST' },
            ]
          : [{ type: 'Recipe', id: 'LIST' }],
    }),

    // Get single recipe
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Recipe', id }],
    }),

    // Create recipe
    createRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (recipe) => ({
        url: '/recipes/add',
        method: 'POST',
        body: recipe,
      }),
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),

    // Update recipe
    updateRecipe: builder.mutation<Recipe, { id: number; data: Partial<Recipe> }>({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Recipe', id },
        { type: 'Recipe', id: 'LIST' },
      ],
    }),

    // Delete recipe
    deleteRecipe: builder.mutation<{ id: number; isDeleted: boolean }, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Recipe', id },
        { type: 'Recipe', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
