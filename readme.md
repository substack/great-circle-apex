# great-circle-apex

calculate the apex (point of minimum or maximum latitude) of a great circle arc

# example

``` js
var gcApex = require('great-circle-apex')
var seattle = [-122.33,47.61]
var frankfurt = [8.68,50.12]

var p = gcApex([],seattle,frankfurt)
console.log(p) // [ -55.671430455011475, 70.11685763086712 ]
```

or if you only want the latitude, you can save some calculations:

``` js
var gcApexLat = require('great-circle-apex/latitude')
var seattle = [-122.33,47.61]
var frankfurt = [8.68,50.12]

var lat = gcApexLat(seattle,frankfurt)
console.log(lat) // 70.11685763086712
```

# api

``` js
var gcApex = require('great-circle-apex')
var gcApexLat = require('great-circle-apex/latitude')
```

## gcApex(out, A, B)

Calculate the apex of the great circle between points `A` and `B`, each of which are 2-element
`[lon,lat]` arrays in decimal degrees, storing the result in `out`.

Returns `out`.


## var latitude = gcApexLat(A, B)

Return the `latitude` of the apex of the great circle between points `A` and `B` without calculating
the apex longitude.

# install

```
npm install great-circle-apex
```

# license

bsd

