import React from 'react';
import axios from 'axios';

const instance =  axios.create({ 
    baseURL:"https://react-burgerbuilder-64aa6-default-rtdb.firebaseio.com/"
})

export default instance;