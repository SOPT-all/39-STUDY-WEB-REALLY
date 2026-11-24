export default function ColorSwitch({ onChangeColor }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // 전파 막기
        onChangeColor(); // 핸들러 호출
      }}
    >
      Change color
    </button>
  );
}
