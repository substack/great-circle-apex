var test = require('tape')
var geolerp = require('geolerp')
var hdist = require('haversine-distance')
var gcApex = require('../')
var gcApexLat = require('../latitude')

var v0 = [0,0]
var seattle = [-122.33,47.61]
var frankfurt = [8.68,50.12]
var auckland = [174.77,-36.87]
var malaga = [-4.42,36.72]
var buenosAires = [-58.38,-34.61]
var lagos = [3.40,6.45]
var reykjavik = [-21.90,64.14]

test('seattle to frankfurt', function (t) {
  var A = seattle
  var B = frankfurt
  var p = gcApex([],A,B)
  var alat = gcApexLat(A,B)
  var n = 500
  var best = [0,-Infinity]
  for (var i = 0; i < n; i++) {
    geolerp(v0,A,B,i/(n-1))
    if (v0[1] > best[1]) {
      best[0] = v0[0]
      best[1] = v0[1]
    }
  }
  var d = hdist(p,best)
  t.equal(alat, p[1], 'lat-only exactly the same as apex[1] (with no float jitter)')
  t.ok(p[1] > 70, `latitude > +70 (=${p[1].toFixed(4)})`)
  t.ok(d < 20_000, `iterative distance (n=${n}) < 20km from formula result (d=${d.toFixed(1)})`)
  t.end()
})

test('auckland to buenos aires', function (t) {
  var A = auckland
  var B = buenosAires
  var p = gcApex([],A,B)
  var alat = gcApexLat(A,B)
  var n = 500
  var best = [0,Infinity]
  for (var i = 0; i < n; i++) {
    geolerp(v0,A,B,i/(n-1))
    if (v0[1] < best[1]) {
      best[0] = v0[0]
      best[1] = v0[1]
    }
  }
  var d = hdist(p,best)
  t.equal(alat, p[1], 'lat-only exactly the same as apex[1] (with no float jitter)')
  t.ok(p[1] < -58, `latitude < -58 (=${p[1].toFixed(4)})`)
  t.ok(d < 20_000, `iterative distance (n=${n}) < 20km from formula result (d=${d.toFixed(1)})`)
  t.end()
})

test('auckland to lagos', function (t) {
  var A = auckland
  var B = lagos
  var p = gcApex([],A,B)
  var alat = gcApexLat(A,B)
  var n = 500
  var best = [0,Infinity]
  for (var i = 0; i < n; i++) {
    geolerp(v0,A,B,i/(n-1))
    if (v0[1] < best[1]) {
      best[0] = v0[0]
      best[1] = v0[1]
    }
  }
  var d = hdist(p,best)
  t.equal(alat, p[1], 'lat-only exactly the same as apex[1] (with no float jitter)')
  t.ok(p[1] < -75, `latitude < -75 (=${p[1].toFixed(4)})`)
  t.ok(d < 20_000, `iterative distance (n=${n}) < 20km from formula result (d=${d.toFixed(1)})`)
  t.end()
})

test('auckland to malaga', function (t) {
  var A = auckland
  var B = malaga
  var p = gcApex([],A,B)
  var alat = gcApexLat(A,B)
  var n = 500
  var best = [0,+Infinity]
  for (var i = 0; i < n; i++) {
    geolerp(v0,A,B,i/(n-1))
    if (v0[1] < best[1]) {
      best[0] = v0[0]
      best[1] = v0[1]
    }
  }
  var d = hdist(p,best)
  t.equal(alat, p[1], 'lat-only exactly the same as apex[1] (with no float jitter)')
  t.ok(p[1] < -37, `latitude < -37 (=${p[1].toFixed(4)})`)
  t.ok(d < 20_000, `iterative distance (n=${n}) < 20km from formula result (d=${d.toFixed(1)})`)
  t.end()
})

test('auckland to reykjavik', function (t) {
  var A = auckland
  var B = reykjavik
  var p = gcApex([],A,B)
  var alat = gcApexLat(A,B)
  var n = 500
  var best = [0,-Infinity]
  for (var i = 0; i < n; i++) {
    geolerp(v0,A,B,i/(n-1))
    if (v0[1] > best[1]) {
      best[0] = v0[0]
      best[1] = v0[1]
    }
  }
  var d = hdist(p,best)
  t.equal(alat, p[1], 'lat-only exactly the same as apex[1] (with no float jitter)')
  t.ok(p[1] > 78, `latitude > +78 (=${p[1].toFixed(4)})`)
  t.ok(d < 20_000, `iterative distance (n=${n}) < 20km from formula result (d=${d.toFixed(1)})`)
  t.end()
})
