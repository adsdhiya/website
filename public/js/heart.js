/* Four arrivals resolve into Dhiya, then one living particle heart. */
(function () {
  'use strict';
  var section = document.getElementById('dil');
  if (!section || section.dataset.heartBound === 'true') return;
  section.dataset.heartBound = 'true';
  var scene = section.querySelector('.heart-scene');
  var canvas = section.querySelector('#heartc');
  var nodes = Array.from(section.querySelectorAll('.heart-product'));
  var labels = nodes.map(function (node) { return node.querySelector('span'); });
  var core = section.querySelector('.heart-core'), record = section.querySelector('.heart-record');
  var unified = section.querySelector('.heart-unified-mark'), unifiedStyle = {};
  var hint = section.querySelector('.heart-hint'), replay = section.querySelector('.heart-replay');
  var toggle = section.querySelector('.heart-toggle');
  var settle = function () {}, hovered = null, focused = null;
  function text(selector, value) { var node = section.querySelector(selector); if (node) node.textContent = value; }
  // Exploration is independent of canvas support and never moves keyboard focus away.
  nodes.forEach(function (node) {
    node.addEventListener('pointerenter', function () { hovered = node; });
    node.addEventListener('pointerleave', function () { if (hovered === node) hovered = null; });
    node.addEventListener('focus', function () { focused = node; settle(); });
    node.addEventListener('blur', function () { if (focused === node) focused = null; });
    node.addEventListener('click', function () {
      settle();
      nodes.forEach(function (other) { other.setAttribute('aria-pressed', String(other === node)); });
      text('.heart-detail-role', node.dataset.role || '');
      text('.heart-detail-name', node.dataset.name || '');
      text('.heart-detail-description', node.dataset.description || '');
      var link = section.querySelector('.heart-detail-link');
      if (link) { link.href = node.dataset.href || '/dil'; link.textContent = 'Explore ' + (node.dataset.name || 'DIL') + ' →'; }
    });
  });
  var ctx = null;
  try { ctx = canvas && canvas.getContext && canvas.getContext('2d'); } catch (_) {}
  if (!scene || !ctx || nodes.length !== 4) {
    if (replay) replay.hidden = true;
    if (toggle) toggle.hidden = true;
    section.dataset.phase = 'connected';
    return;
  }
  var volume = null;
  try { if (window.createDILHeartVolume) volume = window.createDILHeartVolume(scene, canvas); } catch (_) {}
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var COMPLETE = 8.2, TAU = Math.PI * 2, FRAME = 1000 / 30;
  var W = 1, H = 1, cx = 0, cy = 0, radius = 1, dpr = 1, orbitX = 1, orbitY = 1;
  var halfWidths = [], halfHeights = [], styles = nodes.map(function () { return {}; });
  var positions = nodes.map(function () { return {x:0,y:0,z:0,scale:1}; });
  var elapsed = reduced.matches ? COMPLETE : 0, orbitTime = 0;
  var visible = false, paused = false, pageHidden = false, raf = 0, last = null, lastPaint = null, phase = '';
  var corners = [[-1,-1],[1,-1],[-1,1],[1,1]];
  var angles = [-2.35,-.78,2.35,.78];
  var trailColors = [[131,41,106],[55,64,120],[90,23,100],[101,75,117]];
  var particles = [], seed = 7142;
  canvas.style.zIndex = '3';
  function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  function clamp(v,a,b) { return Math.max(a,Math.min(b,v)); }
  function smooth(v) { var p=clamp(v,0,1);return p*p*(3-2*p); }
  function lerp(a,b,p) { return a+(b-a)*p; }
  function write(node, cache, key, value) { if (cache[key] !== value) { node.style[key]=value;cache[key]=value; } }
  function heartPoint(index,count) {
    var y=1-2*(index+.5)/count,ring=Math.sqrt(1-y*y),angle=index*2.399963229728653;
    var x=Math.cos(angle)*ring,z=Math.sin(angle)*ring,A=x*x+y*y+2.25*z*z;
    var c=y*Math.cbrt(x*x+.1125*z*z),low=0,high=2;
    for(var j=0;j<24;j++){var r=(low+high)/2;if(A*r*r-1-c*Math.pow(r,5/3)<0)low=r;else high=r;}
    var r=(low+high)/2;return {x:x*r/1.14,y:(y*r-.12)/1.14,z:z*r*.93};
  }
  function heartView(t) {
    var yaw=.38+Math.sin(t*.22)*.13,pitch=-.10+Math.sin(t*.19)*.025;
    return {ca:Math.cos(yaw),sa:Math.sin(yaw),cp:Math.cos(pitch),sp:Math.sin(pitch),cr:Math.cos(.10),sr:Math.sin(.10)};
  }
  function project(point,view,bx,by,bz,out) {
    var x=point.x*bx,y=point.y*by,z=point.z*bz;
    var rx=x*view.ca+z*view.sa,rz=-x*view.sa+z*view.ca;
    var ry=y*view.cp-rz*view.sp;rz=y*view.sp+rz*view.cp;
    var perspective=5/(5-rz);
    out.x=(rx*view.cr-ry*view.sr)*perspective;out.y=-(rx*view.sr+ry*view.cr)*perspective;
    out.z=rz;out.perspective=perspective;return out;
  }
  var initialView=heartView(0), scratch={};
  for(var i=0;i<640;i++){
    var p=heartPoint(i,640);project(p,initialView,1,1,1,scratch);
    p.group=(scratch.x>=0?1:0)+(scratch.y>=0?2:0);
    p.size=.85+random()*.5;p.index=i;
    p.alpha=.4+random()*.3;p.tint=i%43===0;p.screen={};particles.push(p);
  }
  var fallbackOrder=particles.slice();
  function setPhase(next) {
    if(phase===next)return;phase=next;section.dataset.phase=next;
    if(hint)hint.textContent=({converging:'Four products. One destination.',unifying:'Together, they become Dhiya.',forming:'One Dhiya. One shared heart.',emerging:'Every product, connected at the core.',connected:'Four products. One shared heartbeat.'})[next];
  }
  function updateControls() {
    section.dataset.paused=String(paused);
    if(toggle){toggle.disabled=reduced.matches;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=reduced.matches?'Motion reduced':paused?'Resume animation':'Pause animation';toggle.setAttribute('aria-label',toggle.textContent);}
  }
  function flightProgress(index,t) {
    return Math.pow(clamp((t-index*.07)/(2.1-index*.07),0,1),1.65);
  }
  function flightPoint(index,t,out) {
    var sign=corners[index],q=flightProgress(index,t),back=1-q;
    var sx=cx+sign[0]*(W*.54+60),sy=cy+sign[1]*(H*.43+42);
    var bx=cx+sign[0]*radius*1.02-sign[1]*radius*.16,by=cy+sign[1]*radius*.82;
    out.x=back*back*sx+2*back*q*bx+q*q*cx;
    out.y=back*back*sy+2*back*q*by+q*q*cy;return out;
  }
  function orbitPoint(index,time,out) {
    var angle=angles[index]+time*TAU/28;
    var x=Math.cos(angle)*orbitX,y=Math.sin(angle)*orbitY;
    // A tilted ellipse, with front/back depth encoded in scale, opacity and stacking.
    out.x=cx+x*.987-y*.16;out.y=cy+x*.16+y*.987;out.z=Math.sin(angle);
    out.scale=.82+.18*(out.z+1)/2;
    var half=halfWidths[index]*out.scale,hh=halfHeights[index]*out.scale;
    out.x=clamp(out.x,half+5,W-half-5);out.y=clamp(out.y,hh+35,H-118-hh);
    return out;
  }
  function nodePositions(t) {
    var emerge=smooth((t-6.6)/1.6);
    nodes.forEach(function(node,index){
      var position=positions[index],opacity,scale,depth=1,labelOpacity,bank=0;
      if(t<2.26){
        var progress=flightProgress(index,t);flightPoint(index,t,position);
        opacity=1-smooth((t-2.04)/.22);scale=lerp(.95,.58,progress);
        labelOpacity=1-smooth((t-.7)/.6);bank=corners[index][0]*corners[index][1]*18*(1-progress);
      }else if(t<6.6){
        position.x=cx;position.y=cy;opacity=0;scale=.3;labelOpacity=0;
      }else{
        orbitPoint(index,orbitTime,position);depth=position.z;
        position.x=lerp(cx,position.x,emerge);position.y=lerp(cy,position.y,emerge);
        scale=lerp(.3,position.scale,emerge);opacity=emerge*(.62+.38*(depth+1)/2);labelOpacity=emerge;
      }
      var cache=styles[index];
      write(node,cache,'transform','translate3d('+(position.x-cx).toFixed(2)+'px,'+(position.y-cy).toFixed(2)+'px,0) translate(-50%,-50%) rotate('+bank.toFixed(2)+'deg) scale('+scale.toFixed(3)+')');
      write(node,cache,'opacity',opacity.toFixed(3));write(node,cache,'zIndex',depth<-.12?'1':'5');
      write(node,cache,'pointerEvents',t>=COMPLETE?'':'none');
      if(labels[index]&&cache.labelOpacity!==labelOpacity.toFixed(3)){cache.labelOpacity=labelOpacity.toFixed(3);labels[index].style.opacity=cache.labelOpacity;}
    });
    if(unified){
      var resolved=smooth((t-2.04)/.40),fade=1-smooth((t-3.5)/.95);
      write(unified,unifiedStyle,'opacity',(resolved*fade).toFixed(3));
      write(unified,unifiedStyle,'transform','translate(-50%,-50%) scale('+(lerp(.62,1,resolved)+.025*Math.sin(Math.PI*resolved)).toFixed(3)+')');
    }
    if(core)core.style.opacity=smooth((t-6.0)/.7).toFixed(3);
    if(record)record.style.opacity=smooth((t-7.0)/.8).toFixed(3);
  }
  function directedTrails(t) {
    if(t<=0||t>=2.16)return;
    var head={},tail={},point={};
    for(var i=0;i<4;i++){
      var progress=flightProgress(i,t);if(progress<=0||progress>=1)continue;
      flightPoint(i,t,head);flightPoint(i,Math.max(0,t-.18),tail);
      var color=trailColors[i],alpha=smooth(progress/.10)*(1-smooth((t-2.0)/.16));
      var gradient=ctx.createLinearGradient(tail.x,tail.y,head.x,head.y);
      gradient.addColorStop(0,'rgba('+color.join(',')+',0)');gradient.addColorStop(1,'rgba('+color.join(',')+','+(.48*alpha)+')');
      ctx.beginPath();ctx.moveTo(tail.x,tail.y);
      for(var j=1;j<=12;j++){flightPoint(i,Math.max(0,t-.18)+j*Math.min(t,.18)/12,point);ctx.lineTo(point.x,point.y);}
      ctx.strokeStyle=gradient;ctx.lineWidth=2.1;ctx.stroke();
    }
  }
  function joinLight(t) {
    // The collision leaves a quiet central light, not an expanding burst.
    if(t<1.92||t>4.3)return;
    var light=smooth((t-1.92)/.4)*(1-smooth((t-3.35)/.95)),spread=radius*.39;
    var glow=ctx.createRadialGradient(cx,cy,0,cx,cy,spread);
    glow.addColorStop(0,'rgba(239,200,110,'+(.24*light)+')');
    glow.addColorStop(.4,'rgba(184,156,200,'+(.16*light)+')');glow.addColorStop(1,'rgba(184,156,200,0)');
    ctx.fillStyle=glow;ctx.fillRect(cx-spread,cy-spread,spread*2,spread*2);
  }
  function fallbackVolume(formed,view,bx,by,bz) {
    if(formed<=0)return;
    var morph=smooth((formed-.06)/.94);
    particles.forEach(function(p){
      var angle=Math.atan2(p.y,p.x),radial=Math.min(1,Math.hypot(p.x,p.y)/1.1);
      var spoke=.38*(.43+.57*Math.pow((1+Math.cos(angle*8))/2,2))*radial;
      var source={x:Math.cos(angle)*spoke,y:Math.sin(angle)*spoke,z:p.z*.035};
      project({x:lerp(source.x,p.x,morph),y:lerp(source.y,p.y,morph),z:lerp(source.z,p.z,morph)},view,bx,by,bz,p.screen);
    });
    fallbackOrder.sort(function(a,b){return a.screen.z-b.screen.z;});
    fallbackOrder.forEach(function(p){
      var screen=p.screen,depth=clamp((screen.z+.8)/1.6,0,1);
      var color=trailColors[p.group];
      ctx.fillStyle='rgba('+color.join(',')+','+((.24+.64*depth)*smooth(formed/.16))+')';ctx.beginPath();
      ctx.arc(cx+screen.x*radius,cy+screen.y*radius,clamp(p.size*(.8+.5*depth)*screen.perspective,.6,1.65),0,TAU);ctx.fill();
    });
  }
  function heartbeat(t) {
    if(reduced.matches||t<6.6)return 0;
    var p=((t-6.6)%1.22)/1.22;
    return Math.exp(-Math.pow((p-.17)/.06,2))+.5*Math.exp(-Math.pow((p-.36)/.08,2));
  }
  function render() {
    var t=reduced.matches?COMPLETE:elapsed,formed=clamp((t-3.45)/3.15,0,1);
    var pulse=heartbeat(t),bx=1+.043*pulse,by=1+.027*pulse,bz=1+.072*pulse;
    var view=heartView(reduced.matches?0:t);
    setPhase(t<2.1?'converging':t<3.45?'unifying':t<6.6?'forming':t<COMPLETE?'emerging':'connected');
    ctx.clearRect(0,0,W,H);
    if(volume&&volume.ready!==false)volume.render({cx:cx,cy:cy,radius:radius,time:reduced.matches?0:t,formed:formed,beatX:bx,beatY:by,beatZ:bz});
    else fallbackVolume(formed,view,bx,by,bz);
    directedTrails(t);joinLight(t);nodePositions(t);
  }
  function running(){return visible&&!paused&&!reduced.matches&&!document.hidden&&!pageHidden;}
  function tick(now){
    raf=0;if(!running()){last=null;lastPaint=null;return;}
    if(last!==null){var dt=Math.min((now-last)/1000,.06);elapsed+=dt;if(elapsed>=COMPLETE&&!hovered&&!focused)orbitTime+=dt;}
    last=now;
    if(lastPaint===null||now-lastPaint>=FRAME-1){render();lastPaint=now;}
    raf=requestAnimationFrame(tick);
  }
  function sync(){cancelAnimationFrame(raf);raf=0;last=null;lastPaint=null;render();if(running())raf=requestAnimationFrame(tick);}
  settle=function(){if(elapsed<COMPLETE){elapsed=COMPLETE;orbitTime=0;sync();}};
  function resize(){
    W=Math.max(1,scene.clientWidth);H=Math.max(1,scene.clientHeight);cx=W*.5;cy=H*.46;radius=Math.min(W*.32,H*.29);
    // All layout reads happen together. Each frame writes transforms only.
    halfWidths=nodes.map(function(node){return Math.max(28,node.offsetWidth/2+5);});
    halfHeights=nodes.map(function(node){return Math.max(34,node.offsetHeight/2+4);});
    orbitX=Math.min(radius*1.44,W*.5-Math.max.apply(null,halfWidths)-10);
    orbitY=Math.min(radius*.92,cy-45-Math.max.apply(null,halfHeights),H-132-cy-Math.max.apply(null,halfHeights));
    orbitX=Math.max(20,orbitX);orbitY=Math.max(20,orbitY);
    nodes.forEach(function(node){node.style.left=cx+'px';node.style.top=cy+'px';});
    if(core){core.style.left=cx+'px';core.style.top=(cy-radius*.04)+'px';}
    if(unified){unified.style.left=cx+'px';unified.style.top=cy+'px';unified.style.width=(radius*.84)+'px';}
    if(record)record.style.top=Math.min(H-100,cy+radius*1.37)+'px';
    dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    if(volume)volume.resize(W,H,dpr);render();
  }
  if(replay)replay.addEventListener('click',function(){elapsed=reduced.matches?COMPLETE:0;orbitTime=0;paused=false;updateControls();sync();});
  if(toggle)toggle.addEventListener('click',function(){if(reduced.matches)return;paused=!paused;updateControls();sync();});
  reduced.addEventListener('change',function(){elapsed=COMPLETE;orbitTime=0;paused=false;updateControls();sync();});
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',function(){pageHidden=true;sync();});
  window.addEventListener('pageshow',function(){pageHidden=false;sync();});
  if('ResizeObserver'in window)new ResizeObserver(resize).observe(scene);else window.addEventListener('resize',resize);
  if('IntersectionObserver'in window)new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;section.dataset.visible=String(visible);sync();},{threshold:.15}).observe(scene);else visible=true;
  resize();section.dataset.heartReady='true';updateControls();sync();
})();
