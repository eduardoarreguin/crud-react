import React from 'react'; 

import { size } from 'lodash';
import { useTasks } from './hooks/useTask';

const App = () => {    

    const { 
        deleteTask, 
        addTask, 
        saveTask, 
        editTask, 
        setTask,
        tasks,
        task,
        edit,
        error,
    } = useTasks()   

      
    
    return (
        <div
            className="container mt-5"
        >
            <h1>Tasks</h1>
            <hr />

            <div className='row' >
                <div className='col-8' >
                    <h4 className='text-center' >Lista de tareas</h4>

                    

                        {
                            !size(tasks) > 0 ?
                                <li className='list-group-item' >Aun no ahi tareas programadas. </li>
                            :
                            <ul className='list-group' >
                                {
                                    tasks.map((task) => (
                                        <li key={ task.id } className='list-group-item' >
                                            <span className='lead'>{task.name}</span>

                                            <button 
                                                className='btn btn-danger btn-sm float-right mx-2' 
                                                onClick={() => deleteTask( task.id )}
                                            >
                                                Eliminar
                                            </button>

                                            <button  
                                                className='btn btn-warning btn-sm float-right'
                                                onClick={() => editTask( task )}
                                            >
                                                Editar
                                            </button>

                                        </li>
                                    ))
                                }
                            </ul>
                        }
                        

                </div>
                <div className='col-4' >
                    <h4 className='text-center' >
                        { edit? 'Modificar' : 'Agregar' } Tarea
                    </h4>
                    <form onSubmit={ edit? saveTask : addTask } >

                        { error&& <span className="text-danger" >{ error }</span> }
                        <input 
                            type='text'
                            className='form-control mb-2'
                            placeholder='Ingrese la tarea'
                            onChange={(text) => setTask( text.target.value )}
                            value={ task }

                        />
                        
                        <button
                            className={ edit? 'btn btn-warning btn-block' : 'btn btn-dark btn-block' }
                            type='submit'
                        >
                            { edit? 'Guardar': 'Agregar' }
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default App;