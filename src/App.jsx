import "./App.css";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";
import AutoCompleteComponent from "./AutoCompleteComponent";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";

function App() {
  const theme = useTheme();
  const stackRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [date, setDate] = useState({ dayName: "", dateString: "" });
  const [stackHeight, setStackHeight] = useState(0);
  const [coords, setCoords] = useState({ lon: null, lat: null });
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

  // Fetch Current Temperature
  useEffect(() => {
    if (coords.lon !== null && coords.lat !== null) {
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=a2645d096ff842ab8c0151914261903&q=${coords.lat},${coords.lon}&days=1`,
        )
        .then((response) => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lon}&language=ar&key=AIzaSyA7mjeWIhlZJ-lexyNDNGlYSTHFoUrCs2g`,
            )
            .then((response) => {
              console.log(response.data);
              const city = response.data.results.find((item) =>
                item.types.includes("locality"),
              );

              setSelectedPlace(
                city?.formatted_address.split("،")[0].split(" ", 2).join(" "),
              );
            })
            .catch((err) => console.log(err));
          console.log(response.data);
          const dateString = response.data.forecast.forecastday[0].date;
          const currentDate = new Date(dateString);
          const dayName = currentDate.toLocaleDateString("ar-EG", {
            weekday: "long",
          });
          setDate({ dayName, dateString });
          setWeather({
            min_temp: Math.round(
              response.data.forecast.forecastday[0].day.mintemp_c,
            ),
            max_temp: Math.round(
              response.data.forecast.forecastday[0].day.maxtemp_c,
            ),
            temp: Math.round(response.data.current.temp_c),
          });
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  const changeCoords = useCallback((coords) => {
    setCoords(coords);
  }, []);

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
                  spacing={4}
                  sx={{
                    p: 2,
                    alignItems: "flex-end",
                    height: { xs: "74px", md: "88px" },
                  }}
                >
                  {selectedPlace ? (
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: {
                          xs:
                            selectedPlace.split(" ").length > 1
                              ? "26px"
                              : "36px",
                          md: "48px",
                        },
                        maxWidth: "67%",
                      }}
                    >
                      {selectedPlace}
                    </Typography>
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rounded"
                      sx={{
                        height: { xs: "42px", md: "56px" },
                        width: { xs: "81px", md: "108px" },
                      }}
                    />
                  )}
                  {date.dayName && date.dateString ? (
                    <Stack>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {date.dayName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {date.dateString}
                      </Typography>
                    </Stack>
                  ) : (
                    <Skeleton
                      animation="pulse"
                      variant="rounded"
                      sx={{
                        height: "22px",
                        width: "115px",
                      }}
                    />
                  )}
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
                  spacing={3}
                  sx={{ justifyContent: "space-between", p: 1 }}
                >
                  <Button sx={{ color: theme.palette.text.secondary }}>
                    إنجليزي
                  </Button>
                  <AutoCompleteComponent changeCoords={changeCoords} />
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
