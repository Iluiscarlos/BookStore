const ENDPOINT = "http://localhost:3000";

const validaLogin = () => {
    axios.get(`${ENDPOINT}/users`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;

                const input1 = document.querySelector("#floatingInput");
                const userLogin = input1.value;

                const input2 = document.querySelector("#floatingPassword");
                const passwordLogin = input2.value;

                let validation = false;

                for (let i = 0; i < data.length; i++) {

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
        })
};