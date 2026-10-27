
import { getImageUrl } from "./utils.js";

function Profile({ name, username, role, interest, goal }) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(username)}
        alt={`${name}의 GitHub 프로필`}
        width={100}
        height={100}
      />
      <ul>
        <li>
          <b>Role: </b>
          {role}
        </li>
        <li>
          <b>Interest: </b>
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
      <h1>Real:ly 스터디 프로필</h1>

      <Profile
        name="김종현"
        username="KimJongHyun2"
        role="SOPT 39기 WEB"
        interest="React, JavaScript, Next.js"
        goal="열심히 하자"
      />

      <Profile
        name="JONG"
        username="KimJongHyun2"
        role="Real:ly 스터디원"
        interest="React!!"
        goal="React 공부하고 뽀개기!"
      />
    </div>
  );
}
