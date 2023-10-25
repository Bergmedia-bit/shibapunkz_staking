import React, { useState, useEffect, ChangeEvent } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import Nftcard1 from '../NftCards/nftcard1';
import { Nftcard2 } from '../NftCards/nftcard2';
import './staking.css';
import nftstaking from '../../Abi/nftstaking.json';
import IERC20 from '../../Abi/IERC20.json';
import punks from '../../Abi/punk.json';
import { AbiItem } from 'web3-utils';
import { Audio } from 'react-loader-spinner';

import Web3 from 'web3';
import nft from '../../images/nft.jpg';

function Staking() {
    const { ethereum } = (window as any);
    const [user_ipfswallet, set_user_ipfswallet] = useState<any[]>([]);
    const [stake_nft, set_stake_nft] = useState<any[]>([]);
    const [token_id, set_token_id] = useState<any[]>([]);
    const [availableRewards, set_availableRewards] = useState('');
    const [currest_stk_balance, set_currest_stk_balance] = useState('');
    const [interest, set_interest] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const itemsPerPage = 20; // Number of items per page

    const [currentPage2, setCurrentPage2] = useState(1);
    const [count2, setCount2] = useState(0);
    const itemsPerPage2 = 20; // Number of items per page

    useEffect(() => {
        get_campign();
    }, [stake_nft, user_ipfswallet]);

    const get_campign = async () => {
        let array: any[] = [];
        let Stake_array: any[] = [];

        const web3 = new Web3(Web3.givenProvider);
        const abi = punks;
        const IERC20_abi = IERC20.abi;

        const accounts = await web3.eth.getAccounts((error: any, accounts: any) => {
            if (!error && accounts.length > 0) {
                const userAddress = accounts[0];
                // console.log(`User's Ethereum address: ${userAddress}`);
            } else {
                console.error('Error getting user address:', error);
            }
        });
        const nftstaking_abi = nftstaking;
        const punks_contract = new web3.eth.Contract(abi as AbiItem[], '0xcf6e0891cB36065212676F5f328E7E40A3eFf68a');
        const IERC20_contract = new web3.eth.Contract(IERC20_abi as AbiItem[], '0xd1509c2Aa2411b993dE76d65523F8Af96F86c943');
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');

        const getStakedTokens = await nftstaking_abi_contract.methods.numberOfStakedTokenIDsOfAnAddress(accounts[0]).call().then(async (token: any) => {
            for (let j = 0; j < token; j++) {
                const tokenId2 = await nftstaking_abi_contract.methods.whichStakedTokenIDsOfAnAddress(accounts[0], j).call().then(async (tokenId: any) => {
                    const gettokenid = await punks_contract.methods.tokenURI(tokenId).call().then(async (gettokenMetadataURI: any) => {
                        if (gettokenMetadataURI.startsWith('ipfs://')) {
                            gettokenMetadataURI = `https://ipfs.io/ipfs/${gettokenMetadataURI.split('ipfs://')[1]}`;
                        }
                        const tokenMetadata = await fetch(gettokenMetadataURI).then((response) => response.json());
                        const content = tokenMetadata['image'].replace('ipfs://', 'ipfs/');
                        console.log('tokenId');
                        console.log(tokenId);
                        Stake_array.push({ id: tokenId, image: content });
                    });
                });
            }

            set_token_id(token);
        });

        setCount2(Math.ceil(Stake_array.length / itemsPerPage2));

        // Modify user_ipfswallet to only include items for the current page
        const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
        const endIndex2 = startIndex2 + itemsPerPage2;
        const user_ipfswalletSubset2 = Stake_array.slice(startIndex2, endIndex2);

        set_stake_nft(user_ipfswalletSubset2);

        const stk_balance = await nftstaking_abi_contract.methods.numberOfTokensCurrentlyStaked().call().then(async (balance: any) => {
            set_currest_stk_balance(balance);
        });

        const stk_interest = await nftstaking_abi_contract.methods.dailyInterestRate().call().then(async (balance: any) => {
            const skippedNumber = parseInt(balance.toString().slice(0, -4));
            set_interest(skippedNumber.toString());
        });

        const result2 = await punks_contract.methods.walletOfOwner(accounts[0]).call().then(async (result: any) => {
            for (let i = 0; i < result.length; i++) {
                const tokenId2 = await punks_contract.methods.tokenOfOwnerByIndex(accounts[0], i).call().then(async (tokenId: any) => {
                    const tokenId3 = await punks_contract.methods.tokenURI(tokenId).call().then(async (tokenMetadataURI: any) => {
                        if (tokenMetadataURI.startsWith('ipfs://')) {
                            tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split('ipfs://')[1]}`;
                        }
                        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json());
                        const content = tokenMetadata['image'].replace('ipfs://', 'ipfs/');
                        console.log(content);
                        array.push({ id: tokenId, image: content });
                    });
                });
            }
        });
        setCount(Math.ceil(array.length / itemsPerPage));

        // Modify user_ipfswallet to only include items for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const user_ipfswalletSubset = array.slice(startIndex, endIndex);

        set_user_ipfswallet(user_ipfswalletSubset);
    }

    const stake = async (tokenid: any) => {
        console.log(tokenid);
        const web3 = new Web3(Web3.givenProvider);
        const nftstaking_abi = nftstaking;
        const punks_abi = punks;
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking_abi as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');
        const punks_contract = new web3.eth.Contract(punks_abi as AbiItem[], '0xcf6e0891cB36065212676F5f328E7E40A3eFf68a');

        punks_contract.methods.approve('0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203', tokenid).send({ from: accounts[0] }).on('receipt', (receipt: any) => {
            nftstaking_abi_contract.methods
                .stake(tokenid)
                .send({ from: accounts[0], gas: '5000000', value: '60000000000000000' })
                .once('receipt', (receipt: any) => {
                    window.location.reload();
                })
                .on('error', (error: any) => {
                    console.log(error);
                });
        });
    };

    const stakeAll = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const nftstaking_abi = nftstaking;
        const punks_abi = punks;
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking_abi as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');
        const punks_contract = new web3.eth.Contract(punks_abi as AbiItem[], '0xcf6e0891cB36065212676F5f328E7E40A3eFf68a');

        const result2 = await punks_contract.methods.walletOfOwner(accounts[0]).call().then(async (result: any) => {
            console.log('result');
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                const tokenId2 = await punks_contract.methods.tokenOfOwnerByIndex(accounts[0], i).call().then(async (tokenId: any) => {
                    punks_contract.methods.approve('0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203', tokenId).send({ from: accounts[0] }).on('receipt', (receipt: any) => {
                        if (i === result.length - 1) {
                            nftstaking_abi_contract.methods
                                .multipleStake(result)
                                .send({ from: accounts[0], gas: '5000000', value: 60000000000000000 * result.length })
                                .once('receipt', (receipt: any) => {
                                    window.location.reload();
                                })
                                .on('error', (error: any) => {
                                    console.log(error);
                                });
                        }
                    });
                });
            }
        });
    };

    const withdraw = async (tokenid: any) => {
        const web3 = new Web3(Web3.givenProvider);
        const nftstaking_abi = nftstaking;
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking_abi as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');

        nftstaking_abi_contract.methods
            .unstake(tokenid)
            .send({ from: accounts[0], gas: '5000000', value: '100000000000000000' })
            .once('receipt', (receipt: any) => {
                window.location.reload();
            })
            .on('error', (error: any) => {
                console.log(error);
            });
    };

    const withdraw_without_unstaking = async (tokenid: any) => {
        const web3 = new Web3(Web3.givenProvider);
        const nftstaking_abi = nftstaking;
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking_abi as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');

        nftstaking_abi_contract.methods
            .withdrawAllInterestFromATokenWithoutUnstaking(tokenid)
            .send({ from: accounts[0], gas: '5000000' })
            .once('receipt', (receipt: any) => {
                window.location.reload();
            })
            .on('error', (error: any) => {
                console.log(error);
            });
    };

    const Unstake_Multiple = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const nftstaking_abi = nftstaking;
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        const nftstaking_abi_contract = new web3.eth.Contract(nftstaking_abi as AbiItem[], '0xFA8Cd6059Fc99a72cCA32c9Db4c011B1A780B203');
        let newArray = [] as any;
        const getStakedTokens = await nftstaking_abi_contract.methods.numberOfStakedTokenIDsOfAnAddress(accounts[0]).call().then(async (token: any) => {
            for (let j = 0; j < token; j++) {
                const tokenId2 = await nftstaking_abi_contract.methods.whichStakedTokenIDsOfAnAddress(accounts[0], j).call().then(async (tokenId: any) => {
                    newArray.push(tokenId);
                    if (j === token - 1) {
                        console.log(newArray);
                        nftstaking_abi_contract.methods
                            .multipleUnstake(newArray)
                            .send({ from: accounts[0], gas: '5000000', value: 100000000000000000 * token })
                            .once('receipt', (receipt: any) => {
                                window.location.reload();
                            })
                            .on('error', (error: any) => {
                                console.log(error);
                            });
                    }
                });
            }
            set_token_id(token);
        });
    };

    return (
        <div className="staking-page">
            <div className="staking-label-row">
                <button type="button" onClick={() => stakeAll()} className="--btn2">
                    Stake All NFTs
                </button>
                <button type="button" onClick={() => Unstake_Multiple()} className="--btn2">
                    Unstake All NFTs
                </button>
            </div>
            <div className="staking-label-row">
                <button type="button" className="--btn2">
                    Total NFTs STAKED: {currest_stk_balance}
                </button>
                <button type="button" className="--btn2">
                    Total $SPUNK rewarded per NFT staked: {interest}
                </button>
            </div>

            <h1>Your Unstaked Nfts</h1>
            <div></div>

            <div className="nft-wrap">
                {user_ipfswallet.map((value, index) => (
                    <div key={index} className="nft-card">
                        <img src={'https://ipfs.io/' + value.image} />
                        <div className="nft-card-bottom">
                            <h1>{value.id}</h1>
                            <button type="button" onClick={() => stake(value.id)} className="--btn">
                                Stake
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
            <div className="pagination">
                {user_ipfswallet.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                )}
                {user_ipfswallet.length > 0 && (
                    <button type="button">{currentPage}</button>
                )}
                {user_ipfswallet.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={count === currentPage}
                    >
                        Next
                    </button>
                )}
            </div>


            <h1>Your Staked NFTs</h1>
            <div className="nft-wrap">
                {stake_nft.map((value, index) => (
                    <div key={index} className="nft-card">
                        <img src={'https://ipfs.io/' + value.image} />
                        <div className="nft-card-bottom">
                            <h1>{value.id}</h1>
                            <button type="button" onClick={() => withdraw(value.id)} className="--btn">
                                Unstake NFTs
                            </button>
                            <button
                                type="button"
                                onClick={() => withdraw_without_unstaking(value.id)}
                                className="--btn"
                            >
                                Claim Tokens
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {user_ipfswallet.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                )}
                {user_ipfswallet.length > 0 && (
                    <button type="button">{currentPage}</button>
                )}
                {user_ipfswallet.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={count === currentPage}
                    >
                        Next
                    </button>
                )}
            </div>

        </div>
    );
}

export default Staking;
