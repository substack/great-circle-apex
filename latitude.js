module.exports = function gcApexLatitude(p0, p1) {
  var lon0 = p0[0]/180*Math.PI
  var lat0 = p0[1]/180*Math.PI
  var lon1 = p1[0]/180*Math.PI
  var lat1 = p1[1]/180*Math.PI

  // http://edwilliams.org/avform147.htm#Clairaut
  var N = Math.sign(Math.max(lat0,lat1)+Math.min(lat0,lat1))
  var l01 = lon0 - lon1
  var sl01 = Math.sin(l01), cl01 = Math.cos(l01)
  var slat0 = Math.sin(lat0), clat0 = Math.cos(lat0)
  var slat1 = Math.sin(lat1), clat1 = Math.cos(lat1)
  var tc = Math.atan2(
    sl01*clat1,
    clat0*slat1-slat0*clat1*cl01
  ) % (2.0*Math.PI)
  var calat = Math.abs(Math.sin(tc)*Math.cos(lat0))
  return Math.acos(calat)*N*180/Math.PI
}
