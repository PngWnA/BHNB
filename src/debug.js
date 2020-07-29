// For test
const getAlpheratz = () => {
    const sun = document.getElementsByTagName("star")[1];
    return sun;
}

const convertAll = () => {
    const stars = document.getElementsByTagName("star");
    console.log(`[*] Converting...`)
    const { innerWidth, innerHeight } = window;
    for (let index = 0; index < stars.length; index++) {
        equatorialToHorizontal(this.geo.lat, this.LST, stars[index]);
    }
    return;
};


init()
.then(async (stars) => await (load(stars)))
.then(async (stars) => await (projectTest(stars)))
.then(async () => this.geo = await getLocalGeographic())
.then(async () => this.LST = getLocalSidereal(this.geo.lon))
.then(async () => convertAll())
.then(async () => console.log(`Done`))
.catch(err => console.log(err));