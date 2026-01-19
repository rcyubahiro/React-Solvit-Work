# RTK Query Caching & Auto-Refetch

## 🔄 How It Works

RTK Query automatically manages cache invalidation and refetching for you. When you perform mutations (create, update, delete), it automatically refetches queries based on cache tags.

## 📋 Cache Tags Setup

### In `src/app/api/apiEntry.ts`

```typescript
tagTypes: ["Recipe", "User"];
```

### In `src/app/api/recipe/index.ts`

**Queries provide tags:**

```typescript
getRecipes: builder.query({
  providesTags: (result) =>
    result
      ? [
          ...result.recipes.map(({ id }) => ({ type: "Recipe", id })),
          { type: "Recipe", id: "LIST" },
        ]
      : [{ type: "Recipe", id: "LIST" }],
});
```

**Mutations invalidate tags:**

```typescript
createRecipe: builder.mutation({
  invalidatesTags: [{ type: "Recipe", id: "LIST" }],
});

updateRecipe: builder.mutation({
  invalidatesTags: (_result, _error, { id }) => [
    { type: "Recipe", id },
    { type: "Recipe", id: "LIST" },
  ],
});

deleteRecipe: builder.mutation({
  invalidatesTags: (_result, _error, id) => [
    { type: "Recipe", id },
    { type: "Recipe", id: "LIST" },
  ],
});
```

## ✅ What This Means

1. **Create Recipe** → Invalidates `LIST` tag → `getRecipes` automatically refetches
2. **Update Recipe** → Invalidates specific recipe + `LIST` → Both queries refetch
3. **Delete Recipe** → Invalidates specific recipe + `LIST` → Both queries refetch

## 🚫 What NOT To Do

**❌ Don't manually call refetch():**

```typescript
// WRONG - Redundant!
await createRecipe(data).unwrap();
refetch(); // Not needed!
```

**✅ Let RTK Query handle it:**

```typescript
// CORRECT - Automatic!
await createRecipe(data).unwrap();
// RTK Query automatically refetches all queries with invalidated tags
```

## ⚙️ Additional Options

### Polling (Auto-refresh)

```typescript
useGetRecipesQuery(params, {
  pollingInterval: 30000, // Refetch every 30 seconds
});
```

### Skip Query

```typescript
useGetRecipesQuery(params, {
  skip: !isAuthenticated, // Don't run query if not authenticated
});
```

### Refetch on Mount/Focus

```typescript
useGetRecipesQuery(params, {
  refetchOnMountOrArgChange: true, // Refetch when component mounts
  refetchOnFocus: true, // Refetch when window gains focus
  refetchOnReconnect: true, // Refetch when reconnecting
});
```

## 🎯 Benefits

1. **No manual cache management** - RTK Query handles it
2. **Optimistic UI updates** possible with cache manipulation
3. **Automatic deduplication** - Multiple components using same query share data
4. **Background refetching** - Keep data fresh automatically
5. **Loading/error states** - Automatically tracked per query

## ⚠️ Demo API Limitation

**DummyJSON** is a mock API that **doesn't persist changes**:

- Create/update/delete operations return success responses
- But changes aren't saved to the backend
- After page refresh, created recipes disappear

**Solution:** Use polling interval to periodically sync with the API's actual data.

## 📚 Learn More

- [RTK Query Cache Behavior](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)
- [Automated Re-fetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching)
- [Cache Tags](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags)
