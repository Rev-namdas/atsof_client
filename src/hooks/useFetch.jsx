import { useEffect, useState } from "react";

export default function useFetch(apiCall) {
	const [result, setResult] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	
	const fetchData = async () => {
		setIsLoading(true)
		const res = await apiCall()
		setResult(res)
		setIsLoading(false)
	}
	
	useEffect(() => {
		fetchData()
	}, 
	// eslint-disable-next-line
	[])
	
    return { result, isLoading };
}
