import React, { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [ipText, setipText] = useState("");
  const [selectedTodo, setselectedTodo] = useState({});
  const [selectedIndex, setselectedIndex] = useState(-1);
  useEffect(() => {
    fetch("http://localhost:9500/api/todos")
      .then((res) => {
        res.json().then((data) => {
          setTodos(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="row p-5">
        <h1 className="text-center">MY TODO LIST</h1>
      </div>
      <div className="row">
        <form
          className="my-5"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://localhost:9500/api/todos", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: ipText,
              }),
            })
              .then((res) => {
                res.json().then((data) => {
                  setTodos([...todos, data]);
                  setipText("");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <div className="row align-items-center">
            <div className="col-8">
              <input
                type="text"
                width="100%"
                class="form-control"
                value={ipText}
                onChange={(e) => setipText(e.target.value)}
              />
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary">
                <i class="bi bi-save"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container">
        {todos?.map((todo, index) => (
          <div className="row">
            <p className="col-6">{todo.text}</p>
            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  fetch(`http://localhost:9500/api/todos/${todo.id}`, {
                    method: "DELETE",
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        if (data > 0 || data !== undefined) {
                          setTodos([
                            ...todos.slice(0, index),
                            ...todos.slice(index + 1),
                          ]);
                        }
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <i class="bi bi-trash" />
              </button>
            </div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setselectedTodo(todo);
                  setselectedIndex(index);
                }}
              >
                <i class="bi bi-pen"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                width="100%"
                class="form-control"
                value={selectedTodo.text}
                onChange={(e) =>
                  setselectedTodo({ ...selectedTodo, text: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  fetch(`http://localhost:9500/api/todos/${selectedTodo.id}`, {
                    method: "put",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      text: selectedTodo.text,
                      completed: selectedTodo.completed,
                    }),
                  })
                    .then((res) => {
                      res.json().then((data) => {
                        console.log([
                          ...todos.slice(0, selectedIndex),
                          data,
                          ...todos.slice(selectedIndex + 1),
                        ]);
                        setTodos([
                          ...todos.slice(0, selectedIndex),
                          data,
                          ...todos.slice(selectedIndex + 1),
                        ]);
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
