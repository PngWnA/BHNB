const {
    innerWidth,
    innerHeight
} = window;

const HD = {
    width: 1920,
    height: 1080,
};

const setRandomMap = async (star) => {
    star.style.left = `${innerWidth * Math.random()}px`;
    star.style.top = `${innerHeight * Math.random()}px`;
    star.style.height = star.style.width = `${Math.random() * 3}px`;
    
    return;
};

const setCelestialMap = async (star) => {
    const az = star.getAttribute('az');
    const alt = star.getAttribute('alt');
    const mag = star.getAttribute('mag');

    star.style.left = `${az / 360 * innerWidth}px`;
    star.style.top = `${(-alt + 90) / 180 * innerHeight}px`;
    star.style.height = star.style.width = `${(-10/9) * mag + (15/3)}px`;

    return;
};

const setGroundMap = async () => { 
    return;
};

const project = async (mode) => {
    const stars = document.getElementsByTagName("star");
    console.log(`[*] Projecting ${stars.length} stars with ${mode} mode...`);
    for (let star of stars) {
        switch (mode) {
            case `RandomMap`:
                setRandomMap(star);
                break;
            case `CelestialMap`:
                setCelestialMap(star);
                break;
            case `GroundMap`:
                setGroundMap(star);
                break;
            default:
                throw new Exception("INVALID_PROJ_MODE");
        }
    }
    
};