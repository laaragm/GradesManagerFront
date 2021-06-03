<template>
	<div>
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
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { Level } from '../enums/Level'
import { Classroom } from '../models/Classroom'
import { Student } from '../models/Student'

@Component
export default class GeneralInfo extends Vue {
	@Prop() classrooms!: Array<Classroom>;
	@Prop() students!: Array<Student>;

	getClassroomLevel(level: string) {
		return Level[level];
	}
}
</script>
