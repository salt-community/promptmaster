import CircleProgressBar from "./CircleProgressBar";

type Props = {
  score: string;
  setScore: React.Dispatch<React.SetStateAction<string>>;
};

function ScoreCard({ score, setScore }: Props) {
  return (
    <>
      <div className="flex items-center justify-center rounded-sm">
        <div className="bg-slate-50 text-black p-6 rounded-lg shadow-md text-center ">
          <h2 className="text-2xl font-bold mb-4">Your Similarity Score</h2>
          <div className="m-5 w-52 h-52 relative bg-slate-50 rounded-md p-2">
            {/* <h1>Progress Bar Example</h1> */}
            <CircleProgressBar value={parseFloat(score)/100} />
          </div>
          {/* <p className="text-4xl font-extrabold text-green-400">{score}</p> */}
        </div>
      </div>
    </>
  );
}
export default ScoreCard;
