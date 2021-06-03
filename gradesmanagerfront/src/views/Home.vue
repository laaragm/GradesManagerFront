<template>
	<div v-if="!loading">
		<v-row no-gutters class="ma-5">
			<v-col cols=4>
				<v-card class="rounded-lg pa-3" elevation=3>
					<v-row>
						<v-col cols=8>
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
						<v-col cols=4>
							<v-card 
								class="text-center justify-center my-auto rounded-lg centralize primary" 
								width="30%" 
								height="20%" 
								elevation=5
							>
								<div class="text--primary font-weight-bold pt-6"> {{ getNumberOfStudents() }}+ students </div>
							</v-card>
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
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { School } from '../models/School'
import { Classroom } from '../models/Classroom'
import { Student } from '../models/Student'
import { Level } from '../enums/Level'

@Component
export default class Home extends Vue{
	@Action getSchools!: () => Promise<Array<School>>
	@Action getClassroomsFromSchool!: (schoolID: number) => Promise<Classroom>
	@Action getStudents!: () => Promise<Array<Student>>

	allSchools = null;
	school = null;
	classrooms = null;
	loading = false;
	students = null;

	async mounted() {
		this.loading = true;
		this.allSchools = await this.getSchools();
		this.school = this.allSchools[0];
		this.classrooms = await this.getClassroomsFromSchool(this.school.id);
		this.students = await this.getStudents();
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
	bottom: 50%;
	transform: translate(-50%, -50%);
}
</style>