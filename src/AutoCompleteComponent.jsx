import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useRef, useEffect, useState } from "react";

export default function AutoCompleteComponent({ changeCoords }) {
  const theme = useTheme();

  const AutoCompleteRef = useRef(null);
  const locationButtonRef = useRef(null);
  const AutoCompleteDropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [inputSearchCity, setInputSearchCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const [autoCompleteVertivalPosition, setAutoCompleteVertivalPosition] =
    useState(0);

  useEffect(() => {
    if (AutoCompleteDropdownRef.current) {
      setAutoCompleteVertivalPosition(
        window.innerHeight -
          AutoCompleteDropdownRef.current.getBoundingClientRect().bottom -
          15,
      );
    }
  }, [inputSearchCity]);

  useEffect(() => {
    if (AutoCompleteRef.current && locationButtonRef.current) {
      const autoHeight = AutoCompleteRef.current.getBoundingClientRect().height;

      const btnHeight =
        locationButtonRef.current.getBoundingClientRect().height;

      setMarginTop(-(autoHeight - btnHeight) / 2);
    }
  }, []);

  useEffect(() => {
    if (!inputSearchCity) return;

    const timeout = setTimeout(() => {
      (async () => {
        try {
          const { AutocompleteSuggestion } =
            await window.google.maps.importLibrary("places");

          const { suggestions } =
            await AutocompleteSuggestion.fetchAutocompleteSuggestions({
              input: inputSearchCity,
              includedPrimaryTypes: ["locality"], // Cities
              language: "ar",
            });

          // Get Coordinates of Cities
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

          setSuggestions(results);
          setIsLoading(false); //
        } catch (err) {
          console.error(err);
        }
      })();
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputSearchCity]);

  // Fetch Locations Coordinates
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          console.log("My Position: ", coords);
          changeCoords(coords); // تخزن الإحداثيات في state
          setInputSearchCity("");
          setLocationIsLoading(false);
        },
        (error) => {
          console.error("خطأ في تحديد الموقع:", error);
          setLocationIsLoading(false);
        },
      );
    } else {
      console.log("Geolocation غير مدعوم في هذا المتصفح");
    }
    // eslint-disable-next-line
  }, [locationIsLoading]);

  const handleInput = (event, value, reason) => {
    if (reason !== "input") return;

    setInputSearchCity(value);

    if (value) {
      setIsLoading(true);
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
    changeCoords({ lat: value.lat, lon: value.lng });
  };

  const handleLocation = (e) => {
    e.stopPropagation();
    setLocationIsLoading(true);
  };

  return (
    <Autocomplete
      open={open}
      onClose={() => setOpen(false)}
      autoHighlight
      blurOnSelect
      clearOnEscape
      disableClearable
      disablePortal
      loading={isLoading}
      loadingText={
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={24}
            sx={{
              color: theme.palette.primary.light,
            }}
          />
        </Box>
      }
      ref={AutoCompleteDropdownRef}
      forcePopupIcon={false}
      inputValue={inputSearchCity}
      onInputChange={handleInput}
      onChange={handleSelect}
      options={suggestions}
      getOptionLabel={(option) => option.text}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{ whiteSpace: "nowrap" }}
          key={`${option.lat}-${option.lng}`}
        >
          {option.text}
        </li>
      )}
      sx={{ width: 230, flexShrink: 1 }}
      slotProps={{
        popper: {
          placement: "bottom",
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
          ref={AutoCompleteRef}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <InputAdornment
                  position="end"
                  ref={locationButtonRef}
                  sx={{
                    marginTop: `${marginTop}px`,
                    marginRight: "-5px",
                  }}
                >
                  <Tooltip
                    title="تحديد الموقع الجغرافي"
                    sx={{
                      "& .MuiTooltip-tooltip": {
                        backgroundColor: "red !important",
                        color: "white",
                      },
                      "& .MuiTooltip-arrow": {
                        color: "red",
                      },
                    }}
                    arrow
                  >
                    <IconButton
                      loading={locationIsLoading}
                      loadingIndicator={
                        <CircularProgress
                          sx={{
                            color: theme.palette.primary.light,
                          }}
                          size={20}
                        />
                      }
                      onClick={handleLocation}
                    >
                      <LocationOnIcon
                        sx={{
                          color: theme.palette.primary.light,
                          visibility: locationIsLoading ? "hidden" : "visible",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
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
  );
}
