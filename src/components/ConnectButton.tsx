import { Box, Button, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { actionType, StoreContext } from '../App';

type Props = {
  handleOpenModal: any;
  handleOpenDialog2: any;
};

export default function ConnectButton({ handleOpenModal, handleOpenDialog2 }: Props) {
  const { state, dispatch } = useContext(StoreContext);
  const [login, setLogin] = useState(false);

  async function handleConnectWallet() {
    const provider = await detectEthereumProvider();
    if (!provider) {
      handleOpenDialog2();
      return;
    }
    const walletAddress = await (provider as any).request({ method: 'eth_requestAccounts' });
    dispatch({ type: actionType.NEW_ADDRESS, address: walletAddress });
    setLogin(true);
    // const networkId = await (provider as any).request({method: 'net_version'})
    // if (networkId != 97) {
    //     throw new Error('Please connect to BSC testnet')
    // }
    // provider = new ethers.providers.Web3Provider((provider as any));
    // const signer = (provider as any).getSigner();
    // const token_migration = new Contract(
    //     (tokenMigration as any).networks[networkId].address,
    //     tokenMigration.abi,
    //     signer
    // );
  }

  return login ? (
    <Box display="flex" alignItems="center" background="gray.700" borderRadius="xl" py="0">
      <Box px="3">
        <Text color="white" fontSize="md">
          WALLET
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'blue.400',
          backgroundColor: 'gray.700',
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px">
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {state.address}
        </Text>
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: 'blue.700',
        color: 'blue.400',
      }}
      _active={{
        backgroundColor: 'blue.800',
        borderColor: 'blue.700',
      }}>
      Connect to a wallet
    </Button>
  );
}
