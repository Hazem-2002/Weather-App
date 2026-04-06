import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Placeholder from "./Placeholder";

export default function WeatherOverview() {
  const weather = useSelector((state) => state.weather);
  const iconRef = useRef(null);
  const mobileIconRef = useRef(null);
  const placeRef = useRef(null);
  const screenRef = useRef(null);
  const SmMaxTempRef = useRef(null);
  const LgMaxTempRef = useRef(null);
  const [iconSize, setIconSize] = useState({ width: 0, height: 0 });
  const [mobileIconSize, setMobileIconSize] = useState({ width: 0, height: 0 });
  const [showPlace, setShowPlace] = useState(false);
  const [smMaxTempWidth, setSmMaxTempWidth] = useState(0);
  const [lgMaxTempWidth, setLgMaxTempWidth] = useState(0);

  useEffect(() => {
    if (iconRef.current) {
      setIconSize({
        width: iconRef.current.offsetWidth,
        height: iconRef.current.offsetHeight,
      });
    }
  }, [weather]);

  useEffect(() => {
    if (mobileIconRef.current) {
      setMobileIconSize({
        width: mobileIconRef.current.clientWidth,
        height: mobileIconRef.current.clientHeight,
      });
    }
  }, [weather]);

  useEffect(() => {
    if (!screenRef.current || !placeRef.current) return;

    const ratio = placeRef.current.offsetWidth / screenRef.current.offsetWidth;

    setShowPlace(ratio < 0.85);
  }, [weather]);

  useEffect(() => {
    if (!SmMaxTempRef.current) return;
    setSmMaxTempWidth(SmMaxTempRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (!LgMaxTempRef.current) return;
    setLgMaxTempWidth(LgMaxTempRef.current.offsetWidth);
  }, []);

  return (
    <div
      className={`flex flex-row justify-between gap-4 w-full h-full p-4 pt-10 sm:p-10 overflow-hidden rounded-4xl ${weather.WeatherUI.bg ? weather.WeatherUI.bg : "bg-muted/50"}`}
    >
      {/* ----------- Mobile ----------- */}
      <div
        className="flex sm:hidden flex-col items-center justify-center px-2 w-full overflow-hidden"
        ref={screenRef}
      >
        <div className="flex flex-col items-center grow justify-center gap-1">
          {weather.city ? (
            <div className="flex flex-row gap-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin-icon lucide-map-pin animate-bounce text-white/70"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h4 className="text-3xl font-bold w-fit">{weather.city}</h4>
            </div>
          ) : (
            <Placeholder width="215px" height="36px" />
          )}
          {weather.placeAddress ? (
            showPlace ? (
              <p
                className="text-white/60 font-semibold text-center text-base"
                ref={placeRef}
              >
                {weather.placeAddress}
              </p>
            ) : (
              <div className="flex flex-col mb-4">
                <p
                  className="text-white/60 font-semibold text-center text-base"
                  ref={placeRef}
                >
                  {weather.placeAddress.split(/,\s|،\s/)[0]}
                </p>
                <p
                  className="text-white/60 font-semibold text-center text-base"
                  ref={placeRef}
                >
                  {weather.placeAddress.split(/,\s|،\s/)[1]}
                </p>
              </div>
            )
          ) : (
            <Placeholder width="165px" height="24px" />
          )}
        </div>

        {weather.icon ? (
          <div className="flex justify-center relative grow w-full mt-1 mb-4 group">
            <div
              className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[32px] group-hover:blur-[20px] `}
              style={{
                width: mobileIconSize.width,
                height: mobileIconSize.height,
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
              }}
            ></div>
            {weather.icon && (
              <img
                src={`${weather.icon}`}
                alt="Weather State"
                ref={mobileIconRef}
                className="h-full object-cover"
              />
            )}
          </div>
        ) : (
          <Placeholder width="140px" height="140px" />
        )}

        <div className="flex flex-col items-center justify-start gap-5 grow">
          {weather.desc ? (
            <p
              className={`font-bold capitalize text-center ${weather.desc.split(" ").length < 3 ? "text-2xl" : weather.desc.split(" ").length < 4 ? "text-xl" : "text-base"}`}
            >
              {weather.desc}
            </p>
          ) : (
            <placeAddress width="70px" height="32px" />
          )}
          {weather.temp !== "" ? (
            <h2 className="text-[4rem] font-black leading-none my-2 drop-shadow-md">
              {weather.temp}
            </h2>
          ) : (
            <Placeholder width="100px" height="64px" />
          )}
          {weather.feelslike !== "" ? (
            <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs font-semibold capitalize shadow-md">
              {`feels like: ${weather.feelslike}`}
            </p>
          ) : (
            <Placeholder width="116px" height="30px" />
          )}

          {weather.date ? (
            <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs font-semibold shadow-md">
              {weather.date}
            </p>
          ) : (
            <Placeholder width="234px" height="30px" />
          )}

          <div className="flex flex-row gap-6 w-fit">
            {weather.days_detials.length > 2 ? (
              <div
                className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-md"
                ref={SmMaxTempRef}
                style={{
                  width: smMaxTempWidth ? `${smMaxTempWidth}px` : "auto",
                }}
              >
                <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up text-white"
                    aria-hidden="true"
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[7px] uppercase font-bold opacity-60">
                    High
                  </span>
                  <span className="text-sm font-bold">
                    {weather.days_detials[0].max_temp}
                  </span>
                </div>
              </div>
            ) : (
              <Placeholder width="93px" height="54px" />
            )}

            {weather.days_detials.length > 2 ? (
              <div
                className="bg-white/10 backdrop-blur-xl p-2  rounded-2xl flex items-center justify-center gap-2.5 border border-white/20 shadow-md"
                style={{
                  width: smMaxTempWidth ? `${smMaxTempWidth}px` : "auto",
                }}
              >
                <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-down text-white"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[7px] uppercase font-bold opacity-60">
                    Low
                  </span>
                  <span className="text-sm font-bold">
                    {weather.days_detials[0].min_temp}
                  </span>
                </div>
              </div>
            ) : (
              <Placeholder width="93px" height="54px" />
            )}
          </div>
        </div>
      </div>
      {/* ----------- END ----------- */}

      {/* ----------- Large Screen ----------- */}
      <div className="hidden sm:flex flex-row gap-1 justify-between flex-grow">
        <div className="flex flex-col justify-center gap-6 grow max-w-[60%] overflow-hidden animate-in animate-delay-200 slide-in-from-left animate-duration-400">
          <div className="flex flex-col gap-3">
            {weather.city ? (
              <div className="flex flex-row items-center gap-3 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin-icon lucide-map-pin group-hover:animate-bounce text-white/60 transition duration-100 group-hover:text-white/70"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h4 className="text-5xl font-bold w-fit">{weather.city}</h4>
              </div>
            ) : (
              <Placeholder width="275px" height="48px" />
            )}
            {weather.placeAddress ? (
              <p className="text-white/60 font-semibold text-lg">
                {weather.placeAddress}
              </p>
            ) : (
              <Placeholder width="235px" height="28px" />
            )}
          </div>

          {weather.date ? (
            <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-sm font-semibold shadow-md transition-all hover:bg-white/17">
              {weather.date}
            </p>
          ) : (
            <Placeholder width="275px" height="34px" />
          )}

          <div className="flex flex-row gap-6 w-fit">
            {weather.days_detials.length > 2 ? (
              <div
                className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-md transition-all hover:bg-white/17"
                ref={LgMaxTempRef}
                style={{
                  width: lgMaxTempWidth ? `${lgMaxTempWidth}px` : "auto",
                }}
              >
                <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up text-white"
                    aria-hidden="true"
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-bold opacity-60">
                    High
                  </span>
                  <span className="text-lg font-bold">
                    {weather.days_detials[0].max_temp}
                  </span>
                </div>
              </div>
            ) : (
              <Placeholder width="105px" height="60px" />
            )}
            {weather.days_detials.length > 2 ? (
              <div
                className="bg-white/10 backdrop-blur-xl px-4 py-2.5 rounded-2xl flex items-center justify-center gap-2.5 border border-white/20 shadow-md transition-all hover:bg-white/17"
                style={{
                  width: lgMaxTempWidth ? `${lgMaxTempWidth}px` : "auto",
                }}
              >
                <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-down text-white"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-bold opacity-60">
                    Low
                  </span>
                  <p className="text-lg font-bold">
                    {weather.days_detials[0].min_temp}
                  </p>
                </div>
              </div>
            ) : (
              <Placeholder width="105px" height="60px" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 grow max-w-[40%] animate-in animate-delay-200 slide-in-from-right animate-duration-400">
          <div className="flex justify-end flex-grow shrink relative group h-[40%]">
            <div
              className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[38px] group-hover:blur-[30px] `}
              style={{
                width: iconSize.width * 1.15,
                height: iconSize.height * 1.15,
                top: -iconSize.height * 0.075,
                right: -iconSize.width * 0.075,
              }}
            />
            {weather.icon ? (
              <img
                src={`${weather.icon}`}
                alt="Weather State"
                ref={iconRef}
                className="h-full object-cover transition duration-300 rotate-0 group-hover:rotate-10"
              />
            ) : (
              <Placeholder width="100px" height="100px" />
            )}
          </div>

          <div className="flex flex-col justify-between items-end h-[60%] shrink-0">
            {weather.desc ? (
              <p
                className={`font-bold capitalize text-center ${weather.desc.split(" ").length > 2 ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"}`}
              >
                {weather.desc}
              </p>
            ) : (
              <Placeholder width="100px" height="32px" />
            )}

            {weather.temp !== "" ? (
              <h2 className="text-[7rem] lg:text-[8rem] font-black leading-none my-2 drop-shadow-md">
                {weather.temp}
              </h2>
            ) : (
              <Placeholder width="150px" height="80px" />
            )}

            {weather.feelslike !== "" ? (
              <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-sm lg:text-base font-semibold shadow-md capitalize hover:bg-white/17">
                {`feels like: ${weather.feelslike}`}
              </p>
            ) : (
              <Placeholder width="130px" height="34px" />
            )}
          </div>
        </div>
      </div>
      {/* ----------- END ----------- */}
    </div>
  );
}
