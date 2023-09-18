import { Selectable } from "kysely";

import { db } from "@/lib/kysely";
import { RecipeFavorite } from "@/types/db";

export async function getFavoriteCountByRecipeId(recipeId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "=", recipeId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length;
}

export async function getIsFavoriteByUserId(userId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("userId", "=", userId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length > 0;
}
