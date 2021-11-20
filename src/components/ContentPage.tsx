import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

import { ReactComponent as Avatar2 } from 'src/assets/icons/avatar-2.svg';
import { ReactComponent as Avatar3 } from 'src/assets/icons/avatar-3.svg';

const ContentPage = (): JSX.Element => {
  return (
    <Flex justifyContent="space-around" alignItems="center">
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
      <Box
        mt="68px"
        p="36px"
        pt="0"
        height="624px"
        maxHeight="624px"
        width="420px"
        border="1px solid rgba(255, 255, 255, 0.16)"
        borderRadius="16px"
        style={{ background: 'radial-gradient(rgb(108, 112, 163), rgba(23, 9, 60, 0.24))' }}>
        <Heading fontSize="24px" textAlign="center" pt="36px">
          Proposal 1
        </Heading>
        <Text py="24px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat facilisis est neque
          lectus gravida scelerisque velit arcu quisque. Turpis vel fames lacinia ut egestas. Risus,
          dui tincidunt arcu auctor in tellus neque sed nibh. Tellus ultrices a posuere egestas
          vitae. In malesuada malesuada risus ut id. Et senectus consectetur vitae tellus convallis
          dapibus pulvinar diam lectus. Sagittis massa odio leo pellentesque tristique quam aliquam
          viverra risus. Sagittis amet pulvinar massa, eu molestie. Ut blandit aliquet pharetra
          lectus eu. Condimentum elit, sed sodales semper odio pellentesque turpis diam sit. Euismod
          arcu natoque dignissim vitae tellus phasellus. Aliquet at amet ligula libero, eu, enim,
          justo.
        </Text>
        <Flex justifyContent="center">
          <Box
            bg="linear-gradient(rgba(24, 18, 4, 0.24) 0%, rgba(24, 18, 4, 0) 147.16%)"
            borderRadius="12px"
            p="16px"
            maxWidth="96px"
            textAlign="center">
            <Text color="#F7CA5A">Rewards</Text>
            <Text color="#F69400" fontSize="24px">
              21
            </Text>
          </Box>
        </Flex>
      </Box>
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
    </Flex>
  );
};

export default ContentPage;
