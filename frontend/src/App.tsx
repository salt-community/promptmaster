import "./App.css";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import GameHeader from "./components/GameHeader";
import ImageGenerator from "./components/ImageGenerator";
import ScoreCard from "./components/ScoreCard";
import TargetImage from "./components/TargetImage";
import TopNav from "./components/TopNav";

function App() {
  
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
      <TargetImage/>
      <ScoreCard/>
      <ImageGenerator/>

      </div>

      <ContactForm/>
      <Footer/>
    </>
  );
}

export default App;
