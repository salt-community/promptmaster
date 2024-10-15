import { ChangeEvent, useState } from "react";
import image from "../assets/img-Rhj21LhzqVMHdTiPr7EQNcDV.png";
import loadingGif from "../assets/Cube@1x-1.0s-200px-200px.gif";

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [fetchError, setfetchError] = useState(false);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendPromptToOpenAI() {
    setIsLoading(true);
    const apiRequestBody = {
      model: "dall-e-2",
      prompt: prompt === "" ? "a white siamese cat" : prompt,
      n: 1,
      size: "512x512",
    };
    await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error;
        }
        return response.json();
      })
      .then((data) => {
        setImageUrl(data?.data[0]?.url);
        console.log(data?.data[0]?.url);
        console.log(imageUrl);
      })
      .catch((e) => {
        setfetchError(true);
        setfetchErrorLog(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClick() {
    console.log("hi");
    sendPromptToOpenAI();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPrompt(event.target.value);
    console.log(prompt);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center  bg-custom-tertiary p-6">
        {/* <div className="text-center mb-6">
                    <h1 className="text-6xl font-bold text-white mb-4">Prompt Master</h1>
                </div> */}

        <div className="w-2/3 lg:w-1/3 bg-custom-primary rounded-lg shadow-lg p-6 mb-6">
          <div className=" flex items-center justify-center mb-4">
            {isLoading ? (
              <img src={loadingGif} alt="Loading..." className="w-full" />
            ) : (
              <img
                src={imageUrl === "" ? image : imageUrl}
                alt="Generated"
                className="w-full rounded-md"
              />
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-400 p-4 shadow-md w-full mx-auto">
            <input
              type="text"
              placeholder="Enter your prompt here"
              name="prompt"
              value={prompt}
              onChange={handleChange}
              className="flex-grow bg-white text-gray-700 text-lg px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-custom-secondary placeholder-gray-500 overflow-ellipsis"
            />
            <button
              className="bg-custom-secondary hover:bg-orange-300 text-white font-bold px-6 py-2 rounded-full ml-4 transition-all duration-300"
              onClick={handleClick}
            >
              Generate
            </button>
          </div>
        </div>
        {fetchError && (
          <p className="text-red-500 text-sm break-words whitespace-normal flex justify-center items-center text-center">
            {" "}
            {`Sorry,Please try again later.${fetchErrorLog}`}
          </p>
        )}
      </div>
    </>
  );
}

export default ImageGenerator;
