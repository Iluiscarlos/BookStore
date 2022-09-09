function showDate(){
    const today = new Date();
    const date =  today.toLocaleDateString()
    const hour = today.toLocaleTimeString

    document.querySelector('.time').innerHTML = `Date: ${date} -  Time: ${hour}:${min}`
};

showDate();


