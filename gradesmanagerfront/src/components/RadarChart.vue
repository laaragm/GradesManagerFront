<template>
	<div>
		<div :id="title"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import * as Highcharts from 'highcharts'
import Component from 'vue-class-component'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)

@Component
export default class RadarChart extends Vue {
	@Prop() title!: string;
	@Prop() values!: any;
	@Prop() label!: string;
	@Prop() startPoint!: number;
	@Prop() lastPoint!: number;

	mounted() {
		this.build();
	}

	@Watch('values')
	rebuildOnChange() {
		this.build();
	}

	build() {
		const highcharts = Highcharts as any;
		highcharts.chart(this.title, {
			chart: {
				polar: true
			},
			title: {
				text: this.title
			},
			pane: {
				startAngle: 0,
				endAngle: 360
			},
			xAxis: {
				tickInterval: 1,
				min: this.startPoint,
				max: this.lastPoint + 1,
				labels: {
					format: 'Year {value}'
				}
			},
			yAxis: {
				min: 0
			},
			plotOptions: {
				series: {
					pointStart: this.startPoint,
					pointInterval: 1
				},
				column: {
					pointPadding: 0,
					groupPadding: 0
				}
			},
			series: [{
				type: 'line',
				name: this.label,
				data: this.values
			}]
		});
	}

}
</script>
