export const fetchCurrencies = async () => {
    try {
        const response = await fetch(`https://api.frankfurter.app/currencies`);
        return response.json();
    } catch (error) { }
};
export const convertCurrency = async ({ amount, fromCurrency, toCurrency }) => {
    try {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        return response.json();
    } catch (error) { }
};
