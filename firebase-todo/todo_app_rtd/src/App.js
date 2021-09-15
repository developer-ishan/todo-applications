import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import Todo from "./Todo";
import { db } from "./firebase";
import firebase from 'firebase';

function App() {
  //Like shot term memory
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when app loads we need to listen to database
  //and fetch all the todos as they get
  //added/removed

  useEffect(() => {
    var ref = db.ref('todos/');

    ref.on(
      "value",
      function (snapshot) {
        const todos_fb = snapshot.val();
        setTodos(Object.entries(todos_fb).map( ([key, todo]) => ({
          task: todo.task
        })))
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );
  }, []);
  const addTodo = (event) => {
    //fireoff when we click the button
    event.preventDefault(); //will stop the refresh
    
    var ref = db.ref('todos/');
    ref.push({
      task: input
    })
    
    var ref = db.ref('todos/');

    setTodos([...todos, {
      task: input
    }])

    setInput(""); //clear up the input value after adding the todo to the list
  };
  return (
    <div className="App">
      <h1>Hello world to Firebase</h1>

      <form>
        <FormControl>
          <InputLabel>WRITE A TODO</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
          onClick={addTodo}
        >
          ADD TODO
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo text={todo.task}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
