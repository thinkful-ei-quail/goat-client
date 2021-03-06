import config from '../config';
import TokenService from './token-service';


const GoalsApiService = {
  getGoal() {
    return fetch(`${config.API_ENDPOINT}/goals`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      );
  },
  addGoal(goal) {
    return fetch(`${config.API_ENDPOINT}/goals`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(goal),
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        res.json()
      );
  },
  modifyGoal(modify) {
    return fetch(`${config.API_ENDPOINT}/goals`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(modify)
      })
      .then(res =>
        (!res.ok) ?
        res.json().then(e => Promise.reject(e)) :
        null
      );
  }
};

export default GoalsApiService;