function showDate(){
    const today = new Date();
    const hour = today.getHours()
    const min = today.getMinutes()
    const date =  today.toLocaleDateString()
    if (month <= 9){
        document.querySelector('.time').innerHTML = `Date: ${day}/0${month}/${year} Time: ${hour}:${min}  ${date}`
    }else{
        document.querySelector('.time').innerHTML = `${day}/${month}/${year} - ${hour}:${min}`
    }
};

showDate();