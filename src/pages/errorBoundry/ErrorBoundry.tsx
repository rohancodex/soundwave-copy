import Error from "@/assets/Images/something-went-wrong-5173724-4334907.gif"
export const ErrorBoundry = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 ">
      <div className="text-center">
        <img src={Error} alt="error" className="flex flex-col -mt-10" />
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {`Something went wrong :(`}
        </h3>
        <p className="mt-6 text-base leading-7 text-gray-600">
        Please wait back. We are looking into it. 
        </p>
      </div>
    </main>
  );
};
