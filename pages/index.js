import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useProvider, useContract, useSigner, useAccount } from 'wagmi';
import { MumbaiContractAddress, RinkebyContractAddress, GoerliContractAddress } from '../config';
import { useState } from 'react';

import ERC20Factory from '../abis/ERC20Factory.json';

const Home = () => {
  const { address: account, isConnecting, isDisconnected } = useAccount();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [address, setAddress] = useState('0x953597710DB155fCc59E2dD8e40746D452C359b7');
  const [tokenAddress, setTokenAddress] = useState('');

  //choose network
  const { network } = useProvider();

  let contractAddress;
  if (network.name === 'maticmum') {
    contractAddress = MumbaiContractAddress;
  } else if (network.name === 'rinkeby') {
    contractAddress = RinkebyContractAddress;
  } else if (network.name === 'goerli') {
    contractAddress = GoerliContractAddress;
  }

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
      {/* Connect button in the top middle of the page with tailwindcss */}
      <div className="flex justify-center">
        <ConnectButton />
      </div>
      {/* --------------------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">
          {/* Content goes here */}
          {account && (
            <div className="space-y-6">
              <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Create Token on {network.name} Network
                    </h3>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        createERC20();
                      }}
                    >
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="tokenName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Token Name
                          </label>
                          <input
                            type="text"
                            name="tokenName"
                            id="tokenName"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Token Name"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="tokenSymbol"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Token Symbol
                          </label>
                          <input
                            type="text"
                            name="tokenSymbol"
                            id="tokenSymbol"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Symbol"
                            onChange={(e) => setSymbol(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="tokenDecimals"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Token Decimals
                          </label>
                          <input
                            type="number"
                            name="tokenDecimals"
                            id="tokenDecimals"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Token Decimals"
                            onChange={(e) => setDecimals(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="totalSupply"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Total Supply
                          </label>
                          <input
                            type="number"
                            name="totalSupply"
                            id="totalSupply"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Total Supply"
                            onChange={(e) => setTotalSupply(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="ownerAddress"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Token Owner Address
                          </label>
                          <input
                            type="text"
                            name="ownerAddress"
                            id="ownerAddress"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Owner Address"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create Token
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --------------------------- */}

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
