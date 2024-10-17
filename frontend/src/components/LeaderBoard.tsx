import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


type Props = {
    playerName: string;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
}

type scoreType = {
    name: string;
    score: number;
}

function LeaderBoard({playerName,setPlayerName}:Props) {
//   const [playerName, setPlayerName] = useState<string>("");

const baseURL= import.meta.env.VITE_BASE_URL;
const [fetchErrorLog, setfetchErrorLog] = useState("");
const [leaderboard, setLeaderBoard] = useState([])
const { data, isError: fetchError } = useQuery({
  queryKey: ["fetch1"],
  queryFn: () =>
    fetch(`${baseURL}/scoreboard`)
      .then((response) => {
        if(!response.ok){
            throw Error
        }
        return response.json()})
      .then((data) => data)
      .catch((e) => {
        setfetchErrorLog(e.message);
      }),
});

useEffect(() => {
    setLeaderBoard(data);
  }, [data]);



  const [loggedIn, setLoggedIn] = useState(false);
  const topThree = leaderboard?.sort((a: scoreType, b:scoreType) => b.score - a.score).slice(0, 5);
  const handleLogin = () => {
    if(playerName==="") return;
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setPlayerName("");
    setLoggedIn(false);
  };

  return (
    <>
      <div className=" flex flex-col items-center bg-custom-tertiary pb-4 min-h-32">
        {loggedIn === true ? (
          <button
            onClick={handleLogout}
            className="bg-custom-secondary text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
            Logout
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-white p-1">Log in to challenge the leaderboard</p>
            <input
              type="text"
              placeholder="Enter player name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="border border-gray-300 p-2 rounded mb-2 w-full max-w-xs"
            />

            <button
              onClick={handleLogin}
              className="bg-custom-secondary text-white py-2 px-4 rounded hover:bg-opacity-80"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="bg-custom-primary p-6  shadow-md">
        <h1 className="text-custom-tertiary text-3xl font-bold mb-4 text-center">
          Leaderboard
        </h1>
        <ul className="space-y-2">
          {topThree?.map((entry:scoreType, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b border-custom-secondary"
            >
              <span className="text-custom-tertiary font-semibold">
                {index + 1}. {entry.name}
              </span>
              <span className="text-custom-secondary font-medium">
                {entry.score}
              </span>
            </li>
          ))}
        </ul>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry , We are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </>
  );
}

export default LeaderBoard;
