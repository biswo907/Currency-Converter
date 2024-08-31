import { useQuery } from '@tanstack/react-query';
import React from 'react'
import CurrencyConverter from './Components/currency_converter';

const App = () => {



  return (
    <div className='bg-indigo-50 w-full h-screen flex items-center justify-center'>
      <CurrencyConverter />
    </div>
  )
}

export default App