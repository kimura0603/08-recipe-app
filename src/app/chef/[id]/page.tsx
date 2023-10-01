import { getRecipeMaxCount, getRecipesWithFavoriteCount, InfiniteScrollVerticalRecipeList } from "@/features/recipes";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const recipes = await getRecipesWithFavoriteCount({
    query: "",
    page: undefined,
    limit: undefined,
    where: { userIds: [id] },
  });

  const recipeMaxCount = await getRecipeMaxCount({
    query: "",
    where: { userIds: [id] },
  });

  return (
    <InfiniteScrollVerticalRecipeList
      search=""
      initialContents={recipes}
      contentMaxCount={recipeMaxCount}
      fetchAction={getRecipesWithFavoriteCount}
      where={{ userIds: [id] }}
    />
  );
}
