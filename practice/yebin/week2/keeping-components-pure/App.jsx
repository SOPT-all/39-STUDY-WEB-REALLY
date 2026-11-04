export default function Clock({ time }) {
  const hours = time.getHours();
  const className = hours <= 6 ? "night" : "day";

  return <h1 className={className}>{time.toLocaleTimeString()}</h1>;
}
