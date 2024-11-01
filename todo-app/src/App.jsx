import './App.css';
import React, {useState,useEffect} from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";


function App() {
  const[isCompletedscreen,setIsCompletedScreen]=useState(false);
  const[allTodos,setTodos]=useState([]);
  const[newTask,setNewTask]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);

  const handleAddTodo =()=>{
    let newTodoItem = {
      task:newTask,
    };

    let updatedTodoArr =[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setNewTask("");
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  const handleCompleted=index=>{
    let filteredItem ={
      ...allTodos[index],
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[])
  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <div className='todo-box'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Task</label>
            <input type='text' value={newTask} onChange={(e)=>setNewTask(e.target.value)} placeholder="Enter your list"></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primarybtn'>ADD</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondarybtn ${isCompletedscreen === false && 'active'}`}
          onClick={()=> setIsCompletedScreen(false)}>Task</button>
          <button className={`secondarybtn ${isCompletedscreen === true && 'active'}`} onClick={
          ()=> setIsCompletedScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompletedscreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.task}</h3>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
                  <BsCheckLg className='check-icon' onClick={()=>handleCompleted(index)} title="completed?"/>
                </div>
              </div>
            ) 
          })}

          {isCompletedscreen===true && completedTodos.map((item,index)=>{
            return(
            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.task}</h3>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"/>
              </div>
            </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
