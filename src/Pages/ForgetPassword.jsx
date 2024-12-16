import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Card,
    CardBody,
    Heading,
    Flex,
    Text,
    useToast
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  export default function ForgotPassword() {
    const toast = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!email) {
        toast({
          title: 'Error',
          description: 'Email is required.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: 'Error',
          description: 'Please enter a valid email address.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
  
      try {
        const URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/'}api/forgot-password`;
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Password reset request failed');
        }
  
        const data = await response.json();
        toast({
          title: 'Password Reset Request Successful!',
          description: 'Please check your email for further instructions.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
  
        setEmail('');
        navigate('/login');
      } catch (error) {
        setEmail('');
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Flex height="80vh" justify="center" align="center" p={4}>
        <Card maxW="sm" boxShadow="0px 0px 1px 2px #dddd">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Heading textAlign="center" mb={5}>
                  Forgot Password
                </Heading>
  
                <Text mt={2} textAlign="left" mb={5}>
                  Enter your email address, and we will send you instructions to reset your password.
                </Text>
  
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
  
                <Button
                  colorScheme="blue"
                  mt={4}
                  w="100%"
                  type="submit"
                  isLoading={loading}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  