module.exports = (sequelize, DataTypes, Model) => {

    class Form_BSM extends Model {}

    Form_BSM.init({
        id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          primaryKey:true,
          unique:true,
          autoIncrement: true,
        },
        id_company: {
          type: DataTypes.INTEGER
        },
        nameform: {
          type: DataTypes.STRING
        },
        setquestions: {
            type: DataTypes.JSONB
        },
        status: {
            type: DataTypes.INTEGER,
        },
      }, {
        timestamps: false,
        freezeTableName: true,
        sequelize,
        modelName: 'form_bsm'
      });
      
      return Form_BSM;
}