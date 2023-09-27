import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbMenu, TbUserCircle } from "react-icons/tb";

import { HorizonalSmallChefList } from "@/components/horizontal-small-chef-list/horizontal-small-chef-list";
import { Login } from "@/components/login";
import { getFavoriteChefs } from "@/features/chefs";
import {
  getFavoriteRecipeWithFavoriteCountByUserId,
  getRecipeWithFavoriteCountByUserId,
  HorizontalRecipeList,
  VerticalRecipeList,
} from "@/features/recipes";
import { authOptions } from "@/lib/auth";

const PageHeader = () => {
  return (
    <div className="flex h-12 items-center justify-between gap-x-4 border-b border-mauve-6 px-4 py-3">
      <Link href="/settings" className="transition-opacity ease-in-out hover:opacity-60">
        <TbMenu className="h-6 w-6" />
      </Link>
      <h1 className="text-xl font-bold leading-6">お気に入り</h1>
      <Link href="/mypage" className="transition-opacity ease-in-out hover:opacity-60">
        <TbUserCircle className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!session || !userId) {
    return (
      <main className="min-h-screen w-full text-mauve-12">
        <PageHeader />
        <Login imgSrc="/images/fav-login.png" />
      </main>
    );
  }

  const chefs = await getFavoriteChefs(userId);

  const followedChefsArray = chefs.map((chef) => chef.id);
  const recentRecipeList = await getRecipeWithFavoriteCountByUserId(followedChefsArray);

  const favoriteRecipeList = await getFavoriteRecipeWithFavoriteCountByUserId(userId);

  return (
    <main className="min-h-screen w-full text-mauve-12">
      <PageHeader />
      <div className="mt-5">
        <div className="ml-4">
          <h2 className="mb-[10px] text-xl font-bold text-mauve-12">シェフ</h2>
          <HorizonalSmallChefList chefs={chefs} />
        </div>
        <div className="ml-4 mt-12">
          <div className="mb-[10px] mr-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-mauve-12">シェフの新着レシピ</h2>
            <Link
              href="/favorite-chef-new-recipe"
              className="cursor-pointer text-base font-bold text-mauve-9 hover:underline"
            >
              もっと見る
            </Link>
          </div>
          <HorizontalRecipeList recipeList={recentRecipeList} />
        </div>
        <div className="mb-[10px] ml-4 mt-12">
          <h2 className="text-xl font-bold text-mauve-12">お気に入りレシピ</h2>
        </div>
        <div className="mx-4">{<VerticalRecipeList recipeList={favoriteRecipeList} />}</div>
      </div>
    </main>
  );
}
