type Props = {
  score: string;
  playerName: string;
};

function ScoreCard({ score, playerName }: Props) {
  const handleSave = () => {
    console.log(playerName + ":" + score);
  };
  return (
    <>
      <div className="flex items-center justify-center rounded-sm">
        <div className="bg-slate-50 text-black p-6 rounded-lg shadow-md text-center ">
          <h2 className="text-2xl font-bold mb-4">Your Similarity Score</h2>
          <div className="m-5 bg-slate-50 rounded-md p-2">
            <div
              className="radial-progress"
              style={{
                "--value": `${score}`,
                "--size": "12rem",
                "--thickness": "4px",
              }}
              role="progressbar"
            >
              {score + "%"}
            </div>
          </div>
          {/* <p className="text-4xl font-extrabold text-green-400">{score}</p> */}
          <button
            onClick={handleSave}
            className="bg-custom-secondary text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
            Save Score
          </button>
        </div>
      </div>
    </>
  );
}
export default ScoreCard;
