import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Ideas from "./components/Ideas";
import { fetchBannerImage } from "./util/api";

function App() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("ideas");
  const ticking = useRef(false);

  // Banner state
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerOffset, setBannerOffset] = useState(0);

  const pages = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "service", label: "Service" },
    { id: "ideas", label: "Ideas" },
    { id: "career", label: "Career" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    if (active === "ideas") {
      fetchBannerImage().then(setBannerUrl);
    }
  }, [active]);

  useEffect(() => {
    setActive("ideas");
    window.location.hash = "#ideas";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setShowHeader(false);
          } else {
            setShowHeader(true);
          }
          setLastScrollY(currentScrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      setBannerOffset(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (pages.some((p) => p.id === hash)) {
        setActive(hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <>
      <Header pages={pages} active={active} showHeader={showHeader} />
      {active === "ideas" && (
        <Banner bannerUrl={bannerUrl} bannerOffset={bannerOffset} />
      )}
      <div className="min-h-screen">
        {active === "ideas" ? <Ideas /> : <div />}
      </div>
    </>
  );
}

export default App;
