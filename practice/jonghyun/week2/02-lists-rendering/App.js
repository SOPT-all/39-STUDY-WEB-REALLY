import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(
    person => person.profession === 'chemist'
  );

  const everyoneElse = people.filter(
    person => person.profession !== 'chemist'
  );

  const chemistItems = chemists.map(person => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  ));

  const otherItems = everyoneElse.map(person => (
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  ));

  return (
    <>
      <h2>Chemists</h2>
      <ul>{chemistItems}</ul>

      <h2>Everyone Else</h2>
      <ul>{otherItems}</ul>
    </>
  );
}