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
        />
        <div
          ref={scrollRef}
          className="w-full h-[calc(100dvh-94px)] lg:ml-[268px] lg:w-[calc(100%-260px)] overflow-y-auto scrollbar-none px-4 md:px-5 lg:px-8"
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