import { useState, Component } from "react";
import "./todo.css";

function Item(props) {
  return (
    <>
      <input
        type="checkbox"
        checked={props.done}
        onChange={() => props.toggleStatus(props.taskId, !props.done)}
      />
      <span>{props.task}</span>
    </>
  );
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.change = this.change.bind(this);
    this.keyPress = this.saveAndClear.bind(this);
  }

  change(event) {
    this.setState({ value: event.target.value });
  }

  saveAndClear(event) {
    if (event.key === "Enter") {
      if (this.state.value === "") return;
      this.props.onSubmit(this.state.value);
      this.setState({ value: "" });
    }
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.value}
          onChange={this.change}
          onKeyDown={this.keyPress}
        />
      </>
    );
  }
}

function Todo({ taskId }) {
  const allTask = [
    { task: "buy clothes", done: true, taskId: 1 },
    { task: "buy surf", done: true, taskId: 2 },
  ];

  const [items, setItems] = useState(allTask);

  function toggle(taskId, done) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.taskId === taskId ? { ...item, done } : item
      )
    );
  }

  function addTask(task) {
    setItems((prev) => [...prev, { task, done: false, taskId: taskId() }]);
  }

  return (
    <p>
      <Input onSubmit={addTask} />
      {items.map((item) => (
        <Item
          task={item.task}
          done={item.done}
          taskId={item.taskId}
          toggleStatus={toggle}
          key={item.taskId}
        />
      ))}
    </p>
  );
}

class multipleTodos extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  // render() {
  //   return (

  //   )
  // }
}

export default function App() {
  function generateId() {
    let count = 5;
    return () => count++;
  }

  const taskId = generateId();
  const todoId = generateId();

  return (
    <div>
      <Todo taskId={taskId} todo={todoId}>
        {" "}
      </Todo>
    </div>
  );
}
