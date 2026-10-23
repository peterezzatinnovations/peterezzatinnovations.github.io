// Unified portfolio: label real work, progress and 3D accurately; no category filters.
const projects = [
 {asset:'hero-living-room',title:'مساحة استقبال بعمود نحتي',type:'أعمال منفذة',width:1600,height:717},
 {asset:'open-kitchen',title:'مطبخ مفتوح بتفاصيل خشبية',type:'أعمال منفذة',width:1200,height:1600},
 {asset:'bathroom-gold',title:'حمام بتفاصيل وإضاءة دافئة',type:'أعمال منفذة',width:1200,height:1600},
 {asset:'living-wall',title:'جدار تلفاز بإضاءة مدمجة',type:'تفاصيل تشطيب — اكتمال غير مؤكد',width:1600,height:1200},
 {asset:'illuminated-commercial-facade',title:'تفاصيل واجهة تجارية بإضاءة',type:'أعمال منفذة',width:1599,height:1200},
 {asset:'geometric-wall',title:'تكوين جداري هندسي بإضاءة',type:'مراحل التنفيذ',width:1200,height:1600},
 {asset:'bathroom-shower',title:'تشطيب حمام بدرجات هادئة',type:'أعمال منفذة',width:1200,height:1600},
 {asset:'bathroom-mirror',title:'وحدة حوض ومرآة بتصميم منحني',type:'أعمال منفذة',width:1200,height:1600},
 {asset:'sculptural-detail',title:'تفاصيل عمود زخرفي',type:'مراحل التنفيذ',width:720,height:1600},
 {asset:'kitchen-counter',title:'كاونتر مطبخ بإضاءة معلّقة',type:'مراحل التنفيذ',width:1200,height:1600},
 {asset:'commercial-progress',title:'تجهيز مساحة عرض تجارية',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'facade-progress',title:'أعمال تركيب الواجهة',type:'مراحل التنفيذ',width:1600,height:900},
 {asset:'commercial-render-one',title:'تصور داخلي لمساحة تجارية',type:'تصميم ثلاثي الأبعاد',width:1400,height:1273},
 {asset:'commercial-render-two',title:'تصور لوحدات العرض الداخلية',type:'تصميم ثلاثي الأبعاد',width:1400,height:1273},
 {asset:'storefront-render',title:'تصور لواجهة تجارية',type:'تصميم ثلاثي الأبعاد',width:1400,height:1273},
 {asset:'wardrobe-installation-progress',title:'تركيب خزانة ووحدة مكتب',type:'مراحل التنفيذ',width:1200,height:1600},
 {asset:'kitchen-installation-progress',title:'تركيب وحدات مطبخ',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'sculptural-room-progress',title:'مساحة استقبال أثناء التشطيب',type:'مراحل التنفيذ',width:1200,height:1600},
 {asset:'stocked-display-progress',title:'تجهيز وحدات عرض تجارية',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'display-framework-progress',title:'تجهيز هياكل وحدات العرض',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'ceiling-fitout-progress',title:'تفاصيل سقف أثناء التجهيز',type:'مراحل التنفيذ',width:1200,height:1600},
 {asset:'interior-ceiling-progress',title:'تشطيبات داخلية أثناء التنفيذ',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'commercial-partitions-progress',title:'تجهيز فواصل مساحة تجارية',type:'مراحل التنفيذ',width:1600,height:1200},
 {asset:'facade-lettering-progress',title:'تركيب حروف واجهة تجارية',type:'مراحل التنفيذ',width:1600,height:900}
];
const gallery=document.querySelector('#gallery'),more=document.querySelector('#show-more'),status=document.querySelector('#gallery-status');
const PAGE_SIZE=6;
let visibleCount=PAGE_SIZE,current=0,opener;
const imageUrl=(p,size=1600)=>`public/images/${p.asset}-${size}.webp`;
function render(){
 const items=projects,visible=items.slice(gallery.children.length,visibleCount);
 const startIndex=gallery.children.length;
 gallery.append(...visible.map((p,i)=>{const article=document.createElement('article');article.className='project'+(startIndex+i===0?' project-featured':'');const button=document.createElement('button');button.setAttribute('aria-label',`عرض الصورة: ${p.title} — ${p.type}`);button.innerHTML=`<div class="project-photo"><img src="${imageUrl(p,480)}" srcset="${imageUrl(p,480)} 480w, ${imageUrl(p,960)} 960w" sizes="${startIndex+i===0?'(max-width:1024px) 44vw, 600px':'(max-width:1024px) 44vw, 400px'}" alt="${p.title}" loading="lazy" decoding="async" width="${p.width}" height="${p.height}"><span class="zoom" aria-hidden="true">↗</span></div><div class="project-title">${p.title}</div><p class="project-type">${p.type}</p>`;button.addEventListener('click',()=>openLightbox(startIndex+i,button));article.append(button);return article;}));
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

// Keep the floating shortcut clear of gallery controls and existing contact actions.
const floatingContact=document.querySelector('.floating-contact');
if ('IntersectionObserver' in window) {
 const visibleSections=new Set();
 const contactObserver=new IntersectionObserver(entries=>{
  for(const entry of entries) entry.isIntersecting?visibleSections.add(entry.target):visibleSections.delete(entry.target);
  floatingContact.hidden=visibleSections.size>0;
 },{threshold:0});
 for(const section of document.querySelectorAll('#home,#portfolio,#contact,.footer')) contactObserver.observe(section);
}
