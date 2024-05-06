"use client"
import useSWR from 'swr';
import { User } from '../interfaces';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';

const UserList = () => {
  
const fetcher = async (url: string, userId: number[]) => {
  const response = await fetch(`${url}?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const [unmaskedIds, setUnmaskedIds] = useState<number[]>([]);

const toggleUnmask = (id: number) => {
  if (unmaskedIds.includes(id)) {
    setUnmaskedIds(unmaskedIds.filter((item) => item !== id));
  } else {
    setUnmaskedIds([...unmaskedIds, id]);
  }
};
  const { data: users = [], error} = useSWR<User[]>(['/api/users', unmaskedIds], fetcher);

  if (error) {
    return <Box>Error fetching users: {error.message}</Box>;
  }

  if (!users) {
    return <Box>Loading...</Box>;
  }

  // Check if users is an array before mapping over it
  if (!Array.isArray(users)) {
    return <Box>No users found</Box>;
  }

  return (
    <Box display="flex" minHeight="100%" mt={6} px={2} py={2} flex={1} alignItems="center" justifyContent="center" flexDirection="column">
      
    <Typography variant="h4" component="h1" gutterBottom>
      User List
    </Typography>

    <TableContainer component={Paper}>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">First Name</TableCell>
          <TableCell align="center">Last Name</TableCell>
          <TableCell align="center">Avatar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users?.map((user) => (
          <TableRow
           key={user.id}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {user.id}
            </TableCell>
            <TableCell align="center">
              {user.email} 
              <IconButton aria-label="toggle email visibility" onClick={() => toggleUnmask(user.id)}>
                {unmaskedIds.includes(user.id) ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </TableCell>
            <TableCell align="center">{user.first_name}</TableCell>
            <TableCell align="center">{user.last_name}</TableCell>
            <TableCell align="center"><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>

  </Box>
  );
};

export default UserList;
