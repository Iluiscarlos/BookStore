function showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const hour = today.getHours()
    const min = today.getMinutes()
    const date =  today.getUTCDay
    if (month <= 9){
        document.querySelector('.time').innerHTML = `Date: ${day}/0${month}/${year} Time: ${hour}:${min}  ${date}`
    }else{
        document.querySelector('.time').innerHTML = `${day}/${month}/${year} - ${hour}:${min}`
    }
};

showDate();