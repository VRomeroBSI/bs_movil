module.exports = (sequelize, DataTypes, Model) => {

    class Form_BSM extends Model {}

    Form_BSM.init({
        // Model attributes are defined here
        id:{
          type:DataTypes.INTEGER,
          autoIncrement:true,
          primaryKey:true
        },
        id_company: {
          type: DataTypes.INTEGER
          // allowNull defaults to true
        },
        nameform: {
          type: DataTypes.STRING
          // allowNull defaults to true
        },
        setquestions: {
            type: DataTypes.JSONB
            // allowNull defaults to true
        },
        status: {
            type: DataTypes.INTEGER,
           // allowNull: false
        },
      }, {
        // Other model options go here
        timestamps: false,
        freezeTableName: true,
        sequelize, // We need to pass the connection instance
        modelName: 'form_bsm' // We need to choose the model name
      });
      
      return Form_BSM;
}