/*
[Star Object]
A star object is expressed as json.
Example of a star object is:
{
    "ra": "0.000000",
    "dec": "0.000000",
    "proper": "Sol",
    "mag": "-26.700"
}   
*/

// Where to load json file.
// It can be changed.
const PATH = 'https://raw.githubusercontent.com/PngWnA/BHNB/master/resources/halflarge.json';

// init : path -> star*
const init = async (path=PATH) => {
    const response = await fetch(path);
    console.log('[Core] Initialized.');
    return response.json();
};

// load : star* -> <star>* 
const load = (stars) => {
    stars.map((star) =>{
        const elem = document.createElement('star');
        elem.setAttribute('ra', star.ra);
        elem.setAttribute('dec', star.dec);
        elem.setAttribute('mag', star.mag);
        elem.setAttribute('aka', star.proper);
        elem.style.animation = `flicker ${Math.random() * 2 + 2}s infinite alternate`;
        document.getElementById("stars").append(elem);
    });
    console.log(`[Core] Loaded ${stars.length} stars.`);
    return stars.length;
};
