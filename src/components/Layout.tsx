import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ConnectButton from './ConnectButton';
import AccountModal from './AccountModal';
import React, { useEffect, useRef, useState } from 'react';
import Dialog from './Dialog';
import Navbar from './Navbar';
import { Container, Next, Paginator, Previous, usePaginator } from 'chakra-paginator';
import { MainMenu } from './MainMenu';
import { ProposalDataType } from 'src/constants';
import { getProposal } from 'src/api';
// import axios from 'axios';

export default function Layout(): JSX.Element {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog2, onOpen: onOpenDialog2, onClose: onCloseDialog2 } = useDisclosure();
  const { isOpen: isOpenDialog3, onOpen: onOpenDialog3, onClose: onCloseDialog3 } = useDisclosure();
  const [radioCheck, setRadioCheck] = useState('radio-1');
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

  const renderProposalOptions = () => {
    return (
      proposalData.length > 0 &&
      proposalData[currentPage - 1].options.map((option: string, index: number) => (
        <>
          <Radio value={`radio-${index}`}>
            <Box color="gray.400">{option}</Box>
          </Radio>
        </>
      ))
    );
  };

  return (
    <Box bg="gray.800" minHeight="100vh" w="100%">
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
      <Flex>
        <Spacer />
        <Flex color="gray.400" alignItems="center" fontWeight="600">
          Commit balance
        </Flex>
        <Input readOnly={true} placeholder="0" w="200px" ml="20px" color="gray.400" />
        <MainMenu handleOpenInput={onOpenDialog3} />
        <ConnectButton handleOpenModal={onOpen} handleOpenDialog2={onOpenDialog2} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      {isOpenDialog3 ? (
        <>
          <Box h="10px" w="100%"></Box>
          <Flex>
            <Spacer />
            <Flex color="gray.400" alignItems="center" fontWeight="600">
              Please input the commitb balance you want
            </Flex>
            <Input placeholder="0" w="200px" ml="20px" color="gray.400" />
            <Button colorScheme="blue">Enter</Button>
            <Button onClick={onCloseDialog3} colorScheme="red">
              Close
            </Button>
          </Flex>
          <Box h="10px" w="100%"></Box>
        </>
      ) : null}
      <Navbar />
      <Box h="100px" w="100%"></Box>
      <Flex w="100%" justifyContent="center">
        <Box>
          <Heading color="gray.400" size="2xl" margin="auto">
            JURY Webpage
          </Heading>
        </Box>
      </Flex>
      <Box h="30px"></Box>
      <Box w="50%" m="auto">
        <Heading color="gray.400" fontSize="30px">
          Proposal
        </Heading>
        <Box h="15px"></Box>
        <Box
          h="150px"
          w="100%"
          border="1px"
          borderColor="gray.400"
          borderRadius="25"
          textColor="gray.400"
          p="15px">
          <Box
            ref={textareaRef}
            w="100%"
            overflowY={isScroll ? 'scroll' : 'hidden'}
            maxHeight="100px">
            {renderProposalDescription()}
          </Box>
        </Box>
      </Box>
      <Box h="20px" w="100%"></Box>

      <Box w="30%" m="auto">
        <Box>
          <Spacer />
          {/*pagination*/}
          <Paginator
            pagesQuantity={pagesQuantity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}>
            <Container align="center" justify="center" w="full" p={4}>
              <Previous>
                Previous
                {/* Or an icon from `react-icons` */}
              </Previous>
              <Text color="gray.400">{`${currentPage}/${pagesQuantity}`}</Text>
              <Next>
                Next
                {/* Or an icon from `react-icons` */}
              </Next>
            </Container>
          </Paginator>
        </Box>
        <Heading color="gray.400" fontSize="20px">
          Options
        </Heading>
        <Box h="15px" w="100%"></Box>
        <RadioGroup onChange={setRadioCheck} value={radioCheck}>
          <Stack direction="column">{renderProposalOptions()}</Stack>
        </RadioGroup>
        <Box h="30px" w="100%"></Box>
        <Flex w="100%" m="auto">
          <Flex color="gray.400" alignItems="center" w="50%">
            <Spacer />
            Reward
          </Flex>
          <Box w="50%">
            <Input
              value={proposalData.length > 0 ? proposalData[currentPage - 1].rewardPercent : ''}
              w="200px"
              ml="50px"
              color="gray.400"
              readOnly
            />
          </Box>
        </Flex>
        <Box h="30px" w="100%"></Box>
        <Flex w="100%" justifyContent="center">
          <Button>Vote</Button>
        </Flex>
        <Box h="30px" w="100%"></Box>
      </Box>
    </Box>
  );
}
