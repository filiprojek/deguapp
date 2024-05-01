import fs from 'fs';
import path from 'path';

export type HttpMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';
export type ApiResponse = 'status object' | Object | string;

export class Docs {
	private name: string;
	private operation: string;
	private route: string;
	private method: HttpMethods;
	private parameters?: Object[];
	private description?: string;
	private body?: Object;
	private response?: ApiResponse;

	public constructor(name: string, operation: string, route: string, method: HttpMethods, description?: string, parameters?: Object[], body?: Object, response?: ApiResponse) {
		this.name = name;
		this.operation = operation;
		this.route = route;
		this.method = method;
		description ? (this.description = description) : null;
		parameters ? (this.parameters = parameters) : null;
		body ? (this.body = body) : null;
		response ? (this.response = response) : null;

		this.generate();
	}

	private generate(): boolean {
		if (!process.env.DOCS_GEN) {
			return false;
		}

		const jsonPath = path.join(__dirname, '../public/api.json');
		const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString());

		const jsonAPI = () => JSON.parse(fs.readFileSync(jsonPath).toString());
		const genJsonAPI = () => fs.writeFileSync(jsonPath, JSON.stringify({ version: pkg.version, endpoints: {} }));

		if (!fs.existsSync(path.join(__dirname, '../public'))) {
			fs.mkdirSync(path.join(__dirname, '../public'));
		}

		if (!fs.existsSync(jsonPath)) {
			genJsonAPI();
		}

		if (jsonAPI().version != pkg.version) {
			genJsonAPI();
		}

		const data = jsonAPI();
		data.endpoints[this.name] ? undefined : (data.endpoints[this.name] = {});
		data.endpoints[this.name][this.operation] = this;
		fs.writeFileSync(jsonPath, JSON.stringify(data));

		return true;
	}
}

export default Docs;