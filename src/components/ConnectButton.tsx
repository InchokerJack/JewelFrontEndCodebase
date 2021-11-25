import {Button, Flex, Input, Text} from '@chakra-ui/react';
import {useContext, useEffect, useState} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import {actionType, StoreContext} from '../App';
import {formatAddress} from 'src/helpers';
import {ReactComponent as Avatar1} from 'src/assets/icons/avatar-1.svg';
import juryRegistry from '../contracts/juryRegistry.json'
import {Contract, ethers} from "ethers";
import {fromBigNumber, toBigNumber} from "../utils/bigNumberConverter";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

type Props = {
    handleOpenModal: any;
    handleOpenDialog2: any;
};

export default function ConnectButton({handleOpenModal, handleOpenDialog2}: Props): JSX.Element {
    const {state, dispatch} = useContext(StoreContext);
    const [login, setLogin] = useState(false);
    const [addCommitAmount, setAddCommitAmount] = useState('0')

    async function handleConnectWallet() {
        const provider = await detectEthereumProvider();
        if (!provider) {
            handleOpenDialog2();
            return;
        }
        const walletAddress = await (provider as any).request({method: 'eth_requestAccounts'});
        dispatch({type: actionType.NEW_ADDRESS, address: walletAddress});
        setLogin(true);
        const networkId = await (provider as any).request({method: 'net_version'})
        if (networkId != 97) {
            toast('Please connect to testnet')
        }
    }

    useEffect(() => {
        if (state.address) {
            getCommitbalance()
        }
    }, [state.address])

    const getCommitbalance = async () => {
        const provider = await detectEthereumProvider();
        const etherProvider = new ethers.providers.Web3Provider((provider as any));
        const networkId = await (provider as any).request({method: 'net_version'})
        if (networkId != 97) {
            toast('Please connect to testnet')
        }
        const signer = (etherProvider as any).getSigner();
        const jury = new Contract(
            (juryRegistry as any).networks[97].address,
            juryRegistry.abi,
            signer
        );

        const balance = fromBigNumber(await jury.getUserCommittedBalance((state.address as any)[0]))
        dispatch({type: actionType.UPDATE_BALANCE, balance: balance})
    }
    const handleWithdraw = async () => {
        const provider = await detectEthereumProvider();
        const etherProvider = new ethers.providers.Web3Provider((provider as any));
        const signer = (etherProvider as any).getSigner();
        const networkId = await (provider as any).request({method: 'net_version'})
        if (networkId != 97) {
            toast('Please connect to testnet')
        }
        const jury = new Contract(
            (juryRegistry as any).networks[97].address,
            juryRegistry.abi,
            signer
        );
        try {
            await jury.withdrawCommittedBalance()
            toast('Successful!! ')
        } catch (e) {
            toast('Not succeed, please contact for more information')
        }
    }
    const handleAddCommit = async () => {
        const provider = await detectEthereumProvider();
        const networkId = await (provider as any).request({method: 'net_version'})
        if (networkId != 97) {
            toast('Please connect to testnet')
        }
        const etherProvider = new ethers.providers.Web3Provider((provider as any));
        const signer = (etherProvider as any).getSigner();
        const jury = new Contract(
            (juryRegistry as any).networks[97].address,
            juryRegistry.abi,
            signer
        );
        try {
            await jury.addCommitedBalance(toBigNumber(addCommitAmount))
            toast('Successful!! ')
        } catch (e) {
            toast('Not succeed, please contact for more information')
        }
    }

    return login ? (
        <><ToastContainer/>
            <Flex
                bg="rgba(255, 255, 255, 0.2)"
                padding="14px"
                borderRadius="8px"
                mr="12px"
                ml="20px"
                maxHeight="48px">
                <Text pr="12px" whiteSpace="nowrap">
                    Commit Balance
                </Text>
                <Text fontWeight="700">{state.balance}</Text>
            </Flex>
            <Flex
                bg="rgba(255, 255, 255, 0.2)"
                padding="14px"
                borderRadius="8px"
                mr="12px"
                maxHeight="48px" onClick={handleWithdraw} cursor='pointer'>
                <Text whiteSpace="nowrap" userSelect='none'>
                    Withdraw
                </Text>
            </Flex>
            <Flex
                bg="rgba(255, 255, 255, 0.2)"
                padding="14px"
                borderRadius="8px"
                mr="12px"
                maxHeight="48px"
                display="flex"
                alignItems="center">

                <Text whiteSpace="nowrap" mr="5px">
                    Add
                </Text>
                <Input maxWidth="100px" mr="5px" onChange={(e) => setAddCommitAmount(e.currentTarget.value)}></Input>
                <Text whiteSpace="nowrap" mr="5px">
                    $Spon
                </Text>
                <Button colorScheme="blue" onClick={handleAddCommit}>OK</Button>
            </Flex>
            <Button
                onClick={handleOpenModal}
                height="50px"
                bg="rgba(255, 255, 255, 0.2)"
                maxHeight="48px"
                _hover={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}>
                <Avatar1/>
                <Text color="white" fontSize="md" fontWeight="medium" pl="12px">
                    {formatAddress(state.address ?? '')}
                </Text>
            </Button></>
    ) : (
        <><Button
            onClick={handleConnectWallet}
            bg="rgba(255, 255, 255, 0.2)"
            maxHeight="48px"
            fontWeight="normal"
            height="50px"
            ml="20px"
            _hover={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}>
            Connect to a wallet
        </Button>

        </>
    );
}
