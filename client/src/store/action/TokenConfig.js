const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().userAuthReducer.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };

export default tokenConfig;