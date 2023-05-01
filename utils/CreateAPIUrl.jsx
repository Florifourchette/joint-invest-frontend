export function createApiUrl(companyIds) {
    const apiKey = import.meta.env.VITE_API_KEY; // replace with your actual API key
    let tickerString;
    if (Array.isArray(companyIds)) {
        tickerString = companyIds.join(",");
    
    } else {
        tickerString = companyIds;

    }
    console.log(`https://api.twelvedata.com/price?symbol=${tickerString}&apikey=${apiKey}`)
    return `https://api.twelvedata.com/price?symbol=${tickerString}&apikey=${apiKey}`;
    
}