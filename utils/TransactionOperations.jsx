import { createApiUrl} from './CreateAPIUrl'

export function buy(companyId, ammount) {
    const apiUrl = createApiUrl(companyId)
    const apiCall = async () => {
        try {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPrices(data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    apiCall();
}