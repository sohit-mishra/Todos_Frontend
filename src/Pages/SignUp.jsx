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
  import { Link, useNavigate } from 'react-router-dom';
  
  export default function SignUp() {
    const toast = useToast();
    const navigate = useNavigate();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!email || !password) {
        toast({
          title: 'Error',
          description:'Name, Email, and Password are required.',
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
        const URL = `${import.meta.env.VITE_API_URL}signup`;
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'SignUp failed');
        }
  
        const data = await response.json();
        toast({
          title: 'Sign Up successful!',
          description: 'Welcome! Please log in to continue.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } catch (error) {
        setName('');
        setEmail('');
        setPassword('');
        toast({
          title: 'Error',
          description: 'User Already Exist',
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
                  Sign Up
                </Heading>
  
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
  
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
  
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
  
            <Text mt={4} textAlign="center" fontSize="sm">
              <Link to="/login" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                Already have an account? Log In
              </Link>
            </Text>
  
            <Text mt={2} textAlign="center" fontSize="sm">
              <Link to="/forgotPassword" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                Forgot Password?
              </Link>
            </Text>
          </CardBody>
        </Card>
      </Flex>
    );
  }
  