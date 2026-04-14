import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const direction = useSelector((state) => state.language.direction);

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  return (
    <div
      className="px-6 py-4 bg-foreground/5 rounded-3xl"
      style={{
        boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-4">
        <div className="flex flex-col w-fit items-center md:items-start">
          <p className="text-sm text-muted-foreground font-semibold">
            © 2026 <span className="text-foreground font-bold">Weatherly</span>.{" "}
            <span className="text-xs">{t("All_rights_reserved")}</span>.
          </p>
          <p className="text-xs text-muted-foreground/80 font-semibold">
            {t("Crafted by")}
            <span className="text-primary/85 font-bold">
              {t("Hazem_Mahmoud")}
            </span>
          </p>
        </div>

        <div className="flex flex-row gap-2 w-fit">
          <a
            href="https://github.com/Hazem-2002"
            target="_blank"
            className="flex justify-center items-center border border-foreground/5 rounded-2xl size-10 bg-foreground/5 transition text-foreground/60 hover:bg-foreground/10 hover:scale-110 hover:text-foreground/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
              aria-hidden="true"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/-hazemmahmoud"
            target="_blank"
            className="flex justify-center items-center border border-foreground/5 rounded-2xl size-10 bg-foreground/5 transition text-foreground/60 hover:bg-foreground/10 hover:scale-110 hover:text-foreground/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          <a
            href="https://wa.me/201023612348"
            target="_blank"
            className="flex justify-center items-center border border-foreground/5 rounded-2xl size-10 bg-foreground/5 transition text-foreground/60 hover:bg-foreground/10 hover:scale-110 hover:text-foreground/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-square"
              aria-hidden="true"
            >
              <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
            </svg>
          </a>

          <a
            href="mailto:hazem.mahmoud.dev@gmail.com"
            target="_blank"
            className="flex justify-center items-center border border-foreground/5 rounded-2xl size-10 bg-foreground/5 transition text-foreground/60 hover:bg-foreground/10 hover:scale-110 hover:text-foreground/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail"
              aria-hidden="true"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
