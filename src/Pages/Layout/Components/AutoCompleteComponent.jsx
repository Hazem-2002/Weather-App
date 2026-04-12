import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCoords } from "../../../features/CityCoords";

function AutoCompleteComponent() {
  const dir = useSelector((state) => state.direction);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const choosenCityRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const [inputSearchCity, setInputSearchCity] = useState(
    localStorage.getItem("inputSearchCity") || "",
  );

  // THIS DISPATCH TO CHANGE CITIES COORDINATES
  const coords_dispatch = useDispatch();

  // GENERATE CITIES SUGGESIONS AND GET THESE COORDINATES
  useEffect(() => {
    if (!inputSearchCity) return;

    let isActive = true;

    // GENERATE CITIES SUGGESIONS
    const timeout = setTimeout(() => {
      (async () => {
        try {
          const { AutocompleteSuggestion } =
            await window.google.maps.importLibrary("places");

          const { suggestions } =
            await AutocompleteSuggestion.fetchAutocompleteSuggestions({
              input: inputSearchCity,
              includedPrimaryTypes: ["locality"], // Cities
              language: dir === "ltr" ? "en" : "ar",
            });

          // GET CITIES COORDINATES
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

          if (!isActive) return;

          setSuggestions(results);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      })();
    }, 500);

    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [inputSearchCity, dir]);

  // GET CURRENT LOCATION COORDINATES
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("coords")) && !locationIsLoading)
      return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city: "",
          };
          coords_dispatch(changeCoords(coords));
          setInputSearchCity("");
          setLocationIsLoading(false);
        },
        (error) => {
          console.error("خطأ في تحديد الموقع:", error);
          setLocationIsLoading(false);
        },
      );
      localStorage.setItem("inputSearchCity", "");
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

    setInputSearchCity(value.text);
    localStorage.setItem("inputSearchCity", value.text);

    coords_dispatch(
      changeCoords({
        lat: value.lat,
        lon: value.lng,
        city: value.text.split(/,\s|،\s|\s-\s/)[0],
      }),
    );

    choosenCityRef.current = true;
  };

  const handleLocation = (e) => {
    e.stopPropagation();
    setLocationIsLoading(true);
  };

  const handleClosePopper = () => {
    const lastCity = localStorage.getItem("inputSearchCity");

    if (!inputSearchCity || !choosenCityRef.current) {
      setInputSearchCity(lastCity || "");
    }

    choosenCityRef.current = false;
    setOpen(false);
  };

  return (
    <>
      <Autocomplete
        open={open}
        onClose={handleClosePopper}
        onBlur={handleClosePopper}
        autoHighlight
        blurOnSelect
        clearOnEscape
        disableClearable
        clearOnBlur
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
                color: "var(--primary)",
              }}
            />
          </Box>
        }
        forcePopupIcon={false}
        inputValue={inputSearchCity}
        onInputChange={handleInput}
        onChange={handleSelect}
        options={suggestions}
        getOptionLabel={(option) => option.text}
        renderOption={(props, option) => {
          const parts = option.text.split(/,\s|،\s|\s-\s/);

          const mainText =
            parts.length > 2
              ? parts.slice(0, -2).join(", ")
              : parts.length > 1
                ? parts.slice(0, -1).join(", ")
                : parts[0];

          const subText =
            parts.length > 2
              ? parts.slice(-2).reverse().join(", ")
              : parts.length > 1
                ? parts.slice(-1).join(", ")
                : "";

          return (
            <li
              {...props}
              key={`${option.lat}-${option.lng}`}
              className="whitespace-nowrap"
            >
              <div className="flex items-center gap-2 px-4 hover:bg-[rgb(var(--primary-rgb)/0.1)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin shrink-0"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="flex flex-col justify-center leading-tight h-10 w-full px-2 overflow-hidden">
                  <p className="text-sm">{mainText}</p>
                  <p className="text-xs truncate text-white/50">{subText}</p>
                </div>
              </div>
            </li>
          );
        }}
        noOptionsText={
          <span style={{ color: "var(--primary)" }}>No Options</span>
        }
        sx={{
          width: "100%",
          flexShrink: 1,
          boxShadow: "0 0 6px rgb(var(--primary-rgb)/0.3)",
          background: "rgb(var(--background-rgb)/0.65)",
          backdropFilter: "blur(3px)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
        slotProps={{
          listbox: {
            className: "hide-scrollbar",
            sx: {
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "10px 0",
              overflowX: "hidden",
              maxHeight: 300,
            },
          },
          popper: {
            placement: "bottom",
            sx: {
              "& .MuiAutocomplete-paper": {
                background: "rgb(var(--background-rgb)/0.8)",
                backdropFilter: "blur(3px)",
                color: "var(--primary)",
                borderRadius: "10px",
                marginTop: "5px",
              },
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="City"
            slotProps={{
              input: {
                sx: { color: "var(--primary)" },
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: "12px" }}>
                    <div className="absolute top-1/2 -translate-y-1/2 end-0">
                      <Tooltip
                        title="Use Current Location"
                        leaveDelay={50}
                        slotProps={{
                          popper: {
                            sx: {
                              "&.MuiPopper-root .MuiTooltip-tooltip": {
                                background: "rgb(var(--muted-rgb)/0.9)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              },
                              "&.MuiPopper-root .MuiTooltip-tooltip .MuiTooltip-arrow":
                                {
                                  color: "rgb(var(--muted-rgb)/0.8)",
                                },
                            },
                          },
                        }}
                        arrow
                      >
                        <IconButton
                          loading={locationIsLoading}
                          loadingIndicator={
                            <CircularProgress
                              sx={{
                                color: "var(--primary)",
                              }}
                              size={20}
                            />
                          }
                          onClick={handleLocation}
                        >
                          <LocationOnIcon
                            sx={{
                              color: "var(--primary)",
                              visibility: locationIsLoading
                                ? "hidden"
                                : "visible",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              padding: "0 10px",
              "& .MuiFilledInput-root": {
                "&:after": {
                  borderBottom: `2px solid rgb(var(--primary-rgb)/0.9)`,
                },
              },
              "& .MuiInputLabel-root": {
                color: "var(--primary)",
                transition: "all 0.17s",
                willChange: "transform",
                marginLeft: "5px",
              },
              "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                color: "var(--primary)",
                fontSize: "0.9rem",
                transform: "translate(20px,6px)",
                willChange: "transform",
              },
            }}
          />
        )}
      />
    </>
  );
}

export default React.memo(AutoCompleteComponent);
