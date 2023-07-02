"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Tab = {
  name: string;
  href: string;
};

type TabsProps = {
  tabList: Tab[];
};

export const Tabs = (props: TabsProps) => {
  const pathname = usePathname();
  return (
    <div className="text-center text-sm font-medium">
      <div className="flex flex-wrap">
        {props.tabList.map((link) => {
          const isActive = pathname == link.href;
          return (
            <Link
              className={
                isActive
                  ? "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-12 p-2 font-bold text-mauve-12"
                  : "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-6 p-2 text-mauve-12"
              }
              href={link.href as Route}
              key={link.name}
              replace
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
