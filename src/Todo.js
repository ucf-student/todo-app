import React from "react"
let todoList = [
  {
    id: 1,
    completed: false,
    description: "Complete a demo of React and GitHub Pages",
  },
  {
    id: 2,
    completed: true,
    description: "Demo a TODO list application",
  },
]

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    let inputRef = React.createRef()
    let checkRef = React.createRef()
    let filterRef = React.createRef()
    this.state = {
      todoList,
      curId: todoList.length + 1,
      inputRef,
      checkRef,
      filterRef,
      filtered: false,
    }
  }
  completeItem = (itemId) => {
    console.log("Complete item")
    this.setState((prevState) => {
      let prevList = prevState.todoList
      let itemIndex = prevList.findIndex((item) => item.id == itemId)
      console.log(prevList[itemIndex].completed)
      prevList[itemIndex] = {
        ...prevList[itemIndex],
        completed: !prevList[itemIndex].completed,
      }
      return { todoList: [...prevList] }
    })
  }
  handleKeyPress = (event) => {
    console.log("Pressed")
    console.log(event.key)
    if (event.key == "Enter") {
      this.addTodoItem()
    }
  }
  addTodoItem = () => {
    let prevValue = this.state.inputRef.current.value
    this.setState((prevState) => ({
      todoList: [
        ...prevState.todoList,
        { completed: false, description: prevValue, id: prevState.curId },
      ],
      curId: prevState.curId + 1,
    }))
    this.state.inputRef.current.value = ""
  }
  render() {
    console.log("Rendered")
    console.log("Rendered")
    let todoList = this.state.todoList
    if (this.state.filtered) {
      todoList = todoList.filter((item) => !item.completed)
    }
    todoList = todoList.map((item) => (
      <div key={item.id}>
        <label>
          <input
            ref={this.state.checkRef}
            type="checkbox"
            onChange={() => this.completeItem(item.id)}
            defaultChecked={item.completed}
          ></input>
          <span
            style={
              item.completed ? { textDecoration: "line-through" } : undefined
            }
          >
            {item.description}
          </span>
        </label>
      </div>
    ))
    return (
      <>
        <h1>What to do today?</h1>
        <label>
          <input
            ref={this.state.filterRef}
            type="checkbox"
            onChange={() =>
              this.setState((prev) => ({ filtered: !prev.filtered }))
            }
            defaultChecked={false}
          ></input>
          Filter completed items
        </label>
        <hr></hr>
        <div style={{ padding: "5px" }}>{todoList}</div>
        <input
          onKeyPress={(event) => this.handleKeyPress(event)}
          ref={this.state.inputRef}
        ></input>
        <button onClick={() => this.addTodoItem()}>Add TODO Item</button>
      </>
    )
  }
}
