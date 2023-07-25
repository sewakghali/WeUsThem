import useSWR from 'swr'
import fetcher from '../lib/fetcher';

const useContact = (params?: string) => {
	const { data, error, isLoading, mutate } = useSWR(params != "" ? `api/search?params=${params}` : 'api/contact', fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return { data, error, isLoading, mutate };
}

export default useContact;