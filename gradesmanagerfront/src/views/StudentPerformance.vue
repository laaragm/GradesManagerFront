<template>
	<div>
		<v-row no-gutters class="justify-center mt-10">
			<v-col cols=3 class="mt-5">
				<v-radio-group v-model="studentRadioGroup">
					<v-radio
						v-for="student in students" 
						:key="student.id"
						:label="student.name"
						:value="student.id"
					></v-radio>
				</v-radio-group>
			</v-col>
			<v-col cols=6 class="mt-5 align-center">
				<v-card elevation=3 class="mt-10">
					<RadarChart 
						:title="'Student Performance'" 
						:values="Object.values(selectedStudent.gradeAverageByLevel)"
						:label="selectedStudent.studentName"
						:startPoint="getFirstLevel(selectedStudent)"
						:lastPoint="getLastLevel(selectedStudent)"
						:color="'#664EAE'"
						height="500"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
	selectedStudent = null;
	school = 5;
	studentRadioGroup = null;

	@Watch('studentRadioGroup')
	onChangeStudent() {
		console.log(this.studentRadioGroup);
		this.analyzePerformance(this.studentRadioGroup);
	}

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
		this.students = await this.getStudents();
		await this.analyzePerformance(this.students[0].id);
	}

	async analyzePerformance(id: number) {
		const studentsDTO = {
			students: [id],
			school: this.school
		}
		this.studentsPerformance = await this.getStudentsPerformance(studentsDTO);
		this.selectedStudent = this.studentsPerformance[0];
		this.studentRadioGroup = this.selectedStudent.id;
	}

}
</script>
