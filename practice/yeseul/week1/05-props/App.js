import { getImageUrl } from "./utils.js";

function Profile({ name, imageId, like, music, tmi }) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name + " profile image"}
        width={70}
        height={70}
      />
      <ul>
        <li>
          <b>Like: </b>
          {like}
        </li>
        <li>
          <b>Now Playing: </b>
          {music}
        </li>
        <li>
          <b>TMI: </b>
          {tmi}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>About ME</h1>
      <Profile
        name="예슬"
        imageId="joyrii"
        like="소금빵"
        music="🎵It's Me - ILLIT"
        tmi="배고파요 소금빵 먹고 싶어요"
      />
      <Profile
        name="슬예"
        imageId="joyrii"
        like="오리"
        music="🎵SUN KISS - TUIDE"
        tmi="오늘 가디건만 입었는데 너무 추워요"
      />
    </div>
  );
}
