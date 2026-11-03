import { people } from "./data.js";
import { getImageUrl } from "./utils.js";

function ListSection({ title, list }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {list.map((person) => (
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
    </section>
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
      <ListSection title="Chemists" list={chemists} />
      <ListSection title="Everyone Else" list={everyoneElse} />
    </article>
  );
}
