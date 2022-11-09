const taskRepository  = require('../repository/task.repository');

class TaskService {

    constructor() {}

    async getForms() {
        return await taskRepository.getForms();
    }

    async getForm(formId) {
        return await taskRepository.getForm(formId);
    }

    async createForm(task) {
        return await taskRepository.createForm(task);
    }

    // async updateTask(task) {
    //     return await taskRepository.updateTask(task);
    // }

    // async deleteTask(taskId) {
    //     return await taskRepository.deleteTask(taskId);
    // }

}

module.exports = new TaskService();