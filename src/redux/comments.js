import { COMMENTS } from '../shared/comments';
import * as ActionType from './ActionTypes';


export const Comments = (state ={
    errMess: null,
    comments : []
}, action) => {
    switch (action.type) {
        case ActionType.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.data = new Date().toISOString();
            return {...state,comments: state.comments.concat(comment)};
        case ActionType.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionType.COMMENTS_FAILED:
            return {...state, errMess:null, comments: action.payload};
    
        default:
            return state;
    }
}