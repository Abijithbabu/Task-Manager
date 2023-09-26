const initialState = {
  user: null,
  data: []
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'login':
      return {
        user:payload.user,
        data:[]
      };
      case 'dispatch_data':
        return {
          ...state,
          data:payload
        };   
    case 'logout':
      return {
        user:null,
        data:[] 
      };
    default:
      return state;
  }
}