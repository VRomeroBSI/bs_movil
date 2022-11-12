const {builtQueryInsert} = require ('../utils/utils.js');
const { connect } = require('../config/db.config');
const logger = require('../logger/api.logger');

class FormRepository {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({}).then(() => {
            console.log("Drop and re-sync db.");
        });
    }

    async getForms() {
        
        try {
            const forms = await this.db.forms.findAll();
            console.log('Forms:::', forms);
            return forms;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    async getForm(formId) {
        
        try {
            const form = await this.db.forms.findByPk(formId);
            console.log('Form:::', form);
            return form;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createForm(form) {
        let data = {};
        const { Op } = require("sequelize");
        try {
            const nameFormOnTable = await this.db.forms.findAll({
                attibutes:['nameform'],
                where:{
                    [Op.and]:[
                            {id_company : form.id_company},
                            {nameform:form.nameform}
                        ]                    
                }
            });
           
            if(Object.entries(nameFormOnTable).length===0){
                try{
                    data = await this.db.forms.create(form);
                }catch(err){
                    logger.error('Error::' + err);    
                }
            }
            else{
                return 'Form name for this company already exist',nameFormOnTable;
            }

        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }


    async getFormsCompany(idCompany){
        const { Op } = require("sequelize");
        try{
            const forms = await this.db.forms.findAll({
                where:{
                    id_company: {
                        [Op.eq]:idCompany
                    }
                }
            });
            return forms;
        }catch(err){
            logger.error('Error::' + err);
        }
    }

    async getFormByIdCompany(idCompany, nameform){
        const { QueryTypes } = require("sequelize");
        const { Op } = require("sequelize");
        try{
            const forms = await this.db.forms.findAll({
                where:{
                        [Op.and]:[
                            {id_company : idCompany},
                            {nameform: nameform}
                        ] 
                    }                
            });
            return forms;
        }catch(err){
            logger.error('Error::' + err);
        }
    }
    async createAnswer(answers){
    
        let queryInsert='';

    const { Op } = require("sequelize");
        try{
            const tableName = await this.db.forms.findOne({
                raw: true,
                attributes: ['tablename'],
                where:{
                    [Op.and]:[
                        {id_company : answers.id_empresa},
                        {nameform: answers.formulario}
                    ] 
                }     
            })
            
            if(tableName){  
                queryInsert= builtQueryInsert(answers,tableName.tablename);
                try{
                    
                    const inserted= await this.db.sequelize.query(queryInsert);
                    

                }catch(err){
                    logger.error('Error::' + err);
                }
            }
            else{
                logger.info
            }
            return tableName;

        }catch(err){
            logger.error('Error::' + err);
        }
        
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

module.exports = new FormRepository();