import { createApiUrl} from './CreateAPIUrl'

export function transaction(params, priceCallback) {
    const apiUrl = createApiUrl(params.companyId)
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