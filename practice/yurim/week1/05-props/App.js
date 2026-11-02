import { getImageUrl } from "./utils.js";

function Profile({ name, username, role, interest, goal }) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        src={getImageUrl(username)}
        alt={`${name}'s GitHub 프로필`}
        width={100}
        height={100}
      />
      <ul>
        <li>
          <b>Role: </b>
          {role}
        </li>
        <li>
          <b>Like: </b>
          {interest}
        </li>
        <li>
          <b>Goal: </b>
          {goal}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Real:ly 프로필</h1>
      <Profile
        name="황유림"
        username="yurimidaH"
        role="Study B0ss"
        interest="앙버터...아니 React"
        goal="코드의 흐름 위에서 파도타기"
      />
      <Profile
        name="Hwang"
        username="yurimidaH"
        role="Study Family"
        interest="JSX/JavaScript"
        goal="내가 짠 코드qa에 겁 먹지 말자"
      />
    </div>
  );
}
