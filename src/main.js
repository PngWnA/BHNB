init()
.then(async (stars) => await (load(stars)))
.then(async () => this.geo = await getLocalGeographic())
.then(async () => this.LST = getLocalSidereal(this.geo.lon))
.then(async () => convertAllEquatorial())
.then(async () => project(`GroundMap`))
.then(async () => followSizeChange())
.then(async () => continuousUpdate())
.catch(err => console.log(err));
