// Thx to Daehyun Pyo for nice reference.

let {
    innerWidth,
    innerHeight,
} = window;

const HD = {
    width: 1920,
    height: 1080,
};

// brightness : mag -> size
const brightness = mag => Math.min(6.0, (-11/9) * mag + (21/3));;

// setRandomMap : star* -> star*
const setRandomMap = async (star) => {
    star.style.left = `${innerWidth * Math.random()}px`;
    star.style.top = `${innerHeight * Math.random()}px`;
    star.style.height = star.style.width = `${Math.random() * 3}px`;
    
    return;
};

// setCelestialMap : star* -> star*
const setCelestialMap = async (star) => {
    const az = star.getAttribute('az');
    const alt = star.getAttribute('alt');
    const mag = star.getAttribute('mag');

    star.style.left = `${((az / 360) + 0.5) % 1.0 * innerWidth}px`;
    star.style.top = `${(-alt + 90) / 180 * innerHeight}px`;
    star.style.height = star.style.width = `${brightness(mag)}px`;

    return;
};

// setGroundMap : fov -> star* -> star*
const setGroundMap = async (star, fov="N") => {
    const az = star.getAttribute('az');
    const alt = star.getAttribute('alt');
    const mag = star.getAttribute('mag');

    const {x, y, z} = azaltToCatesian(az, alt);

    let start, end;

    let Y, Z;

    if (fov === "N") {
        start = 90;
        end = 270;
        factor = 1 + x;

        Y = y / factor;
        Z = z / factor;
    }
    else {
        start = 270;
        end = 90;
        factor = 1 - x;

        Y = - y / factor;
        Z = z / factor;
    }

    const W = innerWidth / 2;
    const H = innerHeight;
    const scale = Math.sqrt(W*W + H*H);
    
    // Filter out half sphere
    if ((start <= az && az <= end)) {
        star.style.height = star.style.width = `0px`;
        return;
    }

    star.style.left = `${W - Y * scale}px`;
    star.style.top = `${H - Z * scale}px`;
    star.style.height = star.style.width = `${brightness(mag)}px`;

    return;
};

//project : mode -> star*
const project = async (mode) => {
    const stars = document.getElementsByTagName("star");
    console.log(`[Core] Projecting ${stars.length} stars with ${mode} mode...`);
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