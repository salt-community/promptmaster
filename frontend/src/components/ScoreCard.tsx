import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  playerScore: string;
  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  setUserInfoEntered: React.Dispatch<React.SetStateAction<boolean>>;
  playerPhone: string;
  setPlayerPhone: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export type NewPost = {
  name: string;
  phone: string;
  score: number;
  prompt: string;
  base64: string;

};
function ScoreCard({
  playerScore,
  playerName,
  setPlayerName,
  setScore,
  setUserInfoEntered,
  playerPhone,
  setPlayerPhone,
  imageUrl,
  setImageUrl,
  prompt,
  setPrompt,
}: Props) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const queryClient = useQueryClient();
  const {
    mutate: postScore,
    error: postError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(`${baseURL}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch1"] });
      setScore("");
      setPlayerName("");
      setPlayerPhone("");
      setImageUrl("");
      setUserInfoEntered(false);
      setPrompt("");
    },
  });

  const handleNext = () => {
    console.log(playerName + ":" + playerScore);

    postScore({
      name: playerName,
      phone: playerPhone,
      score: parseInt(playerScore, 10),
      prompt: prompt,
      base64: imageUrl
    });
  };
  return (
    <>
      <div className="flex items-center justify-center rounded-sm p-5">
        <div className="bg-slate-50 text-black p-6 rounded-lg shadow-md text-center ">
          <h2 className="text-2xl font-bold mb-4">Your Similarity Score</h2>
          <div className="m-5 bg-slate-50 rounded-md p-2">
            <div
              className="radial-progress"
              style={{
                "--value": `${playerScore}`,
                "--size": "12rem",
                "--thickness": "4px",
              }}
              role="progressbar"
            >
              {playerScore + "%"}
            </div>
          </div>
          {/* <p className="text-4xl font-extrabold text-green-400">{score}</p> */}
          <button
            onClick={handleNext}
            className="bg-custom-secondary text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
            Save Score
          </button>
          {isPending && (
            <div className="flex justify-center items-center"><span className="loading loading-dots loading-lg p-1"></span></div>
          )}
          {postError && (
            <p className="text-red-500 break-words whitespace-normal text-center ">{`Please try again later.`}</p>
          )}
        </div>
      </div>
    </>
  );
}
export default ScoreCard;
