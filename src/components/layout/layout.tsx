import { Outlet } from "react-router-dom";
import { Suspense, useRef, useState } from "react";
import { Header } from "./header";
import { SideBar } from "./sidebar";

const MainLayout = () => {
  const scrollRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex">
        <SideBar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div
          ref={scrollRef}
          className="w-full h-[calc(100dvh-9px)] lg:ml-[315px] lg:w-[calc(100%-320px)] overflow-y-auto scrollbar-none px-4 md:px-5 lg:px-8 border-t border-l border-gray-200"
        >
          <Suspense fallback={"Loading..."}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </main>
  );
};


export { MainLayout }