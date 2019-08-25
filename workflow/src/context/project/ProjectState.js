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
  LOAD_PROJECT,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
  COMMENT_ERROR
} from '../types';

const ProjectState = props => {
  const initialState = {
    projects: null,
    current: null,
    comments: null,
    loading: true
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Add project
  // make a post request to the endpoint /api/project, get the project with the id found in the response
  const addProject = async ({ timeline }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      let res = await axios.post('/api/project', timeline, config);
      dispatch({ type: PROJECT_ADDED, payload: res.data });
      loadProject(res.data._id);
    } catch (error) {
      dispatch({ type: PROJECT_ERROR });
    }
  };

  // Load Project
  const loadProject = async pId => {
    try {
      let res = await axios.get(`/api/project/${pId}`);
      dispatch({ type: LOAD_PROJECT, payload: res.data });
    } catch (error) {
      dispatch({ type: PROJECT_ERROR });
    }
  };

  const getProjects = async () => {
    try {
      let res = await axios.get('/api/project');
      return res.data;
    } catch (error) {
      dispatch({ type: PROJECT_ERROR });
    }
  };

  // Add new job
  const newJob = async ({ date, title, cost, _id, user }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const job = {
      user: user,
      date: date,
      title: title,
      cost: cost
    };

    try {
      let res = await axios.post(`/api/timeline/${_id}`, job, config);
      dispatch({ type: NEW_JOB, payload: res.data });
    } catch (error) {
      dispatch({ type: JOB_ERROR });
    }
  };

  // Delete Job
  const deleteJob = async jid => {
    try {
      let res = await axios.delete(`/api/timeline/${jid}`);
      const body = {
        jid: jid,
        job: res.data
      };
      dispatch({ type: DELETE_JOB, payload: body });
    } catch (error) {
      dispatch({ type: JOB_ERROR });
    }
  };

  // Add comment
  const addComment = async ({ pId, commentText }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      let res = await axios.post(`/api/comments/${pId}`, commentText, config);
      dispatch({ type: ADD_COMMENT, payload: res.data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR });
    }
  };

  // Delete comment
  const deleteComment = async ({ cId, pId }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const _id = pId;
    try {
      let res = await axios.delete(`/api/comments/${cId}`, _id, config);

      dispatch({ type: DELETE_COMMENT, payload: cId });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR });
    }
  };

  // Get comments
  const getComments = async ({ pId }) => {
    try {
      let res = await axios.get(`/api/comments/${pId}`);
      dispatch({ type: GET_COMMENTS, payload: res.data });
    } catch (error) {
      dispatch({ type: COMMENT_ERROR });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        current: state.current,
        comments: state.comments,
        loading: state.loading,
        addProject,
        loadProject,
        newJob,
        deleteJob,
        addComment,
        deleteComment,
        getComments,
        getProjects
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
