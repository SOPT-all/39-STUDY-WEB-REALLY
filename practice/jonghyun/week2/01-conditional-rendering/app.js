function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>종현이의 일주일</h1>
      <ul>
        <Item
          isPacked={true}
          name="코드리뷰 하기"
        />
        <Item
          isPacked={true}
          name="아티클 작성하기"
        />
        <Item
          isPacked={false}
          name="잠 자기"
        />
      </ul>
    </section>
  );
}
