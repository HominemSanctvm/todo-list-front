import logo from './logo.svg';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {

const Todos = ({ todos }) => {
  return (
     <div className="todos">
       { todos.map((todo) => {
         return (
          <div className="todo">
            <button 
            onClick={() => modifyStatusTodo(todo)}
            className="checkbox" 
            style={ { backgroundColor: todo.status ? "#A879E6" : "white"}}/>
            <p>{todo.name}</p>
            <button onClick={ () => handleWithEditButtonClick(todo) }>
              <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
            </button>
            <button onClick={ () => { deleteTodo(todo) } }>
              <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
            </button>

          </div>
         );
       })}
    </div>
  );
};

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", 
      { name: inputValue });
    getTodos();
    setInputVisibility(!inputVisibility);
  }
    
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data)
  }

async function handleWithEditButtonClick(todo) {
  setSelectedTodo(todo);
  setInputVisibility(true);
}

  async function modifyStatusTodo(todo) {
    const response = await axios.put('http://localhost:3333/todos/',
      { 
        id: todo.id,
        status: !todo.status
      });
    getTodos();
  } 

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos();
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Don't be Lazy</h1>
        </div>
        <Todos todos={todos}/>
        <input
          value={inputValue}
          style={ {display: inputVisibility ? "block" : "none"} }
          onChange={ (event) => {
          setInputValue(event.target.value);
          } }
        className="inputName" />
        <button onClick={ inputVisibility ? createTodo : handleWithNewButton } 
                className="newTaskButton">
          { inputVisibility ? "Confirm" : "+ New Task" }
        </button>
      </header>
    </div>
  );
}

export default App;
