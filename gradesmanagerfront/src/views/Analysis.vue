<template>
	<div>
		{{ studentsPerformance }}
	</div>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class Analysis extends Vue{
	@Action getGradeAverageBySchoolLevels!: (schoolID: number) => Promise<any>
	@Action getStudentsPerformance!: (studentsDTO: any) => Promise<any>

	gradeAverage = null;
	studentsPerformance = null;

	async mounted() {
		const schoolId = 5;
		this.gradeAverage = await this.getGradeAverageBySchoolLevels(schoolId);
		console.log(this.gradeAverage);
		const studentsDTO = {
			students: [13],
			school: 5
		}
		// this.studentsPerformance = await this.getStudentsPerformance(studentsDTO);
		// console.log(this.studentsPerformance);
	}

}
</script>
