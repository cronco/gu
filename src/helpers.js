
export const urlBuilder = (endpoint, {api_key, section}) => {
	return `//${endpoint}?api-key=${api_key}&section=${section}`
};