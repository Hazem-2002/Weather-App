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
import { useRef, useEffect, useState, useCallback, useContext } from "react";
import { DirectionContext } from "./Context/DirectionContext";
import axios from "axios";

function App() {
  const theme = useTheme();
  const stackRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [date, setDate] = useState({ dayName: "", dateString: "" });
  const [stackHeight, setStackHeight] = useState(0);
  const [coords, setCoords] = useState(
    JSON.parse(localStorage.getItem("coords")) || { lon: null, lat: null },
  );
  const [weather, setWeather] = useState({
    temp: "",
    min_temp: "",
    max_temp: "",
    desc: "",
  });

  const { direction, handleChangeDirection } = useContext(DirectionContext);

  useEffect(() => {
    if (stackRef.current) {
      setStackHeight(stackRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Fetch Current Temperature
  useEffect(() => {
    if (coords.lon == null || coords.lat == null) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [weatherRes, geoRes] = await Promise.all([
          axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=a2645d096ff842ab8c0151914261903&q=${coords.lat},${coords.lon}&days=1&lang=${direction === "rtl" ? "ar" : "en"}`,
            { signal: controller.signal },
          ),
          axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lon}&language=${direction === "rtl" ? "ar" : "en"}&key=AIzaSyA7mjeWIhlZJ-lexyNDNGlYSTHFoUrCs2g`,
            { signal: controller.signal },
          ),
        ]);

        console.log(weatherRes.data);
        console.log(geoRes.data);

        // استخراج المدينة
        const getCityName = (results) => {
          const priorityTypes = [
            "locality",
            "administrative_area_level_3",
            "sublocality",
            "administrative_area_level_2",
          ];

          for (const type of priorityTypes) {
            const place = results.find((item) => item.types.includes(type));

            if (place?.formatted_address) {
              const address = place.formatted_address;

              if (address.includes(" - ")) {
                return address
                  .split("-")[0]
                  .split(" ", 2)
                  .filter((ele) => isNaN(ele))
                  .join(" ");
              } else {
                const separator = direction === "rtl" ? "،" : ",";
                return address
                  .split(separator)[0]
                  .split(" ", 2)
                  .filter((ele) => isNaN(ele))
                  .join(" ");
              }
            }
          }

          return "غير معروف";
        };

        // usage
        setSelectedPlace(getCityName(geoRes.data.results));

        // التاريخ
        const dateString = weatherRes.data.forecast.forecastday[0].date;

        const currentDate = new Date(dateString);

        const dayName = currentDate.toLocaleDateString(
          `${direction === "rtl" ? "ar" : "en"}-EG`,
          {
            weekday: "long",
          },
        );

        const arabicDate = currentDate.toLocaleDateString(
          `${direction === "rtl" ? "ar" : "en"}-EG`,
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        );

        setDate({ dayName, dateString: arabicDate });

        // الطقس
        setWeather({
          min_temp: Math.round(
            weatherRes.data.forecast.forecastday[0].day.mintemp_c,
          ).toLocaleString(`${direction === "rtl" ? "ar" : "en"}-EG`),
          max_temp: Math.round(
            weatherRes.data.forecast.forecastday[0].day.maxtemp_c,
          ).toLocaleString(`${direction === "rtl" ? "ar" : "en"}-EG`),
          temp: Math.round(weatherRes.data.current.temp_c).toLocaleString(
            `${direction === "rtl" ? "ar" : "en"}-EG`,
          ),
          desc: weatherRes.data.current.condition.text,
        });
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching data:", err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line
  }, [coords]);

  const changeCoords = useCallback((coords) => {
    setCoords(coords);
    localStorage.setItem("coords", JSON.stringify(coords));
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
                  sx={{
                    gap: {
                      xs: "16px",
                      md: "32px",
                    },
                    p: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
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
                              ? "24px"
                              : direction === "rtl"
                                ? "36px"
                                : "30px",
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
                          fontSize: { xs: "14px", md: "16px" },
                        }}
                      >
                        {date.dayName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                          fontSize: { xs: "12px", md: "14px" },
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
                        height: "50px",
                        width: "76px",
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

                      {weather.desc ? (
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "18px",
                          }}
                        >
                          {weather.desc}
                        </Typography>
                      ) : (
                        <Skeleton
                          animation="pulse"
                          variant="rounded"
                          sx={{
                            height: "28px",
                            width: "100px",
                          }}
                        />
                      )}

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
                          {direction === "rtl" ? "الصغري: " : "Low: "}
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
                          {direction === "rtl" ? "الكبري: " : "High: "}
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
                  <Button
                    sx={{
                      color: theme.palette.text.secondary,
                      textTransform: "capitalize",
                    }}
                    onClick={handleChangeDirection}
                  >
                    {direction === "rtl" ? "إنجليزي" : "Arabic"}
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
