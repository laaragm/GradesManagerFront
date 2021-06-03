<template>
	<v-app id="app">
		<SidebarMenu />
		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SidebarMenu from './components/SidebarMenu.vue'

@Component({
	components: {
		SidebarMenu
	}
})
export default class App extends Vue {

}
</script>
