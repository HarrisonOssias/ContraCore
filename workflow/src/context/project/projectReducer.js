export default (state, action) => {
  import {
    PROJECT_ADDED,
    PROJECT_ERROR,
    LOAD_PROJECT,
    DELETE_JOB,
    JOB_ERROR
  } from '../types';

  switch (action.type) {
    case PROJECT_ADDED:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false
      };
    case LOAD_PROJECT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case DELETE_JOB:
      const { jid, project } = action.payload;
      return {
        ...state,
        current: () => {
          let deleteIndex = project.timeline.map(job => job._id).indexOf(jid);
          project.timeline.splice(deleteIndex, 1);
          return project;
        },
        loading: false
      };
    default:
      return state;
  }
};
