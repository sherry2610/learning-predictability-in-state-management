
//App code
function generateId() {
    return (
      Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
    );
  }
  
  const ADD_TODO = "ADD_TODO";
  const REMOVE_TODO = "REMOVE_TODO";
  const TOGGLE_TODO = "TOGGLE_TODO";
  const ADD_GOAL = "ADD_GOAL";
  const REMOVE_GOAL = "REMOVE_GOAL";



function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
        return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }));
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}
//ROOT REDUCER
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = Redux.createStore(app);

store.subscribe(() => {
  const { todos, goals } = store.getState();

  document.getElementById("goals").innerHTML = "";
  document.getElementById("todos").innerHTML = "";

  
  todos.forEach(addTodoToDOM);
  goals.forEach(addGoalToDOM);
});


document.getElementById("todoBtn").addEventListener("click", addTodo);

document.getElementById("goalBtn").addEventListener("click", addGoal);






//------------------
//Action Creators
function addTodoCreator(todo) {
    return {
      type: "ADD_TODO",
      todo,
    };
  }
  function removeTodoCreator(id) {
    return {
      type: "REMOVE_TODO",
      id,
    };
  }
  function toggleTodoCreator(id) {
    return {
      type: "TOGGLE_TODO",
      id,
    };
  }
  function addGoalCreator(goal) {
    return {
      type: "ADD_GOAL",
      goal,
    };
  }
  function removeGoalCreator(id) {
    return {
      type: "REMOVE_GOAL",
      id,
    };
  }
    

  //--------------------
  function addTodo() {
    const input = document.getElementById("todo");
    const name = input.value;
    input.value = "";
  
    store.dispatch(
      addTodoCreator({
        name,
        id: generateId(),
        complete: false,
      })
    );
  }
  
  function addGoal() {
    const input = document.getElementById("goal");
    const name = input.value;
    input.value = "";
  
    store.dispatch(
      addGoalCreator({
        name,
        id: generateId(),
        complete: false,
      })
    );
  }

  //----------------
  function removeButton(onClick){
      const button = document.createElement('button')
      button.innerHTML = 'X'

      button.addEventListener('click',onClick)
      return button
  }
  function addTodoToDOM(todo) {
    const node = document.createElement("li");
    const text = document.createTextNode(todo.name);
  
    node.appendChild(text);
    node.appendChild(removeButton(()=>{
        store.dispatch(removeTodoCreator(todo.id))
    }))
  
    node.style.textDecoration = todo.complete ? "line-through" : "none";
  
    node.addEventListener("click", () => {
      store.dispatch(toggleTodoCreator(todo.id));
    });
    document.getElementById("todos").appendChild(node);
  }
  
  function addGoalToDOM(goal) {
    const node = document.createElement("li");
    const text = document.createTextNode(goal.name);
  
    node.appendChild(text);
    node.appendChild(removeButton(()=>{
        store.dispatch(removeGoalCreator(goal.id))
    }))
    document.getElementById("goals").appendChild(node);
  }
  