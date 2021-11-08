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
import React, { useState } from 'react';
import Dialog from './Dialog';
import Navbar from './Navbar';
import { Container, Next, Paginator, Previous, usePaginator } from 'chakra-paginator';
import { MainMenu } from './MainMenu';

export default function Layout() {
  const pagesQuantity = 12;
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDialog2, onOpen: onOpenDialog2, onClose: onCloseDialog2 } = useDisclosure();
  const { isOpen: isOpenDialog3, onOpen: onOpenDialog3, onClose: onCloseDialog3 } = useDisclosure();
  const [radioCheck, setRadioCheck] = useState('radio-1');
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
          <Box w="100%" overflowY="scroll" maxHeight="100px">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry `&apos;`s standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book. It
            has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
          <Stack direction="column">
            <Radio value="radio-1">
              <Box color="gray.400">First</Box>
            </Radio>
            <Radio value="radio-2">
              <Box color="gray.400">Second</Box>
            </Radio>
          </Stack>
        </RadioGroup>
        <Box h="30px" w="100%"></Box>
        <Flex w="100%" m="auto">
          <Flex color="gray.400" alignItems="center" w="50%">
            <Spacer />
            Reward
          </Flex>
          <Box w="50%">
            <Input placeholder="0" w="200px" ml="50px" color="gray.400" />
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
