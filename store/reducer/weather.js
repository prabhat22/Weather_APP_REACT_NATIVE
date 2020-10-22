
import { SAVE_DATA} from "../action/weather";


const initialState={
    list:[]
}
export default (state=initialState,action)=>
{
switch(action.type)
{
 
   case SAVE_DATA:
       {
          state.list=action.data
          return{
              data:state.list
          }
       }
       default:
           return state
}
}