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
	},
	async getSchools({ commit }): Promise<any> {
		const response = await api.get("/Schools");
		return response.data;
	},
	async getClassroomsFromSchool({ commit }, schoolID: number): Promise<any> {
		const response = await api.get(`/Classrooms/bySchool/${schoolID}`);
		return response.data;
	},
	async getStudents({ commit }): Promise<any> {
		const response = await api.get("/Students");
		return response.data;
	},
	async getDisciplinesGradeAverage({ commit }, schoolID: number): Promise<any> {
		const response = await api.get(`/Grades/disciplinesGradeAverage/${schoolID}`);
		return response.data;
	},
	async getStudentCountPerLevel({ commit }, schoolID: number): Promise<any> {
		const response = await api.get(`/ClassroomStudents/studentCountPerLevel/${schoolID}`);
		return response.data;
	},
}