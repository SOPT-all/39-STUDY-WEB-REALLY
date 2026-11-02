
const person = {
  name: "김종현",
  theme: {
    backgroundColor: "black",
    color: "pink"
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://github.com/KimJongHyun2.png"
        alt="김종현 GitHub 프로필"
      />
      <ul>
        <li>React 공식문서 공부하기</li>
        <li>Real:ly 스터디 준비하기</li>
        <li>React 기초 이해하기</li>
      </ul>
    </div>
  );
}