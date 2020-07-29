init()
.then(async (stars) => await (load(stars)))
.then(async () => this.geo = await getLocalGeographic())
.then(async () => this.LST = getLocalSidereal(this.geo.lon))
.then(async () => convertAllEquatorial())
.then(async () => await(project(`CelestialMap`)))
.then(async () => console.log(`Done`))
.catch(err => console.log(err));