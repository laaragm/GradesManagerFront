<template>
	<div>
		<v-row no-gutters class="justify-center mt-10" v-for="student in studentsPerformance" :key="student.studentID">
			<v-col cols=6 class="mt-5">
				<v-card elevation=3 class="mt-10">
					<RadarChart 
						:title="'Student Performance'" 
						:values="Object.values(student.gradeAverageByLevel)"
						:label="student.studentName"
						:startPoint="getFirstLevel(student)"
						:lastPoint="getLastLevel(student)"
						:color="'#664EAE'"
						height="500"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import RadarChart from '../components/RadarChart.vue'
import { Level } from '../enums/Level'
import { Student } from '../models/Student'

@Component({
	components: {
		RadarChart
	}
})
export default class StudentPerformance extends Vue{
	@Action getStudentsPerformance!: (studentsDTO: any) => Promise<any>
	@Action getStudents!: () => Promise<Array<Student>>

	studentsPerformance = null;
	students = null;

	getFirstLevel(student: any) {
		const level = Object.keys(student.gradeAverageByLevel);
		return Level[level[0]];
	}

	getLastLevel(student: any) {
		const level = Object.keys(student.gradeAverageByLevel);
		const size = level.length;
		return Level[level[size-1]];
	}

	async mounted() {
		const studentsDTO = {
			students: [13,14],
			school: 5
		}
		this.studentsPerformance = await this.getStudentsPerformance(studentsDTO);
		this.students = await this.getStudents();
	}

}
</script>
