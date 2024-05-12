import http from "http";
import { app } from "./app";
import env from "./config/environment";
import mongoose from "mongoose"; // TODO: dopsat nork module pro db
import { Log } from "nork";

const port: number = env.APP_PORT || 8080;
const hostname: string = env.APP_HOSTNAME || "localhost";

export const server = http.createServer(app);

// Server
//export function runServer(): void {
//  server.listen(port, hostname, () => {
//    Log.info(200, `Server is listening on http://${hostname}:${port}`);
//  });
//}
//
////if (!env.NORK.database) {
//runServer();
//} else {
//	const db_connection = database()
//	runServer()
//}

(async () => {
	if (!process.env.DOCS_GEN) {
		try {
			await mongoose.connect(env.DB_URI);
			Log.info(200, "connected to db");
			server.listen(port, () => {
				Log.info(200, `Server is listening on http://localhost:${port}`);
			});
		} catch (err: any) {
			Log.error(500, err);
		}
	}
})();
