// GetGeographic : ip -> {lat, long}
const getGeographic = async () => {
    const endpoint = `http://ip-api.com/json/`
    const base = {lat: 37.582474, long: 127.027560};

    await fetch(endpoint)
    .then(res => this.geography = res.json())
    .catch(err => this.geography = base);
    
    return this.geography;
};