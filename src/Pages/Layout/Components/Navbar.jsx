import AutoCompleteComponent from "./AutoCompleteComponent";

const Navbar = () => {
  return (
    <header>
      <nav className="w-screen fixed top-0 z-50">
        <div className="flex flex-row justify-center w-full h-full relative pt-4 sm:pt-7">
          <div className="flex justify-center items-center gap-2 absolute top-1/2 -translate-y-1/2 start-6 lg:start-8">
            <div className="size-10 flex justify-center items-center rounded-full bg-primary invisible md:visible">
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
                className="lucide lucide-cloud-sun w-6 h-6 text-primary-foreground"
                aria-label="Weatherly"
              >
                <path d="M12 2v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="M20 12h2"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path>
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path>
              </svg>
            </div>
            <h1 className="font-bold text-xl text-foreground hidden lg:block">
              Weatherly
            </h1>
          </div>
          <div className="w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]">
            <AutoCompleteComponent />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
