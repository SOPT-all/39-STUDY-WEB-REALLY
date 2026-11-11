import { useState } from "react";
import { studyCards } from "./data.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasPrevious = index > 0;
  const hasNext = index < studyCards.length - 1;
  const card = studyCards[index];

  function handlePreviousClick() {
    setIndex(index - 1);
  }

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <section>
      <h1>Real:ly 스터디 갤러리</h1>

      <button
        type="button"
        onClick={handlePreviousClick}
        disabled={!hasPrevious}
      >
        이전
      </button>
      <button type="button" onClick={handleNextClick} disabled={!hasNext}>
        다음
      </button>

      <h2>{card.title}</h2>
      <p>
        {index + 1} / {studyCards.length}
      </p>

      <button type="button" onClick={handleMoreClick} aria-expanded={showMore}>
        {showMore ? "상세 설명 닫기" : "상세 설명 보기"}
      </button>
      {showMore && <p>{card.description}</p>}

      <p>
        <label>
          리뷰 초안{" "}
          <input type="text" placeholder="너,카드를 넘겨도 남아 있어?" />
        </label>
      </p>
    </section>
  );
}
