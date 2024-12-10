import { Outlet, ScrollRestoration } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useCommonStore } from "./stores/commonStore";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";

const App = () => {
  const scroll = useScrollPosition();
  const { token, setAppLoaded } = useCommonStore();
  const { getUser, user } = useUserStore();

  useEffect(() => {
    if (token) {
      getUser().finally(() => {
        setAppLoaded();
        // if (user) profileStore.loadProfile(userStore.user.username);
      });
    } else {
      setAppLoaded();
    }
  }, [])

  return (
    <>
      <ScrollRestoration />
      <Toaster />
      <Outlet />
      <Button
        className={cn(
          scroll > 50 ? "flex" : "hidden",
          "items-center justify-center fixed bottom-8 z-[100] border border-black bg-white text-black hover:bg-black hover:text-white",
          "w-8 h-8 sm:w-10 sm:h-10",
          "right-4 sm:right-4 md:right-[4.4rem] lg:right-[5.2rem] xl:right-[6rem]"
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="w-6 h-6 sm:w-8 sm:h-8" />
      </Button>
    </>
  );
};

export default App;
