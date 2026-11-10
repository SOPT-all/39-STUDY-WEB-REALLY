import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

function PeopleList({ people }) {
  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          <img src={getImageUrl(person)} alt={person.name} />
          <p>
            <b>{person.name}: </b>
            {person.profession}
            {" — "}
            {person.accomplishment}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function List() {
  const chemists = people.filter((person) => person.profession === "chemist");

  const everyoneElse = people.filter(
    (person) => person.profession !== "chemist",
  );

  return (
    <article>
      <h1>Scientists</h1>

      <h2>Chemists</h2>
      <PeopleList people={chemists} />

      <h2>Everyone Else</h2>
      <PeopleList people={everyoneElse} />
    </article>
  );
}
// 이번 실습은 data.js&utils.js 변경에 한계가 있어서 봐줬음ㅋㅋ
// PeopleList 추출은 필수 조건은 아니지만? 같은 마크업을 두 번 작성하지 않도록 한 구성
