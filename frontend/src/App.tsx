import { useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ImageGenerator from "./components/ImageGenerator";
import ScoreCard from "./components/ScoreCard";
import TargetImage from "./components/TargetImage";
import TopNav from "./components/TopNav";
import LeaderBoard from "./components/LeaderBoard";
import targetImage from "./assets/targetImage";

function App() {
  const [targetImageUrl, setTargetImageUrl] = useState<string>(
    targetImage.image
  );
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [playerPhone, setPlayerPhone] = useState("");
  const [userInfoEntered, setUserInfoEntered] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  return (
    <>
      <TopNav />
      {/* <div className="divider divider-neutral bg-custom-secondary m-0" ></div> */}
      {/* <div className="bg-custom-secondary text-center pt-20 pb-20">
        <h1 className="text-6xl font-bold text-white">
          AI Interactive Prompt Game
        </h1>
        <h1 className="text-6xl font-bold text-white">Prompt Master</h1>
      </div> */}
      {/* <GameHeader/> */}
      <div className="flex justify-around bg-custom-tertiary p-6">
        <TargetImage
          targetImageUrl={targetImageUrl}
          setTargetImageUrl={setTargetImageUrl}
        />
        {score && (
          <ScoreCard
            playerScore={score}
            playerName={playerName}
            setPlayerName={setPlayerName}
            setScore={setScore}
            setUserInfoEntered={setUserInfoEntered}
            playerPhone={playerPhone}
            setPlayerPhone={setPlayerPhone}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            prompt={prompt}
            setPrompt={setPrompt}
          />
        )}
        <ImageGenerator
          setScore={setScore}
          targetImageUrl={targetImageUrl}
          playerName={playerName}
          setPlayerName={setPlayerName}
          playerPhone={playerPhone}
          setPlayerPhone={setPlayerPhone}
          userInfoEntered={userInfoEntered}
          setUserInfoEntered={setUserInfoEntered}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          prompt={prompt}
          setPrompt={setPrompt}
        />
      </div>
      <LeaderBoard />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
