import React from 'react';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
 
const Error = ({error}) => {
    return (
        <div>
            <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  {error}
</Alert>
        </div>
    );
};
 
export default Error;


