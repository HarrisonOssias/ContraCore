export default (state, action) => {
  import {
    PROJECT_ADDED,
    PROJECT_ERROR,
    LOAD_PROJECT,
    DELETE_JOB,
    JOB_ERROR,
    ADD_COMMENT,
    GET_COMMENTS,
    COMMENT_ERROR
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
        current: project.timeline.splice(
          project.timeline.map(job => job._id).indexOf(jid),
          1
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        current: state.current.comments.unshift(action.payload.comments[0]),
        loading: false
      };
    case DELETE_COMMENT:
      const { cId, project } = action.payload;
      return {
        ...state,
        current: state.current.comments.splice(
          state.current.comments.map(comment => comment._id).indexOf(cId),
          1
        ),
        loading: false
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
