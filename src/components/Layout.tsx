import { Box, Flex, Heading, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import ConnectButton from './ConnectButton';
import AccountModal from './AccountModal';
import { useEffect, useRef, useState } from 'react';
import Dialog from './Dialog';
import Navbar from './Navbar';
import { Container, Next, Paginator, Previous, usePaginator } from 'chakra-paginator';
import { ProposalDataType } from 'src/constants';
import { getProposal } from 'src/api';
import ContentPage from './ContentPage';
// import axios from 'axios';
import { ReactComponent as ButtonArrowLeft } from 'src/assets/icons/button-arrow-left.svg';
import { ReactComponent as ButtonArrowRight } from 'src/assets/icons/button-arrow-right.svg';
import { ReactComponent as ButtonSpace } from 'src/assets/icons/button-space.svg';

export default function Layout(): JSX.Element {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog2, onOpen: onOpenDialog2, onClose: onCloseDialog2 } = useDisclosure();
  const [isScroll, setIsScroll] = useState(false);

  const [proposalData, setProposalData] = useState<ProposalDataType[]>([]);
  const pagesQuantity = proposalData.length;

  const textareaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      setIsScroll(textareaRef.current.scrollHeight > 100);
    }
  }, [currentPage]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getProposal();
      console.log(data);
      setProposalData(data);
    };

    fetch();
  }, []);

  const renderProposalDescription = () => {
    return proposalData.length > 0 && proposalData[currentPage - 1].description;
  };

  return (
    <Box bg="#0B0321" color="#fff" minHeight="100vh" w="100%" padding="20px" paddingBottom="58px">
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
        p="9px"
        borderRadius="16px"
        bg="rgba(255, 255, 255, 0.1)">
        <Flex>
          <Navbar />
        </Flex>
        <Flex alignItems="center">
          <Spacer />
          <Flex
            bg="rgba(255, 255, 255, 0.2)"
            padding="14px"
            borderRadius="8px"
            mr="12px"
            maxHeight="48px">
            <Text pr="12px">Commit Balance</Text>
            <Text fontWeight="700">356</Text>
          </Flex>
          <ConnectButton handleOpenModal={onOpen} handleOpenDialog2={onOpenDialog2} />
          <AccountModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Flex>

      <ContentPage />

      <Flex justifyContent="center" mt="91px">
        <Box userSelect="none" cursor="pointer">
          <Flex justifyContent="center">
            <ButtonArrowLeft />
          </Flex>
          <Text color="rgba(145, 145, 145, 0.8)" fontSize="14px" pt="11px">
            Vote for A
          </Text>
        </Box>
        <Box userSelect="none" cursor="pointer" mx="50px">
          <ButtonSpace />
          <Text color="rgba(145, 145, 145, 0.8)" textAlign="center" fontSize="14px" pt="11px">
            next proposal
          </Text>
        </Box>
        <Box userSelect="none" cursor="pointer">
          <Flex justifyContent="center">
            <ButtonArrowRight />
          </Flex>
          <Text color="rgba(145, 145, 145, 0.8)" fontSize="14px" pt="11px">
            Vote for B
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
