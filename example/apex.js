var gcApex = require('../')
var seattle = [-122.33,47.61]
var frankfurt = [8.68,50.12]

var p = gcApex([],seattle,frankfurt)
console.log(p) // [ -55.671430455011475, 70.11685763086712 ]
