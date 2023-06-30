import { Sequelize } from 'sequelize'
import env from './environment'

const db = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
	host: env.DB_HOST,
	dialect: 'postgres',
	logging: false
})

export default db
