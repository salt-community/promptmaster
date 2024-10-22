// import { useEffect, useState } from "react";
// import image from "../assets/img-Rhj21LhzqVMHdTiPr7EQNcDV.png";
// import loadingGif from "../assets/Cube@1x-1.0s-200px-200px.gif";

type Props = {
  targetImageUrl: string;
  setTargetImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

function TargetImage({ targetImageUrl }: Props) {
  //   const [imageUrl, setImageUrl] = useState<string>("");
  // const API_KEY = import.meta.env.VITE_API_KEY;
  // const [fetchError, setfetchError] = useState(false);
  // const [fetchErrorLog, setfetchErrorLog] = useState("");
  //  const [isLoading, setIsLoading] = useState(false);

  // async function sendPromptToOpenAI() {
  //   setIsLoading(true);
  //   const apiRequestBody = {
  //     model: "dall-e-3",
  //     prompt: "a random image that is hard to generate",
  //     n: 1,
  //     size: "1024x1024",
  //   };
  //   await fetch("https://api.openai.com/v1/images/generations", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + API_KEY,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(apiRequestBody),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error;
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setTargetImageUrl(data?.data[0]?.url);
  //       console.log(data?.data[0]?.url);
  //       console.log(targetImageUrl);
  //     })
  //     .catch((e) => {
  //       setfetchError(true);
  //       setfetchErrorLog(e.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // function handleClick() {
  //   console.log("hi");
  //   sendPromptToOpenAI();
  // }


  // useEffect(() => {
  //   if (fetchError) {
  //     setTimeout(() => {
  //       setfetchError(false);
  //     }, 2000);
  //   }
  // }, [fetchError]);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center  bg-custom-tertiary p-6"> */}
      <div className="flex-col w-[35%] bg-custom-primary rounded-lg shadow-lg p-6 mb-6 ">
        <div className=" flex items-center justify-center mb-4">
          {/* {isLoading ? (
            <img src={loadingGif} alt="Loading..." className="w-full" />
          ) : (
            <img
              src={ `data:image/png;base64,${targetImageUrl}`}
              alt="Generated"
              className="w-full rounded-md"
            />
          )} */}
           <img
              src={ `data:image/png;base64,${targetImageUrl}`}
              alt="Generated"
              className="w-full rounded-md"
            />
        </div>
        <div className="flex justify-stretch items-center">
          <p className="text-center text-lg font-semibold text-gray-800  border-l-4 rounded-md ">
            Can You Match This Masterpiece? Let’s See Your Skills!
          </p>

          {/* <div className="flex justify-center items-center pt-2">
            <button
              className=" bg-custom-secondary hover:bg-orange-300 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 "
              onClick={handleClick}
            >
              Shuffle
            </button>
          </div> */}
        </div>
        {/* {fetchError && (
          <p className="text-red-500 text-sm break-words whitespace-normal flex justify-center items-center text-center">
            {" "}
            {`Sorry,Please try again later.${fetchErrorLog}`}
          </p>
        )} */}
      </div>
      {/* </div> */}
    </>
  );
}

export default TargetImage;
