<template>
	<div>
		<v-row no-gutters class="ma-5 justify-center" v-if="!loading">
			<v-col cols=4>
				<v-card class="rounded-lg pa-3" elevation=3>
					<v-row>
						<v-col cols=12>
							<v-card-text>
								<div class="text--primary display-1 font-weight-bold"> 
									{{ school.name }}
								</div>
							</v-card-text>
							<v-card-text>
								<div class="text--primary"> 
									<span class="font-weight-bold"> Owner: </span>
									<span> {{ school.owner }}  </span>
								</div>
							</v-card-text>
							<v-card-text>
								<div class="text--primary"> 
									<span class="font-weight-bold"> Principal: </span>
									<span> {{ school.principal }}  </span>
								</div>
							</v-card-text>
							<v-card-text>
								<div class="text--primary"> 
									<span class="font-weight-bold"> Address: </span>
									<span> {{ school.address }}  </span>
								</div>
							</v-card-text>
							<v-card-text>
								<div class="text--primary"> 
									<span class="font-weight-bold"> Phone number: </span>
									<span> {{ school.phoneNumber }}  </span>
								</div>
							</v-card-text>
							<v-card-text>
								<div class="text--primary"> 
									<span class="font-weight-bold"> CNPJ: </span>
									<span> {{ school.cnpj }}  </span>
								</div>
							</v-card-text>
						</v-col>
					</v-row>
				</v-card>
				
				<v-card class="rounded-lg pa-3 mt-5" elevation=3>
					<v-row>
						<v-col cols=6>
							<v-card-text>
								<div class="text--primary mt-3"> 
									<h1> Classrooms </h1>
								</div>
							</v-card-text>
							<v-card-text>
								<div v-for="classroom in classrooms" :key="classroom.id" class="text--primary"> 
									<div class="mb-5"> 
										<v-icon> mdi-book </v-icon>
										{{ classroom.name }}: {{ getClassroomLevel(classroom.level) }} - {{ classroom.year }} 
									</div>
								</div>
							</v-card-text>
						</v-col>
						<v-col cols=6>
							<v-card-text>
								<div class="text--primary mt-4"> 
									<h1> Students </h1>
								</div>
							</v-card-text>
							<v-card-text>
								<div v-for="student in students" :key="student.id" class="text--primary"> 
									<div class="mb-5"> 
										<v-icon> mdi-human-greeting </v-icon>
										{{ student.name }}
									</div>
								</div>
							</v-card-text>
						</v-col>
					</v-row>
				</v-card>
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
		<v-progress-circular
			v-else
			indeterminate
			color="#664EAE"
			size="70"
			class="centralize"
		></v-progress-circular>
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

@Component({
	components: {
		CustomChart
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