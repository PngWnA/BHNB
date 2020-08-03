const {
    innerWidth,
    innerHeight
} = window;

const HD = {
    width: 1920,
    height: 1080,
};

const scale = 300.0;

const brightness = mag => (-10/9) * mag + (15/3);

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

    star.style.left = `${((az / 360) + 0.5) % 1.0 * innerWidth}px`;
    star.style.top = `${(-alt + 90) / 180 * innerHeight}px`;
    star.style.height = star.style.width = `${brightness(mag)}px`;

    return;
};

const setGroundMap = async (star) => {
    throw new Exception("NOT_IMPLEMENTED");
    const az = star.getAttribute('az');
    const alt = star.getAttribute('alt');
    const mag = star.getAttribute('mag');

    if ((-90 <= alt && alt <= 0)) {
        star.style.left = `${-1}px`;
        star.style.top = `${-1}px`;
        star.style.height = star.style.width = `0px`;
        return;
    }

    const zenith = (alt - 90.0) * (+ Math.PI) / 180.0;

    const R = sin(zenith) / (1 + cos(zenith));
    if (R >= 1) {
        console.log(R);
    }
    const theta = (-az + 360) % 360;

    star.style.left = `${innerWidth / 2 + scale * R * cos(theta)}px`;
    star.style.top = `${innerHeight / 2 + scale * R * sin(theta)}px`;
    star.style.height = star.style.width = `${brightness(mag)}px`;

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