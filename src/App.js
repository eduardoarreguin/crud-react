import React, { useState } from 'react'; 

import { isEmpty } from 'lodash';
import shortid from 'shortid';

const App = () => {

    const [ task, setTask ] = useState('');    
    const [ tasks, setTasks ] = useState([]);
    const addTask = (e) => {
        e.preventDefault();
        if( isEmpty( task )){
            console.log('task empty')
            return
        }
        const newTask = {
            id: shortid.generate(),
            name: task
        }
        setTasks([
            ...tasks,
            newTask
        ])
        setTask( '' )
    }

    
    return (
        <div
            className="container mt-5"
        >
            <h1>Tasks</h1>
            <hr />

            <div className='row' >
                <div className='col-8' >
                    <h4 className='text-center' >Lista de tareas</h4>

                    <ul className='list-group' >

                        {
                            tasks.length<= 0 ?
                                <h5 className='text-center mt-4' >No se encontro ninguna tarea  </h5>
                            :
                            tasks.map((task) => (
                                <li key={ task.id } className='list-group-item' >
                                    <span className='lead'>{task.name}</span>
                                    <button  className='btn btn-danger btn-sm float-right mx-2' >Eliminar</button>
                                    <button  className='btn btn-warning btn-sm float-right' >Editar</button>
                                </li>
                            ))
                        }
                        
                    </ul>

                </div>
                <div className='col-4' >
                    <h4 className='text-center' >Formulario</h4>
                    <form onSubmit={ addTask } >
                        <input 
                            type='text'
                            className='form-control mb-2'
                            placeholder='Ingrese la tarea'
                            onChange={(text) => setTask( text.target.value )}
                            value={ task }

                        />
                        <button
                            className='btn btn-dark btn-block '
                            type='submit'
                        >
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default App;