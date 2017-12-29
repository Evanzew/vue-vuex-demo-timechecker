import fetchRequest from '../config/fetch';

export const accountLogin = data => fetchRequest('api/v1/login', 'POST', data);
