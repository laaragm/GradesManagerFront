<template>
	<div>
		<v-card class="rounded-lg pa-3" elevation=3>
			<v-row>
				<v-col cols=12>
					<v-card-text>
						<div class="text--primary display-1 font-weight-bold"> 
							{{ school.name }}
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text--primary"> 
							<span class="font-weight-bold"> Owner: </span>
							<span> {{ school.owner }}  </span>
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text--primary"> 
							<span class="font-weight-bold"> Principal: </span>
							<span> {{ school.principal }}  </span>
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text--primary"> 
							<span class="font-weight-bold"> Address: </span>
							<span> {{ school.address }}  </span>
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text--primary"> 
							<span class="font-weight-bold"> Phone number: </span>
							<span> {{ school.phoneNumber }}  </span>
						</div>
					</v-card-text>
					<v-card-text>
						<div class="text--primary"> 
							<span class="font-weight-bold"> CNPJ: </span>
							<span> {{ school.cnpj }}  </span>
						</div>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { School } from '../models/School'

@Component
export default class SchoolInfoCard extends Vue {
	@Prop() school!: School;
}
</script>
