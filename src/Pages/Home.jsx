import React from 'react';
import { Box, Flex, Text, Button, VStack, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';  
import PNG from '../assets/Home.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box bg="gray.50" py={{ base: 20, md: 40 }} px={5}>
      <Flex
        direction={{ base: 'column', md: 'row' }} 
        align="center" 
        justify="space-between"
        maxW="6xl"
        mx="auto"
        gap={{ base: 8, md: 10 }}
      >
    
        <Flex
          direction="column"
          align={{ base: 'center', md: 'flex-start' }} 
          textAlign={{ base: 'center', md: 'left' }}   
          flex={{ base: 1, md: 0.6 }}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Organize your work and life, finally.
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Simplify life for both you and your team with the world's #1 task manager and to-do list app.
          </Text>

          <Text fontSize="lg" color="gray.700" fontWeight="bold" mb={8}>
            374K+ ★★★★★ reviews from
          </Text>

          <VStack spacing={4} align="center">  
            <Button colorScheme="blue" size="lg" onClick={() => navigate('/login')}>
              Start for Free
            </Button>
          </VStack>
        </Flex>

        <Flex flex={1} justify={{ base: 'center', md: 'flex-end' }}> 
          <Image
            src={PNG}
            alt="Image of happy people working"
            objectFit="cover"
            borderRadius="md"
            boxSize="full"
            maxH={{ base: '300px', md: '450px' }} 
            paddingTop={10}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
