import "./App.css";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import countries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Reducer } from "./Reducer";
// const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
// تسجيل اللغة العربية
countries.registerLocale(arLocale);

function App() {
  const theme = useTheme();
  const stackRef = useRef(null);
  const AutoCompleteRef = useRef(null);
  const [stackHeight, setStackHeight] = useState(0);
  const [autoCompleteVertivalPosition, setAutoCompleteVertivalPosition] =
    useState(0);
  const [coords, setCoords] = useState({ lon: 0, lat: 0 });
  const [inputSearchCity, setInputSearchCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState({
    temp: "",
    min_temp: "",
    max_temp: "",
  });

  useEffect(() => {
    if (!inputSearchCity) return;

    const timeout = setTimeout(() => {
      (async () => {
        try {
          // استدعاء مكتبة Places
          const { AutocompleteSuggestion } =
            await window.google.maps.importLibrary("places");

          const { suggestions } =
            await AutocompleteSuggestion.fetchAutocompleteSuggestions({
              input: inputSearchCity,
              includedPrimaryTypes: ["locality"], // المدن والأماكن
              language: "ar",
            });

          // خدمة PlacesService عشان نجيب التفاصيل والإحداثيات
          const service = new window.google.maps.places.PlacesService(
            document.createElement("div"),
          );

          const coordsPromises = suggestions.map((s) => {
            const placeId = s.placePrediction?.placeId;
            if (!placeId) return null;

            return new Promise((resolve) => {
              service.getDetails(
                { placeId, fields: ["geometry"] },
                (place, status) => {
                  if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                  ) {
                    resolve({
                      text: s.placePrediction?.text?.toString(),
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    });
                  } else {
                    resolve(null);
                  }
                },
              );
            });
          });

          const results = (await Promise.all(coordsPromises)).filter(Boolean);
          console.log(results);

          // هنا بقى نستخدم setState أو dispatch
          setSuggestions(results);
        } catch (err) {
          console.error(err);
        }
      })();
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputSearchCity]);

  // useEffect(() => {
  //   if (!inputSearchCity) return;

  //   const timeout = setTimeout(() => {
  //     (async () => {
  //       try {
  //         const { AutocompleteSuggestion } =
  //           await window.google.maps.importLibrary("places");

  //         const { suggestions } =
  //           await AutocompleteSuggestion.fetchAutocompleteSuggestions({
  //             input: inputSearchCity,
  //             includedPrimaryTypes: ["locality"],
  //             language: "ar",
  //           });

  //         console.log(suggestions[0]);

  //         const arr = suggestions
  //           .map((s) => s.placePrediction?.text?.toString())
  //           .filter(Boolean);

  //         setSuggestions(arr);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     })();
  //   }, 500);

  //   return () => clearTimeout(timeout);
  // }, [inputSearchCity]);

  useEffect(() => {
    if (stackRef.current) {
      setStackHeight(stackRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    if (AutoCompleteRef.current) {
      setAutoCompleteVertivalPosition(
        window.innerHeight -
          AutoCompleteRef.current.getBoundingClientRect().bottom -
          15,
      );
    }
  }, []);

  // Fetch City Coordinates
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Mansoura,EG&appid=9e6125670a22f8438ce76edcc0fd68c3",
      )
      .then((response) => setCoords(response.data.coord))
      .catch((err) => console.log(err));
  }, []);

  // Fetch Current Temperature
  useEffect(() => {
    if (coords.lon && coords.lat) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=9e6125670a22f8438ce76edcc0fd68c3`,
        )
        .then((response) => {
          setWeather((prev) => ({
            ...prev,
            temp: Math.round(response.data.main.temp - 272.15),
          }));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=9e6125670a22f8438ce76edcc0fd68c3`,
            )
            .then((response) => {
              // console.log(response.data);
              const data = new Date().toISOString().split("T", 1).toString();
              const temps = response.data.list
                .filter((item) => item.dt_txt.split(" ", 1)[0] === data)
                .map((item) => item.main.temp);
              const minTemp = Math.min(...temps);
              const maxTemp = Math.max(...temps);
              setWeather((prev) => ({
                ...prev,
                max_temp: Math.round(maxTemp),
                min_temp: Math.round(minTemp),
              }));
            })
            .catch((err) => console.log(err));
        });
    }
  }, [coords]);

  // useEffect(() => {
  //   if (inputSearchCity) {
  //     axios
  //       .get(
  //         `https://api.openweathermap.org/geo/1.0/direct?q=${inputSearchCity}&limit=500&appid=9e6125670a22f8438ce76edcc0fd68c3`,
  //       )
  //       .then((response) => {
  //         // console.log(countries.getName(response.data[0].country, "ar"));
  //         // console.log(response.data);
  //         setCities(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [inputSearchCity]);

  const handleInput = (event, value, reason) => {
    if (reason !== "input") return;

    setInputSearchCity(value);

    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (event, value) => {
    if (!value) return;

    setInputSearchCity(value.text); // نعرض النص في الـ input
    setOpen(false);

    // استخدم القيم مباشرة من value
    setCoords({ lat: value.lat, lon: value.lng });
  };

  return (
    <>
      <Stack sx={{ justifyContent: "center", height: "100vh", width: "100%" }}>
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <Box
              sx={{
                borderRadius: "8px",
                p: 2,
                background: theme.palette.primary.dark,
                boxShadow: theme.shadows[8],
              }}
            >
              <Stack
                spacing={1}
                divider={
                  <Divider
                    sx={{
                      borderTop: `1px solid ${theme.palette.divider}`,
                      opacity: 0.5,
                    }}
                  />
                }
              >
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ p: 2, alignItems: "flex-end" }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    المنصورة
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    الإثنين 14/03/2026
                  </Typography>
                </Stack>
                <Grid container columns={12} sx={{ p: 2 }} alignItems="stretch">
                  <Grid size={8}>
                    <Stack spacing={1} ref={stackRef}>
                      <Stack direction="row">
                        <Typography
                          variant="h2"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 400,
                          }}
                        >
                          {weather.temp !== "" ? (
                            <>{weather.temp}&deg;</>
                          ) : (
                            <CircularProgress
                              sx={{ color: theme.palette.primary.light }}
                            />
                          )}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        broken clouds
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={2}
                        divider={
                          <Divider
                            sx={{
                              borderLeft: `1px solid ${theme.palette.text.primary}`,
                              opacity: 0.5,
                            }}
                          />
                        }
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          الصغري:{" "}
                          {weather.min_temp !== "" ? (
                            <>{weather.min_temp}&deg;</>
                          ) : (
                            <CircularProgress
                              size={12}
                              sx={{ color: theme.palette.primary.light }}
                            />
                          )}
                        </Typography>

                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          الكبري:{" "}
                          {weather.max_temp !== "" ? (
                            <>{weather.max_temp}&deg;</>
                          ) : (
                            <CircularProgress
                              size={12}
                              sx={{ color: theme.palette.primary.light }}
                            />
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid
                    size={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: stackHeight,
                    }}
                  >
                    <CloudIcon
                      sx={{
                        color: "white",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Grid>
                </Grid>
                <Stack
                  direction="row-reverse"
                  sx={{ justifyContent: "space-between", p: 1 }}
                >
                  <Button sx={{ color: theme.palette.text.secondary }}>
                    إنجليزي
                  </Button>
                  {/* AIzaSyA7mjeWIhlZJ-lexyNDNGlYSTHFoUrCs2g */}
                  <Autocomplete
                    open={open}
                    onClose={() => setOpen(false)}
                    autoHighlight
                    blurOnSelect
                    clearOnEscape
                    disableClearable
                    disablePortal
                    ref={AutoCompleteRef}
                    forcePopupIcon={false}
                    inputValue={inputSearchCity}
                    onInputChange={handleInput}
                    onChange={handleSelect}
                    // options={["Profile", "My account", "Logout"]}
                    options={suggestions}
                    getOptionLabel={
                      (option) => option.text

                      // countries.getName(option.name, "ar")
                    }
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        style={{ whiteSpace: "nowrap" }}
                        key={`${option.lat}-${option.lng}`}
                      >
                        {option.text}
                      </li>
                    )}
                    sx={{ width: 230 }}
                    slotProps={{
                      popper: {
                        sx: {
                          "& .MuiAutocomplete-paper": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.secondary,
                            boxShadow: theme.shadows[8],
                          },
                          "& .MuiAutocomplete-listbox": {
                            maxHeight: `${autoCompleteVertivalPosition}px`,

                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                              width: "8px",
                            },
                            "&::-webkit-scrollbar-track": {
                              background: theme.palette.primary.light,
                              borderRadius: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              background: theme.palette.primary.main,
                              borderRadius: "8px",
                              border: `2px solid ${theme.palette.primary.light}`,
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              background: theme.palette.primary.dark,
                            },
                          },
                        },
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="المدينة"
                        sx={{
                          "& .MuiFilledInput-root": {
                            "&:before": {
                              borderBottom: `2px solid ${theme.palette.primary.light}`,
                            },
                            "&:after": {
                              borderBottom: `2px solid ${theme.palette.text.secondary}`,
                            },
                            "&:hover:not(.Mui-disabled, .Mui-error):before": {
                              borderBottom: `2px solid ${theme.palette.primary.light}`,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: theme.palette.text.secondary,
                            transition: "all 0.17s",
                            willChange: "transform",
                          },
                          "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                            color: theme.palette.text.primary,
                            fontSize: "0.9rem",
                            transform: "translate(10px,6px)",
                            willChange: "transform",
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </>
  );
}

export default App;
