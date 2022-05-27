# BHNB
별 헤는 밤 | Fixed FOV Planetarium

![](/asset/demo.png)

Live demo on [here](https://pngwna.github.io/showcase/bhnb/)!
Refer [here](https://pngwna.github.io/dev/bhnb/0) for more information.

## Strategy (pseudo)
### Preprocessing
```
stars = filter([bright <= 7.9 ?], HYG-database)
save(star[ra, dec, proper, mag])
```

### load stars in html
```
fetch(location/of/star/objects)
foreach stars:
    body.append(createElement(star, position=[ra, dec]))
```

### convert equatorial systems to horizontal system.
```
{lat, long} = getGeographic()
LST = getSiderealTime()

stars.map(convertToEquatorial(lat, LST))
```

### project horizontal system in browser
```
random projection : literally random location
simple projection(celestial map) : {x, y} = {az, alt}
ground projection : DO stereographic projection
```
