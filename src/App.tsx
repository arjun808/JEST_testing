import React, { Component } from 'react'
import ToDoApp from './ToDoApp'
import TodoByApi from './TodoByApi'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Todo app</h1>
        {/* <ToDoApp/> */}
        <TodoByApi/>
      </div>
    )
  }
}
