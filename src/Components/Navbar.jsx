import { Box, Text, Button, ButtonGroup, Flex, Image, useToast, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Stack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const { setAccessToken, setRefreshToken, isAuthentication , Authentication } = useContext(AuthContext);
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const logout = () => {
        try {
            setAccessToken(null);
            setRefreshToken(null);
            Authentication(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
            toast({
                title: 'Logged out successfully.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error logging out.',
                description: 'Please try again.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box 
            p={{ base: 0, md: 4 }}
            w={'100%'} 
            borderBottom={'1px solid #ddd'} 
            zIndex={10} 
            position="sticky" 
            top={0} 
            bg="white"
        >
            <Flex 
                justify="space-between" 
                align="center" 
                w={'98%'} 
                m={'0 1%'} 
                textAlign={{ base: 'center', md: 'left' }}
            >
                <Box mb={{ base: 4, md: 0 }}>
                    <Link to="/">
                        <Image src="/logo.svg" alt="Logo" />
                    </Link>
                </Box>

                {/* Hamburger Icon for Mobile Screens */}
                <IconButton
                    aria-label="Open Menu"
                    icon={<HamburgerIcon />}
                    display={{ base: 'block', md: 'none' }}
                    onClick={onOpen}
                    variant="ghost"
                    fontSize="24px"
                />

                {/* Desktop Navigation Links */}
                <Flex 
                    direction={{ base: 'column', md: 'row' }} 
                    alignItems={{ base: 'center', md: 'flex-start' }} 
                    width="100%" 
                    justify="center" 
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Link to={'/'}><Text paddingRight={5} mb={{ base: 2, md: 0 }}>Home</Text></Link>
                    {isAuthentication && (
                        <Link to={'/drashboard'}><Text paddingRight={5} mb={{ base: 2, md: 0 }}>Dashboard</Text></Link>
                    )}

                    <Link to={'/about'}><Text paddingRight={5} mb={{ base: 2, md: 0 }}>About</Text></Link>
                    <Link to={'/contactus'}><Text paddingRight={5} mb={{ base: 2, md: 0 }}>Contact Us</Text></Link>
                </Flex>

                {/* Logout/Authentication Buttons */}
                <ButtonGroup gap="4" alignItems="center" display={{ base: 'none', md: 'flex' }}>
                    {isAuthentication ? (
                        <Button colorScheme="red" onClick={logout}>Logout</Button>
                    ) : (
                        <>
                            <Button colorScheme="red" onClick={() => navigate('/login')}>Login</Button>
                            <Button colorScheme="blackAlpha" onClick={() => navigate('/signup')}>Sign Up</Button>
                        </>
                    )}
                </ButtonGroup>
            </Flex>

            {/* Drawer for Mobile View */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Todo</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={4}>
                            <Link to={'/'}><Text onClick={onClose}>Home</Text></Link>
                            {isAuthentication && (
                                <Link to={'/drashboard'}><Text onClick={onClose}>Dashboard</Text></Link>
                            )}
                            <Link to={'/about'}><Text onClick={onClose}>About</Text></Link>
                            <Link to={'/contactus'}><Text onClick={onClose}>Contact Us</Text></Link>

                            {isAuthentication ? (
                                <Button colorScheme="red" onClick={logout} w="full">Logout</Button>
                            ) : (
                                <>
                                    <Button colorScheme="red" onClick={() => navigate('/login')} w="full">Login</Button>
                                    <Button colorScheme="blackAlpha" onClick={() => navigate('/signup')} w="full">Sign Up</Button>
                                </>
                            )}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
