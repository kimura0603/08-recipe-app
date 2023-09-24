// import { headers } from "next/headers";

// import { Route } from "next/types";

import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import RecipeDetailComponent from "@/app/recipe/[id]/recipe-detail-component";
import CopyText from "@/components/utils/copy-text";
import { getIsFavoriteByUserId, getRecipeById, RecipeDetailTabWrapper } from "@/features/recipes";
import { authOptions } from "@/lib/auth";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const recipe = await getRecipeById(id);
  if (!recipe || !recipe.User) {
    notFound();
  }
  if (recipe.isPublic === 0 && recipe.userId !== session?.user?.id) {
    notFound();
  }

  let isFavoriteByMe = false;
  if (session && session.user) {
    isFavoriteByMe = await getIsFavoriteByUserId(recipe.id, session.user.id);
  }

  const isMyRecipe = session?.user?.id === recipe.userId;

  let recipeCopyText = `レシピ名：${recipe.name}\n${recipe.servings}人前`;
  recipeCopyText += `\n材料：\n`;
  recipeCopyText += recipe.RecipeIngredient.flatMap((RecipeIngredients, index) => {
    return `(${index + 1})${RecipeIngredients.name.replace(/\s+/g, "")}`;
  }).join("\n");
  recipeCopyText += `\n作り方：\n`;
  recipeCopyText += recipe.RecipeCookingProcedure.flatMap((recipeCookingProcedures, index) => {
    return `(${index + 1})${recipeCookingProcedures.name.replace(/\s+/g, "")}`;
  }).join("\n");

  return (
    <main>
      <RecipeDetailComponent
        recipe={recipe}
        isFavoriteByMe={isFavoriteByMe}
        sessionUserId={session?.user?.id}
        isMyRecipe={isMyRecipe}
      />
      <RecipeDetailTabWrapper recipe={recipe} />
      <CopyText copyText={recipeCopyText} />
    </main>
  );
}
