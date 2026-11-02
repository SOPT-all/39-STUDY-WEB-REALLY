const person = {
  name: "황유림",
  imageUrl: "https://github.com/yurimidaH.png",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s 공부 MeM0</h1>
      <img
        src={person.imageUrl}
        alt={`${person.name}'s GitHub 프로필`}
        width={100}
        height={100}
      />
      <ul>
        <li>React 공식문서 읽기</li>
        <li>챌린지 직접 풀어보자</li>
        <li>이해한 내용을 설명하자</li>
      </ul>
    </div>
  );
}
