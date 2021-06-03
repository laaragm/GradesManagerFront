<template>
	<div>
		<div v-if="!loading">
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
		<CircularLoading v-else color="#664EAE" size="70" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import CustomChart from '../components/CustomChart.vue'
import CircularLoading from '../components/CircularLoading.vue'

@Component({
	components: {
		CustomChart,
		CircularLoading
	}
})
export default class StatisticalAnalysis extends Vue {
	@Action getGradeAverageBySchoolLevels!: (schoolID: number) => Promise<any>
	@Action getStudentCountPerLevel!: (schoolID: number) => Promise<any>

	gradeAverage!: any;
	studentCountPerLevel!: any;
	schoolId = 5;
	loading = false;

	async mounted() {
		this.loading = true;
		this.gradeAverage = await this.getGradeAverageBySchoolLevels(this.schoolId);
		this.studentCountPerLevel = await this.getStudentCountPerLevel(this.schoolId);
		this.loading = false;
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
