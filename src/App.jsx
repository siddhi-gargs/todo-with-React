import { useState } from "react";
import "./App.css";

function App(props) {
  const [something, setSomething] = useState(props.initialCount);

  const increment = () => {
    return setSomething(something + props.increment || 1);
  };

  const reset = () => setSomething(0);
  return (
    <div>
      <button onClick={increment}>{something}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function double() {
  return (
    <div>
      <App initialCount={5} increment={2} />
      <App initialCount={0} increment={5} />
    </div>
  );
}
