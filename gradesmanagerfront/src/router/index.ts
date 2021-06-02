import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import HighchartsVue from 'highcharts-vue'


Vue.use(VueRouter);
Vue.use(HighchartsVue);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/performanceAnalysis',
		name: 'Analysis',
		component: () => import('../views/StatisticalAnalysis.vue')
	},
	{
		path: '/studentPerformance',
		name: 'StudentPerformance',
		component: () => import('../views/StudentPerformance.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router;
