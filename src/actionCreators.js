import moment from 'moment';

const toggleLogin = (state) => {
  return {
    type: 'TOGGLE_LOGIN',
    islogged:state
  };
}

const loadUser = () => {
  return dispatch => {
    return fetch('https://blooming-ravine-89993.herokuapp.com/user', {
      headers: {
        "Authorization": window.localStorage.getItem('token')
      }
    }).then(response => response.json())
    .then(data => {
      dispatch({
        type: 'SET_USER',
        payload: data
      })
    })    
  }
}

const loadMatches = () => {
  return dispatch => {
    return fetch('https://blooming-ravine-89993.herokuapp.com/matches')
    .then(response => response.json())
    .then(data => {
      data.forEach(m => {
        m.date = moment(m.date).format("lll");
      })
      dispatch({
        type: 'SET_MATCHES',
        payload: data
      });
    });
  }
}

const joinMatch = (id) => {
  return dispatch => {
    return fetch(`https://blooming-ravine-89993.herokuapp.com/matches/${id}/join`, {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("data error",data.error);
      } else {
        data.forEach(m => {
          m.date = moment(m.date).format("lll");
        })
        dispatch({
          type: 'SET_MATCHES',
          payload: data
        });
      }
    })
    .catch(error => console.log(error)); 
  }
}

const removeMatch = (id) => {
  return dispatch => {
    return fetch(`https://blooming-ravine-89993.herokuapp.com/matches/${id}/delete`, {
      method: "POST",
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("data error",data.error);
      } else {
        data.forEach(m => {
          m.date = moment(m.date).format("lll");
        })
        dispatch({
          type: 'SET_MATCHES',
          payload: data
        });
      }
    })
    .catch(error => console.log(error)); 
  }
}

export {joinMatch, toggleLogin, loadUser, loadMatches, removeMatch}