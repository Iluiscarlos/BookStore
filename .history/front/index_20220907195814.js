function showDate(){
    const today = new Date();
    const date =  today.toLocaleDateString()
    const hour = today.getHours()
    const min = today.getMinutes()

    document.querySelector('.time').innerHTML = `Date: ${date} -  Time: ${hour}:${min}`
};

showDate();


const user = document.querySelector('#userLogin');
const userLogin = user.value
user.innerHTML = `Olá + ${userLogin}`;

