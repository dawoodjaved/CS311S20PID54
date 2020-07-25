import returnErrorsAction from '../ErrorActions/ReturnErrorsAction';
import api from '../Api/UserAuthApi';

const loadUserAction = () => (dispatch) => {

    return (dispatch, getState)=>{
        // User loading
        dispatch({ type: 'USER_LOADING' });
        api.userAuth().fetchLogedInUser(getState)
        .then(res=>{
             console.log(res);
            dispatch({
                type: 'USER_LOADED',
                payload: res.data
        })        
    }).catch(err => {
            dispatch(returnErrorsAction(err.response.data, err.response.status))
            dispatch({            
                type: 'AUTH_ERROR'
            });
        }
    );}
}
export default loadUserAction;  