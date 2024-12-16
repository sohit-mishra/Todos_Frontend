import { Box, Text, Link, HStack, VStack, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

export default function Footer() {
  return (
    <Box
      w="100%"
      bg="gray.800"
      color="white"
      py={6}
      mt={10}
      textAlign="center"
      borderTop="1px solid #ddd"
    >
      <VStack spacing={4}>
        <Text>&copy; {new Date().getFullYear()} Todo. All rights reserved.</Text>
        
        <HStack spacing={6}>
          <Link href="/" color="white">Home</Link>
          <Link href="/about" color="white">About</Link>
          <Link href="/contact" color="white">Contact Us</Link>
        </HStack>
        
        <HStack spacing={6}>
          <IconButton
            as={Link}
            href="https://www.facebook.com/profile.php?id=61557136494370"
            icon={<FaFacebook />}
            aria-label="Facebook"
            colorScheme="facebook"
          />
          <IconButton
            as={Link}
            href="https://x.com/sohitmishradev/"
            icon={<FaTwitter />}
            aria-label="Twitter"
            colorScheme="twitter"
          />
          <IconButton
            as={Link}
            href="https://www.instagram.com/sohitmishradev/"
            icon={<FaInstagram />}
            aria-label="Instagram"
            colorScheme="instagram"
          />
          <IconButton
            as={Link}
            href="https://www.linkedin.com/in/sohitmishra/"
            icon={<FaLinkedin />}
            aria-label="LinkedIn"
            colorScheme="linkedin"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
