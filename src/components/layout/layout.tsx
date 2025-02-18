import { Outlet } from "react-router-dom";
import { Suspense, useRef, useState } from "react";
import { Header } from "./header";
import { SideBar } from "./sidebar";

const MainLayout = () => {
  const scrollRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="flex">
      <div className="w-full relative h-screen">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex w-full bg-neutral-lighter h-screen  overflow-scroll">
          <SideBar
            isMobileMenuOpen={isMobileMenuOpen}
            className="lg:flex-1" />
          <div
            ref={scrollRef}
            className="bg-neutral-lighter mt-[8px] w-full lg`:ml-[268px]  px-4 md:px-5 lg:px-8"
          >
            <Suspense fallback={"Loading..."}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MainLayout }