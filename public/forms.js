/* Contact forms. Posts JSON to data-endpoint when one is set (the Astro API route);
   without an endpoint (static preview) it falls back to a pre-filled mailto. */
(function(){
  var forms=[].slice.call(document.querySelectorAll('form.cf')); if(!forms.length) return;
  function val(f,n){ var el=f.elements[n]; return el?String(el.value||'').trim():''; }
  function show(f,sel,on){ var el=f.querySelector(sel); if(el) el.hidden=!on; }
  forms.forEach(function(f){
    f.addEventListener('submit',function(e){ e.preventDefault();
      if(val(f,'website')) return;                                     // honeypot
      var req=[].slice.call(f.querySelectorAll('[required]')), bad=req.filter(function(i){ return !i.value.trim()||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)); });
      req.forEach(function(i){ i.classList.remove('bad'); i.setAttribute('aria-invalid','false'); }); if(bad.length){ bad.forEach(function(i){ i.classList.add('bad'); i.setAttribute('aria-invalid','true'); }); bad[0].focus(); return; }
      var data={kind:f.getAttribute('data-kind')||'partner',page:location.pathname}; [].slice.call(f.elements).forEach(function(el){ if(el.name&&el.name!=='website') data[el.name]=el.value; });
      var btn=f.querySelector('button[type=submit]'), label=btn?btn.textContent:''; if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
      var endpoint=f.getAttribute('data-endpoint'), to=f.getAttribute('data-to')||'hi@dhiya.ai';
      function done(ok){ if(btn){ btn.disabled=false; btn.textContent=label; } if(ok){ f.classList.add('sent'); var echo=f.querySelector('[data-echo]'); if(echo) echo.textContent=data.email||''; show(f,'.ok',true); show(f,'.err',false); } else { show(f,'.err',true); } }
      if(endpoint){ fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){ done(r.ok); }).catch(function(){ done(false); }); return; }
      var lines=Object.keys(data).filter(function(k){ return k!=='kind'&&k!=='page'&&data[k]; }).map(function(k){ return k.charAt(0).toUpperCase()+k.slice(1)+': '+data[k]; });
      var subject=(data.kind==='investor'?'Investor intro':'Design partner enquiry')+' · '+(data.company||data.firm||data.name||'');
      location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n')+'\n\nSent from '+location.href); done(true); });
  });
})();
