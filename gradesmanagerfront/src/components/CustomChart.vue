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
import { Level } from '../enums/Level'

@Component
export default class CustomChart extends Vue {
	@Prop() title!: string;
	@Prop() yAxis!: any[];
	@Prop() xAxis!: any[];
	@Prop() type!: string;
	@Prop() color!: string;
	@Prop() height!: number;

	mounted() {
		this.build();
	}

	@Watch('yAxis')
	rebuildOnChange() {
		this.build();
	}

	build() {
		const highcharts = Highcharts as any;
		highcharts.chart(this.title, {
			chart: {
				type: this.type,
				backgroundColor: 'transparent',
				height: this.height,
				width: this.width
			},
			credits: {
				enabled: false
			},
			title: {
				text: this.title,
				align: 'center',
				color: 'white',
			},
			xAxis: {
				categories: this.xAxis,
				labels: {
					rotation: -45,
					style: {
						color: 'white'
					}
				}
			},
			yAxis: {
				min: 0,
				style: {
						color: 'white'
					}
			},
			legend: {
				enabled: false,
			},
				labels: {
				overflow: 'justify'
			},
			tooltip: {
				style: {
					color: 'black'
				},
				borderColor: 'transparent',
				borderRadius: 3,
				textColor: 'black',
				backgroundColor: 'white'
			},
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				}
			},
			series: [{
				name: this.title,
				data: this.yAxis,
				type: this.type,
				color: this.color
			}]
		});
	}

}
</script>
