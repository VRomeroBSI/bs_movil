const formService  = require('../service/form.service');
const logger = require('../logger/api.logger');

class FormController {

    async getForms() {
        logger.info('Controller: getForms')
        return await formService.getForms();
    }


    async getForm(formId) {
        logger.info('Controller: getForm', formId)
        return await formService.getForm(formId);
    }
    

    async createForm(form) {
        logger.info('Controller: createForm', form);
        return await formService.createForm(form);
    }

    async getFormsCompany(idCompany){
        logger.info('Controller: getFormsCompany', idCompany);
        return await formService.getFormsCompany(idCompany);
    }

    async getFormByIdCompany(idCompany, formName){
        logger.info('Controller: getFormByIdCompany '+ idCompany,' '+ formName);
        return await formService.getFormByIdCompany(idCompany, formName);
    }

    async createAnswer(answers){
        logger.info('Controller: createAnswer', answers);
        return await formService.createAnswer(answers);
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
module.exports = new FormController();