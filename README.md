# vue-timechecker ![alt text](https://travis-ci.org/evanzew/vue-vuex-demo.svg?branch=master 'Last push build')

> This is a vue.js timechecker demo written by vuex ,vue ,vue-cli,vue-rooter,bootstrap,node,express,mongo

## Database Structure

> Database structure

```bash
Path:.\vue-vuex-demo-timechecker\server\config\dbconfig.js
var dataconfig = {
  dataurl: 'localhost',
  dataport: '27017',
  dataname: 'Vue',
  employeeInfo: 'User'
};

module.exports = dataconfig;
```

> Task structure

Collection Name: TaskList

```bash
    "Id" : 0,
    "User_Name" : "Colin.Miao",
    "Date" : ISODate("2017-12-31T08:50:20.201Z"),
    "Time" : 1,
    "Comments" : "看直播一小时"
```

> User structure

Collection Name: User

```bash
  "User_Name" : "Evan.Zou",
  "Password" : "123"
```

## Commissioning

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start
```

## Demo Preview

> Login Page Preview

![alt text](/src/assets/login.jpg 'Login page preview')

> Home Page Preview Before Login

![alt text](/src/assets/preview-home_beforeLogin.jpg 'Home page preview before login')

> Home Page Preview

![alt text](/src/assets/preview-home.jpg 'Home page preview')

> Time Entries Page Preview

![alt text](/src/assets/preview-time.jpg 'Time entries page preview')

> Log Time Page Preview

![alt text](/src/assets/preview-log.jpg 'Log page preview')
