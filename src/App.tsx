//App.jsx

import { useState } from 'react';
import { X } from "lucide-react";

function App() {
  const [todo, setTodo] = useState<{ task: string, completed: boolean }[]>([]);
  const [element, setElement] = useState("");

  function handleAddElement() {
    if (element.trim() !== "") {
      setTodo(prevTodo => [...prevTodo, { task: element, completed: false }]);
    }
    setElement("");
  }

  function handleRemoveElement(index: number) {
    const newList = todo.filter((t, i) => i !== index);
    setTodo(newList);
  }

  return (
    <div className='todo-top-container'>
      <div className='todo-inner-container'>
        <h2 className='todo-title'>To-Do List</h2>

        <div className='adding-container'>
          <input 
            className='todo-input' 
            type="text" 
            placeholder='Add your task' 
            onChange={(e) => setElement(e.target.value)} 
            value={element}
          />
          <button className='todo-button' onClick={handleAddElement}>ADD</button>
        </div>

        <ul className='todo-list'>
          {todo.map((item, index) => (
            <li className="todo-item" key={index}>
              <div style={{display:'flex'}}>
                <input 
                  type="checkbox" 
                  id={`checkbox-${index}`} 
                  className='todo-item-checkbox' 
                  checked={item.completed}
                  onChange={(e) => setTodo(todo.map((t, i) => 
                    i === index ? { ...t, completed: e.target.checked } : t
                  ))} // Fixed this line
                />
                <label htmlFor={`checkbox-${index}`} className='custom-checkbox-label'>
                  {item.completed ? 
                    <s style={{
                      textDecoration: 'line-through',
                      textDecorationThickness: '2px',
                      textDecorationColor: 'black'
                    }}>
                      <p style={{color:"gray",display:"inline"}}>{item.task}</p>
                    </s> 
                    : item.task}
                </label>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => handleRemoveElement(index)}>
                <X />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>  
  )
}

export default App;

