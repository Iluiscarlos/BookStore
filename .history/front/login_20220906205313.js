function validaLogin() {

    const ENDPOINT = "http://localhost:3000";
    const getUser = (email) => {
    
    axios.get(`${ENDPOINT}/users/` + email)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                        const dados = data[i];
                }
                console.log(dados);
            }
        });
    }
}

validaLogin();