<template>
	<div>
		Hello World!
	</div>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class Home extends Vue{


}
</script>
