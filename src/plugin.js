// Put additional features here

/*
 * 0. Screen update logic
*/
const update = () => {
    console.log(`[Plugin::update] Updating...`);
    this.LST = getLocalSidereal(this.geo.lon);
    console.log(`[Plugin::update] Reconverting: RaDec -> AzAlt`)
    convertAllEquatorial();
    project(`GroundMap`);
    console.log(`[Plugin::update] Update done.`);

    return;
};

/*
 * 0.0. Continuous update
*/
const continuousUpdate = (minute = 1) => {
    console.log(`[Plugin::continuousUpdate] Activated.`)
    setInterval(update, 1000 * 60 * minute);
}

/*
 * 0.1. Size change detection and update
*/
let timerFlag = false;

const windowSizeMonitor = () => {
    if (timerFlag === false)
    {
        console.log(`[Plugin::followSizeChange] Size change detected.`)
        console.log()
        timerFlag = true;
        setTimeout(() => {
            innerWidth = window.innerWidth;
            innerHeight = window.innerHeight;
            
            update();
            
            timerFlag = false;
            console.log(`[Plugin::followSizeChange] Finished routine.`)
        }, 50);
    }
    else
    {
        return;
    }
}

const followSizeChange = () => {
    console.log(`[Plugin::followSizeChange] Activated.`);
    window.addEventListener("resize", windowSizeMonitor);
};





 