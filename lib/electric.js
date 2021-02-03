import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function querySolarData() {
	const { data, error } = useSWR('http://192.168.0.151/production.json?details=1', fetcher)

	return {
		electricData: data.consumption.whToday,
		isLoading: !error && !data,
		isError: error
	}
}

function getSolarData() {
	const { electricData, isLoading, isError } = querySolarData()

	if(isLoading) return <h1> Loading </h1>
	if (isError) return <h1> Error </h1>
	return electricData.json()
}