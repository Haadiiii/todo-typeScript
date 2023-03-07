import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const Todo = () => {
    type Type = {
        id: number
        completed: boolean
        text: string
        createdAt: Date
    }

    const [todos, setTodos] = React.useState<Type[]>([])
    const [todo, setTodo] = React.useState<Type>({
        id: uuidv4() as unknown as number,
        completed: false,
        text: '',
        createdAt: new Date(),
    })

    React.useEffect(() => {
        const todos = localStorage.getItem('todos')
        if (todos) {
            setTodos(JSON.parse(todos))
        }
    }, [])

    const addTodo = () => {
        if (!todo.text) {
            return alert('Please enter a todo')
        }
        setTodos([...todos, todo])
        setTodo({
            id: uuidv4() as unknown as number,
            completed: false,
            text: '',
            createdAt: new Date(),
        })
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
        todos.splice(id, 1)
        localStorage.setItem('todos', JSON.stringify(todos))

    }

    const completeTodo = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
        localStorage.setItem('todos', JSON.stringify(todos))

    }

    // remove all completed todos
    const clearAll = () => {
        setTodos(todos.filter((todo) => !todo.completed))
        localStorage.setItem('todos', JSON.stringify(todos))
        
    }



    // Edit todo
    const editTodo = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.text = todo.text
                }
                return todo
            })
        )
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    return (
        <div
            className='flex flex-col justify-center h-screen  items-center bg-gradient-to-r from-blue-400 to-blue-700 w-max-content overflow-y-hidden'
        >
            <h1
                className='text-9xl mb-10 text-gray-700 font-bold font-sans-serif tracking-wider text-center aria-label'
            >Todo List</h1>
            <div>
                <input
                    className='border-2 border-black rounded-md h-10 w-64'
                    type="text"
                    value={todo.text}
                    onChange={(e) => setTodo({ ...todo, text: e.target.value })}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTodo()
                        }
                    }}
                />
                <button
                    className='bg-orange-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4'
                    onClick={addTodo}
                >Add Todo</button>
            </div>
            <div>
                <ul
                    className='mt-5 flex flex-col justify-items-start gap-4 flex-wrap  rounded-md w-full p-4  '
                    style={{
                       border: todos.length > 0 ? '1px solid black' : 'none',
                    }}
                >
                    {todos.map((todo) => (
                        <div 
                        className='flex flex-row justify-between'
                        >
                        <li
                            className=''
                            key={todo.id}
                        >
                            <input
                                className='mr-2 '
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => completeTodo(todo.id)}
                            />
                            <span
                                onDoubleClick={() => editTodo}
                                className='text-xl text-white font-bold font-sans-serif tracking-wider text-center aria-label
                             pr-14'
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : '',
                                }}
                            >
                                {todo.text}
                            </span>
                           <hr
                            className='border-1 border-gray-400 rounded-md'
                            />
                        </li>
                        
                         <button
                         className='bg-orange-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4 '
                         onClick={() => deleteTodo(todo.id)}
                        >Delete</button>
                     </div>
                    ))}
                </ul>
            </div>
            <div>
                <button
                    className='bg-orange-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4'
                    onClick={clearAll}
                    style={{
                        display: todos.length > 0 ? 'block' : 'none',
                        backgroundColor: todos.some((todo) => todo.completed) ? 'orange' : 'gray',
                        
                    }}
                >Clear All Completed </button>
            </div>
        </div>
    )
}

export default Todo;