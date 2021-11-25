import { Box, Flex, Spacer, Text, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import ConnectButton from './ConnectButton';
import AccountModal from './AccountModal';
import { useEffect, useState } from 'react';
import Dialog from './Dialog';
import Navbar from './Navbar';
import { ProposalDataType } from 'src/constants';
import { getProposal } from 'src/api';
import ContentPage from './ContentPage';
// import axios from 'axios';
import { ReactComponent as ButtonArrowLeft } from 'src/assets/icons/button-arrow-left.svg';
import { ReactComponent as ButtonArrowRight } from 'src/assets/icons/button-arrow-right.svg';
import { ReactComponent as ButtonSpace } from 'src/assets/icons/button-space.svg';

export default function Layout(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog2, onOpen: onOpenDialog2, onClose: onCloseDialog2 } = useDisclosure();

  const [proposalData, setProposalData] = useState<ProposalDataType[]>([]);
  const pagesQuantity = proposalData.length;

  const [isLargerThan414] = useMediaQuery(['(min-width: 414px']);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProposal();
      setProposalData(data);
    };

    fetch();
  }, []);

  const handleNext = () => {
    if (currentPage >= pagesQuantity) return;

    setCurrentPage(currentPage + 1);
  };

  const handleNextForSpacebar = (e: any) => {
    if (currentPage >= pagesQuantity) return;

    const keyCode = window.event ? e.which : e.keyCode;
    if (keyCode === 13) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box bg="#0B0321" color="#fff" w="100%" padding="20px" paddingBottom="58px">
      <Dialog
        isOpen={isOpenDialog2}
        onClose={onCloseDialog2}
        message={
          <>
            <span>You are not connecting to a Metamask account. To know how to do it, </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', fontStyle: 'italic', textDecoration: 'underline' }}
              href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain">
              click here
            </a>
          </>
        }
      />
      <Flex
        justifyContent="space-between"
        p={isLargerThan414 ? '9px' : ''}
        py={!isLargerThan414 ? '23px' : ''}
        px={!isLargerThan414 ? '9px' : ''}
        borderRadius="16px"
        bg="rgba(255, 255, 255, 0.1)"
        overflowX="auto"
        overflowY="hidden">
        <Flex>
          <Navbar />
        </Flex>
        {isLargerThan414 && (
          <Flex alignItems="center">
            <Spacer />
            <ConnectButton handleOpenModal={onOpen} handleOpenDialog2={onOpenDialog2} />
            <AccountModal isOpen={isOpen} onClose={onClose} />
          </Flex>
        )}
      </Flex>
      {!isLargerThan414 && (
        <Flex mt="18px">
          <Spacer />
          <ConnectButton handleOpenModal={onOpen} handleOpenDialog2={onOpenDialog2} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      )}

      <ContentPage proposalData={proposalData} currentPage={currentPage} />

      <Flex justifyContent="center" mt="91px">
        <Box userSelect="none" cursor="pointer">
          <Flex justifyContent="center">
            <ButtonArrowLeft onClick={handlePrevious} />
          </Flex>
          <Text color="rgba(145, 145, 145, 0.8)" fontSize="14px" pt="11px">
            Vote for A
          </Text>
        </Box>
        {isLargerThan414 ? (
          <Box userSelect="none" cursor="pointer" mx="50px" onClick={handleNextForSpacebar}>
            <ButtonSpace />
            <Text color="rgba(145, 145, 145, 0.8)" textAlign="center" fontSize="14px" pt="11px">
              next proposal
            </Text>
          </Box>
        ) : (
          <Box width="50px"></Box>
        )}
        <Box userSelect="none" cursor="pointer">
          <Flex justifyContent="center">
            <ButtonArrowRight onClick={handleNext} />
          </Flex>
          <Text color="rgba(145, 145, 145, 0.8)" fontSize="14px" pt="11px">
            Vote for B
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
