const formRepository  = require('../repository/form.repository');

class FormService {

    constructor() {}

    async getForms() {
        return await formRepository.getForms();
    }

    async getForm(formId) {
        return await formRepository.getForm(formId);
    }

    async getFormsCompany(idCompany) {
        return await formRepository.getFormsCompany(idCompany);
    }

    async createForm(form) {
        return await formRepository.createForm(form);
    }
    async getFormByIdCompany(idCompany,nameform){
        return await formRepository.getFormByIdCompany(idCompany, nameform);
    }

    async createAnswer(answers){
        return await formRepository.createAnswer(answers);
    }
    // async updateTask(task) {
    //     return await taskRepository.updateTask(task);
    // }

    // async deleteTask(taskId) {
    //     return await taskRepository.deleteTask(taskId);
    // }

}

module.exports = new FormService();