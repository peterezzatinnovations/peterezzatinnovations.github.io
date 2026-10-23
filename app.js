// Unified portfolio: label real work, progress and 3D accurately; no category filters.
const projects = [
 {asset:'hero-living-room',title:'مساحة استقبال بعمود نحتي',type:'أعمال منفذة'},
 {asset:'bathroom-gold',title:'حمام بتفاصيل وإضاءة دافئة',type:'أعمال منفذة'},
 {asset:'open-kitchen',title:'مطبخ مفتوح بتفاصيل خشبية',type:'أعمال منفذة'},
 {asset:'bathroom-shower',title:'تشطيب حمام بدرجات هادئة',type:'أعمال منفذة'},
 {asset:'bathroom-mirror',title:'وحدة حوض ومرآة بتصميم منحني',type:'أعمال منفذة'},
 {asset:'illuminated-commercial-facade',title:'تفاصيل واجهة تجارية بإضاءة',type:'أعمال منفذة'},
 {asset:'sculptural-detail',title:'تفاصيل عمود زخرفي',type:'مراحل التنفيذ'},
 {asset:'kitchen-counter',title:'كاونتر مطبخ بإضاءة معلّقة',type:'مراحل التنفيذ'},
 {asset:'geometric-wall',title:'تكوين جداري هندسي بإضاءة',type:'مراحل التنفيذ'},
 {asset:'living-wall',title:'جدار تلفاز بإضاءة مدمجة',type:'تفاصيل تشطيب — اكتمال غير مؤكد'},
 {asset:'commercial-progress',title:'تجهيز مساحة عرض تجارية',type:'مراحل التنفيذ'},
 {asset:'facade-progress',title:'أعمال تركيب الواجهة',type:'مراحل التنفيذ'},
 {asset:'commercial-render-one',title:'تصور داخلي لمساحة تجارية',type:'تصميم ثلاثي الأبعاد'},
 {asset:'commercial-render-two',title:'تصور لوحدات العرض الداخلية',type:'تصميم ثلاثي الأبعاد'},
 {asset:'storefront-render',title:'تصور لواجهة تجارية',type:'تصميم ثلاثي الأبعاد'},
 {asset:'wardrobe-installation-progress',title:'تركيب خزانة ووحدة مكتب',type:'مراحل التنفيذ'},
 {asset:'kitchen-installation-progress',title:'تركيب وحدات مطبخ',type:'مراحل التنفيذ'},
 {asset:'sculptural-room-progress',title:'مساحة استقبال أثناء التشطيب',type:'مراحل التنفيذ'},
 {asset:'stocked-display-progress',title:'تجهيز وحدات عرض تجارية',type:'مراحل التنفيذ'},
 {asset:'display-framework-progress',title:'تجهيز هياكل وحدات العرض',type:'مراحل التنفيذ'},
 {asset:'ceiling-fitout-progress',title:'تفاصيل سقف أثناء التجهيز',type:'مراحل التنفيذ'},
 {asset:'interior-ceiling-progress',title:'تشطيبات داخلية أثناء التنفيذ',type:'مراحل التنفيذ'},
 {asset:'commercial-partitions-progress',title:'تجهيز فواصل مساحة تجارية',type:'مراحل التنفيذ'},
 {asset:'facade-lettering-progress',title:'تركيب حروف واجهة تجارية',type:'مراحل التنفيذ'}
];
const gallery=document.querySelector('#gallery'),more=document.querySelector('#show-more'),status=document.querySelector('#gallery-status');
const PAGE_SIZE=6;
let visibleCount=PAGE_SIZE,current=0,opener;
const imageUrl=(p,size=1600)=>`public/images/${p.asset}-${size}.webp`;
function render(){
 const items=projects,visible=items.slice(gallery.children.length,visibleCount);
 const startIndex=gallery.children.length;
 gallery.append(...visible.map((p,i)=>{const article=document.createElement('article');article.className='project';const button=document.createElement('button');button.setAttribute('aria-label',`عرض الصورة: ${p.title} — ${p.type}`);button.innerHTML=`<div class="project-photo"><img src="${imageUrl(p,480)}" srcset="${imageUrl(p,480)} 480w, ${imageUrl(p,960)} 960w" sizes="(max-width:700px) 44vw, 29vw" alt="${p.title}" loading="lazy" width="480" height="640"><span class="zoom" aria-hidden="true">↗</span></div><div class="project-title">${p.title}</div><p class="project-type">${p.type}</p>`;button.addEventListener('click',()=>openLightbox(startIndex+i,button));article.append(button);return article;}));
 more.parentElement.hidden=visibleCount>=items.length;status.textContent=`عرض ${Math.min(visibleCount,items.length)} من ${items.length} صورة`;
}
more.addEventListener('click',()=>{const firstNew=gallery.children.length;visibleCount+=PAGE_SIZE;render();gallery.children[firstNew]?.querySelector('button').focus({preventScroll:true});});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','فتح القائمة');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});matchMedia('(min-width:701px)').addEventListener('change',closeMenu);
const dialog=document.querySelector('#lightbox'),large=document.querySelector('#lightbox-image');
function showImage(){const items=projects,p=items[current];large.src=imageUrl(p);large.alt=p.title;document.querySelector('#lightbox-caption').textContent=`${p.title} · ${p.type}`;document.querySelector('.lightbox-count').textContent=`${current+1} / ${items.length}`;}
function openLightbox(i,button){opener=button;current=i;showImage();dialog.showModal();document.body.classList.add('locked');document.querySelector('.lightbox-close').focus();}
function move(delta){current=(current+delta+projects.length)%projects.length;showImage();}
document.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());document.querySelector('.lightbox-prev').addEventListener('click',()=>move(-1));document.querySelector('.lightbox-next').addEventListener('click',()=>move(1));dialog.addEventListener('close',()=>{document.body.classList.remove('locked');opener?.focus();});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(1);}if(e.key==='ArrowRight'){e.preventDefault();move(-1);}});
let startX=0,startY=0;large.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});large.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1);},{passive:true});
render();
