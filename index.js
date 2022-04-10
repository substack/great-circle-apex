module.exports = function gcApex(out, p0, p1, epsilon) {
  if (epsilon === undefined) epsilon = 1e-12
  if (Math.abs(p0[1]) < epsilon && Math.abs(p1[1]) < epsilon) {
    out[0] = (p0[0] + p1[0])*0.5
    out[1] = (p0[1] + p1[1])*0.5
    return out
  }
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
  var alat = Math.acos(calat)*N
  var salat = Math.sin(alat)

  // http://edwilliams.org/avform147.htm#Par
  var A = slat0*clat1*calat*sl01
  var B = slat0*clat1*calat*cl01 - clat0*slat1*calat
  var C = clat0*clat1*salat*sl01
  var lon = Math.atan2(B,A)
  var dlon = Math.acos(Math.max(-1,Math.min(+1,C/Math.sqrt(A*A+B*B))))
  var alon = (lon0+dlon+lon+Math.PI) % (2*Math.PI) - Math.PI
  out[0] = alon*180/Math.PI
  out[1] = alat*180/Math.PI
  return out
}
