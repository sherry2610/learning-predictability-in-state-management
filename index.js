//Any Library code
function createStore(reducer) {
  // create store
  // get store
  //listen for changes
  //update state
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  }
}

//App code
function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }


const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
function todos(state = [], action) {
  switch(action.type){
      case ADD_TODO:
        return state.concat([action.todo]);
    case REMOVE_TODO:
        return state.filter(todo=>todo.id!==action.id)
    case TOGGLE_TODO:
        return state.map((todo)=>{
            Object.assign({},todo,{complete:!todo.complete})
        })
    default:
        return state;
  }
}

function goals(state=[],action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal=>goal.id!==action.id)
        default:
            return state;
    }
}
//ROOT REDUCER
function app (state = {}, action) {
    return {
      todos: todos(state.todos, action),
      goals: goals(state.goals, action),
    }
  }
  

const store = createStore(app)

store.subscribe(()=>{
    console.log("this is new state:",store.getState())
})
//Action Creators
function addTodoCreator(todo){
    return {
        type:"ADD_TODO",
        todo,
    }
}
function removeTodoCreator(id){
    return {
        type:"REMOVE_TODO",
        id,
    }
}
function toggleTodoCreator(id){
    return {
        type:"TOGGLE_TODO",
        id,
    }
}
function addGoalCreator(goal){
    return {
        type:"ADD_GOAL",
        goal,
    }
}
function removeGoalCreator(id){
    return {
        type:"REMOVE_GOAL",
        id,
    }
}


// store.dispatch(addTodoCreator({
//         id:0,
//         name:"Learning redux",
//         complete:false
//     }))

// store.dispatch(addTodoCreator({
//         id:1,
//         name:"Read a book",
//         complete:true
//     }))

// store.dispatch(addGoalCreator({
//        id:0,
//         name:"sleep for 24 hour",
//         complete:false
//     }))

// store.dispatch(removeTodoCreator(1))


function addTodo (){
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    store.dispatch(addTodoCreator({
        name,
        id:generateId(),
        complete:false
    }))
}

function addGoal (){
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalCreator({
        name,
        id:generateId(),
        complete:false
    }))
}
document.getElementById('todoBtn')
      .addEventListener('click', addTodo)

document.getElementById('goalBtn')
      .addEventListener('click', addGoal)
