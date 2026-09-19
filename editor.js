(async () => {
  const fields=[...document.querySelectorAll('[data-edit-text], [data-edit-image]')];
  const original=new Map(fields.map(el=>[el,el.dataset.editText?el.textContent:{src:el.getAttribute('src'),alt:el.alt,analysis:el.closest('[data-photo]')?.dataset.analysis || ''}]));
  let values={}, saved={}, revision=0, editing=false, dirty=false;
  const apply=()=>fields.forEach(el=>{const key=el.dataset.editText||el.dataset.editImage;const value=values[key]??original.get(el);if(el.dataset.editText)el.textContent=key==='text-180'&&typeof value==='string'?value.replace(/\s*·\s*16:05\s*$/,''):value;else{el.src=value.src;el.alt=value.alt;const figure=el.closest('[data-photo]');if(figure){figure.dataset.photo=value.src;if(typeof value.analysis==='string')figure.dataset.analysis=value.analysis;figure.dataset.replaced=value.src!==original.get(el).src?'yes':'';}}});
  const link=document.createElement('a');link.href='/edit';link.target='_top';link.className='owner-edit-link';link.textContent='Owner sign-in';document.querySelector('footer')?.append(link);
  let response;
  try{response=await fetch('/api/content',{cache:'no-store'});if(!response.ok)throw Error();const data=await response.json();revision=data.revision;values=data.values;if(values['image-43']?.src==='fieldwork/IMG20260914183734_01.webp')values['image-43'].src='fieldwork/IMG20260914183734_01-landscape.webp';saved=structuredClone(values);apply();}catch{link.textContent='Editing temporarily unavailable';return;}
  const session=await fetch('/api/editor/session',{cache:'no-store'}).then(r=>r.json()).catch(()=>({canEdit:false}));
  if(!session.canEdit)return;
  link.textContent='Edit this site';
  const toolbar=document.createElement('div');toolbar.className='owner-toolbar';toolbar.hidden=true;
  toolbar.innerHTML='<span>Click text to edit, or an image to replace it.</span><span role="status"></span><button type="button" data-save>Save changes</button><button type="button" data-cancel>Cancel</button><button type="button" data-done>Done</button>';
  document.body.append(toolbar);const status=toolbar.querySelector('[role=status]');
  const changed=()=>{dirty=true;status.textContent='Unsaved changes';};
  function start(){editing=true;document.body.classList.add('owner-editing');toolbar.hidden=false;fields.filter(el=>el.dataset.editText).forEach(el=>el.contentEditable='plaintext-only');}
  function stop(){editing=false;document.body.classList.remove('owner-editing');toolbar.hidden=true;fields.forEach(el=>el.removeAttribute('contenteditable'));}
  link.addEventListener('click',e=>{e.preventDefault();start();});
  fields.forEach(el=>el.addEventListener('input',()=>{if(editing&&el.dataset.editText){values[el.dataset.editText]=el.textContent;changed();}}));
  document.addEventListener('click',e=>{if(!editing)return;const field=e.target.closest('[data-edit-text]');if(field){e.preventDefault();e.stopImmediatePropagation();field.focus();return;}const image=e.target.closest('img[data-edit-image]')||e.target.closest('[data-photo]')?.querySelector('img[data-edit-image]');if(image){e.preventDefault();e.stopImmediatePropagation();editImage(image);}},true);
  document.addEventListener('keydown',e=>{if(editing&&e.target.closest('[data-edit-text]'))e.stopPropagation();},true);
  toolbar.querySelector('[data-save]').onclick=async()=>{
    const button=toolbar.querySelector('[data-save]');button.disabled=true;status.textContent='Saving…';const submitted=structuredClone(values);
    try{const r=await fetch('/api/content',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,values:submitted})});const data=await r.json();if(!r.ok)throw Error(data.error);revision=data.revision;saved=submitted;dirty=JSON.stringify(values)!==JSON.stringify(submitted);status.textContent=dirty?'Saved; newer changes are still unsaved':'Saved to the website';}
    catch(e){status.textContent=e.message||'Save failed. Your changes are still here.';}finally{button.disabled=false;}
  };
  toolbar.querySelector('[data-cancel]').onclick=()=>{if(dirty&&!confirm('Discard your unsaved changes?'))return;values=structuredClone(saved);apply();dirty=false;status.textContent='Changes discarded';};
  toolbar.querySelector('[data-done]').onclick=()=>{if(dirty){status.textContent='Save or cancel your changes first.';return;}stop();};
  window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
  function editImage(image){
    const dialog=document.createElement('dialog');dialog.className='owner-image-dialog';
    dialog.innerHTML='<h2>Edit image</h2><p>Choose a replacement, or update its description. Use a copy with any identifiable faces and number plates already blurred.</p><label>Replacement image (JPG, PNG or WebP, up to 8 MB)<input type="file" accept="image/jpeg,image/png,image/webp"></label><label>Image description<textarea rows="3"></textarea></label><label>Explanation<textarea data-analysis rows="5"></textarea></label><p>Captions can be edited directly beneath the image on the page.</p><p role="status"></p><button type="button" data-apply>Apply to draft</button><button type="button" data-close>Cancel</button>';
    dialog.querySelector('textarea').value=image.alt;const figure=image.closest('[data-photo]');dialog.querySelector('[data-analysis]').value=figure?.dataset.analysis || (typeof photoNotes!=='undefined'?photoNotes[image.getAttribute('src').split('/').pop()]:'') || '';document.body.append(dialog);dialog.showModal();
    dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.onclose=()=>dialog.remove();
    dialog.querySelector('[data-apply]').onclick=async()=>{const b=dialog.querySelector('[data-apply]');b.disabled=true;try{let src=image.getAttribute('src');const file=dialog.querySelector('input').files[0];if(file){const form=new FormData();form.append('image',file);const r=await fetch('/api/editor/images',{method:'POST',body:form});const data=await r.json();if(!r.ok)throw Error(data.error);src=data.src;}values[image.dataset.editImage]={src,alt:dialog.querySelector('textarea').value,analysis:dialog.querySelector('[data-analysis]').value};apply();changed();dialog.close();}catch(e){dialog.querySelector('[role=status]').textContent=e.message;}finally{b.disabled=false;}};
  }
  if(new URLSearchParams(location.search).get('edit')==='1')start();
})();
