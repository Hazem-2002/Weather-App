import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../features/LanguageSlice";
import { changeTheme } from "../../features/ThemeSlice";
import Button from "@mui/material/Button";

export default function Settings() {
  const language = useSelector((state) => state.language);
  const mode = useSelector((state) => state.theme.theme);
  const { t, i18n } = useTranslation();
  const languageDispatch = useDispatch();
  const themeDispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(language.direction === "ltr" ? "en" : "ar");
  }, [i18n, language.direction]);

  const style = (comparator, state) => ({
    color:
      comparator !== state
        ? "rgb(var(--foreground-rgb)/0.8)"
        : "rgb(var(--primary-foreground-rgb))",
    background:
      comparator !== state
        ? "rgb(var(--muted-rgb)/0.75)"
        : "rgb(var(--primary-rgb)/0.85)",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "40px",
    border: "1px solid rgb(var(--primary-rgb)/0.1)",
    padding: "0 12px",
    textTransform: "capitalize",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    flex: 1,
    "&:hover": { background: comparator !== state && "rgb(var(--muted-rgb))" },
  });

  return (
    <div className="flex justify-center pt-32 px-1 me-4 sm:me-8">
      <div className="flex flex-col w-full  lg:w-[76%] gap-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-foreground/95 leading-none">
          {t("Settings")}
        </h2>
        <div
          className="flex flex-col gap-6 p-4 rounded-2xl"
          style={{ boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)" }}
        >
          <h2 className="text-sm sm:text-base font-semibold text-foreground/85 leading-none">
            {t("Theme_Language")}
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("language")}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(language.lang, "en")}
                onClick={() => {
                  if (language.lang !== "en") {
                    languageDispatch(changeLanguage("en"));
                  }
                }}
              >
                <span className="block w-full text-center">{t("english")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(language.lang, "ar")}
                onClick={() => {
                  if (language.lang !== "ar") {
                    languageDispatch(changeLanguage("ar"));
                  }
                }}
              >
                <span className="block w-full text-center">{t("arabic")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(language.lang, "systemLanguage")}
                onClick={() => {
                  if (language.lang !== "systemLanguage") {
                    languageDispatch(changeLanguage("systemLanguage"));
                  }
                }}
              >
                <span className="hidden sm:block w-full text-center">
                  {t("systemLanguage")}
                </span>
                <span className="block sm:hidden w-full text-center">
                  {language.lang === "en"
                    ? t("systemLanguage").split(" ")[0]
                    : t("systemLanguage").split(" ")[1]}
                </span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("theme")}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(mode, "light")}
                onClick={() => {
                  if (mode !== "light") {
                    themeDispatch(changeTheme("light"));
                  }
                }}
              >
                <span className="hidden sm:block w-full text-center">
                  {t("light_mode")}
                </span>
                <span className="block sm:hidden w-full text-center">
                  {language.lang === "en"
                    ? t("light_mode").split(" ")[0]
                    : t("light_mode").split(" ")[1]}
                </span>
              </Button>

              <Button
                variant="contained"
                sx={style(mode, "dark")}
                onClick={() => {
                  if (mode !== "dark") {
                    themeDispatch(changeTheme("dark"));
                  }
                }}
              >
                <span className="hidden sm:block w-full text-center">
                  {t("dark_mode")}
                </span>
                <span className="block sm:hidden w-full text-center">
                  {language.lang === "en"
                    ? t("dark_mode").split(" ")[0]
                    : t("dark_mode").split(" ")[1]}
                </span>
              </Button>

              <Button
                variant="contained"
                sx={style(mode, "systemTheme")}
                onClick={() => {
                  if (mode !== "systemTheme") {
                    themeDispatch(changeTheme("systemTheme"));
                  }
                }}
              >
                <span className="hidden sm:block w-full text-center">
                  {t("system_theme")}
                </span>
                <span className="block sm:hidden w-full text-center">
                  {language.lang === "en"
                    ? t("system_theme").split(" ")[0]
                    : t("system_theme").split(" ")[1]}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
