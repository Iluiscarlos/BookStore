function showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    let time = document.getElementsByClassName('.time');
    if (month <= 9){
        document.querySelector(time).innerHTML = `${day}/0${month}/${year}`
    }else{
        document.querySelector(time).innerHTML = `${day}/${month}/${year}`
    }
};