import returnErrorsAction from '../ErrorActions/ReturnErrorsAction';
import api from '../Api/UserAuthApi';

const logInUserAction = (data) => {
    
    return (dispatch, getState)=>{
        api.userAuth().loginUser(data)
        .then(res=>{
             console.log(res);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
        })        
    }).catch(err => {
            dispatch(returnErrorsAction(err.response.data, err.response.status,'LOGIN_FAIL'))
            dispatch({            
                type: 'LOGIN_FAIL'
            });
        }
    );}
}

export default logInUserAction;