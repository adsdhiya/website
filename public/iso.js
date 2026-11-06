/* Isometric wireframe scenes for the hero cards. Pure SVG, brand colours from CSS vars. */
(function(){
  var NS='http://www.w3.org/2000/svg', C=Math.cos(Math.PI/6), S=Math.sin(Math.PI/6);
  function mk(tag,at,parent){ var e=document.createElementNS(NS,tag); for(var k in at) e.setAttribute(k,at[k]); if(parent) parent.appendChild(e); return e; }
  var uid=0; function id(p){ return (p||'i')+(++uid)+Math.random().toString(36).slice(2,5); }

  function Scene(svg,opts){
    this.svg=svg; this.u=opts.unit; this.ox=opts.ox; this.oy=opts.oy; this.items=[]; this.paths=[]; this.slabInfo=null;
    this.col={line:'var(--pa)',dark:'var(--pd)',f0:'#fff',f1:'color-mix(in srgb,var(--pa) 10%,#fff)',f2:'color-mix(in srgb,var(--pa) 22%,#fff)',f3:'color-mix(in srgb,var(--pa) 36%,#fff)',f4:'color-mix(in srgb,var(--pa) 55%,#fff)',f5:'color-mix(in srgb,var(--pa) 72%,#fff)'};
  }
  Scene.prototype.P=function(x,y,z){ return [this.ox+(x-y)*C*this.u, this.oy+(x+y)*S*this.u-z*this.u]; };
  Scene.prototype.pts=function(a){ var s=this; return a.map(function(p){ return s.P(p[0],p[1],p[2]).join(','); }).join(' '); };
  Scene.prototype.add=function(depth,fn){ this.items.push({d:depth,fn:fn}); };
  Scene.prototype.poly=function(g,a,fill,extra){ var at={points:this.pts(a),fill:fill,stroke:this.col.line,'stroke-width':1.1,'stroke-linejoin':'round','vector-effect':'non-scaling-stroke'}; for(var k in (extra||{})) at[k]=extra[k]; return mk('polygon',at,g); };
  Scene.prototype.line=function(g,a,b,extra){ var p=this.P(a[0],a[1],a[2]),q=this.P(b[0],b[1],b[2]); var at={x1:p[0],y1:p[1],x2:q[0],y2:q[1],stroke:this.col.line,'stroke-width':.7,'vector-effect':'non-scaling-stroke',opacity:.7}; for(var k in (extra||{})) at[k]=extra[k]; return mk('line',at,g); };

  // ---- primitives -------------------------------------------------------
  Scene.prototype.box=function(x,y,z,w,d,h,o){ o=o||{}; var s=this, dep=(o.depth!=null?o.depth:(x+w/2+y+d/2+z*0.001));
    this.add(dep,function(g){ var grp=mk('g',{'class':'it '+(o.cls||'')},g);
      var ft=o.top||s.col.f1, fl=o.left||s.col.f2, fr=o.right||s.col.f3;
      s.poly(grp,[[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],fl);
      s.poly(grp,[[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],fr);
      s.poly(grp,[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],ft);
      if(o.mesh){ s.line(grp,[x,y+d,z],[x+w,y+d,z+h],{opacity:.35}); s.line(grp,[x+w,y,z],[x+w,y+d,z+h],{opacity:.35}); s.line(grp,[x,y,z+h],[x+w,y+d,z+h],{opacity:.35}); }
      if(o.slats){ for(var i=1;i<o.slats;i++){ var zz=z+h*i/o.slats; s.line(grp,[x,y+d,zz],[x+w,y+d,zz],{opacity:.5}); s.line(grp,[x+w,y,zz],[x+w,y+d,zz],{opacity:.5}); } }
      if(o.vslats){ for(var j=1;j<o.vslats;j++){ var yy=y+d*j/o.vslats; s.line(grp,[x+w,yy,z],[x+w,yy,z+h],{opacity:.4}); } }
      if(o.led){ var pl=o.ledface==='y'?s.P(x+w*0.5,y+d,z+h*0.82):s.P(x+w,y+d*0.5,z+h*0.82); var c=mk('circle',{cx:pl[0],cy:pl[1],r:1.7,fill:s.col.dark,'class':'led'},grp); c.style.animationDelay=(Math.random()*4).toFixed(2)+'s';
        if(o.led>1){ for(var k=1;k<o.led;k++){ var p2=o.ledface==='y'?s.P(x+w*0.5,y+d,z+h*(0.82-k*0.1)):s.P(x+w,y+d*0.5,z+h*(0.82-k*0.1)); var c2=mk('circle',{cx:p2[0],cy:p2[1],r:1.4,fill:s.col.dark,'class':'led'},grp); c2.style.animationDelay=(Math.random()*4).toFixed(2)+'s'; } } }
      return grp; }); return this; };
  Scene.prototype.cyl=function(x,y,z,r,h,n,o){ o=o||{}; var s=this, dep=(o.depth!=null?o.depth:(x+y+z*0.001));
    this.add(dep,function(g){ var grp=mk('g',{'class':'it '+(o.cls||'')},g), i, a0, a1;
      for(i=0;i<n;i++){ a0=Math.PI*0.75+i/n*2*Math.PI; a1=Math.PI*0.75+(i+1)/n*2*Math.PI; var x0=x+Math.cos(a0)*r,y0=y+Math.sin(a0)*r,x1=x+Math.cos(a1)*r,y1=y+Math.sin(a1)*r;
        var facing=Math.cos((a0+a1)/2-Math.PI/4); var f=facing>0.6?s.col.f3:facing>0?s.col.f2:s.col.f1; if(o.light) f=facing>0.6?s.col.f2:s.col.f1;
        s.poly(grp,[[x0,y0,z],[x1,y1,z],[x1,y1,z+h],[x0,y0,z+h]],f,{'stroke-width':.6,opacity:.95}); }
      var top=[]; for(i=0;i<n;i++){ a0=i/n*2*Math.PI; top.push([x+Math.cos(a0)*r,y+Math.sin(a0)*r,z+h]); } s.poly(grp,top,o.top||s.col.f1);
      if(o.spokes){ var c=s.P(x,y,z+h); for(i=0;i<n;i+=2){ var p=s.P(top[i][0],top[i][1],top[i][2]); mk('line',{x1:c[0],y1:c[1],x2:p[0],y2:p[1],stroke:s.col.line,'stroke-width':.6,opacity:.5},grp); } }
      if(o.fins){ for(i=0;i<o.fins;i++){ var fa=Math.PI*0.9+i/(o.fins)*Math.PI*0.9; var fx=x+Math.cos(fa)*r,fy=y+Math.sin(fa)*r; s.poly(grp,[[fx,fy,z+h*0.15],[fx+Math.cos(fa)*0.22,fy+Math.sin(fa)*0.22,z+h*0.15],[fx+Math.cos(fa)*0.22,fy+Math.sin(fa)*0.22,z+h*0.85],[fx,fy,z+h*0.85]],s.col.f2,{'stroke-width':.6}); } }
      return grp; }); return this; };
  Scene.prototype.prismXZ=function(outline,y,d,o){ o=o||{}; var s=this, cx=0; outline.forEach(function(p){cx+=p[0];}); cx/=outline.length; var dep=(o.depth!=null?o.depth:(cx+y+d/2));
    this.add(dep,function(g){ var grp=mk('g',{'class':'it '+(o.cls||'')},g), i;
      var back=outline.map(function(p){return [p[0],y,p[1]];}), front=outline.map(function(p){return [p[0],y+d,p[1]];});
      s.poly(grp,back,s.col.f1,{opacity:.9});
      for(i=0;i<outline.length;i++){ var j=(i+1)%outline.length; s.poly(grp,[back[i],back[j],front[j],front[i]],(outline[j][0]>outline[i][0])?s.col.f1:s.col.f3,{opacity:.95}); }
      s.poly(grp,front,o.front||s.col.f2); if(o.lines){ for(i=0;i<o.lines;i++){ var zz=outline[0][1]+(outline[2][1]-outline[0][1])*(0.25+i*0.18); s.line(grp,[outline[0][0]+0.12,y+d,zz],[outline[1][0]-0.12,y+d,zz],{opacity:.6,'stroke-width':1}); } }
      return grp; }); return this; };
  Scene.prototype.patch=function(x,y,z,w,d,fill,o){ o=o||{}; var s=this; this.add(o.depth!=null?o.depth:(x+y-50),function(g){ var grp=mk('g',{'class':'it'},g); var at={}; if(o.dash) at['stroke-dasharray']='4 3'; if(o.stroke) at.stroke=o.stroke; s.poly(grp,[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]],fill,at);
      if(o.grid){ var st=o.grid,i; for(i=st;i<w-0.01;i+=st) s.line(grp,[x+i,y,z],[x+i,y+d,z],{opacity:.18,'stroke-width':.6}); for(i=st;i<d-0.01;i+=st) s.line(grp,[x,y+i,z],[x+w,y+i,z],{opacity:.18,'stroke-width':.6}); }
      if(o.centre){ s.line(grp,o.centre[0],o.centre[1],{opacity:.6,'stroke-dasharray':'6 5','stroke-width':1}); } return grp; }); return this; };
  Scene.prototype.slab=function(x,y,w,d,t){ this.slabInfo=[x,y,w,d]; return this.box(x,y,-t,w,d,t,{depth:-1000,top:this.col.f0,left:this.col.f2,right:this.col.f3,cls:'slab'}); };
  Scene.prototype.rack=function(x,y,o){ o=o||{}; return this.box(x,y,0,o.w||0.6,o.d||0.6,o.h||1.9,{slats:o.slats||8,led:o.led==null?1:o.led,ledface:o.face||'x',top:o.top,left:o.left,right:o.right,cls:'rack '+(o.cls||'')}); };
  Scene.prototype.rackRow=function(x,y,n,along,o){ o=o||{}; var i; for(i=0;i<n;i++){ var rx=along==='x'?x+i*(o.gap||0.75):x, ry=along==='x'?y:y+i*(o.gap||0.75); this.rack(rx,ry,{slats:o.slats||8,led:o.led===false?0:(o.led||1),face:along==='x'?'y':'x',top:o.top,left:o.left,right:o.right,h:o.h,w:o.w,d:o.d,cls:o.cls}); } return this; };
  // thin low wall, split into short segments so depth sorting stays local
  Scene.prototype.wall=function(x,y,len,axis,h,o){ o=o||{}; var seg=0.6, n=Math.ceil(len/seg), i; for(i=0;i<n;i++){ var l=Math.min(seg,len-i*seg); if(axis==='x') this.box(x+i*seg,y,0,l,0.1,h,{top:o.top||this.col.f1,left:o.left||this.col.f1,right:o.right||this.col.f2,cls:o.cls||'wall'}); else this.box(x,y+i*seg,0,0.1,l,h,{top:o.top||this.col.f1,left:o.left||this.col.f1,right:o.right||this.col.f2,cls:o.cls||'wall'}); } return this; };
  Scene.prototype.pipe=function(x,y,z,len,axis,o){ o=o||{}; var t=o.t||0.14, seg=0.7, n=Math.ceil(len/seg), i, f=o.f||this.col.f4; for(i=0;i<n;i++){ var l=Math.min(seg,len-i*seg); if(axis==='x') this.box(x+i*seg,y,z,l,t,t,{top:f,left:f,right:f,cls:'pipe'}); else if(axis==='y') this.box(x,y+i*seg,z,t,l,t,{top:f,left:f,right:f,cls:'pipe'}); else this.box(x,y,z+i*seg,t,t,l,{top:f,left:f,right:f,cls:'pipe'}); } return this; };
  // spinning fan drawn on a horizontal surface
  Scene.prototype.fan=function(x,y,z,r,o){ o=o||{}; var s=this; this.add((o.depth!=null?o.depth:(x+y+z*0.001+0.3)),function(g){ var p=s.P(x,y,z); var grp=mk('g',{'class':'it fan'},g);
      var iso=mk('g',{transform:'matrix('+(C*s.u)+','+(S*s.u)+','+(-C*s.u)+','+(S*s.u)+','+p[0]+','+p[1]+')'},grp);
      mk('circle',{cx:0,cy:0,r:r,fill:s.col.f0,stroke:s.col.line,'stroke-width':1,'vector-effect':'non-scaling-stroke'},iso);
      mk('circle',{cx:0,cy:0,r:r*0.82,fill:'none',stroke:s.col.line,'stroke-width':.6,'vector-effect':'non-scaling-stroke',opacity:.6},iso);
      var bl=mk('g',{},iso); for(var i=0;i<4;i++){ var a=i*Math.PI/2; mk('path',{d:'M0 0 L'+(Math.cos(a-0.35)*r*0.8)+' '+(Math.sin(a-0.35)*r*0.8)+' A'+(r*0.8)+' '+(r*0.8)+' 0 0 1 '+(Math.cos(a+0.2)*r*0.8)+' '+(Math.sin(a+0.2)*r*0.8)+' Z',fill:s.col.f3,stroke:s.col.line,'stroke-width':.8,'vector-effect':'non-scaling-stroke'},bl); }
      mk('circle',{cx:0,cy:0,r:r*0.16,fill:s.col.dark},iso);
      mk('animateTransform',{attributeName:'transform',type:'rotate',from:'0',to:'360',dur:(o.dur||1.8)+'s',repeatCount:'indefinite'},bl); return grp; }); return this; };
  // small truck, cab at the +x end, driving along x
  // small truck. axis 'x': cab at the +x end. axis 'y': cab at the -y end (driving into the scene)
  Scene.prototype.truck=function(x,y,o){ o=o||{}; var s=this, len=1.7, wd=0.8, F=s.col;
    if(o.axis==='y'){ var cy=y-0.65; this.box(x,cy,0.3,wd,0.65,0.7,{top:F.f1,left:F.f2,right:F.f3,depth:x+wd/2+cy+0.33}); this.box(x,y,0.3,wd,len,0.95,{top:F.f0,left:F.f1,right:F.f2,vslats:3,depth:x+wd/2+y+len/2});
      this.box(x+0.1,cy+0.1,1.0,0.6,0.45,0.08,{top:F.f4,left:F.f4,right:F.f4,depth:x+0.4+cy+0.33+0.01});
      [[x-0.05,cy+0.1],[x+wd-0.07,cy+0.1],[x-0.05,y+len-0.5],[x+wd-0.07,y+len-0.5]].forEach(function(w){ s.box(w[0],w[1],0,0.12,0.42,0.42,{top:F.f4,left:F.f5,right:F.f5,depth:w[0]+0.06+w[1]+0.21+0.02}); }); return this; }
    function wheel(cx,yy){ var pts=[],i; for(i=0;i<10;i++){ var a=i/10*2*Math.PI; pts.push([cx+Math.cos(a)*0.22,0.22+Math.sin(a)*0.22]); } s.prismXZ(pts,yy,0.12,{front:F.f4,depth:cx+yy+0.06}); }
    wheel(x+0.4,y-0.02); wheel(x+1.9,y-0.02); this.box(x,y,0.3,len,wd,0.95,{top:F.f0,left:F.f1,right:F.f2,slats:2,depth:x+len/2+y+wd/2}); this.box(x+len,y,0.3,0.65,wd,0.7,{top:F.f1,left:F.f2,right:F.f3,depth:x+len+0.33+y+wd/2});
    this.box(x+len+0.1,y+0.1,1.0,0.45,0.6,0.08,{top:F.f4,left:F.f4,right:F.f4,depth:x+len+0.4+y+0.4+0.01}); wheel(x+0.4,y+wd-0.1); wheel(x+1.9,y+wd-0.1); return this; };
  Scene.prototype.desk=function(x,y,o){ o=o||{}; this.box(x,y,0,o.w||1.4,0.55,0.5,{top:this.col.f0}); this.box(x+0.25,y+0.08,0.5,0.4,0.05,0.3,{right:this.col.f4,left:this.col.f4,top:this.col.f1}); if(o.two) this.box(x+0.8,y+0.08,0.5,0.4,0.05,0.3,{right:this.col.f4,left:this.col.f4,top:this.col.f1}); return this; };
  // a floating document card standing in the x–z plane
  Scene.prototype.card=function(x,y,z,o){ o=o||{}; var s=this; this.add(x+y+200,function(g){ var grp=mk('g',{'class':'it float'},g); var w=0.9,h=1.15;
      s.poly(grp,[[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]],'#fff',{'stroke-width':1.2}); for(var i=0;i<4;i++){ s.line(grp,[x+0.12,y,z+h-0.22-i*0.17],[x+w-(i===3?0.45:0.12),y,z+h-0.22-i*0.17],{opacity:.7,'stroke-width':1.1}); }
      s.line(grp,[x+0.12,y,z+0.22],[x+0.5,y,z+0.22],{opacity:.9,'stroke-width':1.4,stroke:s.col.dark}); var p=s.P(x+w-0.2,y,z+0.26); mk('circle',{cx:p[0],cy:p[1],r:5,fill:'none',stroke:s.col.dark,'stroke-width':1.2},grp); mk('circle',{cx:p[0],cy:p[1],r:2,fill:s.col.dark},grp);
      var q=s.P(x+w/2,y,z-0.05); var sh=mk('ellipse',{cx:q[0],cy:q[1]+8,rx:22,ry:5,fill:s.col.dark,opacity:.12},grp); return grp; }); return this; };
  // dashed tether that flows from a to b
  Scene.prototype.tether=function(a,b,o){ o=o||{}; var s=this; this.add(o.depth!=null?o.depth:(a[0]+a[1]+a[2]*0.001+20),function(g){ return s.line(g,a,b,{opacity:.55,'stroke-dasharray':'4 4','class':'flow','stroke-width':1}); }); return this; };
  Scene.prototype.thread=function(points,o){ this.paths.push({p:points,o:o||{}}); return this; };
  Scene.prototype.marker=function(x,y,z,kind,o){ o=o||{}; var s=this; this.add(x+y+z+50,function(g){ var p=s.P(x,y,z); var grp=mk('g',{'class':'it mark'},g); var sc=o.scale||1;
      if(kind==='heart'){ var hg=mk('g',{transform:'translate('+p[0]+','+p[1]+') scale('+(2.2*sc)+')'},grp); mk('path',{d:'M0 6 C-7 -1 -12 -8 -6 -11 C-3 -12 0 -10 0 -7 C0 -10 3 -12 6 -11 C12 -8 7 -1 0 6 Z',fill:s.col.dark,'class':'beat'},hg); }
      else if(kind==='bell'){ var bg=mk('g',{transform:'translate('+p[0]+','+p[1]+') scale('+(1.6*sc)+')'},grp); mk('path',{d:'M-6 2 Q-6 -8 0 -9 Q6 -8 6 2 L8 4 L-8 4 Z',fill:s.col.dark,'class':'ring'},bg); mk('circle',{cx:0,cy:6,r:1.8,fill:s.col.dark},bg); }
      else if(kind==='none'){ }
      else { mk('circle',{cx:p[0],cy:p[1],r:4*sc,fill:s.col.dark,'class':'beat'},grp); }
      mk('circle',{cx:p[0],cy:p[1],r:14*sc,fill:'none',stroke:s.col.dark,'stroke-width':1,'class':'halo'},grp); return grp; }); return this; };
  // a group that slides along a world vector forever (e.g. a truck on a road)
  Scene.prototype.mover=function(build,from,delta,dur,depth){ var s=this; this.add(depth,function(g){ var grp=mk('g',{'class':'it'},g); var sub=new Scene(s.svg,{unit:s.u,ox:s.ox,oy:s.oy}); build(sub); sub.items.sort(function(a,b){return a.d-b.d;}); sub.items.forEach(function(it){ var el=it.fn(grp); if(el){ el.style.animation='none'; el.style.opacity=1; } });
      var a=s.P(0,0,0), b=s.P(delta[0],delta[1],0); var dx=b[0]-a[0], dy=b[1]-a[1];
      mk('animateTransform',{attributeName:'transform',type:'translate',values:'0 0;'+dx+' '+dy,keyTimes:'0;1',dur:dur+'s',repeatCount:'indefinite',calcMode:'linear'},grp);
      mk('animate',{attributeName:'opacity',values:'0;1;1;0',keyTimes:'0;.08;.92;1',dur:dur+'s',repeatCount:'indefinite'},grp); return grp; }); return this; };

  Scene.prototype.render=function(){ var s=this, svg=this.svg; this.items.sort(function(a,b){return a.d-b.d;});
    if(this.slabInfo){ var si=this.slabInfo, c=s.P(si[0]+si[2]/2,si[1]+si[3]/2,-0.5), gid=id('sh'); var defs=mk('defs',{},svg), rg=mk('radialGradient',{id:gid,cx:'50%',cy:'50%',r:'50%'},defs); mk('stop',{offset:'0','stop-color':'var(--pa)','stop-opacity':'.22'},rg); mk('stop',{offset:'1','stop-color':'var(--pa)','stop-opacity':'0'},rg);
      mk('ellipse',{cx:c[0],cy:c[1]+40,rx:(si[2]+si[3])*C*s.u*0.5,ry:(si[2]+si[3])*S*s.u*0.5,fill:'url(#'+gid+')','class':'shadow'},svg); }
    var floor=mk('g',{'class':'scene floor'},svg), tg=mk('g',{'class':'threads'},svg), g=mk('g',{'class':'scene'},svg); var n=this.items.length; this.items.forEach(function(it,i){ var el=it.fn(it.d<-10?floor:g); if(el&&el.style) el.style.animationDelay=(0.1+1.6*i/n).toFixed(2)+'s'; });
    this.paths.forEach(function(t,k){ var d=t.p.map(function(p,i){ var q=s.P(p[0],p[1],p[2]); return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1); }).join(' ');
      var col=t.o.col||s.col.dark, pg=mk('g',{'class':'thread'},tg); var path=mk('path',{d:d,fill:'none',stroke:col,'stroke-width':t.o.w||1.6,'stroke-linejoin':'round','stroke-linecap':'round'},pg);
      var L=path.getTotalLength(); path.setAttribute('stroke-dasharray',L); path.setAttribute('stroke-dashoffset',L); path.style.animation='draw 2.2s cubic-bezier(.4,0,.2,1) '+(1.4+k*0.35)+'s forwards';
      var dur=Math.max(2.8,L/110).toFixed(1), beg=(3.8+k*0.7)+'s', dot=mk('circle',{r:3.2,fill:col,opacity:0},pg); var am=mk('animateMotion',{dur:dur+'s',repeatCount:'indefinite',begin:beg,rotate:'auto'},dot); mk('mpath',{href:'#'+(path.id=id('th'))},am);
      mk('animate',{attributeName:'opacity',values:'0;1;1;0',keyTimes:'0;.05;.95;1',dur:dur+'s',repeatCount:'indefinite',begin:beg},dot); }); };

  // ------------------------------------------------------------- scenes
  var SCENES={
    // DIL · the whole building, the heart in the hall, pulses to every room
    dil:function(s){ var f=s.col; s.slab(0,0,7.2,6.2,0.5); s.patch(0.3,0.3,0,6.6,5.6,f.f0,{grid:0.5});
      s.cyl(0.95,1.9,0,0.45,1.1,14,{spokes:true,fins:4}); s.box(1.6,0.5,0,0.8,0.7,1.4,{slats:3,led:1});
      s.box(3.3,0.5,0,1.7,1.1,0.9,{mesh:true,top:f.f1}); s.fan(3.8,1.05,0.9,0.36); s.fan(4.55,1.05,0.9,0.36,{dur:2.3});
      s.rackRow(5.6,0.8,4,'y',{slats:9,h:1.8,gap:0.8}); s.box(5.6,4.1,0,0.6,0.5,1.15,{slats:2,led:1});
      s.box(0.6,4.1,0.5,0.9,0.08,0.85,{right:f.f4,left:f.f4,top:f.f1}); s.desk(0.6,4.6,{two:true,w:1.5});
      s.truck(2.5,4.5); s.box(2.3,5.35,0,0.45,0.45,0.4,{mesh:true});
      s.thread([[3.8,3.3,0.1],[0.95,3.3,0.1],[0.95,1.9,0.1]]); s.thread([[3.8,3.3,0.1],[3.8,2.0,0.1],[2.0,2.0,0.1],[2.0,1.2,0.1]]); s.thread([[3.8,3.3,0.1],[4.2,3.3,0.1],[4.2,1.6,0.1]]); s.thread([[3.8,3.3,0.1],[5.3,3.3,0.1],[5.3,1.1,0.1],[5.6,1.1,0.1]]);
      s.thread([[3.8,3.3,0.1],[1.3,3.3,0.1],[1.3,4.3,0.1],[1.3,4.6,0.1]]); s.thread([[3.8,3.3,0.1],[3.4,3.3,0.1],[3.4,4.5,0.1]]);
      s.thread([[3.8,3.3,0.1],[3.8,3.3,1.9]],{w:1.2}); s.marker(3.8,3.3,2.15,'heart'); },
    // Ayana · the tenancy map: gate, customer blocks, a reserved block becoming real, the contract card
    ayana:function(s){ var f=s.col; s.slab(0,0,7.2,6.4,0.5); s.patch(0.3,0.3,0,6.6,4.8,f.f0,{grid:0.5});
      s.patch(0.6,0.6,0.02,2.8,1.9,f.f3); s.patch(3.8,0.6,0.02,2.8,1.9,f.f2); s.patch(0.6,2.8,0.02,2.8,1.9,f.f1); s.patch(3.8,2.8,0.02,2.8,1.9,'none',{dash:true,stroke:f.dark});
      s.rackRow(1.5,0.75,2,'x',{slats:9,h:1.5,gap:0.85}); s.box(0.8,0.75,0,0.45,0.6,1.05,{slats:2,led:1});
      s.rackRow(4.7,0.75,2,'x',{slats:9,h:1.5,gap:0.85}); s.box(4.0,0.75,0,0.45,0.6,1.05,{slats:2,led:1});
      s.rackRow(1.5,2.95,2,'x',{slats:9,h:1.5,gap:0.85}); s.box(0.8,2.95,0,0.45,0.6,1.05,{slats:2,led:1});
      for(var i=0;i<2;i++) s.rack(4.7+i*0.85,2.95,{slats:9,h:1.5,led:0,top:f.f0,left:f.f0,right:f.f1,face:'y',cls:'ghost'}); s.box(4.0,2.95,0,0.45,0.6,1.05,{slats:2,led:0,top:f.f0,left:f.f0,right:f.f1,cls:'ghost'});
      s.box(1.0,5.5,0,0.42,0.42,2.4,{depth:40}); s.box(2.7,5.5,0,0.42,0.42,2.4,{depth:41}); s.box(1.0,5.5,2.4,2.12,0.42,0.38,{depth:42,top:f.f1});
      s.desk(4.4,5.45,{two:true}); s.box(6.2,5.45,0,0.5,0.5,0.95,{slats:3,led:1});
      s.card(4.75,3.5,2.0); s.marker(5.2,3.75,0.4,'none');
      s.thread([[2.06,6.3,0.1],[2.06,5.5,0.1],[2.06,2.65,0.1],[5.2,2.65,0.1],[5.2,3.75,0.1]]); s.thread([[5.2,3.75,0.1],[5.2,5.1,0.1],[5.1,5.1,0.1],[5.1,5.45,0.1]]); },
    // Neev · the power and cooling train that keeps the floor alive
    neev:function(s){ var f=s.col; s.slab(0,0,8,6.2,0.5); s.patch(0.3,0.3,0,7.4,5.6,f.f0,{grid:0.5});
      s.cyl(0.95,0.95,0,0.45,1.1,14,{spokes:true,fins:4}); for(var i=0;i<4;i++){ s.box(0.35,0.35+i*0.45,0,0.07,0.07,0.6); s.box(0.4+i*0.45,0.32,0,0.07,0.07,0.6); } s.pipe(0.35,0.36,0.42,1.8,'x',{t:0.04,f:f.f3}); s.pipe(0.36,0.35,0.42,1.8,'y',{t:0.04,f:f.f3});
      s.box(2.0,0.5,0,1.2,0.8,0.85,{slats:2,vslats:4,top:f.f1}); s.cyl(2.3,0.9,0.85,0.12,0.7,8,{top:f.f4});
      s.box(3.6,0.5,0,1.0,0.7,1.5,{slats:3,led:1}); s.box(4.9,0.5,0,0.9,0.9,1.3,{slats:3,led:2}); s.box(4.9,1.55,0,0.9,0.32,0.85,{slats:3}); s.box(4.9,1.95,0,0.9,0.32,0.85,{slats:3});
      s.rackRow(6.6,1.0,4,'y',{slats:9,h:1.8,gap:0.8}); s.box(6.6,4.3,0,0.6,0.5,1.15,{slats:2,led:1});
      s.box(0.7,3.6,0,1.6,1.1,0.9,{mesh:true,top:f.f1}); s.fan(1.15,4.15,0.9,0.36); s.fan(1.85,4.15,0.9,0.36,{dur:2.4});
      s.pipe(2.3,4.1,0.55,1.2,'x'); s.box(3.5,3.9,0,0.7,1.0,1.2,{slats:4}); s.fan(3.85,4.4,1.2,0.27,{dur:1.4});
      s.thread([[0.95,0.95,0.1],[0.95,2.3,0.1],[4.1,2.3,0.1],[4.1,1.2,0.1],[5.35,1.2,0.1],[5.35,2.3,0.1],[5.35,4.55,0.1],[6.6,4.55,0.1],[6.9,4.55,0.1],[6.9,1.3,0.1]]);
      s.thread([[1.5,4.15,0.9],[2.3,4.15,0.6],[3.5,4.15,0.6],[3.85,4.4,0.6],[4.2,4.4,0.3],[4.2,3.0,0.3],[6.3,3.0,0.3],[6.3,1.3,0.3]],{col:s.col.line,w:1.2});
      s.marker(0.95,0.95,1.4,'dot'); },
    // Vitana · the NOC (kept)
    vitana:function(s){ s.slab(0,0,8,6.5,0.5); s.patch(0.3,0.3,0,4.6,5.9,s.col.f1); s.patch(5.2,0.3,0,2.5,5.9,s.col.f0);
      for(var i=0;i<6;i++){ var t=i/5-0.5; s.box(0.7+i*0.62,0.5+t*t*1.2,0.7,0.6,0.1,1.4,{right:s.col.f4,left:s.col.f4,top:s.col.f1}); }
      for(var r=0;r<2;r++) for(i=0;i<2;i++){ s.box(0.9+i*1.9,2.6+r*1.5,0,1.5,0.5,0.5,{top:s.col.f0}); s.box(1.2+i*1.9,2.7+r*1.5,0.5,0.4,0.05,0.3,{right:s.col.f4,left:s.col.f4}); s.box(1.8+i*1.9,2.7+r*1.5,0.5,0.4,0.05,0.3,{right:s.col.f4,left:s.col.f4}); }
      s.box(5.0,0.3,0,0.1,5.9,2.1,{top:s.col.f0,left:s.col.f0,right:s.col.f1,cls:'glass'});
      s.rackRow(5.8,0.8,6,'y',{slats:10}); s.rackRow(6.9,0.8,6,'y',{slats:10});
      s.thread([[6.1,3.1,1.9],[6.1,3.1,2.5],[5.6,3.1,2.5],[5.6,3.1,0.1],[5.6,1.9,0.1],[2.6,1.9,0.1],[2.6,1.0,0.1],[2.6,1.0,1.5]]); s.marker(6.1,3.1,2.8,'bell'); },

    // Aire · the GPU pod: liquid-cooled racks, CDU, spine, storage, busway, and the cloud they feed
    aire:function(s){ var f=s.col; s.slab(0,0,7.2,6.4,0.5); s.patch(0.3,0.3,0,6.6,5.8,f.f0,{grid:0.5});
      for(var i=0;i<3;i++) s.rack(5.3,0.8+i*1.25,{w:0.85,d:0.9,h:2.2,slats:10,led:3,face:'x'}); s.pipe(5.2,0.7,1.9,3.6,'y'); s.box(5.2,4.6,0,1.2,1.2,1.5,{mesh:true,top:f.f1}); s.fan(5.8,5.2,1.5,0.4,{dur:1.5}); s.pipe(5.2,4.3,1.5,0.4,'z'); s.pipe(5.2,4.3,1.5,0.14,'y');
      s.rack(0.8,2.3,{w:0.85,d:0.9,h:2.2,slats:16,led:3,face:'x'}); s.box(0.8,4.5,0,2.6,0.9,1.1,{slats:6,led:2,ledface:'y'}); s.box(1.6,0.7,0,1.0,0.9,0.9,{slats:3,led:1});
      s.cyl(3.3,3.1,4.1,1.2,0.6,8,{light:true}); s.cyl(2.25,3.25,3.95,0.75,0.5,8,{light:true}); s.cyl(4.35,3.2,3.9,0.8,0.55,8,{light:true}); s.cyl(3.25,3.2,4.7,0.7,0.45,8,{light:true});
      for(i=0;i<3;i++) s.tether([5.3,1.25+i*1.25,2.2],[3.3,3.1,4.1]); s.tether([1.2,2.75,2.2],[3.3,3.1,4.1]); s.tether([2.1,4.95,1.1],[3.3,3.1,4.1]);
      s.thread([[5.8,4.6,1.5],[5.8,4.3,0.1],[4.6,4.3,0.1],[4.6,3.1,0.1],[3.3,3.1,0.1]]); s.thread([[3.3,3.1,0.1],[3.3,3.1,4.1]],{w:1.2}); s.marker(3.25,3.2,5.15,'dot'); },
    // About · the campus: gate, roads, three halls, substation, tanks, and a truck on its way in
    about:function(s){ var f=s.col; s.slab(0,0,9.6,8.6,0.5);
      s.patch(4.3,0.3,0.01,1.2,8.0,f.f2,{centre:[[4.9,0.5,0.02],[4.9,8.2,0.02]]}); s.patch(0.3,4.0,0.01,9,1.0,f.f2);
      // halls
      s.box(0.6,0.6,0,3.3,2.9,1.5,{mesh:true,top:f.f1}); s.box(1.0,1.0,1.5,0.7,0.7,0.35,{slats:2}); s.box(2.1,1.0,1.5,0.7,0.7,0.35,{slats:2}); s.fan(3.3,1.4,1.5,0.3,{dur:2.2}); s.box(1.0,2.4,1.5,2.6,0.4,0.25,{top:f.f2});
      s.box(5.9,0.6,0,3.3,2.9,1.5,{mesh:true,top:f.f1}); s.box(6.3,1.0,1.5,0.7,0.7,0.35,{slats:2}); s.fan(7.6,1.4,1.5,0.3,{dur:1.9}); s.fan(8.5,1.4,1.5,0.3,{dur:2.6}); s.box(6.3,2.4,1.5,2.6,0.4,0.25,{top:f.f2});
      s.box(0.6,5.4,0,3.3,2.6,1.5,{mesh:true,top:f.f1}); s.box(1.0,5.8,1.5,0.7,0.7,0.35,{slats:2}); s.box(2.1,5.8,1.5,0.7,0.7,0.35,{slats:2}); s.fan(3.3,6.2,1.5,0.3,{dur:2.0});
      // substation and tanks
      s.patch(5.9,5.4,0,2.4,2.6,f.f1); s.cyl(6.6,6.2,0,0.4,0.95,12,{spokes:true,fins:3}); s.cyl(7.6,6.2,0,0.4,0.95,12,{spokes:true,fins:3}); s.box(6.3,7.2,0,1.6,0.5,0.9,{slats:3,led:1});
      for(var i=0;i<5;i++){ s.box(5.95+i*0.58,5.42,0,0.07,0.07,0.6); s.box(5.92,5.5+i*0.6,0,0.07,0.07,0.6); } s.pipe(5.95,5.43,0.45,2.3,'x',{t:0.04,f:f.f3}); s.pipe(5.93,5.45,0.45,2.5,'y',{t:0.04,f:f.f3});
      s.cyl(8.9,5.8,0,0.28,1.5,10,{top:f.f2}); s.cyl(8.9,6.7,0,0.28,1.5,10,{top:f.f2}); s.cyl(8.9,7.6,0,0.28,1.5,10,{top:f.f2});
      // perimeter fence along the back edges
      for(i=0;i<16;i++){ s.box(0.3+i*0.6,0.25,0,0.07,0.07,0.5); } for(i=0;i<14;i++){ s.box(0.25,0.3+i*0.6,0,0.07,0.07,0.5); } s.pipe(0.3,0.26,0.4,9.1,'x',{t:0.04,f:f.f3}); s.pipe(0.26,0.3,0.4,8.1,'y',{t:0.04,f:f.f3});
      // the gate and the guard hut
      s.prismXZ([[4.1,0],[4.1,2.4],[4.9,3.3],[5.7,2.4],[5.7,0],[5.4,0],[5.4,2.2],[4.9,2.75],[4.4,2.2],[4.4,0]],8.1,0.45,{front:f.f2,depth:60}); s.box(5.9,7.9,0,0.7,0.65,0.7,{top:f.f3,led:1});
      // a truck heading in from the gate
      s.mover(function(t){ t.truck(4.5,6.6,{axis:'y'}); },[4.5,6.6],[0,-5.2],11,12.5);
      s.thread([[4.9,8.5,0.1],[4.9,4.5,0.1],[2.2,4.5,0.1],[2.2,3.6,0.1]]); s.marker(2.2,3.6,0.4,'dot'); }
  };
  var FIT={dil:{unit:64,ox:400,oy:330},ayana:{unit:63,ox:400,oy:300},neev:{unit:60,ox:400,oy:330},vitana:{unit:60,ox:400,oy:340},aire:{unit:63,ox:400,oy:370},about:{unit:47,ox:400,oy:300}};
  document.querySelectorAll('svg.iso').forEach(function(svg){ var name=svg.getAttribute('data-scene'); if(!SCENES[name]) return; svg.setAttribute('viewBox','0 0 800 1000'); svg.style.overflow='visible'; var sc=new Scene(svg,FIT[name]); SCENES[name](sc); sc.render(); });
})();
