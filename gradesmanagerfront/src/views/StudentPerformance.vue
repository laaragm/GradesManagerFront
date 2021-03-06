<template>
	<div>
		<v-row no-gutters class="px-3 pt-3 side-bar" v-if="!loading">
			<v-col cols=3 class="pr-3">
				<v-card class="side-bar-card">
					<v-radio-group v-model="studentRadioGroup" class="pl-5">
						<v-radio
							v-for="student in students" 
							:key="student.id"
							:label="student.name"
							:value="student.id"
						></v-radio>
					</v-radio-group>
				</v-card>
			</v-col>
			<v-col cols=9>
				<v-card elevation=5 class="centralize pb-12">
					<RadarChart 
						:title="'Student Performance'" 
						:values="Object.values(selectedStudent.gradeAverageByLevel)"
						:label="selectedStudent.studentName"
						:startPoint="getFirstLevel(selectedStudent)"
						:lastPoint="getLastLevel(selectedStudent)"
						:color="'#664EAE'"
						class="pt-5 mt-12"
						:height="600"
					/>
				</v-card>
			</v-col>
		</v-row>
		<CircularLoading v-else color="#664EAE" size="70" />
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import RadarChart from '../components/RadarChart.vue'
import { Level } from '../enums/Level'
import CustomChart from '../components/CustomChart.vue'
import CircularLoading from '../components/CircularLoading.vue'
import { Student } from '../models/Student'

@Component({
	components: {
		RadarChart,
		CustomChart,
		CircularLoading
	}
})
export default class StudentPerformance extends Vue{
	@Action getStudentsPerformance!: (studentsDTO: any) => Promise<any>
	@Action getStudents!: () => Promise<Array<Student>>

	studentsPerformance!: any;
	students!: any;
	selectedStudent = null;
	school = 5;
	studentRadioGroup = null;
	loading = false;

	@Watch('studentRadioGroup')
	onChangeStudent() {
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
		this.loading = true;
		this.students = await this.getStudents();
		this.studentRadioGroup = this.students[0].id;
		await this.analyzePerformance(this.students[0].id);
		this.loading = false;
	}

	async analyzePerformance(id: number) {
		const student = {
			students: [id],
			school: this.school
		}
		this.studentsPerformance = await this.getStudentsPerformance(student);
		this.selectedStudent = this.studentsPerformance[0];
	}

	getLevels(student: Student) {
		const start = this.getFirstLevel(student);
		const end = this.getLastLevel(student);
		var data = [];
		for (let i = start; i < end; i++) {
			data.push(i);
		}
		return data;
	}

}
</script>

<style scoped>
.side-bar-card {
	overflow-y: auto;
	height: calc(100vh - 20px);
}
.side-bar {
	overflow-y: hidden;
}
.centralize {
	display: flex;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	align-items: center;
	justify-content: center;
}
</style>
