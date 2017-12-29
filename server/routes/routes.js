import express from 'express';
import UserLoginController from '../controller/userLogin';
import TaskController from '../controller/taskList';
import routesconfig from '../config/routesconfig';
let router = express.Router();

//login
router.post(routesconfig.user_login, UserLoginController.userLogin);

//taskLists
router.post(routesconfig.get_all_task_url, TaskController.getAllTaskLists);
router.delete(routesconfig.delete_task_url, TaskController.deleteTask);
router.post(routesconfig.add_task_url, TaskController.createNewTask);
export default router;
