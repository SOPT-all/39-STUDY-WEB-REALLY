import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

function ListSection({ people }) {
  return (
    <>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
              <b>{person.name}:</b>
              {" " + person.profession + " "}
              known for {person.accomplishment}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter((person) => person.profession === "chemist");

  const everyoneElse = people.filter(
    (person) => person.profession !== "chemist",
  );

  return (
    <article>
      <h1>Chemists</h1>
      <ListSection people={chemists} />
      <h1>Everyone Else</h1>
      <ListSection people={everyoneElse} />
    </article>
  );
}
