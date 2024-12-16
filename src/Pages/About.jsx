import { Box, Text, Grid, Image } from '@chakra-ui/react';
import about from '../assets/about.svg';

export default function About() {
  return (
    <Box w="100%" p={[4, 6, 8]} bg="gray.50">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={6}
        alignItems="center"
      >
        <Box p={[4, 6, 8]}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Welcome to Our Company
          </Text>
          <Text fontSize="lg" color="gray.600">
            We are dedicated to providing the best services and products to our customers. Our mission is to innovate and deliver high-quality solutions that meet the unique needs of our clients.
          </Text>
        </Box>

        <Box>
          <Image
            src={about}
            alt="Company Image"
            p={[4, 6, 8]}
            w="100%"
            h="auto"
          />
        </Box>
      </Grid>
    </Box>
  );
}
