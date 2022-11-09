const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');

//const db = require('./config/db_pool')


class TaskRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({alter:true}).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getForms() {
        
        try {
            const forms = await this.db.tasks.findAll();
            console.log('Forms:::', forms);
            return forms;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    async getForm(formId) {
        
        try {
            const form = await this.db.tasks.findByPk(formId);
            console.log('Form:::', form);
            return form;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createForm(task) {
        let data = {};

        try {
            data = await this.db.tasks.create(task);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    // async updateTask(task) {
    //     let data = {};
    //     try {
    //         //task.updateddate = new Date().toISOString();
    //         data = await this.db.tasks.update({...task}, {
    //             where: {
    //                 id: task.id
    //             }
    //         });
    //     } catch(err) {
    //         logger.error('Error::' + err);
    //     }
    //     return data;
    // }

    // async deleteTask(taskId) {
    //     let data = {};
    //     try {
    //         data = await this.db.tasks.destroy({
    //             where: {
    //                 id: taskId
    //             }
    //         });
    //     } catch(err) {
    //         logger.error('Error::' + err);
    //     }
    //     return data;
    //     return {status: `${data.deletedCount > 0 ? true : false}`};
    // }

}

module.exports = new TaskRepository();