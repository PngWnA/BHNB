const getAnkka = () => {
    const sun = document.getElementsByTagName("star")[7];
    return sun;
}

const getAlpheratz = () => {
    const sun = document.getElementsByTagName("star")[1];
    return sun;
}


init()
.then(async (stars) => await (load(stars)))
.then(async (stars) => await (projectTest(stars)))
.then(async () => this.geo = await getLocalGeographic())
.then(async () => this.LST = getLocalSidereal(this.geo.lon))
.then(async () => equatorialToHorizontal(this.geo.lat, this.LST, getAnkka()))
.then(async (azalt) => console.log(azalt))
.then(async () => equatorialToHorizontal(this.geo.lat, this.LST, getAlpheratz()))
.then(async (azalt) => console.log(azalt))
.catch(err => console.log(err));