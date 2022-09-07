import Head from 'next/head';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi';
import Test from '../abis/Test.json';
import { contractAddress } from '../config';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const Home = () => {
  const { isConnected } = useAccount();
  const [value, setValue] = useState('');
  const [constantValue, setConstantValue] = useState('');

  const { data, isLoading, error } = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: Test.abi,
      functionName: 'getValue',
    },
    {
      changeOnBlock: true,
      watch: true,
    }
  );

  //Change the value of big number in data to integer with ethers
  const ethersValue = data ? ethers.utils.formatUnits(data, 0) : 0;

  useEffect(() => {
    setConstantValue(ethersValue);
  }, [ethersValue]);

  //Use contract write to call setValue function
  const { config } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: Test.abi,
    functionName: 'setValue',
    args: [value],
  });
  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    write: writeValue,
  } = useContractWrite(config);

  useEffect(() => {
    if (data2) {
      setConstantValue(value);
      setValue('');
    }
  }, [data2, isSuccess2]);

  return (
    <>
      <ConnectButton />
      Greating: {constantValue}
      {/* If its connected show the get balance button with tailwindcss and the input text for value */}
      {isConnected && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => writeValue()}
          >
            Change Value
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
