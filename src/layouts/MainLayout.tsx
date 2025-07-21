import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/shared/navBar/Navbar";

const MainLayout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark text-primary-dark dark:text-primary-light">
      <Navbar />
      <main className="flex-1 px-4 py-6 w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
