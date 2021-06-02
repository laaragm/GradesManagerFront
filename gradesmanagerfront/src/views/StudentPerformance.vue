<template>
	<div>
		{{studentsPerformance}}
		<v-row no-gutters class="justify-center mt-10">
			<v-col cols=6>
				<v-card elevation=3>
					<RadarChart 
						:title="'Radar chart'" 
						:data="studentsPerformance" 
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import RadarChart from '../components/RadarChart.vue'

@Component({
	components: {
		RadarChart
	}
})
export default class StudentPerformance extends Vue{
	@Action getStudentsPerformance!: (studentsDTO: any) => Promise<any>

	studentsPerformance = null;

	async mounted() {
		const studentsDTO = {
			students: [13,14],
			school: 5
		}
		this.studentsPerformance = await this.getStudentsPerformance(studentsDTO);
		console.log(this.studentsPerformance);
	}

}
</script>
