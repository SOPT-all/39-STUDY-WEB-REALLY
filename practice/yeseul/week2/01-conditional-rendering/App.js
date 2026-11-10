function Item({ isPacked, name, importance }) {
  return (
    <li className="item">
      {isPacked ? "✅ " : "❌ "}
      {name}
      {importance > 0 && <i> (Importance: {importance})</i>}
    </li>
  );
}

function Drink({ name }) {
  let partOfPlant, caffeineContent, age;
  if (name === "tea") {
    partOfPlant = "leaf";
    caffeineContent = "15–70 mg/cup";
    age = "4,000+ years";
  } else {
    partOfPlant = "bean";
    caffeineContent = "80–185 mg/cup";
    age = "1,000+ years";
  }

  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{partOfPlant}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeineContent}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Joyrii's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" importance={9} />
        <Item isPacked={true} name="Helmet with a golden leaf" importance={0} />
        <Item isPacked={false} name="Photo of Tam" importance={6} />
      </ul>

      <h1>Joyrii's Drinks</h1>
      <Drink name="tea" />
      <Drink name="coffee" />
    </section>
  );
}
