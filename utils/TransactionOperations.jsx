import { createApiUrl} from './CreateAPIUrl'

export function transaction(companyId, counter, companyName, priceCallback) {
    const apiUrl = createApiUrl(companyId)
    const apiCall = async () => {
        try {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    priceCallback(data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    apiCall();
}