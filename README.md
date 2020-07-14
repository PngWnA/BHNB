# BHNB
별헤는밤.

## Strategy (pseudo)
### Preprocessing
```
stars = filter([bright <= 7.9 ?], HYG-database)
save(star[id, ra, dec, proper, ci, mag])
```

### load stars in html
```
fetch(location/of/star/objects)
foreach stars:
    body.append(createElement(star, position=[ra, dec]))
```

### convert equatorial systems to horizontal system.
어캐하지

### project horizontal system in browser
어캐하누