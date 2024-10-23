import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";

type scoreType = {
  name: string;
  score: number;
  phone: string;
};

function LeaderBoard() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const [leaderboard, setLeaderBoard] = useState([]);
  const { login } = useLogin();
  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`${baseURL}/promptmaster/scoreboard`, {
        headers: { Authorization: login },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error;
          }
          return response.json();
        })
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  useEffect(() => {
    setLeaderBoard(data);
  }, [data]);

  const topThree = leaderboard
    ?.sort((a: scoreType, b: scoreType) => b.score - a.score)
    .slice(0, 5);

  return (
    <>
      <div className="bg-custom-primary p-6  shadow-md">
        <h1 className="text-custom-tertiary text-3xl font-bold mb-4 text-center">
          Leaderboard
        </h1>
        <ul className="space-y-2">
          {topThree?.map((entry: scoreType, index) => (
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
