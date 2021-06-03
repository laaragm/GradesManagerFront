import { Level } from '../enums/Level'
import { School } from './School'

export class XyChart {
	constructor(
		public categories: Array<any>,
		public values: Array<number>,
	) {}
}
