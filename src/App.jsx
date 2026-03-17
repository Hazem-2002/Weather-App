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

// تسجيل اللغة العربية
countries.registerLocale(arLocale);

function App() {
  const theme = useTheme();
  const stackRef = useRef(null);
  const [stackHeight, setStackHeight] = useState(0);
  const [coords, setCoords] = useState({ lon: 0, lat: 0 });
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState({
    temp: "",
    min_temp: "",
    max_temp: "",
  });

  useEffect(() => {
    if (stackRef.current) {
      setStackHeight(stackRef.current.getBoundingClientRect().height);
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
              console.log(response.data);
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

  useEffect(() => {
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=9e6125670a22f8438ce76edcc0fd68c3`,
        )
        .then((response) =>
          console.log(countries.getName(response.data[0].country, "ar")),
        )
        .catch((err) => console.log(err));
    }
  }, [city]);

  const handleInput = (event, value, reason) => {
    if (reason !== "input") return;

    setCity(value);

    if (value) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (event, value) => {
    setCity(value || "");
    setOpen(false);
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

                  <Autocomplete
                    open={open}
                    onClose={() => setOpen(false)}
                    autoHighlight
                    blurOnSelect
                    clearOnEscape
                    disableClearable
                    disablePortal
                    forcePopupIcon={false}
                    inputValue={city}
                    onInputChange={handleInput}
                    onChange={handleSelect}
                    options={["Profile", "My account", "Logout"]}
                    sx={{ width: 200 }}
                    slotProps={{
                      popper: {
                        sx: {
                          "& .MuiAutocomplete-paper": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.secondary,
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
