import { ChangeEvent, useEffect, useState } from "react";
import image from "../assets/empty.png";
import loadingGif from "../assets/Cube@1x-1.0s-200px-200px.gif";


type Props = {
    setScore: React.Dispatch<React.SetStateAction<string>>;
    targetImageUrl: string;
}

function ImageGenerator({setScore,targetImageUrl}:Props) {
  const [imageUrl, setImageUrl] = useState<string>("");
  let imageUrl2="";
  const [prompt, setPrompt] = useState<string>("");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [fetchError, setfetchError] = useState(false);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendPromptToOpenAI() {
    setIsLoading(true);
    const apiRequestBody = {
      model: "dall-e-3",
      prompt: prompt === "" ? "a white siamese cat" : prompt,
      n: 1,
      size: "1024x1024",
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
        imageUrl2=data?.data[0]?.url;
        console.log(data?.data[0]?.url);
        console.log(imageUrl);
      }).then(()=> console.log("iam here"))
      .catch((e) => {
        setScore("");
        setfetchError(true);
        setfetchErrorLog(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function sendimagestoOpenAI() {
    setIsLoading(true);
    console.log(imageUrl);
    console.log(targetImageUrl);
    const apiRequestBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "Compare these two images and assign a score in percentage on how the objects in the image are related using semantic similarity (i.e., whether the images depict similar objects).Do not give 0 as an answer. Reply as a number with just the score as a value between 1 and 100"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": targetImageUrl,
              }
            },
            {
              "type": "image_url",
              "image_url": {
                "url": imageUrl2,
              }
            }
          ]
        }
      ],
      "max_tokens": 300,

    };
    await fetch("https://api.openai.com/v1/chat/completions", {
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
        console.log(data);
        setScore(data?.choices[0]?.message?.content);
      })
      .catch((e) => {
        setScore("");
        setfetchError(true);
        setfetchErrorLog(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

   async function handleClick() {
    console.log("hi");
    setScore("");
    await sendPromptToOpenAI();
    console.log("prompt is done")
    await sendimagestoOpenAI();
    console.log("image comparison is done");
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
    console.log(prompt);
  }

  useEffect(() => {
    if (fetchError) {
      setTimeout(() => {
        setfetchError(false);
      }, 2000);
    }
  }, [fetchError]);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center  bg-custom-tertiary p-6"> */}
        <div className=" w-1/3  bg-custom-primary rounded-lg shadow-lg p-6 mb-6">
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

          <div className="flex items-center justify-between rounded-lg bg-slate-400 p-4 shadow-md">
            <textarea
              placeholder="Enter your prompt here"
              name="prompt"
              value={prompt}
              onChange={handleChange}
              className=" bg-white text-gray-700 text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-secondary placeholder-gray-500 overflow-ellipsis"
            />
            <button
              className="bg-custom-secondary hover:bg-orange-300 text-white font-bold px-6 py-2 rounded-full ml-4 transition-all duration-300"
              onClick={handleClick}
            >
              Generate
            </button>
          </div>
          {fetchError && (
          <p className="text-red-500 text-sm break-words whitespace-normal flex justify-center items-center text-center">
            {" "}
            {`Sorry,Please try again later.${fetchErrorLog}`}
          </p>
        )}
        </div>
       
      {/* </div> */}
    </>
  );
}

export default ImageGenerator;
