<template>
	<div>
		<v-row no-gutters class="justify-center mt-10">
			<v-col cols=6>
				<v-card elevation=3>
					<CustomChart 
						:title="'Grade average by level'" 
						:yAxis="Object.values(gradeAverage)" 
						:xAxis="Object.keys(gradeAverage)" 
						:type="'column'" 
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
import RadarChart from '../components/RadarChart.vue'

@Component({
	components: {
		CustomChart,
		RadarChart
	}
})
export default class StatisticalAnalysis extends Vue {
	@Action getGradeAverageBySchoolLevels!: (schoolID: number) => Promise<any>

	gradeAverage = null;

	async mounted() {
		const schoolId = 5;
		this.gradeAverage = await this.getGradeAverageBySchoolLevels(schoolId);
		console.log(this.gradeAverage);
		const studentsDTO = {
			students: [13],
			school: 5
		}
	}

}
</script>
