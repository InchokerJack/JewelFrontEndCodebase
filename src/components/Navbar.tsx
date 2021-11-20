import { Flex, Text, Divider, Box, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

export default function Navbar(): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);

  const [isLargerThan414] = useMediaQuery(['(min-width: 414px']);

  const renderTabIndicator = (tabIndex: number) => {
    type PositionStatus = 'top' | 'left' | 'width';
    const initialPosition: Record<PositionStatus, string> = {
      top: '52.5px',
      left: '129px',
      width: '103px',
    };

    let position = Object.assign({}, initialPosition);

    if (tabIndex === 0) {
      position = { ...initialPosition };
    } else if (tabIndex === 1) {
      position = {
        ...initialPosition,
        left: '301px',
        width: '113px',
      };
    } else {
      position = {
        ...initialPosition,
        left: '478px',
        width: '85px',
      };
    }
    return (
      <Box
        userSelect="none"
        position="absolute"
        height="4px"
        bg="#fafafa"
        borderTopLeftRadius="5px"
        borderTopRightRadius="5px"
        width={position.width}
        top={position.top}
        left={position.left}
        transition="ease 0.4s"></Box>
    );
  };

  return (
    <Flex alignItems="center" position="relative">
      {renderTabIndicator(tabIndex)}
      <Text
        pr="32px"
        fontWeight="500"
        fontSize="24px"
        pl="15px"
        style={{ cursor: 'pointer' }}
        userSelect="none">
        Jury
      </Text>
      <Divider
        orientation="vertical"
        color="rgba(255, 255, 255, 0.3)"
        opacity="0.4"
        height="14.5px"
      />
      <Text
        fontWeight="500"
        px="32px"
        onClick={() => setTabIndex(0)}
        userSelect="none"
        whiteSpace="nowrap"
        style={{ cursor: 'pointer' }}
        _hover={{
          color: '#dddbdb',
        }}>
        JURY Proposal
      </Text>
      <Divider
        orientation="vertical"
        color="rgba(255, 255, 255, 0.3)"
        opacity="0.4"
        height="14.5px"
      />
      <Text
        fontWeight="500"
        px="32px"
        onClick={() => setTabIndex(1)}
        userSelect="none"
        whiteSpace="nowrap"
        style={{ cursor: 'pointer' }}
        _hover={{
          color: '#dddbdb',
        }}>
        Token Migration
      </Text>
      <Divider
        orientation="vertical"
        color="rgba(255, 255, 255, 0.3)"
        opacity="0.4"
        height="14.5px"
      />
      <Text
        fontWeight="500"
        pl="32px"
        pr={!isLargerThan414 ? '9px' : ''}
        onClick={() => setTabIndex(2)}
        userSelect="none"
        whiteSpace="nowrap"
        style={{ cursor: 'pointer' }}
        _hover={{
          color: '#dddbdb',
        }}>
        Jury Admin
      </Text>
    </Flex>
  );
}
