import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";

export default function Navbar(){
    return (
        <Flex w="100%" justifyContent="center">
                <Text color="gray.400" fontWeight='600' textDecoration="underline">
                    JURY Proposal
                </Text>
                <Text color="gray.400" marginLeft="150px" fontWeight='600' textDecoration="underline">
                    Token Migration
                </Text>
                <Text color="gray.400" marginLeft="150px" fontWeight='600' textDecoration="underline">
                    Jury Admin
                </Text>
        </Flex>
    )
}