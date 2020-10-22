export const SAVE_DATA='SAVE_DATA';
export const saveData=(data)=>
{
    return async (dispatch)=>
    {
       
        try
        { 
        dispatch({
            type:SAVE_DATA,
            data:data
        })
        }
        catch(Err)
        {
            console.log('error at save data',Err)
            throw Err;
        }
    

    }

}