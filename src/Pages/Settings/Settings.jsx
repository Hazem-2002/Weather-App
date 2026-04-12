import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDirection } from "../../features/DirectionSlice";
import Button from "@mui/material/Button";

export default function Settings() {
  const direction = useSelector((state) => state.direction);
  const { t, i18n } = useTranslation();
  const languageDispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(direction === "ltr" ? "en" : "ar");
  }, [i18n, direction]);

  const style = (dir) => ({
    color:
      direction !== dir
        ? "rgb(var(--foreground-rgb)/0.8)"
        : "rgb(var(--primary-foreground-rgb))",
    background:
      direction !== dir
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
    "&:hover": { background: direction !== dir && "rgb(var(--muted-rgb))" },
  });

  return (
    <div className="flex justify-center pt-32 me-4 sm:me-8">
      <div className="flex flex-col w-[70%] gap-8">
        <h2 className="text-4xl font-bold text-foreground/95 leading-none">
          {t("Settings")}
        </h2>
        <div
          className="flex flex-col gap-6 p-4"
          style={{ boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)" }}
        >
          <h2 className="text-base font-semibold text-foreground/85 leading-none">
            {t("Theme_Language")}
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground/70 leading-none">
              {t("language")}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style("ltr")}
                onClick={() => {
                  if (direction !== "ltr") {
                    languageDispatch(changeDirection("ltr"));
                  }
                }}
              >
                {t("english")}
              </Button>

              <Button
                variant="contained"
                sx={style("rtl")}
                onClick={() => {
                  if (direction !== "rtl") {
                    languageDispatch(changeDirection("rtl"));
                  }
                }}
              >
                {t("arabic")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
