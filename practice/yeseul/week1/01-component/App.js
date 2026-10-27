function Profile() {
  return <img src="https://github.com/joyrii.png" alt="joyrii profile image" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Profile</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
