import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider, useContract, useSigner, useAccount } from 'wagmi';
import { contractAddress } from '../config';
import { useState } from 'react';

import ERC20Factory from '../abis/ERC20Factory.json';

const Home = () => {
  const { address: account, isConnecting, isDisconnected } = useAccount();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [address, setAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: ERC20Factory.abi,
    signerOrProvider: signer || provider,
  });

  const createERC20 = async () => {
    const tx = await contract.createERC20(name, symbol, decimals, totalSupply, address);
    const receipt = await tx.wait();
    setTokenAddress(receipt.events[0].args[0]);
    console.log('address', receipt.events[0].args[0]);
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <ConnectButton />
      </div>
      {account && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createERC20();
          }}
        >
          <div className="flex flex-col items-center justify-center  py-2">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
              <div className="border-solid border-2 border-gray-300">
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="border-solid border-2 border-gray-300">
                <input
                  type="text"
                  placeholder="Symbol"
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>
              <div className="border-solid border-2 border-gray-300">
                <input
                  type="text"
                  placeholder="Decimals"
                  onChange={(e) => setDecimals(e.target.value)}
                />
              </div>
              <div className="border-solid border-2 border-gray-300">
                <input
                  type="text"
                  placeholder="Total Supply"
                  onChange={(e) => setTotalSupply(e.target.value)}
                />
              </div>
              <div className="border-solid border-2 border-gray-300">
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Token
              </button>
            </div>
          </div>
        </form>
      )}
      {tokenAddress && (
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <div className="border-solid border-2 border-sky-500">
              <p>Your new Token Contract Address: {tokenAddress}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
