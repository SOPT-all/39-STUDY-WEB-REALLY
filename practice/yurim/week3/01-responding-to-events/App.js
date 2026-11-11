export default function LightSwitch() {
  function handleClick() {
    const bodyStyle = document.body.style;

    if (bodyStyle.backgroundColor === "black") {
      bodyStyle.backgroundColor = "white";
    } else {
      bodyStyle.backgroundColor = "black";
    }
  }

  return (
    <button type="button" onClick={handleClick}>
      Real:ly 불 ON / OFF
    </button>
  );
}
