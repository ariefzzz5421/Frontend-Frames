(() => {
  const burger=document.querySelector('#burger');
  const menu=document.querySelector('#mobile-menu');
  const overlay=document.querySelector('#menu-overlay');
  const dialog=document.querySelector('#info');
  const content={
    product:['Modular intelligence','A conceptual AI platform interface. Imagine flexible runtime modules for reasoning, collaboration, and production workflows. This page is a design study; no API or account service is connected.'],
    cases:['Case studies','This is a fictional interface study. Case studies and customer results have not been published for this concept. Explore the other live design studies in Frontend Frames.'],
    contact:['Contact','AI Runtime is a fictional design inside Frontend Frames. For the real project and source code, use the collection or repository link.'],
    signin:['Sign in','Account access is not part of this design concept. The sign-in control opens this explanation so it does not imply a working authentication service.']
  };
  let previousFocus=null;
  function closeMenu(){menu.hidden=true;overlay.hidden=true;burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu')}
  function openMenu(){menu.hidden=false;overlay.hidden=false;burger.setAttribute('aria-expanded','true');burger.setAttribute('aria-label','Close menu');menu.querySelector('button').focus()}
  burger.addEventListener('click',()=>menu.hidden?openMenu():closeMenu());
  overlay.addEventListener('click',closeMenu);
  addEventListener('resize',()=>{if(innerWidth>720)closeMenu()});
  document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.panel;closeMenu();
    if(key==='home'){dialog.close?.();return}
    previousFocus=button;
    document.querySelector('#info-title').textContent=content[key][0];
    document.querySelector('#info-copy').textContent=content[key][1];
    dialog.showModal();document.querySelector('#close-info').focus();
  }));
  document.querySelector('#close-info').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>previousFocus?.focus());
  addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden)closeMenu()});
  const video=document.querySelector('.bg-video');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){video.pause();video.removeAttribute('autoplay')}
  video.addEventListener('error',()=>{video.style.display='none'});
})();
