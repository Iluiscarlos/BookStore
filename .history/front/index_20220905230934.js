function showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const time = today.getTimezoneOffset()
    if (month <= 9){
        document.querySelector('.time').innerHTML = `${day}/0${month}/${year} - ${time}`
    }else{
        document.querySelector('.time').innerHTML = `${day}/${month}/${year} - ${time}`
    }
};

showDate();