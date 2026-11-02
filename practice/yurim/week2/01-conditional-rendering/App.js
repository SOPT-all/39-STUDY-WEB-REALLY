function Item({ name, isChecked }) {
  return (
    <li className="item">
      {name} {isChecked ? "💅🏽" : "❌"}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Hwang's TODO list</h1>
      <ul>
        <Item name="Real:ly 스터디 과제" isChecked={true} />
        <Item name="Real:ly Week1 머지파티" isChecked={true} />
        <Item name="졸업전시 부스 디자인" isChecked={false} />
      </ul>
    </section>
  );
}
