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
  import { useContext, useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { AuthContext } from '../AuthContext';
  
  export default function Login() {
    const { setAccessToken, setRefreshToken, Authentication, Username } = useContext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!email || !password) {
        toast({
          title: 'Error',
          description: 'Email and password are required.',
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
        const URL = `${import.meta.env.VITE_API_URL}login`;
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
  
        const data = await response.json();
        toast({
          title: 'Login successful!',
          description: 'Welcome back!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
  
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('Authorizate', true);
        localStorage.setItem('UserId', data.userId);
        Username(data.userId);
        Authentication(true);
        navigate('/drashboard');
      } catch (error) {
        setEmail('');
        setPassword('');
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
                  Login
                </Heading>
  
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
                  Login
                </Button>
              </FormControl>
            </form>
  
            <Text mt={4} textAlign="center" fontSize="sm">
              <Link to="/signup" style={{ color: '#3182ce', textDecoration: 'underline' }}>
                Don't have an account? Sign Up
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
  