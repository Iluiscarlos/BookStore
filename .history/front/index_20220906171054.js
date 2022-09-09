function showDate(){
    const today = new Date();
    const date =  today.toLocaleDateString()
    const hour = today.getHours()
    const min = today.getMinutes()

    document.querySelector('.time').innerHTML = `Date: ${date} Time: ${hour}:${min}`
};

showDate();


function validaLogin(,){
    const getBooks = (id) => {
        return axios.get(`${ENDPOINT}/books/` + id);
    }
    getBooks();
}