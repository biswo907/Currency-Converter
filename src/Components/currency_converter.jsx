import { useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convertCurrency, fetchCurrencies } from "../api/api"

const CurrencyConverter = () => {

    const REFRESS_INTERVAL = 100000

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);

    // Call Api here
    const { data, error, isPending, refetch } = useQuery({
        queryKey: ["details"],
        staleTime: REFRESS_INTERVAL,
        queryFn: () => fetchCurrencies(),
    });

    const mutation = useMutation({
        mutationFn: convertCurrency,
        onSuccess: (response) => {
            console.log("Conversion RESPONSE", response);
            setConvertedAmount(response?.rates?.[toCurrency]);
        },
        onError: (error) => {
            console.error("Error converting currency:", error);
        },
    });

    const handleConvert = () => {
        mutation.mutate({ amount, fromCurrency, toCurrency });
    };








    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setConvertedAmount(null)
    };

    return (
        <div className="h-full flex">

            <div className="w-[600px]  mx-auto my-auto bg-white  p-5  rounded-lg shadow-md">
                <h2 className="mb-5 text-2xl font-semibold text-gray-700">
                    Currency Converter
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">

                    <CurrencyDropdown
                        currencies={data ? Object.keys(data) : []}
                        title="From:"
                        currency={fromCurrency}
                        setCurrency={setFromCurrency}
                    />

                    {/* swap currency button */}
                    <div className="flex justify-center -mb-5 sm:mb-0">
                        <button
                            onClick={swapCurrencies}
                            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                        >
                            <HiArrowsRightLeft className="text-xl text-gray-700" />
                        </button>
                    </div>
                    <CurrencyDropdown
                        currencies={data ? Object.keys(data) : []}
                        currency={toCurrency}
                        setCurrency={setToCurrency}
                        title="To:"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Amount:
                    </label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        disabled={mutation.isLoading}
                        onClick={handleConvert}
                        className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${mutation.isLoading ? "animate-pulse" : ""}  `}
                    >
                        {mutation.isLoading ? "Converting..." : "Convert"} {/* Show loading text */}
                    </button>
                </div>

                {convertedAmount && (
                    <div className="mt-4 text-lg font-medium text-right text-green-600">
                        Converted Amount: {convertedAmount} {toCurrency}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;

