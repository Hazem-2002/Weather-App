export default function Large() {
  return (
    <>
      <div className="flex flex-row gap-1 justify-between flex-grow">
        <div className="flex flex-col justify-center gap-6 grow max-w-[60%] overflow-hidden animate-in delay-200 slide-in-from-left duration-400">
          <div className="flex flex-col gap-3">
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
              <h4 className="text-4xl md:text-5xl font-bold w-fit">
                {weather.city}
              </h4>
            </div>
            <p className="text-white/60 font-semibold text-base md:text-lg">
              {weather.placeAddress}
            </p>
          </div>

          <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs md:text-sm font-semibold transition-all hover:bg-white/17">
            {weather.date}
          </p>

          <div className="flex flex-row gap-4 md:gap-6 w-fit">
            <div className="bg-white/10 backdrop-blur-xl p-2.5 md:px-4 md:py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/17">
              <div className="bg-white/20 p-1.5 rounded-lg shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up text-white w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                  aria-hidden="true"
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-60">
                  High
                </span>
                <span className="text-base md:text-lg font-bold">{`${weather.days_detials[0].max_temp}°`}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl p-2.5 md:px-4 md:py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/20 shadow-xl transition-all hover:bg-white/17">
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
                  className="lucide lucide-arrow-down text-white w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                  aria-hidden="true"
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-60">
                  Low
                </span>
                <span className="text-base md:text-lg font-bold">{`${weather.days_detials[0].min_temp}°`}</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col gap-4 grow max-w-[40%] animate-in delay-200 slide-in-from-right duration-400">
          
          <div className="flex justify-end flex-grow relative group h-[40%]">
            <div
              className={`absolute ${weather.WeatherUI.glow} rounded-full animate-pulse blur-[25px] group-hover:blur-[18px] `}
              style={{
                width: iconSize.width * 1.15,
                height: iconSize.height * 1.15,
                top: -iconSize.height * 0.075,
                right: -iconSize.width * 0.075,
              }}
            ></div>
            {weather.icon && (
              <img
                src={`${weather.icon}`}
                alt="Weather State"
                ref={iconRef}
                className="h-full object-cover transition duration-500 rotate-0 group-hover:rotate-10"
              />
            )}
          </div>


          <div className="flex flex-col justify-between items-end h-[60%] shrink-0">
            <p
              className={`font-bold capitalize ${weather.desc.split(" ").length > 2 ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-3xl"}`}
            >
              {weather.desc}
            </p>
            <h2 className="text-[5rem] sm:text-[6rem] md:text-[8rem] font-black leading-none my-2 drop-shadow-md">{`${weather.temp}°`}</h2>
            <p className="w-fit bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-xl border border-white/10 text-xs sm:text-sm md:text-base font-semibold capitalize hover:bg-white/17">
              {`feels like: ${weather.feelslike}°`}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
