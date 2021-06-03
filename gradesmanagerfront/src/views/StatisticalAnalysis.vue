<template>
	<div>
		<v-row no-gutters class="justify-center mt-12">
			<v-col cols=6>
				<v-card elevation=3>
					<CustomChart 
						:title="'Grade average by level'" 
						:yAxis="Object.values(gradeAverage)" 
						:xAxis="Object.keys(gradeAverage)" 
						:type="'column'" 
						:color="'#664EAE'"
						height="365"
					/>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters class="justify-center mt-12">
			<v-col cols=6>
				<v-card elevation=3>
					<CustomChart 
						:title="'Student count per level'" 
						:yAxis="studentCountPerLevel.values" 
						:xAxis="studentCountPerLevel.categories" 
						:type="'bar'" 
						:color="'#664EAE'"
						height="365"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import CustomChart from '../components/CustomChart.vue'

@Component({
	components: {
		CustomChart
	}
})
export default class StatisticalAnalysis extends Vue {
	@Action getGradeAverageBySchoolLevels!: (schoolID: number) => Promise<any>
	@Action getStudentCountPerLevel!: (schoolID: number) => Promise<any>

	gradeAverage = null;
	studentCountPerLevel = null;
	schoolId = 5;

	async mounted() {
		this.gradeAverage = await this.getGradeAverageBySchoolLevels(this.schoolId);
		this.studentCountPerLevel = await this.getStudentCountPerLevel(this.schoolId);
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
