import { useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import GameHeader from "./components/GameHeader";
import ImageGenerator from "./components/ImageGenerator";
import ScoreCard from "./components/ScoreCard";
import TargetImage from "./components/TargetImage";
import TopNav from "./components/TopNav";

function App() {
  const [targetImageUrl, setTargetImageUrl] = useState<string>("https://images.ctfassets.net/kftzwdyauwt9/1LhyQ3RdyPfvqqHJxEfcYe/78e9693b3e5e9ec1711c7a8e69a97e4e/dalle_3_cookie.jpg?w=1920&q=90&fm=webp");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [score, setScore] = useState<string>("")
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
      <GameHeader/>
      <div className="flex justify-evenly  bg-custom-tertiary p-6">
      <TargetImage targetImageUrl ={targetImageUrl} setTargetImageUrl={setTargetImageUrl}/>
      {score && <ScoreCard score={score} setScore={setScore}/> }
      <ImageGenerator imageUrl={imageUrl} setImageUrl={setImageUrl} setScore={setScore} targetImageUrl={targetImageUrl}/>

      </div>

      <ContactForm/>
      <Footer/>
    </>
  );
}

export default App;
