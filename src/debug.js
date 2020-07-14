init()
.then((stars) => load(stars))
.catch(err => console.log(err));