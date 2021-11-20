/* eslint-disable react/prop-types */
import { Box, Flex, Heading, Text, useMediaQuery, Button } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as Avatar2 } from 'src/assets/icons/avatar-2.svg';
import { ReactComponent as Avatar3 } from 'src/assets/icons/avatar-3.svg';
import { ProposalDataType } from 'src/constants';

interface ContentPageProps {
  proposalData: ProposalDataType[];
  currentPage: number;
}

const ContentPage: React.FC<ContentPageProps> = ({ proposalData, currentPage }) => {
  const [isLargerThan414] = useMediaQuery(['(min-width: 414px']);

  const renderProposalDescription = () => {
    if (currentPage === 0) return proposalData[0].description;
    if (currentPage === proposalData.length)
      return proposalData[proposalData.length - 1].description;
    return proposalData.length > 0 && proposalData[currentPage - 1].description;
  };

  const renderProposalReward = () => {
    if (currentPage === 0) return proposalData[0].rewardPercent;
    if (currentPage === proposalData.length)
      return proposalData[proposalData.length - 1].rewardPercent;
    return proposalData.length > 0 && proposalData[currentPage - 1].rewardPercent;
  };

  return (
    <Flex justifyContent="space-around" alignItems="center">
      {isLargerThan414 && (
        <Box>
          <Avatar2 />
          <Text textAlign="center" pt="24px" pb="18px">
            Party A
          </Text>
          <Flex justifyContent="center">
            <Button color="#1A212B" fontSize="14px">
              Vote for A
            </Button>
          </Flex>
        </Box>
      )}
      <Box
        mt="68px"
        p="36px"
        pt="0"
        minHeight="624px"
        width="420px"
        border="1px solid rgba(255, 255, 255, 0.16)"
        borderRadius="16px"
        style={{ background: 'radial-gradient(rgb(108, 112, 163), rgba(23, 9, 60, 0.24))' }}>
        <Heading fontSize="24px" textAlign="center" pt="36px">
          Proposal 1
        </Heading>
        <Text py="24px">{renderProposalDescription()}</Text>
        <Flex justifyContent="center">
          <Box
            bg="linear-gradient(rgba(24, 18, 4, 0.24) 0%, rgba(24, 18, 4, 0) 147.16%)"
            borderRadius="12px"
            p="16px"
            maxWidth="96px"
            textAlign="center">
            <Text color="#F7CA5A">Rewards</Text>
            <Text color="#F69400" fontSize="24px">
              {renderProposalReward()}
            </Text>
          </Box>
        </Flex>
      </Box>
      {isLargerThan414 && (
        <Box>
          <Avatar3 />
          <Text textAlign="center" pt="24px" pb="18px">
            Party B
          </Text>
          <Flex justifyContent="center">
            <Button color="#1A212B" fontSize="14px">
              Vote for B
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default ContentPage;
