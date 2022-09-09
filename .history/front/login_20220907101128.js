const ENDPOINT = "http://localhost:3000";
const validaLogin = () => {
    
    axios.get(`${ENDPOINT}/users`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                
                const user = document.querySelector('#userLogin');
                const userLogin = user.value;
                
                const password = document.querySelector('#passwordLogin');
                const passwordLogin = password.value;

                let validation = false;
                for (let i = 0; i < data.length; i++) {
                    if (userLogin === data[i].email && passwordLogin === data[i].password) {
                        validation = true;
                    }
                }

                if (validation === true) {
                   
                    window.location.href = "index.html";
                    
                } else {
                    alert('User or password invalid. Please check and try again!')
                }
                console.log(data)
            }
        })
};