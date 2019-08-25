import React, { useReducer } from 'react';
import axios from 'axios';

import projectReducer from './projectReducer';
import setAuthToken from '../../utils/setAuthToken';
import ProjectContext from './projectContext';

import {
    PROJECT_ADDED,
    PROJECT_ERROR,
    NEW_JOB,
    DELETE_JOB,
    JOB_ERROR,
    LOAD_PROJECT
} from '../types';


const ProjectState = () => {
    const initialState = {
        projects: null,
        current: null,
        loading: true
    };

    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Add project
    // make a post request to the endpoint /api/project, get the project with the id found in the response
    const addProject = ({ timeline }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios.post('/api/project', timeline, config);
            dispatch({ type: PROJECT_ADDED, payload: res.data })
            loadProject(res.data._id);
        } catch (error) {
            dispatch({ type: PROJECT_ERROR })
        }

    }

    // Load Project
    const loadProject = (pId) => {
        try {
            let res = await axios.get(`/api/project/${pId}`);
            dispatch({ type: LOAD_PROJECT, payload: res.data });
        } catch (error) {
            dispatch({ type: PROJECT_ERROR });
        }
    }

    // Add new job
    const newJob = async ({ date, title, cost, _id, user }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const job = {
            user: user,
            date: date,
            title: title,
            cost: cost
        }

        try {
            let res = await axios.post(`/api/timeline/${_id}`, job, config);
            dispatch({ type: NEW_JOB, payload: res.data });
        } catch (error) {
            dispatch({ type: JOB_ERROR });
        }

    }

    // Delete Job
    const deleteJob = (jid) => {
        try {
            let res = await axios.delete(`/api/timeline/${jid}`);
            const body = {
                jid: jid,
                job: res.data
            }
            dispatch({ type: DELETE_JOB, payload: body });
        } catch (error) {
            dispatch({ type: JOB_ERROR });
        }
    }

    // Add comment
    const addComment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    // Delete comment

    // Get comments

  return (
    <ProjectState.Provider 
    value={{
        projects: state.projects,
        current: state.current,
        loading: state.loading,
        addProject,
        loadProject,
        newJob,
        deleteJob
    }}>{props.children}</ProjectState.Provider>
  );
};

export default ProjectState;
