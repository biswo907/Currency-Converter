/* eslint-disable react/prop-types */
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    title = "",
}) => {

    return (
        <div className="">
            <label
                htmlFor={title}
                className="block text-sm font-medium text-gray-700"
            >
                {title}
            </label>

            <div className="mt-1 relative">
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full p-2 border border-gray-300 pr-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >

                    <hr />
                    {currencies
                        .map((currency) => {
                            return (
                                <option value={currency} key={currency}>
                                    {currency}
                                </option>
                            );
                        })}
                </select>


            </div>
        </div>
    );
};

export default CurrencyDropdown;