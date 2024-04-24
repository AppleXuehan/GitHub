import React, { useEffect, useState } from "react";
import { Box, IconButton, Input, InputAdornment, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useAppDispatch, useAppSelector } from "../api/store/store";
import { fetchUsers } from "../api/store/features/userSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  
  useEffect(() => {
    if(users.length === 0)
      dispatch(fetchUsers());
  }),[dispatch, users];

  const [showEmail, setShowEmail] = useState<number[]>([]);

  const toggleShow = (id:number) => {
    if (showEmail.includes(id)) {
      setShowEmail(showEmail.filter(item => item !== id));
    } else {
      setShowEmail([...showEmail, id]);
    }
  };
  
  return (
    <Box display="flex" minHeight="100vh" px={2} py={2} flex={1} alignItems="center" justifyContent="center" flexDirection="column">
      
    <Typography variant="h4" component="h1" gutterBottom>
      User List
    </Typography>

    <TableContainer component={Paper}>
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
              <Input
                type={showEmail.includes(user.id) ? 'text' : 'password'}
                value={user.email}
                readOnly
                disableUnderline // Disable input underline
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShow(user.id)}
                    >
                      {showEmail.includes(user.id) ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />  
            </TableCell>
            <TableCell align="center">{user.first_name}</TableCell>
            <TableCell align="center">{user.last_name}</TableCell>
            <TableCell align="center"><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>

  </Box>
  );
};

export default UserList;
