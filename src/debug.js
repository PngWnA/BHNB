init()
.then(async (stars) => await (load(stars)))
.then(async (stars) => await (projectTest(stars)))
.then(async () => await getGeographic())
.then(async (res) => console.log(res))
.catch(err => console.log(err));