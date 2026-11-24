import { useState } from "react";

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    const nextWalk = !walk;

    setWalk(nextWalk);
    alert(nextWalk ? "NextWalk" : "NextStop");
  }

  return (
    <>
      <h1 style={{ color: walk ? "darkgreen" : "darkred" }}>
        {walk ? "Walk ~~" : "Stop !!"}
      </h1>
      <button type="button" onClick={handleClick}>
        {walk ? "Change To Stop !!" : "Change To Walk ~~"}
      </button>
    </>
  );
}
