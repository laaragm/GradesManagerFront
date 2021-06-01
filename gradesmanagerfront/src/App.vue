<template>
	<v-app id="app">
		<v-app-bar app color="primary" dark>
			<v-tabs centered>
				<v-tab key="home" to="/"> Home </v-tab>
				<v-tab key="analysis" to="/performanceAnalysis"> Analysis </v-tab>
			</v-tabs>
		</v-app-bar>
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
name: 'App',

data: () => ({
	//
}),
});
</script>
