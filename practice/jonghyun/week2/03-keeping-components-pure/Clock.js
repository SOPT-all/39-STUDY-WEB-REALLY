export default function Clock({ time }) {
  const hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}



// 조건부에서 배운 삼항 연산자로 바꿔보기 ? : 꼴


export default function Clock({ time }) {
  const hours = time.getHours();
  const className = hours >= 0 && hours <= 6 ? 'night' : 'day';

  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}