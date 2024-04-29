import http from "http";
import { app } from "./app";
import env from "./config/environment";
//const env = {
//  APP_PORT: 8080,
//  APP_HOSTNAME: "127.0.0.1",
//};
import { Log } from "nork";
//import database from './config/database'
const port: number = env.APP_PORT || 8080;
const hostname: string = env.APP_HOSTNAME || "localhost";
export const server = http.createServer(app);

// Server
export function runServer(): void {
  server.listen(port, hostname, () => {
    Log.info(200, `Server is listening on http://${hostname}:${port}`);
  });
}

//if (!env.NORK.database) {
runServer();
//} else {
//	const db_connection = database()
//	runServer()
//}
