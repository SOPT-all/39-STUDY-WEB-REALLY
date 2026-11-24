import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
    // alert이 !walk 앞이든 뒤든 결과는 같음
  }

  return (
    <>
      <button onClick={handleClick}>
        {/* 삼항 연산자 사용 근데 신호라서 stop이랑 walk가 반대. 현재 walk가 ture면 다음에는 stop이 오겠지 */}
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
