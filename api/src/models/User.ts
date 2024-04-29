import { DataTypes, Model } from 'sequelize'
import path from 'path'
import db from '../config/sequelize.config.ts'

class Instance extends Model {}

Instance.init(
	{
		_id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize: db,
		tableName: path.basename(__filename).split('.')[0].toLowerCase(),
	},
)

export default Instance
