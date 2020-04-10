//Any Library code
function createStore (reducer){
    // create store
    // get store
    //listen for changes
    //update state
    
let listeners = []

    const subscribe = (listener)=> {
        listeners.push(listener)
        return (listeners)=>{
            listeners = listeners.filter((l) => l !== listener)
        }
        }
    
    
    
    let store
    const getStore = () => store

    const dispatch = (reducer) => {
        state = reducer(state,action)
        listeners.forEach(listener => listener())
    }

    return(
        getStore,
        subscribe,
        dispatch
    )
}

//App code
function todos (state=[],action){
    if(action.type==='ADD_TODO'){
        return state.concat([action])
    }
    return state
}