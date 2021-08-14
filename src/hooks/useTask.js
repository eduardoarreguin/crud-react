import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { addDocument, getCollection, updateDocument, deleteDocument } from '../firebase/actions';

export const useTasks = () => {

    const [ task, setTask ]   = useState('');    
    const [ tasks, setTasks ] = useState([]);   
    const [ edit, setEdit ]   = useState( false );
    const [ id, setId ]       = useState('');    
    const [ error, setError ] = useState( null )    

    useEffect(() =>{
        ( async() => {
            const result = await getCollection('tasks');
            if( result.statusResponse ){
                setTasks(result.data) 
            }           
        })()
    }, []);  

    const validForm = () => {
        let isValid = true;
        setError( null );
        if( isEmpty( task )){
            setError('Debes Ingresar una tarea')
            isValid = false;
        }

        return isValid;
    }
    const addTask = async(e) => {
        e.preventDefault();
        if( !validForm() ) return

        const result = await addDocument('tasks', { name: task })
        
        if( !result.statusResponse ){
            setError( result.error )
            return
        }
        setTasks([
            ...tasks,
            { id: result.data.id, name: task }
        ])
        setTask( '' )
    }

    const saveTask = async(e) => {
        e.preventDefault();
        if( !validForm() ) return
        
        const result =  await updateDocument( 'tasks', id, { name: task } )
        if( !result.statusResponse ){
            setError( result.error )
            return
        }


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

    const deleteTask = async( id ) => {

        const result = await deleteDocument('tasks', id );
        if( !result.statusResponse ){
            setError( result.error )
            return
        }
        
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

