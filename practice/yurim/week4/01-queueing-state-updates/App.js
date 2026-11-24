import { useState } from "react";

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending((prevPending) => prevPending + 1);

    await delay(3000);

    setPending((prevPending) => prevPending - 1);
    setCompleted((prevCompleted) => prevCompleted + 1);
  }

  return (
    <section>
      <h1>Real:ly 리뷰 요청</h1>
      <p>리뷰 대기ing {pending}개</p>
      <p>리뷰 완료 !!{completed}개</p>

      <button type="button" onClick={handleClick}>
        리얼리동지's 리뷰 부탁드리어요 ~~
      </button>
    </section>
  );
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
