import { todoTasks } from "../utils/constants";

const initialState = {
  userLogin: { loading: false, error: false, message: "" },
  user: null,
  data: todoTasks
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'user_login':
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
    case 'user_logout':
      return {
        ...state,
        data:{
          isAuthenticated: false,
        }
      };
    default:
      return state;
  }
}