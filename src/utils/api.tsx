import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-control-base.herokuapp.com/',
  // headers: {
  //   'x-access-token':
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjRiOWViYzRiMTMyNDNhNmUxYzk3ZWEiLCJpYXQiOjE2NDkyMTcwMTgsImV4cCI6MTY0OTMwMzQxOH0.sFZpinWBmYrucCsNT1UONXZmmMoLcwfO0f8c3qrnkno',
  // },
});
