<template>
	<div>
		<v-progress-circular
			indeterminate
			:color="color"
			:size="size"
			class="loading"
		></v-progress-circular>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component
export default class CircularLoading extends Vue {
    @Prop() size!: string;
    @Prop() color!: string;
}
</script>

<style scoped>
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
