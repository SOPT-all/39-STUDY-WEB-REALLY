function Item({ todo, isChecked }) {
  return (
    <li className="item">
      {todo} {isChecked ? "✅" : "❌"}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Yebin's Todo List</h1>
      <ul>
        <Item isChecked={true} todo="리액트 공식 문서 정리하기" />
        <Item isChecked={true} todo="챌린지 도전하기~~" />
        <Item isChecked={false} todo="4셈 과제 하기......" />
      </ul>
    </section>
  );
}
