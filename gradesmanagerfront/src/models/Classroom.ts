import { Level } from '../enums/Level'
import { School } from './School'

export class Classroom {
	constructor(
		public id: number,
		public name: string,
		public School: School,
		public level: Level,
		public year: number
	) {}
}
