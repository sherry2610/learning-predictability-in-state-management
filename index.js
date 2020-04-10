function createStore (){
    // create store
    // get store
    //listen for changes
    //
    
let listeners = []

    const subscribe = (listener)=> {
        listeners.push(listener)
        return (listeners)=>{
            listeners = listeners.filter((l) => l !== listener)
        }
        }
    
    
    
    let store
    const getStore = () => store

    return(
        getStore,
        subscribe
    )
}

const store = createStore()
//-----EXAMPLE CODE----
// when any user subscribe
// store.subscribe(()=>{console.log("this is new state" + store.getStore())})
// when any user un subscribe
// const unsubscribe = store.subscribe(()=>{console.log("the store is changed! ")})
//unsubscribe()
//-----EXAMPLE CODE end----