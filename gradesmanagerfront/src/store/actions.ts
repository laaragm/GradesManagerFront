import { ActionTree } from 'vuex'
import { RootState } from './RootState'
import { GradesManagerState } from './GradesManagerState'
import { api } from './api'

export const actions: ActionTree<GradesManagerState, RootState> = {
	async getGradeAverageBySchoolLevels({ commit }, schoolID: number): Promise<any> {
		const response = await api.get(`/PerformanceAnalysis/gradeAverageBySchoolLevels/${schoolID}`);
		return response.data;
	},
	async getStudentsPerformance({ commit }, studentsDTO: any): Promise<any> {
		const response = await api.post("/PerformanceAnalysis/analyseStudentsPerformance", studentsDTO);
		return response.data;
	}
}