init()
.then((stars) => load(stars))
.catch(err => console.log(err));

setTimeout(() => {
    projectTest();
}, 5000);
