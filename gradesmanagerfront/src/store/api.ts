import axios, { AxiosRequestConfig } from 'axios'

export class Api {
	request = axios.create({
		baseURL: process.env.VUE_APP_BASE_API,
		timeout: 10000000000
	});

	async get(url: string, config?: AxiosRequestConfig) {
		return await this.request.get(url, config);
	}

	async post(url: string, data: any, config?: AxiosRequestConfig) {
		return await this.request.post(url, data, config);
	}

	async delete(url: string, config?: AxiosRequestConfig) {
		return await this.request.delete(url, config);
	}

	async put(url: string, data: any, config?: AxiosRequestConfig) {
		return await this.request.put(url, data, config);
	}

}

export const api = new Api();