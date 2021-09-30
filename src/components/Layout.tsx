import {Box, Flex, Heading, Spacer, useDisclosure, RadioGroup, Stack, Radio, Button, Input} from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import AccountModal from "./AccountModal";
import React, {useState} from 'react'

export default function Layout() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [radioCheck, setRadioCheck] = useState('radio-1')
    return (
        <Box bg="gray.800" h="100vh" w="100%">
            <Flex>
                <Spacer/>
                <ConnectButton handleOpenModal={onOpen}/>
                <AccountModal isOpen={isOpen} onClose={onClose}/>
            </Flex>
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
                            JURY scenario
                        </Heading>
                <Box h="15px"></Box>
            <Box h="150px" w="100%" border="1px" borderColor="gray.400"  borderRadius="25" textColor="gray.400" p="15px">
                <Box w="100%" overflowY="scroll" maxHeight="100px">
                    Lorem Ipsum is simply
                    dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry `&apos;`s
                    standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                    type
                    specimen book. It has survived not only five centuries, but also the leap into electronic
                    typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker
                    including versions of Lorem Ipsum.
                </Box>
            </Box>
            </Box>
            <Box h="20px" w="100%"></Box>
            <Box w="30%" m="auto">
                <Heading color="gray.400" fontSize="20px">
                    Options
                </Heading>
                <Box h="15px" w="100%"></Box>
                <RadioGroup onChange={setRadioCheck} value={radioCheck}>
                    <Stack direction="column">
                        <Radio value="radio-1"><Box color="gray.400">First</Box></Radio>
                        <Radio value="radio-2"><Box color="gray.400">Second</Box></Radio>
                        <Radio value="radio-3" ><Box color="gray.400">Third</Box></Radio>
                    </Stack>
                </RadioGroup>
                <Box h="30px" w="100%"></Box>
                <Flex w="100%" m="auto">
                    <Flex color="gray.400" alignItems="center" w="50%">
                        <Spacer/>
                        Reward
                    </Flex>
                    <Box w="50%">
                        <Input placeholder="0" w="200px" ml="50px" color="gray.400"/>
                    </Box>
                </Flex>
                <Box h="30px" w="100%"></Box>
                <Flex w="100%" justifyContent="center">
                <Button>Vote</Button>
                </Flex>
                <Box h="30px" w="100%"></Box>
                <Flex w="100%" m="auto">
                    <Flex color="gray.400" alignItems="center">
                        Commit balance
                    </Flex>
                        <Input placeholder="0" w="200px" ml="50px" color="gray.400"/>
                </Flex>
            </Box>
        </Box>
    );
}
