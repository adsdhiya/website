/* A rounded 3D heart made only of separate, shaded particles. */
(function () {
  'use strict';
  var TAU = Math.PI * 2;
  function clamp(value, low, high) { return Math.max(low, Math.min(high, value)); }
  function smooth(value) { var p = clamp(value, 0, 1); return p * p * (3 - 2 * p); }
  function radicalInverse(value, base) {
    var result = 0, fraction = 1 / base;
    while (value > 0) {
      result += (value % base) * fraction;
      value = Math.floor(value / base);
      fraction /= base;
    }
    return result;
  }
  // A true rounded volume, rather than a thickened two-dimensional icon.
  // Its implicit surface has broad shoulders, a shallow cleft and a soft taper:
  // (x² + y² + 2.25z² − 1)³ − y³(x² + .1125z²) = 0.
  function surface(dx, dy, dz) {
    var a = dx * dx + dy * dy + 2.25 * dz * dz;
    var c = dy * Math.cbrt(dx * dx + .1125 * dz * dz);
    var low = 0, high = 2;
    for (var step = 0; step < 26; step++) {
      var r = (low + high) * .5;
      if (a * r * r - 1 - c * Math.pow(r, 5 / 3) > 0) high = r;
      else low = r;
    }
    var radius = (low + high) * .5;
    var x = dx * radius, y = dy * radius, z = dz * radius;
    var q = x * x + y * y + 2.25 * z * z - 1;
    var nx = (6 * x * q * q - 2 * x * y * y * y) * 1.14;
    var ny = (6 * y * q * q - 3 * y * y * (x * x + .1125 * z * z)) * 1.14;
    var nz = (13.5 * z * q * q - .225 * z * y * y * y) / .93;
    var length = Math.hypot(nx, ny, nz) || 1;
    return { p: [x / 1.14, (y - .12) / 1.14, z * .93], n: [nx / length, ny / length, nz / length] };
  }
  function makePoints() {
    var points = [];
    // Fibonacci directions cover the complete front, back and curved sides.
    // No contour ring is drawn; the silhouette emerges from separated dots.
    for (var i = 0; i < 1728; i++) {
      var y = 1 - 2 * (i + .5) / 1728;
      var ring = Math.sqrt(1 - y * y), angle = i * 2.399963229728653;
      var point = surface(Math.cos(angle) * ring, y, Math.sin(angle) * ring);
      points.push({
        p: point.p, n: point.n, inner: false,
        size: .98 + .35 * radicalInverse(i + 1, 3),
        sector: (point.p[0] >= 0 ? 1 : 0) + (point.p[1] < 0 ? 2 : 0),
        tint: i % 89 === 0 ? 1 : i % 73 === 0 ? 2 : 0
      });
    }
    // A sparse inner layer gives the cloud depth without making it opaque.
    for (var j = 0; j < 192; j++) {
      var iy = 1 - 2 * (j + .5) / 192;
      var ir = Math.sqrt(1 - iy * iy), ia = j * 2.399963229728653 + .7;
      var inner = surface(Math.cos(ia) * ir, iy, Math.sin(ia) * ir);
      var scale = .25 + .58 * Math.cbrt(radicalInverse(j + 1, 2));
      points.push({
        p: inner.p.map(function (value) { return value * scale; }), n: inner.n,
        inner: true, size: .82,
        sector: (inner.p[0] >= 0 ? 1 : 0) + (inner.p[1] < 0 ? 2 : 0), tint: 0
      });
    }
    return points;
  }
  var points = makePoints();
  function mix(a,b,t) { return a+(b-a)*t; }
  // The final cloud softly blends the darker brandbook families. No hard zones.
  var blue=[55,64,120],iris=[90,23,100],orchid=[131,41,106],midnight=[38,16,99],wisteria=[101,75,117];
  var palette=Array.from({length:64},function(_,band){
    var u=(band%8)/7,v=Math.floor(band/8)/7;
    var base=blue.map(function(_,channel){return mix(mix(midnight[channel],orchid[channel],u),mix(blue[channel],iris[channel],u),v);});
    return Array.from({length:32},function(_,shade){var light=shade/31;return base.map(function(c,channel){return Math.round(mix(c*(.80+.20*light),wisteria[channel],light*.20));});});
  });
  var ghee=[174,124,38];
  points.forEach(function(point){
    point.band=clamp(Math.round((point.p[0]+1)*3.5),0,7)+8*clamp(Math.round((point.p[1]+1)*3.5),0,7);
    var angle=Math.atan2(point.p[1],point.p[0]),distance=clamp(Math.hypot(point.p[0],point.p[1])/1.1,0,1);
    var radial=.38*(.43+.57*Math.pow((1+Math.cos(angle*8))/2,2))*distance;
    point.mark=[Math.cos(angle)*radial,-Math.sin(angle)*radial];
  });
  function sourceMark(scene){
    // Read the actual Dhiya polygon facets once. Area sampling and angular
    // correspondence turn the logo into the heart without outward scattering.
    var polygons=scene.querySelectorAll?Array.from(scene.querySelectorAll('.heart-unified-mark polygon')):[];
    var triangles=[],total=0;
    polygons.forEach(function(polygon){
      var raw=(polygon.getAttribute('points')||'').trim().split(/[ ,]+/).map(Number),vertices=[];
      for(var j=0;j+1<raw.length;j+=2)if(Number.isFinite(raw[j])&&Number.isFinite(raw[j+1]))vertices.push([raw[j],raw[j+1]]);
      var hex=(polygon.getAttribute('fill')||'#654B75').replace('#','');
      var color=/^[0-9a-f]{6}$/i.test(hex)?[0,2,4].map(function(i){return parseInt(hex.slice(i,i+2),16);}):wisteria;
      for(var k=1;k<vertices.length-1;k++){
        var a=vertices[0],b=vertices[k],c=vertices[k+1];
        var area=Math.abs((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]))/2;
        if(area>0){total+=area;triangles.push({a:a,b:b,c:c,end:total,color:color});}
      }
    });
    if(!triangles.length)return points.map(function(point){return {x:point.mark[0],y:point.mark[1],color:wisteria};});
    var samples=[],cursor=0;
    for(var i=0;i<points.length;i++){
      var area=(i+.5)/points.length*total;while(triangles[cursor].end<area)cursor++;
      var tri=triangles[cursor],u=Math.sqrt(radicalInverse(i+1,2)),v=radicalInverse(i+1,3);
      var x=(1-u)*tri.a[0]+u*(1-v)*tri.b[0]+u*v*tri.c[0];
      var y=(1-u)*tri.a[1]+u*(1-v)*tri.b[1]+u*v*tri.c[1];
      samples.push({x:(x-212)/424*.84,y:(y-212)/424*.84,color:tri.color,angle:Math.atan2(212-y,x-212)});
    }
    samples.sort(function(a,b){return a.angle-b.angle;});
    var targetOrder=points.map(function(point,index){return {index:index,angle:Math.atan2(point.p[1],point.p[0])};});
    targetOrder.sort(function(a,b){return a.angle-b.angle;});
    var source=new Array(points.length);targetOrder.forEach(function(point,index){source[point.index]=samples[index];});return source;
  }

  window.createDILHeartVolume = function (scene, overlayCanvas) {
    if (!scene || !overlayCanvas) return null;
    var canvas = document.createElement('canvas');
    canvas.className = 'heart-volume';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:2;';
    scene.insertBefore(canvas, overlayCanvas);
    var ctx;
    try { ctx = canvas.getContext('2d'); } catch (_) { ctx = null; }
    if (!ctx) { canvas.remove(); return null; }
    var width = 1, height = 1, destroyed = false;
    var source = sourceMark(scene);
    var renderer = { ready: true, resize: resize, render: render, destroy: destroy };
    var projected = points.map(function () { return { x: 0, y: 0, z: 0, size: 0, alpha: 0, color: 0, tint: 0, sector: 0, band: 0, source: null }; });
    var order = projected.slice();
    function resize(W, H, dpr) {
      if (destroyed) return;
      width = Math.max(1, W); height = Math.max(1, H);
      var ratio = clamp(dpr || 1, 1, 2);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    function render(options) {
      if (destroyed) return;
      ctx.clearRect(0, 0, width, height);
      var formed = clamp(options.formed || 0, 0, 1);
      if (!formed) return;
      var time = options.time || 0;
      var yaw = .38 + Math.sin(time * .22) * .13;
      var pitch = -.10 + Math.sin(time * .19) * .025;
      var roll = .10, cr = Math.cos(roll), sr = Math.sin(roll);
      var ca = Math.cos(yaw), sa = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      var bx = options.beatX || 1, by = options.beatY || 1, bz = options.beatZ || 1;
      var radius = options.radius;
      var dotScale = clamp(options.radius / 170, .72, 1.15);
      var cx = options.cx, cy = options.cy;
      var sectorLight = [0,1,2,3].map(function (sector) { return Math.max(0, Math.sin(time * .55 - sector * .9)) * .065; });
      var morph=smooth((formed-.06)/.94),opacity=smooth(formed/.16);
      var colorBlend=smooth((formed-.08)/.57);
      for (var i = 0; i < points.length; i++) {
        var point = points[i], p = point.p, normal = point.n, target = projected[i];
        var x=p[0]*bx,y=p[1]*by,z=p[2]*bz;
        var nx=normal[0]/bx,ny=normal[1]/by,nz=normal[2]/bz;
        var xx = x * ca + z * sa, zz = -x * sa + z * ca;
        var yy = y * cp - zz * sp; zz = y * sp + zz * cp;
        var rolledX = xx * cr - yy * sr; yy = xx * sr + yy * cr; xx = rolledX;
        var perspective = 5 / (5 - zz);
        var nxx = nx * ca + nz * sa, nzz = -nx * sa + nz * ca;
        var nyy = ny * cp - nzz * sp; nzz = ny * sp + nzz * cp;
        var rolledNX = nxx * cr - nyy * sr; nyy = nxx * sr + nyy * cr; nxx = rolledNX;
        var magnitude = Math.hypot(nxx, nyy, nzz) || 1;
        var light = Math.max(0, (-.42 * nxx + .57 * nyy + .706 * nzz) / magnitude);
        var depth = clamp((zz + .7) / 1.4, 0, 1);
        target.x=cx+mix(source[i].x,xx*perspective,morph)*radius;
        target.y=cy+mix(source[i].y,-yy*perspective,morph)*radius;
        target.z=zz*morph;
        var travelingLight = sectorLight[point.sector];
        target.size = clamp(point.size * dotScale * (.72 + .64 * depth) * perspective, .6, 1.8);
        target.color = Math.round(clamp(.18 + .56 * light + .16 * depth + travelingLight, 0, 1) * 31);
        target.alpha = opacity * (point.inner ? .19 : .17 + .72 * Math.pow(depth, 1.12)) * (.86 + .14 * light);
        target.tint = point.tint; target.sector = point.sector; target.band=point.band; target.source=source[i].color;
      }
      // Far dots show through the empty space between nearer surface particles.
      order.sort(function (a, b) { return a.z - b.z; });
      for (var k = 0; k < order.length; k++) {
        var dot = order[k];
        if (dot.alpha < .015) continue;
        var color=dot.tint===1?ghee:palette[dot.band][dot.color];
        var red=color[0],green=color[1],blue=color[2];
        if(colorBlend<1){red=Math.round(mix(dot.source[0],red,colorBlend));green=Math.round(mix(dot.source[1],green,colorBlend));blue=Math.round(mix(dot.source[2],blue,colorBlend));}
        ctx.fillStyle='rgba('+red+','+green+','+blue+','+dot.alpha.toFixed(3)+')';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, TAU);
        ctx.fill();
      }
    }
    function destroy() {
      if (destroyed) return;
      destroyed = true; renderer.ready = false; canvas.remove();
    }
    return renderer;
  };
})();
