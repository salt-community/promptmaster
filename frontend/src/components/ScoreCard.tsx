
type Props = {
  score: string;
  setScore: React.Dispatch<React.SetStateAction<string>>;
}


function ScoreCard({score, setScore}: Props){

    return(<>
    <div className="flex items-center justify-center">
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md text-center ">
        <h2 className="text-2xl font-bold mb-4">Your Similarity Score</h2>
        <p className="text-4xl font-extrabold text-green-400">{score}</p>
      </div>
    </div>

    </>)
}
export default ScoreCard;