import { useState } from "react";

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: "유림",
    lastName: "HWANG",
    score: 10,
  });

  function handlePlusClick() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      score: prevPlayer.score + 1,
    }));
  }

  function handleFirstNameChange(event) {
    const firstName = event.target.value;

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      firstName,
    }));
  }

  function handleLastNameChange(event) {
    const lastName = event.target.value;

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      lastName,
    }));
  }

  return (
    <section>
      <h1>Hwang's 리뷰 점수판</h1>

      <p>
        리뷰 SCORE <strong>{player.score}</strong>{" "}
        <button type="button" onClick={handlePlusClick}>
          +1
        </button>
      </p>

      <p>
        <label>
          이름{" "}
          <input value={player.firstName} onChange={handleFirstNameChange} />
        </label>
      </p>

      <p>
        <label>
          성 <input value={player.lastName} onChange={handleLastNameChange} />
        </label>
      </p>

      <p>
        {player.lastName}
        {player.firstName}님, 오늘도 리뷰 많관부~~ 🤘🏽
      </p>
    </section>
  );
}
