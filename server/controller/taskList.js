var db = require('../app/model/db.js');
var mongodb = require('mongodb');
var errorEnum = require('../enum/ErrorEnum.js');
var resultJson = require('../config/resultJson.js');
const util = require('util');
var dbconfig = require('../config/dbconfig');

module.exports = {
  getAllTaskLists: function(req, res) {
    var queryJson = {
      User_Name: req.body.User_Name
    };
    db.findData('TaskList', queryJson, function(err, data) {
      if (util.isNull(data) || data.length == 0) {
        res.json(
          resultJson.createErrorResult(
            errorEnum.NoTaskList.code,
            errorEnum.NoTaskList.message
          )
        );
        return;
      }
      var voList = ['_id', 'Id', 'User_Name', 'Date', 'Time', 'Comments'];
      var result = convertDBDataToVo(data, voList);
      res.json(resultJson.createDataResult(result));
    });
  },
  deleteTask: function(req, res) {
    var queryJson = {
      Id: req.body.Id,
      User_Name: req.body.User_Name
    };
    db.findData('TaskList', queryJson, function(err, data) {
      if (util.isNull(data) || data.length == 0) {
        res.json(
          resultJson.createErrorResult(
            errorEnum.NoTaskFoundById.code,
            errorEnum.NoTaskFoundById.message
          )
        );
        return;
      } else {
        db.deleteOne('TaskList', queryJson, function(err, data) {
          res.json(resultJson.createDataResult('Task deleted succeed'));
        });
      }
    });
  },
  createNewTask: function(req, res) {
    var queryJson = {
      Id: req.body.id,
      User_Name: req.body.name,
      Date: new Date(req.body.date),
      Time: req.body.totalTime,
      Comments: req.body.comment
    };
    db.insertOne('TaskList', queryJson, function(err, data) {
      res.json(resultJson.createDataResult('Insert Ok'));
    });
  }
};
function convertDBDataToVo(dataArray, voArray) {
  var resultArray = [];

  dataArray.map(dbData => {
    var resultData = {};
    voArray.map(function(voData) {
      resultData[voData] = dbData[voData];
    });
    resultArray.push(resultData);
  });
  return resultArray;
}
