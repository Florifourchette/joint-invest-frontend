import { createApiUrl} from './CreateAPIUrl'

export function transaction(companyId, ammount, callback) {
    const apiUrl = createApiUrl(companyId)
    const apiCall = async () => {
        try {
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    callback(data);
                });
        } catch (error) {
            console.log(error);
        }
    };
    apiCall();
}