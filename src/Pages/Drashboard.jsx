import { Box, Flex, Text, Button, Stack, useToast, Spinner } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import TodoInput from '../Components/TodoInput';
import TodoList from '../Components/TodoList';
import { AuthContext } from '../AuthContext';
import axiosInstance from '../axiosInstance';

export default function Dashboard() {
  const toast = useToast();
  const [updateData, setUpdateData] = useState({});
  const [updateChange, setUpdateChange] = useState(false);
  const { accessToken, userId } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`todos/${userId}?page=${currentPage}&limit=5`);
      setData(response.data.todos);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'There was an issue fetching your tasks. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} maxW="6xl" mx="auto" gap={10} mt={10}>
      <Box
        p={5}
        maxW="lg"
        borderRadius="md"
        flex={1}
        bg="white"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        height="fit-content"
      >
        <TodoInput
          updateData={updateData}
          updateChange={updateChange}
          setUpdateChange={setUpdateChange}
          fetchData={fetchData}
        />
      </Box>

      <Box
        p={5}
        bg="gray.50"
        borderRadius="md"
        flex={2}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Your Todo List
        </Text>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" flex={1}>
            <Spinner size="xl" color="blue.500" thickness="4px" />
          </Flex>
        ) : (
          <TodoList
            data={data}
            setUpdateChange={setUpdateChange}
            setUpdateData={setUpdateData}
            fetchData={fetchData}
          />
        )}

        {totalPages > 1 && (
          <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" mt={4}>
            <Button
              onClick={handlePrevPage}
              isDisabled={currentPage === 1 || loading}
              colorScheme="teal"
              variant="outline"
            >
              Previous
            </Button>
            <Text fontWeight="bold" fontSize="lg" color="gray.700">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages || loading}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
}
