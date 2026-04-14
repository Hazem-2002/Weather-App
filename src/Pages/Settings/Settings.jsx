import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../features/LanguageSlice";
import { changeTheme } from "../../features/ThemeSlice";
import Button from "@mui/material/Button";
import { changeTemperatureUnit } from "../../features/TemperatureUnit";
import { changeWindUnit } from "../../features/WindUnitSlice";
import { changePressureUnit } from "../../features/PressureUnitSlice";
import { changeVisibilityUnit } from "../../features/VisibilityUnitSlice";
import { changeTimeFormat } from "../../features/TimeFormatSlice";

function Settings() {
  const language = useSelector((state) => state.language);
  const mode = useSelector((state) => state.theme.theme);
  const temperatureUnit = useSelector((state) => state.temperatureUnit);
  const windUnit = useSelector((state) => state.windUnit);
  const pressureUnit = useSelector((state) => state.pressureUnit);
  const visibilityUnit = useSelector((state) => state.visibilityUnit);
  const timeFormat = useSelector((state) => state.timeFormat);
  const { t, i18n } = useTranslation();
  const languageDispatch = useDispatch();
  const themeDispatch = useDispatch();
  const temperatureUnitDispatch = useDispatch();
  const windUnitDispatch = useDispatch();
  const pressureUnitDispatch = useDispatch();
  const visibilityUnitDispatch = useDispatch();
  const timeFormatDispatch = useDispatch();

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
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    border: "1px solid rgb(var(--primary-rgb)/0.1)",
    padding: "0 12px",
    textTransform: "capitalize",
    fontWeight: "600",
    fontSize: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    flex: 1,
    "&:hover": { background: comparator !== state && "rgb(var(--muted-rgb))" },
  });

  const isSettingsChanges = (() => {
    return (
      temperatureUnit !== "Celsius" ||
      windUnit !== "Kph" ||
      pressureUnit !== "Millibars" ||
      visibilityUnit !== "Kilometers" ||
      timeFormat !== "12-hour"
    );
  })();

  return (
    <div className="flex justify-center pt-32 px-1 me-4 sm:me-8">
      <div className="flex flex-col w-full  lg:w-[76%] gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground/95 leading-none">
            {t("Settings")}
          </h2>

          <Button
            variant="outlined"
            disabled={!isSettingsChanges}
            sx={{
              background: "rgb(var(--background-rgb))",
              border: "1px solid rgb(var(--primary-rgb)/0.2)",
              color: "rgb(var(--foreground-rgb)/0.8)",
              fontWeight: "bold",
              fontSize: "12px",
              borderRadius: "15px",
              boxShadow: isSettingsChanges
                ? "0 0 4px rgb(var(--primary-rgb)/0.4)"
                : "none",

              "&:hover": {
                boxShadow: "none",
                background:
                  mode === "dark"
                    ? "rgb(var(--primary-rgb)/0.2)"
                    : "rgb(var(--primary-rgb)/0.05)",
              },
              "&.Mui-disabled": { color: "rgb(var(--foreground-rgb)/0.5)" },
            }}
            onClick={() => {
              if (isSettingsChanges) {
                temperatureUnitDispatch(changeTemperatureUnit("Celsius"));
                windUnitDispatch(changeWindUnit("Kph"));
                pressureUnitDispatch(changePressureUnit("Millibars"));
                visibilityUnitDispatch(changeVisibilityUnit("Kilometers"));
                timeFormatDispatch(changeTimeFormat("12-hour"));
              }
            }}
          >
            {t("Reset_to_Defaults")}
          </Button>
        </div>
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
                  {language.direction === "ltr"
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
                  {language.direction === "ltr"
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
                  {language.direction === "ltr"
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
                  {language.direction === "ltr"
                    ? t("system_theme").split(" ")[0]
                    : t("system_theme").split(" ")[1]}
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-6 p-4 rounded-2xl"
          style={{ boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)" }}
        >
          <h2 className="text-sm sm:text-base font-semibold text-foreground/85 leading-none">
            {t("Units_Settings")}
          </h2>

          {/* Temperature Unit */}
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("Temperature_Unit")}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(temperatureUnit, "Celsius")}
                onClick={() => {
                  if (temperatureUnit !== "Celsius") {
                    temperatureUnitDispatch(changeTemperatureUnit("Celsius"));
                  }
                }}
              >
                 <span className="inline sx:hidden">
                  { t("Celsius").split(" ").slice(-1)}
                </span>
                <span className="hidden sx:inline">{t("Celsius")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(temperatureUnit, "Fahrenheit")}
                onClick={() => {
                  if (temperatureUnit !== "Fahrenheit") {
                    temperatureUnitDispatch(
                      changeTemperatureUnit("Fahrenheit"),
                    );
                  }
                }}
              >
                 <span className="inline sx:hidden">
                  { t("Fahrenheit").split(" ").slice(-1)}
                </span>
                <span className="hidden sx:inline">{t("Fahrenheit")}</span>
              </Button>
            </div>
          </div>

          {/* Wind Unit */}
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("Wind_Unit")}
            </p>

            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(windUnit, "Kph")}
                onClick={() => {
                  if (windUnit !== "Kph") {
                    windUnitDispatch(changeWindUnit("Kph"));
                  }
                }}
              >
                <span className="inline sm:hidden">
                  { t("Kilometers_per_hour").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Kilometers_per_hour")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(windUnit, "mph")}
                onClick={() => {
                  if (windUnit !== "mph") {
                    windUnitDispatch(changeWindUnit("mph"));
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("Miles_per_hour").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Miles_per_hour")}</span>
              </Button>
            </div>
          </div>

          {/* Pressure Unit */}
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("Pressure_Unit")}
            </p>

            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(pressureUnit, "Millibars")}
                onClick={() => {
                  if (pressureUnit !== "Millibars") {
                    pressureUnitDispatch(changePressureUnit("Millibars"));
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("Millibars").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Millibars")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(pressureUnit, "Inches_of_Mercury")}
                onClick={() => {
                  if (pressureUnit !== "Inches_of_Mercury") {
                    pressureUnitDispatch(
                      changePressureUnit("Inches_of_Mercury"),
                    );
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("Inches_of_Mercury").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Inches_of_Mercury")}</span>
              </Button>
            </div>
          </div>

          {/* Visibility Unit */}
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("Visibility_Unit")}
            </p>

            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(visibilityUnit, "Kilometers")}
                onClick={() => {
                  if (visibilityUnit !== "Kilometers") {
                    visibilityUnitDispatch(changeVisibilityUnit("Kilometers"));
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("Kilometers").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Kilometers")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(visibilityUnit, "Miles")}
                onClick={() => {
                  if (visibilityUnit !== "Miles") {
                    visibilityUnitDispatch(changeVisibilityUnit("Miles"));
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("Miles").split(" ").slice(-1)}
                </span>
                <span className="hidden sm:inline">{t("Miles")}</span>
              </Button>
            </div>
          </div>

          {/* Time Format */}
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold text-foreground/70 leading-none">
              {t("Time_Format")}
            </p>

            <div className="flex flex-row gap-4">
              <Button
                variant="contained"
                sx={style(timeFormat, "12-hour")}
                onClick={() => {
                  if (timeFormat !== "12-hour") {
                    timeFormatDispatch(changeTimeFormat("12-hour"));
                  }
                }}
              >
                 <span className="inline sm:hidden">
                  { t("12-hour").split(" ").slice(0,-1).join(" ")}
                </span>
                <span className="hidden sm:inline">{t("12-hour")}</span>
              </Button>

              <Button
                variant="contained"
                sx={style(timeFormat, "24-hour")}
                onClick={() => {
                  if (timeFormat !== "24-hour") {
                    timeFormatDispatch(changeTimeFormat("24-hour"));
                  }
                }}
              >
                {t("24-hour")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Settings);
