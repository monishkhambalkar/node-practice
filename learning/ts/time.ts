let timer : NodeJS.timeout;

timer = setInterval(()=>{
    const currentTIme : String = new Date().toLocaleDateString();
    console.log("Current time ", currentTIme);
}, 2000)