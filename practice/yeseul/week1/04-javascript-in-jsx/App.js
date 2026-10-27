const person = {
  name: "joyrii",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todo</h1>
      <img
        className="avatar"
        src="https://github.com/joyrii.png"
        alt="joyrii profile image"
      />
      <ul>
        <li>삐약삐약 병아리</li>
        <li>음매음매 송아지</li>
        <li>따당따당 사냥꾼</li>
        <li>뒤뚱뒤뚱 물오리</li>
      </ul>
    </div>
  );
}
