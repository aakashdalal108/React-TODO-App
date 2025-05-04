import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [task, settask] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let getFromLS = JSON.parse(localStorage.getItem("todos")) || []
    settodos(getFromLS)
  }, [])


  const ToLocalSave = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    settask(e.target.value)
  }
  const handleAdd = () => {
    if (task.length == 0) {
      alert("write something to add")
    }
    else {

      settodos([...todos, { id: uuidv4(), task, isCompleted: false }])
      settask("")
      ToLocalSave()
    }

  }

  const handleDelete = (e) => {
    let dlt = confirm("Are you sure ?")
    if (dlt == true) {
      let id = e.target.name
      let newTodos = todos.filter(e => {
        return e.id !== id
      })
      settodos(newTodos)
      ToLocalSave()
    }


  }
  // const handleEdit = (e) => {
  //   let id = e.target.name
  //   let editedTodo = todos.filter(e => {
  //     return e.id == id
  //   })
  //   settask(editedTodo[0].task)
  //   let newTodos = todos.filter(e => {
  //     return e.id !== id
  //   })
  //   settodos(newTodos)
  //   ToLocalSave()
  // }
  const handleEdit = (e) => {
    let id = e.target.name
    let editedTodo = todos.find(todo => todo.id === id)
  
    if (!editedTodo) return
  
    settask(editedTodo.task)
  
    let newTodos = todos.filter(todo => todo.id !== id)
    settodos(newTodos)
    ToLocalSave()

  }
  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(e => {
      return e.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    ToLocalSave()

  }

  return (
    <>
      <Navbar />
      <div className=' md:ontainer md:mx-auto md:w-[50vw] w-full h-[80vh] bg-indigo-200  my-3 rounded-2xl'  >
        <div className='heading p-3 text-xl font-bold'>
          <h1> Add a Todo</h1>
        </div>
        <div className='addtodo flex gap-2 p-3'>
          <input className='bg-white border rounded-b-2xl w-full p-1' value={task} onChange={handleChange} type="text" autoFocus />
          <button className="btn  bg-indigo-900 hover:bg-indigo-950 text-white  cursor-pointer px-3 font-bold rounded-full" onClick={handleAdd} >Add</button>
        </div>

        <div className='todos flex flex-col gap-4'>
          <h1 className='p-3 text-xl font-bold '>Your Todos</h1>
          {todos.map((e) => {



            return (
              <div key={e.id} className="yourtasks flex justify-between  w-full p-3 gap-4 items-center">
                <div className="flex gap-2">
                  <input type="checkbox" onChange={handleCheckBox} checked={e.isCompleted} name={e.id} />
                  <div className={`text-base w-1/2   rounded-b-2xl  p-1 ${e.isCompleted ? 'line-through' : ''}`} >


                    {e.task} </div>
                </div>


                <div className='button flex items-center gap-2'>

                  <button className="btn bg-indigo-900 hover:bg-indigo-950 text-white  cursor-pointer px-3 py-1 font-bold rounded-full" onClick={handleEdit} name={e.id}>Edit</button>
                  <button className="btn bg-indigo-900 hover:bg-indigo-950 text-white cursor-pointer px-3 py-1 font-bold rounded-full" onClick={handleDelete} name={e.id}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>

      </div>

    </>
  )
}

export default App
