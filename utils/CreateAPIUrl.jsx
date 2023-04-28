export function createApiUrl(companyIds) {
    const apiKey = import.meta.env.VITE_API_KEY; // replace with your actual API key
    const tickerString = companyIds.join(",");
    return `https://api.twelvedata.com/price?symbol=${tickerString}&apikey=${apiKey}`;
}