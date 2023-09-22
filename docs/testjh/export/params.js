window.onload = function(){
    const urlParams = new URLSearchParams(window.location.search);
    //1
    const myParam1 = urlParams.get('one');
    if (myParam1) {
        const input = document.getElementById('one');
        input.value = myParam1;
    }
    //2
    const myParam2 = urlParams.get('two');
    if (myParam2) {
        const input = document.getElementById('two');
        input.value = myParam2;
    }
}