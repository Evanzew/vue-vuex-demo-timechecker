/**
 * create by jayce.mei
 * date : 4/26 2017
 */

var errorEnum = {
  Ok: { code: '200', message: 'Ok' },
  NotFound: { code: '404', message: 'Not Found' },
  SystemError: { code: '500', message: 'Internal Server Error' },
  ServiceUnavailable: { code: '503', message: 'Service Unavailable' },
  UnknownError: { code: '700', message: 'Unknown Error' },
  NoUser: { code: '801', message: 'Sorry, user name or password is wrong' },
  NoTaskList: { code: '803', message: 'Sorry, there is no task' },
  NoTaskFoundById: { code: '804', message: 'Sorry, task can not find' }
};

module.exports = errorEnum;
