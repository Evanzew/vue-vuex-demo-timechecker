import fetchRequest from '../config/fetch';

export const getAllTasks = data =>
  fetchRequest('api/v1/taskLists', 'POST', data);

export const delTask = data => fetchRequest('api/v1/delTask', 'DELETE', data);

export const addTask = data => fetchRequest('api/v1/addTask', 'POST', data);
