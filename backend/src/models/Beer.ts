import {DataTypes} from Sequelize;
import sequelize from '../config/database'

export default = sequelize.define(path.basename(__filename).split('.')[0], {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    packaging: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Assuming photo is an array of strings
        allowNull: true
    }
}, {
    timestamps: true,
    // Other model options here
});
