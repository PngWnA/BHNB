// Thx to Suho Lee for nice reference.

const r2d = rad => rad * 180 / Math.PI;
const d2r = degree => degree * Math.PI / 180;

// getGeographic : ip -> {lat, long}
const getLocalGeographic = async () => {
    const endpoint = `http://ip-api.com/json/`
    const base = {lat: 37.582474, long: 127.027560};

    await fetch(endpoint)
    .then(res => this.geography = res.json())
    .catch(err => this.geography = base);

    return await this.geography;
};

// getLocalSidereal : long -> LST
const getLocalSidereal = (long) => {
    const now = new Date();
    const from2020 = new Date('2020/01/01');

    const offset = 
    (now.getTime() - from2020.getTime()) 
    / 1000.0 / 60.0 / 60.0 / 24.0;

    // Ignore err between UT1 and UTC,
    // since it's tiny.
    const UT1 = 
    now.getUTCHours()
    + now.getUTCMinutes() / 60.0
    + now.getUTCSeconds() / 3600.0;

    /* 
    * Formula by U.S. Naval Observatory, 2020
    * Computing general local sidereal is exhausting...
    * Use this!
    */
    const GST = 
    (6.6090775
    + 0.0657098246 * offset
    + 1.00273791 * UT1)
    % 24;

    // GST = LST + long(converted to hours)
    const LST = (GST + long / 15.0) % 24;

    return LST;
};

// equatorialToHorizontal : lat -> LST -> star -> {az, alt}
const equatorialToHorizontal = (lat, LST, star) =>{
    /*
    * ra : hour
    * dec : -90 ~ +90
    * lat : -90 ~ +90
    * LST : hour
    * az : 360
    * alt : -90 ~ +90
    * HA : 0 ~ 360
    */

    const ra = star.getAttribute('ra');
    const dec = star.getAttribute('dec');

    // Convert HA to angle.
    const HA = (LST - ra) * 15 % 360;

    // For readability.
    const {sin, cos, tan, asin, acos, atan2} = Math;

    const Altitude = r2d(asin(
        sin(d2r(dec)) * sin(d2r(lat))
        + cos(d2r(dec)) * cos(d2r(lat)) * cos(d2r(HA))
    ));

    const Azimuth = (r2d(asin(
        - sin(d2r(HA)) * cos(d2r(dec))
        / cos(d2r(Altitude))
    ))  + 360) % 360;

    /*
    const realAz = 300 + 0.20 * 10 / 6;
    const realAlt = 8 + 0.30 * 10 / 6;

    console.log(`
    Azimuth : ${Azimuth}
    Altitude : ${Altitude}
    Err(Az) : ${(realAz - Azimuth) / 360}
    Err(Alt) : ${(realAlt - Altitude) / 180}
    `);
    */

    star.setAttribute('az', Azimuth);
    star.setAttribute('alt', Altitude);

    return {Azimuth, Altitude};
};

