<template>
	<v-navigation-drawer app mini-variant expand-on-hover color="primary">
			<v-list dense nav>
				<v-list-item key="home" to="/">
					<v-list-item-icon>
						<v-icon> mdi-home </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title> Home </v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item key="analysis" to="/performanceAnalysis">
					<v-list-item-icon>
						<v-icon> mdi-chart-bar </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title> Statistical Analysis </v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item key="studentPerformance" to="/studentPerformance">
					<v-list-item-icon>
						<v-icon> mdi-school-outline </v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title> Student Performance </v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import * as Highcharts from 'highcharts'
import Component from 'vue-class-component'
import highchartsMore from 'highcharts/highcharts-more'

@Component
export default class SidebarMenu extends Vue {

}

</script>
