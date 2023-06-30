import http from 'http'
import { app } from './app'
import env from './config/environment'
import { Succ } from './services/globalService'
import database from './config/database'
const port: number = env.APP_PORT || 8080
const hostname: string = env.APP_HOSTNAME || 'localhost'
export const server = http.createServer(app)

// Server
export function runServer(): void {
	server.listen(port, hostname, () => {
		new Succ(200, `Server is listening on http://${hostname}:${port}`)
	})
}

// TODO: Fix this shit
//(async () => {
//	if (!env.NORK.database) {
//		runServer()
//	} else {
//		const db_connection = await database()
//		if (db_connection) {
//			runServer()
//		}
//	}
//
//})()
//
runServer()
const db_connection = database()
