function showDate(){
    const today = new Date();
    const date =  today.toLocaleDateString()
    const hour = today.toTimeString()

    document.querySelector('.time').innerHTML = `Date: ${date} -  Time: ${hour}`
};

showDate();


