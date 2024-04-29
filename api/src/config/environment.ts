import path from 'path'
import fs from 'fs-extra'
import { Err } from '../services/globalService'
import dotenv from 'dotenv'
const env_path = process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '../.env'

dotenv.config({ path: path.join(__dirname, env_path) })
const norkcfg = fs.readJSONSync(path.join(__dirname, '../../norkconfig.json'))

if (norkcfg.database) {
	if (norkcfg.database.db == 'postgresql') {
		if (!process.env.DB_PORT) {
			process.env.DB_PORT = '5432'
		}
		if (!process.env.DB_HOST) {
			process.env.DB_HOST = '127.0.0.1'
		}
		if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
			new Err(500, 'missing DB parameters in .env file')
			process.exit(1)
		}
	}
}

if (!fs.existsSync(path.join(__dirname, env_path))) {
	console.log('$env_path = ', env_path)
	console.log('$__dirname = ', __dirname)
	new Err(500, `.env file for ${process.env.NODE_ENV ? process.env.NODE_ENV : ''} environment does not exists`)
	process.exit()
}

if (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET == '') {
	new Err(500, 'JWT_SECRET is not set!')
	process.exit()
}

export default {
	// General
	APP_PORT: Number(process.env.APP_PORT),
	APP_HOST: String(process.env.APP_HOST),
	APP_HOSTNAME: process.env.APP_HOSTNAME !== undefined ? String(process.env.APP_HOSTNAME) : null,
	CORS_WHITELIST: String(process.env.CORS_WHITELIST),
	JWT_SECRET: String(process.env.JWT_SECRET),
	// MongoDB
	DB_URI: String(process.env.DB_URI),
	// PostgreSQL
	DB_PORT: Number(process.env.DB_PORT),
	DB_HOST: String(process.env.DB_HOST),
	DB_USERNAME: String(process.env.DB_USERNAME),
	DB_PASSWORD: String(process.env.DB_PASSWORD),
	DB_DATABASE: String(process.env.DB_DATABASE),
	// Nork
	NORK: norkcfg,
	// SMTP
	SMTP_HOST: String(process.env.SMTP_HOST),
	SMTP_USER: String(process.env.SMTP_USER),
	SMTP_PASS: String(process.env.SMTP_PASS),
	SMTP_FROM: String(process.env.SMTP_FROM)
}
