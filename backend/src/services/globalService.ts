import colors from 'colors'
import fs from 'fs'
import path from 'path'

export interface ErrType {
	code: number
	message: string
	data?: any
}

export class Err implements ErrType {
	code: number
	message: string
	data: any

	constructor(code: number, message: string | object, data: any = null) {
		this.code = code
		typeof message === 'object' ? (this.message = JSON.stringify(message)) : (this.message = message)
		data ? (this.data = data) : false
		// typeof data === 'object' ? (this.data = JSON.stringify(data)) : (this.data = data)

		this.drop()
	}

	drop() {
		if (this.data) {
			console.log(colors.bgRed(`${this.code}`) + colors.bgBlack.red(` ${this.message}`) + this.data)
			Log.make('Err', this.code, this.message, this.data)
			return {
				code: this.code,
				message: this.message,
				data: this.data
			}
		}

		console.log(colors.bgRed(`${this.code}`) + colors.bgBlack.red(` ${this.message}`))
		Log.make('Err', this.code, this.message)
		return {
			code: this.code,
			message: this.message
		}
	}
}

export class Succ {
	code: number
	message: string
	data?: any

	constructor(code: number, message: string, data: any = null) {
		this.code = code
		this.message = message
		data ? (this.data = data) : false
		this.drop()
	}

	drop() {
		if (this.data) {
			console.log(colors.bgGreen.black(`${this.code}`) + colors.green.bgBlack(` ${this.message}`) + this.data)
			return {
				code: this.code,
				message: this.message,
				data: this.data
			}
		}

		console.log(colors.bgGreen.black(`${this.code}`) + colors.green.bgBlack(` ${this.message}`))
		return {
			code: this.code,
			message: this.message
		}
	}
}

export interface LogType {
	type: 'Err' | 'Succ' | 'Info'
	code?: number
	message?: string
	data?: any
	logFile?: string
}
export class Log implements LogType {
	type: 'Err' | 'Succ' | 'Info'
	code?: number
	message?: string
	data?: any
	logFile?: string

	/**
	 * @param type
	 *  - Type of log
	 *  - Err | Succ | Info
	 * @param code
	 *  - not required
	 *  - HTTP status code
	 * @param message
	 *  - could be anything
	 * @param data
	 *  - could be anything
	 * @param logFile
	 *  - name of logFile
	 *  - default is log type file
	 */
	constructor(type: 'Err' | 'Succ' | 'Info', code?: number, message?: string, data?: any, logFile?: string) {
		this.type = type
		this.code = code
		this.message = message
		this.data = data
		this.logFile = logFile

		if (!this.logFile) {
			this.logFile = `${type}.global.log`
		} else {
			this.logFile = this.logFile + '.log'
		}

		this.logFile = path.join(__dirname, this.logFile)
	}

	static pathMake(type: string, name?: string) {
		let logName
		if (!name) {
			logName = `${type}.global.log`
		} else {
			logName = name + '.log'
		}

		return path.join(__dirname, '../logs/' + logName)
	}

	/**
	 * returns current date in my custom format
	 */
	static dateNow(): string {
		/**
		 * @param num: number
		 *
		 * receives number and returns two digits number
		 * example:
		 *   input num = 9 => returns string 09
		 */
		function add0(num: number): string {
			if (num.toString().length <= 1) {
				return '0' + String(num)
			}
			return String(num)
		}

		const d = new Date()
		return `${d.getFullYear()}-${add0(d.getMonth() + 1)}-${add0(d.getDate())} ${add0(d.getHours())}:${add0(d.getMinutes())}:${add0(d.getSeconds())}`
	}

	static make(type: 'Err' | 'Succ' | 'Info', code?: number, message?: string, data?: any, logFile?: string) {
		let realPath = Log.pathMake(type, logFile)
		let formattedData = `Date: "${Log.dateNow()}" Type: "${type}"`

		code ? (formattedData += ` Code: "${code}"`) : false
		message ? (formattedData += ` Message: "${message}"`) : false
		if (data) {
			if (typeof data === 'object') {
				data = JSON.stringify(data)
			}
			formattedData += ` Data: "${data}"`
		}
		formattedData += '\n'

		if (fs.existsSync(realPath)) {
			fs.appendFileSync(realPath, formattedData)
		} else {
			fs.writeFileSync(realPath, formattedData)
		}
	}
}
