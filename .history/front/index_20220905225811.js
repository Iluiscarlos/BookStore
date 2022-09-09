function showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    if (month <= 9){
        document.getElementsByClassName('.time').innerHTML = `${day}/0${month}/${year}`
    }else{
        document.getElementsByClassName('.time').innerHTML = `${day}/${month}/${year}`
    }

    console.log(today);
};

showDate();