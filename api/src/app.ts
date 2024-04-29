import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router as routes } from './routes'
import { router as middlewares } from './middlewares'
import env from './config/environment'

export let corsWhitelist: Array<string>
if (env.CORS_WHITELIST != 'undefined') {
	corsWhitelist = [...['http://localhost:8080', 'http://localhost:6040'], ...env.CORS_WHITELIST.split(';')]
} else {
	corsWhitelist = ['http://localhost:8080', 'http://localhost:6040']
}
const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (!origin || corsWhitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
	credentials: true
}

export const app = express()

// Middlewares
app.use(middlewares)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

// Routes
app.use(routes)
