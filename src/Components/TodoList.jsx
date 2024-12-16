import { Box, Text, List, ListItem, IconButton, HStack } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../AuthContext';
import axiosInstance from '../axiosInstance';

export default function TodoList({ data, fetchData, setUpdateData, setUpdateChange }) {
  const toast = useToast();

  const deleteData = async (todoId) => {
    setUpdateChange(false);
    setUpdateData({ title: '', description: '', id: '' });
    try {
      await axiosInstance.delete(`todos/${todoId}`);  // axiosInstance already handles token
      toast({
        title: 'Success',
        description: 'Todo deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an issue deleting your task. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const updateInput = (id, title, description) => {
    const newData = { id, title, description };
    setUpdateChange(true);
    setUpdateData(newData);
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" minH="300px">
      {data.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No todos available. Add some!
        </Text>
      ) : (
        <List spacing={4}>
          {data.map((todo) => (
            <ListItem
              key={todo._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={4}
              borderRadius="md"
              bg="gray.100"
              _hover={{ bg: 'gray.200' }}
            >
              <Box>
                <Text fontWeight="bold">{todo.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {todo.description}
                </Text>
              </Box>
              <HStack spacing={4}>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => updateInput(todo._id, todo.title, todo.description)}
                  aria-label="Update Todo"
                  size="sm"
                  variant="outline"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteData(todo._id)}
                  aria-label="Delete Todo"
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
