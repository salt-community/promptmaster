import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import image from "../assets/questionMark_2.png"
import loadingGif from "../assets/SaltLoading.gif";

type Props = {
  setScore: React.Dispatch<React.SetStateAction<string>>;
  targetImageUrl: string;
  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  playerPhone: string;
  setPlayerPhone: React.Dispatch<React.SetStateAction<string>>;
  userInfoEntered: boolean;
  setUserInfoEntered: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

function ImageGenerator({
  setScore,
  targetImageUrl,
  playerName,
  setPlayerName,
  playerPhone,
  setPlayerPhone,
  userInfoEntered,
  setUserInfoEntered,
  imageUrl,
  setImageUrl,
  prompt,
  setPrompt,
}: Props) {
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [imageUrl, setImageUrl] = useState<string>("");
  let imageUrl2 = "";
  // const [prompt, setPrompt] = useState<string>("");
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
      response_format: "b64_json",
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
        setImageUrl(data?.data[0]?.b64_json);
        imageUrl2 = data?.data[0]?.b64_json;
        console.log(data?.data[0]?.b64_json);
        console.log(imageUrl);
        console.log(data);
      })
      .then(() => console.log("iam here"))
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
          role: "user",
          content: [
            {
              type: "text",
              text: "Compare these two images and assign a score in percentage based on how related the objects in the images are using semantic similarity. Consider factors like the number of common objects, their positions, and how closely the overall themes or scenes match. A score between 90 and 100 should be given only if the images depict nearly identical objects, scenes, and themes with only minor differences. A score between 75 and 89 should be given if the images share many similar objects or concepts but differ in some details such as object count, positions, or background elements. A score between 50 and 74 should be given if the images share some common objects or general themes but also contain notable differences in content or composition. A score between 25 and 49 should be given if the images have a few vaguely related elements, but the overall themes and objects are largely different. A score between 1 and 24 should be given if the images depict completely different objects, themes, or concepts with minimal relation between them. Respond with a single number between 1 and 100.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${targetImageUrl}`,
              },
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageUrl2}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
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
        setTimeout(() => {
          setScore(data?.choices[0]?.message?.content);
        }, 2000);
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
    // setPrompt("");
    await sendPromptToOpenAI();
    console.log("prompt is done");
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
      }, 1000);
    }
  }, [fetchError]);

  function handleUserInfoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (playerName && playerPhone) {
      setUserInfoEntered(true);
    }
  }

  return (
    <div className="w-[35%] bg-custom-primary rounded-lg shadow-lg p-6 mb-6">
      {!userInfoEntered ? (
        <>
          {" "}
          <div className="flex justify-center h-full items-center bg-slate-300 rounded-md">
            <form onSubmit={handleUserInfoSubmit}>
              {/* <p className="text-center text-lg font-semibold text-gray-800 mb-5">Enter your name and number to start playing</p> */}
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white text-gray-700 text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-secondary placeholder-gray-500 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={playerPhone}
                  onChange={(e) => setPlayerPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="bg-white text-gray-700 text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-secondary placeholder-gray-500 w-full"
                />
                <p className="text-gray-500 text-xs mt-1 text-center">
                  *Phone number used to contact the winner.
                </p>
              </div>

              <button
                type="submit"
                className={`w-full text-white font-semibold py-3 btn btn-primary ${
                  playerName === "" || playerPhone === "" ? "btn-disabled" : ""
                }`}
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* <div className="flex flex-col items-center justify-center  bg-custom-tertiary p-6"> */}
          {/* <div className="w-1/3 bg-custom-primary rounded-lg shadow-lg p-6 mb-6"> */}
          <div className="flex items-center justify-center mb-4">
            {isLoading ? (
              <img src={loadingGif} alt="Loading..." className="w-full rounded-md" />
            ) : (
              <img
                src={
                  imageUrl === "" ? image : `data:image/png;base64,${imageUrl}`
                }
                alt="Generated"
                className="w-full rounded-md"
              />
            )}
          </div>

          <div className="flex-col rounded-lg bg-slate-400 p-4 shadow-md">
            <textarea
              placeholder="Enter your prompt here"
              name="prompt"
              value={prompt}
              onChange={handleChange}
              className="w-full lg:h-32 bg-white text-gray-700 text-base px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-secondary placeholder-gray-500 overflow-ellipsis"
            />
            <div className="flex justify-center items-center">
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
              {`Sorry,Please try again later.${fetchErrorLog}`}
            </p>
          )}
          {/* </div> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
}

export default ImageGenerator;
