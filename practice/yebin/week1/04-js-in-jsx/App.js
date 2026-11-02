const person = {
  name: "최예빈",
  imgUrl: "https://github.com/YeBeenChoi.png",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className="avatar" src={person.imgUrl} alt="최예빈" />
      <ul>
        <li>공식 문서 열심히 읽기</li>
        <li>이해될 때까지 읽고 또 읽기...</li>
        <li>나만의 언어로 정리하기!</li>
      </ul>
    </div>
  );
}
