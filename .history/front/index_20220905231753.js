function showDate(){
    const today = new Date();
    const hour = today.getHours()
    const min = today.getMinutes()
    const date =  today.toLocaleDateString()

    document.querySelector('.time').innerHTML = `Date: ${date} Time: ${hour}:${min}`
};

showDate();