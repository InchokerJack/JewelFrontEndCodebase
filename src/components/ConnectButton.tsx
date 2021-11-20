import { Button, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { actionType, StoreContext } from '../App';
import { formatAddress } from 'src/helpers';
import { ReactComponent as Avatar1 } from 'src/assets/icons/avatar-1.svg';

type Props = {
  handleOpenModal: any;
  handleOpenDialog2: any;
};

export default function ConnectButton({ handleOpenModal, handleOpenDialog2 }: Props): JSX.Element {
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
    <Button
      onClick={handleOpenModal}
      height="50px"
      bg="rgba(255, 255, 255, 0.2)"
      maxHeight="48px"
      _hover={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}>
      <Avatar1 />
      <Text color="white" fontSize="md" fontWeight="medium" pl="12px">
        {formatAddress(state.address ?? '')}
      </Text>
    </Button>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="rgba(255, 255, 255, 0.2)"
      maxHeight="48px"
      fontWeight="normal"
      height="50px"
      _hover={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }}>
      Connect to a wallet
    </Button>
  );
}
