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
					<!-- TODO: Possibilidade do cara escolher se ele quer um bar chart, column, line (é só trocar o type) -->
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

	gradeAverage = null;
	schoolId = 5;

	async mounted() {
		this.gradeAverage = await this.getGradeAverageBySchoolLevels(this.schoolId);
		console.log(this.gradeAverage);
	}

}
</script>
