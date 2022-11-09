const taskService  = require('../service/task.service');
const logger = require('../logger/api.logger');

class TaskController {

    async getForms() {
        logger.info('Controller: getForms')
        return await taskService.getForms();
    }


    async getForm(formId) {
        logger.info('Controller: getForm', formId)
        return await taskService.getForm(formId);
    }
    

    async createForm(task) {
        logger.info('Controller: createForm', task);
        return await taskService.createForm(task);
    }

    // async updateTask(task) {
    //     logger.info('Controller: updateTask', task);
    //     return await taskService.updateTask(task);
    // }

    // async deleteTask(taskId) {
    //     logger.info('Controller: deleteTask', taskId);
    //     return await taskService.deleteTask(taskId);
    // }
}
module.exports = new TaskController();