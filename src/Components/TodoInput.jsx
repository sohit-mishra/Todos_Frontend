import { Box, VStack, Heading, Input, Button, useToast } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axiosInstance from '../axiosInstance';

export default function TodoInput({ updateData = {}, updateChange, setUpdateChange, fetchData }) {
  const toast = useToast();
  const { userId } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (updateChange && updateData) {
      setTitle(updateData.title || '');
      setDescription(updateData.description || '');
    }
  }, [updateData, updateChange]);

  const handleAddData = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast({
        title: 'Missing Fields',
        description: 'Please provide both title and description for the task.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/todos', {
        title,
        description,
        userId,
      });
      toast({
        title: 'Task Added',
        description: 'Your task has been added successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTitle('');
      setDescription('');
      fetchData();
    } catch (error) {
      toast({
        title: 'Error Adding Task',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateData = async (e, id) => {
    e.preventDefault();
    if (!title || !description) {
      toast({
        title: 'Missing Fields',
        description: 'Please provide both title and description for the task.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.patch(`/todos/${id}`, {
        title,
        description,
      });
      toast({
        title: 'Task Updated',
        description: 'Your task has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setUpdateChange(false);
      setTitle('');
      setDescription('');
      fetchData();
    } catch (error) {
      toast({
        title: 'Error Updating Task',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5} bg="gray.50" boxShadow="0px 0px 6px rgba(255, 0, 0, 0.3)" borderRadius="md" maxW="lg" mx="auto" mt={20}>
      <form onSubmit={(e) => (updateChange ? handleUpdateData(e, updateData.id) : handleAddData(e))}>
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" size="lg">
            {updateChange ? 'Update Todo' : 'Add Todo'}
          </Heading>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" size="lg" isRequired />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            size="lg"
            isRequired
          />
          <Button colorScheme="blue" type="submit" isLoading={loading} loadingText={updateChange ? 'Updating' : 'Adding'}>
            {updateChange ? 'Update Todo' : 'Add Todo'}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
