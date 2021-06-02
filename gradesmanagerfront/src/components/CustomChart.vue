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
				type: this.type
			},
			title: {
				text: this.title,
				align: 'center'
			},
			xAxis: {
				categories: this.xAxis,
				labels: {
					rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				min: 0,
			},
			legend: {
				enabled: false
			},
			tooltip: {
				style: {
					color: 'black'
				},
				borderColor: 'transparent',
				borderRadius: 3
			},
			series: [{
				name: this.title,
				data: this.yAxis,
				type: this.type
			}]
		});
	}

}
</script>
