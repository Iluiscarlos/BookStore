

function showDate(){
    const today = new Date();
    const date =  today.toLocaleDateString()
    const hour = today.getHours()
    const min = today.getMinutes()

    document.querySelector('.time').innerHTML = `Date: ${date} Time: ${hour}:${min}`
};

showDate();

function validaLogin(){
    const ENDPOINT = "http://localhost:3000";
    const getUser = (email) => {
        axios.get(`${ENDPOINT}/users/` + email);
        
    }
    getBooks();
}