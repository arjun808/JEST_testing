import { Component, ChangeEvent, MouseEvent } from 'react';
import "./To.css"
interface ToDo {
  id: number;
  todo: string;
  isDone: boolean;
}

interface AppState {
  todos: ToDo[];
  value: string;
  currentId: number,
  updateTodo:string,
  isUpdate:boolean
}

export default class ToDoApp extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
      value: '',
      currentId: 1,
      updateTodo:"",
      isUpdate:false
    };
  }

  handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.state.value !== '') {
      const newToDo: ToDo = {
        id: this.state.currentId,
        todo: this.state.value,
        isDone: false,
      };
      this.setState((prevState) => ({
        todos: [...prevState.todos, newToDo],
        value: '',
        currentId: prevState.currentId + 1,
      }));
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleDeletion = (todo: ToDo) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((t) => t.id !== todo.id),
      currentId:this.state.currentId-1
    }));
  };

  handleIsDone = (todo: ToDo) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((t) =>
       t.id === todo.id ? { ...t, isDone: !t.isDone } : t
      ),
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className='parent'>
        <p>Rendering To-Dos</p>
        {/* {this.state.isUpdate?<input type="text" value={this.state.updateTodo} onChange={this.handleChangeUpdate}></input>:""} */}
        <div className='map'>
        {todos.map((todo,index) => (
          <div key={todo.id}>
            <span>{index+1}</span>
            <span>{todo.todo}</span>
            <span onClick={() => this.handleDeletion(todo)}>🗑️</span>
            <span onClick={() => this.handleIsDone(todo)}>
              {todo.isDone ? '✅' : '❌'}
            </span>
            {/* <span onClick={()=>{this.handleUpdate(todo)}}>📝</span> */}
          </div>
        ))}

        </div>
      <div>
      <input
          type="text"
          onChange={this.handleChange}
          placeholder="Enter what you want to do"
          value={this.state.value}
        />
        <button onClick={this.handleClick}>➕</button>
      </div>
       
      </div>
    );
  }
}
