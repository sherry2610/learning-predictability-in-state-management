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
function todos(state = [], action) {
  switch(action.type){
      case "ADD_TODO":
        return state.concat([action.todo]);
    case "REMOVE_TODO":
        return state.filter(todo=>todo.id!==action.id)
    case "TOGGLE_TODO":
        return state.map((todo)=>{
            Object.assign({},todo,{complete:!todo.complete})
        })
    default:
        return state;
  }
}

function goals(state=[],action){
    switch(action.type){
        case "ADD_GOAL":
            return state.concat([action.goal])
        case "REMOVE_GOAL":
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
store.dispatch({
    type:"ADD_TODO",
    todo:{
        id:0,
        name:"Learning redux",
        complete:false
    }
})
store.dispatch({
    type:"ADD_TODO",
    todo:{
        id:1,
        name:"Read a book",
        complete:true
    }
})
store.dispatch({
    type:"ADD_GOAL",
    goal:{
        id:0,
        name:"sleep for 24 hour",
        complete:false
    }
})
store.dispatch({
    type:"REMOVE_TODO",
        id:1,
    
})