showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    if (month <= 9){
        document.querySelector('header').innerHTML = `${day}/0${month}/${year}`
    }else{
        document.querySelector('header').innerHTML = `${day}/${month}/${year}`
    }
};