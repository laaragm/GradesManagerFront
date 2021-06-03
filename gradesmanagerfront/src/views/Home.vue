<template>
	<div>
		<v-row no-gutters class="ma-5 justify-center" v-if="!loading">
			<v-col cols=4>
				<SchoolInfoCard :school="school" />
				<GeneralInfo :classrooms="classrooms" :students="students" />
			</v-col>
			<v-col cols=7>
				<v-card elevation=3 class="ml-5 rounded-lg">
					<CustomChart 
						:title="'Grade average by Discipline'" 
						:yAxis="disciplinesGradeAverage.values" 
						:xAxis="disciplinesGradeAverage.categories"
						:type="'column'"
						:color="'#664EAE'"
						height="365"
					/>
				</v-card>
				<v-card elevation=3 class="ml-5 rounded-lg mt-5">
					<CustomChart 
						:title="'Grade average by level'" 
						:yAxis="Object.values(gradeAverageByLevel)" 
						:xAxis="Object.keys(gradeAverageByLevel)" 
						:type="'line'" 
						:color="'#664EAE'"
						height="500"
					/>
				</v-card>
			</v-col>
		</v-row>
		<CircularLoading v-else color="#664EAE" size="70" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { School } from '../models/School'
import { Classroom } from '../models/Classroom'
import { Student } from '../models/Student'
import { XyChart } from '../models/XyChart'
import { Level } from '../enums/Level'
import CustomChart from '../components/CustomChart.vue'
import CircularLoading from '../components/CircularLoading.vue'
import SchoolInfoCard from '../components/SchoolInfoCard.vue'
import GeneralInfo from '../components/GeneralInfo.vue'

@Component({
	components: {
		CustomChart,
		CircularLoading,
		SchoolInfoCard,
		GeneralInfo
	}
})
export default class Home extends Vue{
	@Action getSchools!: () => Promise<Array<School>>
	@Action getClassroomsFromSchool!: (schoolID: number) => Promise<Classroom>
	@Action getStudents!: () => Promise<Array<Student>>
	@Action getDisciplinesGradeAverage!: (schoolID: number) => Promise<Array<XyChart>>
	@Action getGradeAverageBySchoolLevels!: (schoolID: number) => Promise<any>

	gradeAverageByLevel = null;
	allSchools = null;
	school = null;
	classrooms = null;
	loading = false;
	students = null;
	disciplinesGradeAverage = null;
	
	async mounted() {
		this.loading = true;
		this.allSchools = await this.getSchools();
		this.school = this.allSchools[0];
		this.classrooms = await this.getClassroomsFromSchool(this.school.id);
		this.students = await this.getStudents();
		this.disciplinesGradeAverage = await this.getDisciplinesGradeAverage(this.school.id);
		this.gradeAverageByLevel = await this.getGradeAverageBySchoolLevels(this.school.id);
		this.loading = false;
	}

	getClassroomLevel(level: string) {
		return Level[level];
	}

	getNumberOfStudents() {
		return this.students.length;
	}
}
</script>

<style scoped>
.centralize {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>