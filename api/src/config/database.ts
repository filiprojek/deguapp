import mongoose from 'mongoose'
import env from './environment'
import { Err, Succ } from '../services/globalService'
import db from './sequelize.config'

// MongoDB
const dbURI: string = env.DB_URI
function connect() {
	if (!env.NORK.database) {
		new Err(500, 'no database is in norkcfg.json')
		return false
	}

	if (env.NORK.database.orm == 'mongoose') {
		mongoose
			.connect(dbURI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			})
			.then(() => {
				new Succ(200, 'connected to db')
				return true
			})
			.catch((err: any) => {
				new Err(500, err)
				return false
			})
	}

	if (env.NORK.database.orm == 'sequelize') {
		db.sync()
			.then(() => {
				new Succ(200, 'connected to db')
				return true
			})
			.catch((err: any) => {
				new Err(500, `Can't connect to db\n${err}`)
				return false
			})
	}

	if (env.NORK.database.db.length > 0) {
		new Err(500, `unsupported database ${env.NORK.database.db}`)
		return false
	}
}

export default connect
