// Thx to Suho Lee for nice reference.

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

    console.log(LST, LST*15);

    const ra = star.getAttribute('ra');
    const dec = star.getAttribute('dec');

    // Convert LST to angle.
    const HA = (LST * 15 - ra);

    // For readability.
    const {sin, cos, tan, asin, atan2} = Math;

    const Azimuth = atan2(
        sin(HA),
        cos(HA) * sin(lat) + tan(dec) * cos(lat)
        ) * 180 / Math.PI;
    const Altitude = asin(
        sin(lat) * sin(dec)
        + cos(lat) * cos(dec) * cos(HA)
    ) * 180 / Math.PI;

    console.log(ra, dec, HA, Azimuth, Altitude);

    return {Azimuth, Altitude};
};

