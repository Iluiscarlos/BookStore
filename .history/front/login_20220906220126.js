const ENDPOINT = "http://localhost:3000";
const validaLogin = () => {
    axios.get(`${ENDPOINT}/users/`)
        .then((response) => {
            if (response.status === 200) {
                const dados = response.data;
                const user = document.querySelector('#floatingInput');
                const userLogin = user.value;
                const password = document.querySelector('#floatingPassword');
                const passwordLogin = user.value;

                let validation = false;
                for (let i = 0; i < dados.length; i++) {
                    if (userLogin === data[i].email && passwordLogin === data[i].password) {
                        validation = true;
                    }
                }

                if (validation === true) {
                    window.location.href = "index.html";
                } else {
                    alert('error')
                }
                console.log(data)
            }
        });
}