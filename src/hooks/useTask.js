import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import shortid from 'shortid';

export const useTasks = () => {

    const [ task, setTask ]   = useState('');    
    const [ tasks, setTasks ] = useState([]);   
    const [ edit, setEdit ]   = useState( false );
    const [ id, setId ]       = useState('');    
    const [ error, setError ] = useState( null )    

    const validForm = () => {
        let isValid = true;
        setError( null );
        if( isEmpty( task )){
            setError('Debes Ingresar una tarea')
            isValid = false;
        }

        return isValid;
    }
    const addTask = (e) => {
        e.preventDefault();
        if( !validForm() ) return

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

    const saveTask = (e) => {
        e.preventDefault();
        if( !validForm() ) return

        const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item )
        setTasks( editedTasks )
        setEdit( false )
        setTask('')
        setId('')
    }

    

    const editTask = ( theTask ) => {
        setTask( theTask.name )
        setEdit( true )
        setId( theTask.id )
    }

    const deleteTask = ( id ) => {
        const filteredTask = tasks.filter( task  => task.id !== id );
        setTasks([ ...filteredTask ])
    }

    return {
        addTask,
        saveTask,
        editTask,
        deleteTask,
        setTask,
        tasks,
        task,
        edit,
        error 
    }
}

