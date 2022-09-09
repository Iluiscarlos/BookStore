function showDate(){
    const today = new Date();
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    let time = document.getElementsByClassName('.time');
    if (month <= 9){
        document.querySelectorAll('.time').innerHTML = `${day}/0${month}/${year}`
    }else{
        document.querySelectorAll('.time').innerHTML = `${day}/${month}/${year}`
    }

    console.log(today);
};

showDate();