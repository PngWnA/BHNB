// Thx to Suho Lee for nice reference.

// getGeographic : ip -> {lat, long}
const getLocalGeographic = async () => {
    const endpoint = `http://ip-api.com/json/`
    const base = {lat: 37.582474, lon: 127.027560};

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

    const Azimuth = r2d(atan2(
        sin(d2r(HA)),
        cos(d2r(HA)) * sin(d2r(lat)) - tan(d2r(dec)) * cos(d2r(lat))
    )) + 180

    star.setAttribute('az', Azimuth);
    star.setAttribute('alt', Altitude);

    return {Azimuth, Altitude};
};

// azaltToCatesian : az -> alt -> {x, y, z}
const azaltToCatesian = (az, alt) => {
    const pi = (-az + 360) % 360;
    const theta = -alt + 90;

    const x = sin(d2r(theta)) * cos(d2r(pi));
    const y = sin(d2r(theta)) * sin(d2r(pi));
    const z = cos(d2r(theta));

    return {x, y, z}
};

// azaltToCatesian : star* -> star*
const convertAllEquatorial = () => {
    const stars = document.getElementsByTagName("star");
    const { innerWidth, innerHeight } = window;
    for (let index = 0; index < stars.length; index++) {
        equatorialToHorizontal(this.geo.lat, this.LST, stars[index]);
    }
    return;
};