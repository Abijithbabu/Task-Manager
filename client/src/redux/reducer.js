import { todoTasks } from "../utils/constants";

const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  user: null,
  data: todoTasks
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'login':
      return {
        ...state,
        data:{
          isAuthenticated: true,user:payload.user,token:payload.token
        } 
      };
      case 'dispatch_data':
        return {
          ...state,
          data:payload
        };   
    case 'logout':
      return {
        ...state,
        data:[] 
      };
    default:
      return state;
  }
}