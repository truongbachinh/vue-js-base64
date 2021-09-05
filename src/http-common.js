import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8888/Chinh_Intern_war_exploded',
    headers:{
        Accept: 'application/json',
        "Content-Type":"multipart/form-data"
    }
})