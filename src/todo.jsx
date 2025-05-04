import { Component } from "react";
import "./todo.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.change = this.change.bind(this);
    this.saveAndClear = this.saveAndClear.bind(this);
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
          onKeyDown={this.saveAndClear}
        />
      </>
    );
  }
}

function Item(props) {
  return (
    <>
      <input
        type="checkbox"
        checked={props.task.done}
        onChange={() => props.toggleStatus(props.task.taskId, !props.task.done)}
      />
      <span>{props.task.task}</span>
    </>
  );
}

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <p>
        <div>{this.props.todo.title}</div>
        <Input
          onSubmit={(task) => this.props.addTask(this.props.todo.todoId, task)}
        />
        {this.props.tasks.map((task) => (
          <Item
            task={task}
            toggleStatus={(taskId, done) =>
              this.props.toggle(this.props.todo.todoId, taskId, done)
            }
            key={task.taskId}
            todoId={this.props.todo.todoId}
          />
        ))}
        {/* <Item
          done={this.props.todo.done}
          taskId={this.props.todo.taskId}
          toggleStatus={this.props.toggle}
          
        /> */}
      </p>
    );
  }
}

class MultipleTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          todoId: 1,
          title: "siddhi",
          tasks: [
            {
              taskId: 1,
              task: "buy clothes",
              done: false,
            },
            {
              taskId: 2,
              task: "buy clothes",
              done: false,
            },
          ],
        },
        {
          todoId: 2,
          title: "sameera",
          tasks: [
            {
              taskId: 1,
              task: "buy clothes",
              done: false,
            },
            {
              taskId: 2,
              task: "buy clothes",
              done: false,
            },
          ],
        },
      ],
    };

    this.addTodo = this.addTodo.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addTask(todoId, task) {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) => {
        if (todo.todoId === todoId) {
          return {
            ...todo,
            tasks: [
              ...todo.tasks,
              { task, taskId: this.props.taskId(), done: false },
            ],
          };
        }
        return todo;
      }),
    }));
  }

  toggle(todoId, taskId, done) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.todoId === todoId) {
          return {
            ...todo,
            tasks: todo.tasks.map((task) =>
              task.taskId === taskId ? { ...task, done } : task
            ),
          };
        } else {
          return todo;
        }
      }),
    }));
  }

  addTodo(title) {
    this.setState((prev) => ({
      todos: [...prev.todos, { todoId: this.props.todoId(), title, tasks: [] }],
    }));
  }

  render() {
    return (
      <div>
        <h2>Add New To-Do List</h2>
        <Input onSubmit={this.addTodo} />
        {this.state.todos.map((todo) => (
          <Todo
            todo={todo}
            tasks={todo.tasks}
            key={todo.taskId}
            addTask={this.addTask}
            toggle={this.toggle}
            probs={this.props}
          />
        ))}
      </div>
    );
  }
}

function App() {
  function generateId() {
    let count = 5;
    return () => count++;
  }

  const taskId = generateId();
  const todoId = generateId();

  return (
    <div>
      <MultipleTodos taskId={taskId} todoId={todoId} />
    </div>
  );
}

export default App;
