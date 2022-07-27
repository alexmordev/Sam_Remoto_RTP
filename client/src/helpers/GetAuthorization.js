import axios from 'axios';

export const getAuthorization = (user, passUser) => {


  const url = `${process.env.REACT_APP_DOMINIO}/api/login`;

  const fetchData = async() => {

    try {
      const { data } = await axios.post(
        url,
        {
          "email": user,
          "password": passUser
        }
      );
      localStorage.setItem('token', JSON.stringify(data.token));
      
    } catch (error) {
      console.log('Algo salio mal');
      
    }
  }
  fetchData();
}



