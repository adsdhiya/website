(function(){
  var sec=document.getElementById('lines'); if(!sec) return;
  var lis=sec.querySelectorAll('li'), shots=sec.querySelectorAll('.shot'), cur=-1;
  function set(i){ if(i===cur) return; cur=i;
    lis.forEach(function(l){ var active=+l.dataset.i===i; l.classList.toggle('on', active); if(active) l.setAttribute('aria-current','step'); else l.removeAttribute('aria-current'); });
    shots.forEach(function(s){ var active=+s.dataset.i===i; s.classList.toggle('on',active); s.setAttribute('aria-hidden',String(!active)); }); }
  var lineTop=0, lineSpan=1;
  function tick(){
    var p=Math.min(1,Math.max(0,(window.scrollY-lineTop)/lineSpan)); set(Math.min(4,Math.floor(p*5))); }
  function measureLines(){ lineTop=sec.getBoundingClientRect().top+window.scrollY; lineSpan=Math.max(1,sec.offsetHeight-window.innerHeight); tick(); }
  // Scroll events use cached geometry; only resize/font loading can change it.
  window.addEventListener('scroll',tick,{passive:true}); window.addEventListener('resize',measureLines); measureLines();
  if(typeof ResizeObserver!=='undefined') new ResizeObserver(measureLines).observe(sec);
  if(document.fonts) document.fonts.ready.then(measureLines);
  var reduce=false; try{ reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  var v=document.getElementById('bgv');
  try{ if(v && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ v.removeAttribute('autoplay'); v.pause(); } }catch(e){}
  // Paint the video onto a full-screen canvas with our own cover crop, so the frame
  // always fills the viewport regardless of how the browser sizes the <video> box.
  var c=document.getElementById('bgc'), ctx=c&&c.getContext&&c.getContext('2d');
  if(ctx){
    // Living wallpaper: the clip is played as a short stabilised segment (the camera's push-in is
    // cancelled around the rack, so the scene never changes), two players crossfade into a seamless
    // loop, and a slow breathing drift + a drifting patch of light keep it moving forever.
    var W=0,H=0,dpr=1, reduce=false, motionQuery=null; try{ motionQuery=matchMedia('(prefers-reduced-motion: reduce)'); reduce=motionQuery.matches; }catch(e){}
    var seg=(v&&v.getAttribute('data-seg')||'0,0').split(',').map(Number), K=+(v&&v.getAttribute('data-k'))||0, AN=(v&&v.getAttribute('data-anchor')||'0.5,0.5').split(',').map(Number), X=+(v&&v.getAttribute('data-fade'))||3, TOP=(v&&v.getAttribute('data-top')!=null)?+v.getAttribute('data-top'):null, ZM=+(v&&v.getAttribute('data-zoom'))||1;
    var poster=new Image(); poster.src=(v&&v.getAttribute('poster'))||'/media/hero-meadow-rack.jpg';
    var A=v, B=null, fading=false, fadeT0=0, started=false;
    if(v){ B=v.cloneNode(true); B.removeAttribute('id'); B.removeAttribute('autoplay'); B.setAttribute('aria-hidden','true'); B.muted=true; v.parentNode.insertBefore(B,v.nextSibling);
      [A,B].forEach(function(el){ el.loop=false; el.addEventListener('loadedmetadata',function(){ if(!seg[1]||seg[1]>el.duration) seg[1]=el.duration-0.05; if(el===B){ try{ B.currentTime=seg[0]; }catch(e){} } }); }); }
    function size(){
      // The soft background does not need a retina-sized 4K repaint on every frame.
      dpr=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2000000/(innerWidth*innerHeight)));
      W=Math.round(innerWidth*dpr); H=Math.round(innerHeight*dpr);
      if(c.width!==W||c.height!==H){ c.width=W; c.height=H; }
    }
    function ease(u){ u=Math.max(0,Math.min(1,u)); return u*u*(3-2*u); }
    // draw a source (video or image) with cover crop, zoom-cancel about the anchor, then the global drift
    function drawSrc(src,sw,sh,alpha,t,vt){
      var s=Math.max(W/sw,H/sh), dw=sw*s, dh=sh*s, fy=TOP!=null?TOP:((W/H>=2)?0.12:0.6), dx=(W-dw)/2, dy=(H-dh)*fy;
      if(ZM!==1){ var ay=dy; dw*=ZM; dh*=ZM; dx=(W-dw)/2; dy=ay; }
      if(vt!=null&&K){ var S=Math.exp(K*(seg[1]-vt)); var px=dx+AN[0]*dw, py=dy+AN[1]*dh; dw*=S; dh*=S; dx=px-AN[0]*dw; dy=py-AN[1]*dh; }
      var g=reduce?1.02:(1.03+0.01*Math.sin(t*6.2832/53)), ox=reduce?0:W*0.005*Math.sin(t*6.2832/71), oy=reduce?0:H*0.004*Math.sin(t*6.2832/59+1);
      var cxp=W/2, cyp=H/2; dx=cxp+(dx-cxp)*g+ox; dy=cyp+(dy-cyp)*g+oy; dw*=g; dh*=g;
      ctx.globalAlpha=alpha; try{ ctx.drawImage(src,dx,dy,dw,dh); }catch(e){} ctx.globalAlpha=1;
    }
    function light(t){ if(reduce) return; var lx=W*(0.5+0.3*Math.sin(t*6.2832/97)), ly=H*(0.22+0.1*Math.cos(t*6.2832/83)), r=W*0.55; var gr=ctx.createRadialGradient(lx,ly,0,lx,ly,r); gr.addColorStop(0,'rgba(255,236,205,.3)'); gr.addColorStop(1,'rgba(255,230,195,0)'); ctx.globalCompositeOperation='soft-light'; ctx.fillStyle=gr; ctx.fillRect(0,0,W,H); ctx.globalCompositeOperation='source-over'; }
    function ready(el){ return el&&el.readyState>=2&&el.videoWidth; }
    var stage=sec.closest('.stage'), visible=false, raf=0, last=0, lastPaint=0, elapsed=0, leaving=false;
    function active(){ return visible&&!document.hidden&&!leaving; }
    function play(el){ if(el&&el.paused){ var promise=el.play(); if(promise&&promise.catch) promise.catch(function(){}); } }
    function queue(){ if(!raf&&active()) raf=requestAnimationFrame(frame); }
    function frame(now){
      raf=0; if(!active()) return;
      if(!reduce) queue();
      // Crossfades use the same 30fps budget as the rest of the clip.
      if(!reduce&&last&&now-last<1000/30) return;
      last=now-((now-last)%(1000/30));
      elapsed+=lastPaint?Math.min((now-lastPaint)/1000,.1):0; lastPaint=now;
      var t=elapsed;
      var drewVideo=false;
      if(ready(A)){
        if(!started){ started=true; try{ if(A.currentTime<seg[0]) A.currentTime=seg[0]; }catch(e){} }
        var vt=A.currentTime; drawSrc(A,A.videoWidth,A.videoHeight,1,t,vt); drewVideo=true;
        if(!reduce){
          if(!fading && (vt>=seg[1]-X || A.ended)){ fading=true; fadeT0=t; try{ B.currentTime=seg[0]; }catch(e){} var pr=B.play(); if(pr&&pr.catch) pr.catch(function(){}); }
          if(fading){ var a=ease((t-fadeT0)/X); if(ready(B)) drawSrc(B,B.videoWidth,B.videoHeight,a,t,B.currentTime);
            if(a>=1 || A.ended && ready(B)){ var tmp=A; A=B; B=tmp; fading=false; B.pause(); try{ B.currentTime=seg[0]; }catch(e){} } }
        }
      }
      if(!drewVideo && poster.complete && poster.naturalWidth) drawSrc(poster,poster.naturalWidth,poster.naturalHeight,1,t,null);
      light(t);
    }
    function sync(){
      if(raf){ cancelAnimationFrame(raf); raf=0; }
      last=0; lastPaint=0;
      if(!active()||reduce){ if(A) A.pause(); if(B) B.pause(); }
      else{ play(A); if(fading) play(B); }
      queue();
    }
    function resize(){ size(); last=0; queue(); }
    size(); addEventListener('resize',resize,{passive:true});
    poster.addEventListener('load',queue);
    [A,B].forEach(function(el){ if(el) el.addEventListener('loadeddata',queue); });
    if(stage){ var rect=stage.getBoundingClientRect(); visible=rect.bottom>0&&rect.top<innerHeight; }
    else visible=true;
    if(stage&&typeof IntersectionObserver!=='undefined') new IntersectionObserver(function(entries){ visible=entries[0].isIntersecting; sync(); },{threshold:0}).observe(stage);
    document.addEventListener('visibilitychange',sync);
    addEventListener('pagehide',function(){ leaving=true; sync(); });
    addEventListener('pageshow',function(){ leaving=false; sync(); });
    if(motionQuery) motionQuery.addEventListener('change',function(){ reduce=motionQuery.matches; sync(); });
    sync();
  }
})();
