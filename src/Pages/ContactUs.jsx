import { Box, Text, Input, Textarea, Button, Grid, FormControl, FormLabel, useToast, Image, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'; 
import Contact from '../assets/Contact.svg';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Please fill in all fields.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const URL = `${import.meta.env.VITE_API_URL}message`; 
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast({
          title: 'Message sent successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Something went wrong, please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

  
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={[4, 6, 8]}
    >
      <Box w="80%" maxW="1200px">
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
          Contact Us
        </Text>

        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={6}
          alignItems="center"
        >
          <Box>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl id="email" isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl id="message" isRequired mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                size="sm"
                rows={5}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              mt={6}
              w="full"
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </Box>

          <Box display={{ base: 'none', md: 'block' }}>
            <Image
              src={Contact}
              alt="Contact Us illustration"
            />
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
}
