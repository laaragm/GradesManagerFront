import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
		themes: {
			light: {
				primary: "#7A65F2"
			},
			dark: {
				primary: "#7A65F2"
			}
		}
	}
});
