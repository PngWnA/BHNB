init()
.then(async (stars) => await (load(stars)))
.then(async (stars) => await (projectTest(stars)))
.catch(err => console.log(err));
