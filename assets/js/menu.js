function esc(s) { return (s === undefined || s === null) ? '' : String(s); }

function buildMainMenuHtml(menuHeader) {
    if (!menuHeader || !menuHeader.length) return '';
    let html = '<ul class="mainMenu noSearchBar">';
    menuHeader.forEach(item => {
        const hasChildren = item.Hijos && item.Hijos.length;
        if (hasChildren) {
            html += `<li class="hasSubMenu"><a href="${esc(item.URL) || 'javascript:void(0);'}" target="${esc(item.Target) || ''}">${esc(item.Titulo)}<span class="openSubM"></span></a>`;
            html += '<div class="subMenuWrap"><div class="subMenuWrapCont"><div class="subMenuWrapLimit">';
            html += `<span class="subMenuTitle">${esc(item.Titulo)}</span>`;
            html += '<ul class="subMenu">';
            html += `<li class="backMenu"><a href="javascript:void(0);">${esc(item.Titulo)}</a><strong>Regresar</strong></li>`;
            item.Hijos.forEach(sub => {
                const subHas = sub.Hijos && sub.Hijos.length;
                if (subHas) {
                    html += `<li><a class="linkCat" href="${esc(sub.URL) || 'javascript:void(0);'}">${esc(sub.Titulo)}${sub.Clase ? `<i class="${sub.Clase}"></i>` : ''}<span class="openSubCat"></span></a>`;
                    html += '<ul class="subMenuCat">';
                    sub.Hijos.forEach(cat => {
                        html += `<li><a href="${esc(cat.URL)}" target="${esc(cat.Target) || ''}"><span>${esc(cat.Titulo)}</span></a></li>`;
                    });
                    html += '</ul></li>';
                } else {
                    html += `<li><a class="linkCat" href="${esc(sub.URL)}" target="${esc(sub.Target) || ''}">${esc(sub.Titulo)}${sub.Clase ? `<i class="${sub.Clase}"></i>` : ''}</a></li>`;
                }
            });
            html += '</ul></div></div></div></li>';
        } else {
            html += `<li><a href="${esc(item.URL)}" target="${esc(item.Target) || ''}">${esc(item.Titulo)}</a></li>`;
        }
    });
    html += '</ul>';
    return html;
}

function buildFooterHtml(footer) {
    if (!footer || !footer.length) return '';
    let html = '';
    footer.forEach(cat => {
        const titulo = esc(cat.Titulo || cat.titulo || '');
        html += `<div class="footerCat">`;
        html += `<div class="footerCatHeader">${titulo}</div>`;
        html += `<div class="footerCatBody"><ul>`;
        const items = Array.isArray(cat.Hijos) ? cat.Hijos : (Array.isArray(cat.Items) ? cat.Items : (Array.isArray(cat.items) ? cat.items : []));
        items.forEach(it => {
            const itTitle = esc(it.Titulo || it.titulo || it.title || '');
            const itUrl = esc(it.URL || it.url || '#');
            const itTarget = esc(it.Target || it.target || '');
            html += `<li><a href="${itUrl}" ${itTarget ? `target="${itTarget}"` : ''} class="textLink">${itTitle}</a></li>`;
        });
        html += `</ul></div></div>`;
    });
    return html;
}

function buildSeccionesHtml(secciones) {
    if (!secciones || !secciones.length) return '';
    let html = '<ul class="listSegment">';
    secciones.forEach(sec => {
        html += `<li><a href="${sec.URL || '#'}" title="${sec.Titulo}">${sec.Titulo}</a></li>`;
    });
    html += '</ul>';
    return html;
}
function buildSeccions(secciones) {
    if (!secciones || !secciones.length) return '';
    let html = '<ul class="mainExtraMenu">';
    secciones.forEach(sec => {
        html += `<li><a href="${sec.URL || '#'}" title="${sec.Titulo}">${sec.Titulo}</a></li>`;
    });
    html += '</ul>';
    return html;
}
function buildSeccion(secciones) {
    if (!secciones || !secciones.length) return '';
    let html = '<select onchange="location=this.value">';
    secciones.forEach(sec => {
        html += `<option value="${sec.URL || '#'}" title="${sec.Titulo}">${sec.Titulo}</option>`;
    });
    html += '</select>';
    return html;
}

function buildMiClaro(miClaro) {
    if (!miClaro) return '';
    const url = (typeof miClaro.URL === 'string') ? miClaro.URL : (Array.isArray(miClaro.URL) && miClaro.URL[0] ? miClaro.URL[0].URL : '#');
    const target = miClaro.Target || '';
    const title = miClaro.Titulo || 'Mi Claro';
    let html = '<li id="miClaroLiga" class="buttonMenuEle">';
    html += `<a class="loginBtn" href="${url}" ${target ? `target="${target}"` : ''}>`;
    html += '<i class="ico-user"></i>';
    html += `<span>${title}</span>`;
    html += '</a>';
    html += '</li>';
    return html;
}

function buildLigasMasClaroHtml(ligas) {
    if (!ligas || !ligas.Hijos || !ligas.Hijos.length) return '';
    let html = '<span>Más de Claro</span><ul class="moreList">';
    ligas.Hijos.forEach(item => {
        html += `<li><a href="${item.URL}" target="${item.Target || ''}">`;
        if (item.Imagen) html += `<img src="${item.Imagen}" alt="${item.Titulo}">`;
        else if (item.Clase && item.Clase.indexOf('ico-') === 0) html += `<i class="${item.Clase}"></i>`;
        else html += `${item.Titulo}`;
        html += `</a></li>`;
    });
    html += '</ul>';
    return html;
}

function applyMenuToDom(data) {
    try {
        const container = document.getElementById('mainMenuDynamic');
        if (container) container.innerHTML = buildMainMenuHtml(data.MenuHeader || []);

        const seccionesEl = document.querySelector('.mainExtraMenu');
        if (seccionesEl && data.Secciones) seccionesEl.outerHTML = buildSeccionesHtml(data.Secciones);

        const seccionesE = document.querySelector('.mainExtraMenu2');
        if (seccionesE && data.Secciones) seccionesE.outerHTML = buildSeccions(data.Secciones);

        const seccionesmov = document.querySelector('.selectSegmentos');
        if (seccionesmov && data.Secciones) seccionesmov.innerHTML = buildSeccion(data.Secciones);

        const movMoreEl = document.querySelector('.movMoreMenu');
        if (movMoreEl && data.LigasMasClaro) movMoreEl.innerHTML = buildLigasMasClaroHtml(data.LigasMasClaro);

        const movMoreEl2 = document.querySelector('.movMoreMenu2');
        if (movMoreEl2 && data.LigasMasClaro) movMoreEl2.innerHTML = buildLigasMasClaroHtml(data.LigasMasClaro);


        const miclaro = document.querySelector('.miclaro');
        if (miclaro && data.MiClaro) miclaro.innerHTML = buildMiClaro(data.MiClaro);

        
        if (data.MiClaro) {
            const miClaroEl = document.getElementById('miClaroLiga');
            if (miClaroEl) {
                miClaroEl.innerHTML = buildMiClaro(data.MiClaro);
            }
        }

        
        
        const footerData = data.Footer && Array.isArray(data.Footer) ? data.Footer : (data.MenuFooter && Array.isArray(data.MenuFooter) ? data.MenuFooter : null);
        if (footerData) {
            const footerNav = document.querySelector('.footerNav');
            if (footerNav) {
                footerNav.innerHTML = buildFooterHtml(footerData);
            }
        }
        
        if (data.RedesSociales && Array.isArray(data.RedesSociales)) {
            const footerRS = document.querySelector('.footerRS');
            if (footerRS) {
                const dl = footerRS.querySelector('dl') || document.createElement('dl');
                dl.innerHTML = '<dt> Redes Sociales </dt>' + data.RedesSociales.map(r => `<dd><a class="icoRs" href="${esc(r.URL)}" ${r.Target ? `target="${esc(r.Target)}"` : ''}><i class="${esc(r.Clase || '')}" aria-label="icono"></i></a></dd>`).join('');
                if (!footerRS.contains(dl)) footerRS.appendChild(dl);
            }
        }

        if (data.Copyright) {
            const footerLower = document.querySelector('.footerLower .container p');
            if (footerLower) footerLower.textContent = data.Copyright;
        }
        if (data.LigasFooterLegales && Array.isArray(data.LigasFooterLegales)) {
            const listMenu = document.querySelector('.footerLower .container .listMenu');
            if (listMenu) {
                listMenu.innerHTML = data.LigasFooterLegales.map((l, i) => `${i>0?'<span class="separatorLinks">|</span>':''}<li><a class="textLink" href="${esc(l.URL)}" ${l.Target?`target="${esc(l.Target)}"`:''} rel="noopener noreferrer">${esc(l.Titulo)}</a></li>`).join('');
            }
        }
    } catch (err) {
        console.error('Error aplicando el menú al DOM', err);
    }
}

async function loadMenu() {
    const country = 'gt'
    const baseDomain = (country === 'cr') ? 'https://www.claro.cr' : 'https://www.claro.com';
    const localPath = `assets/json/json-menu-${country}.json`;
    const remoteUrl = `${baseDomain}/${country}/json-menu.json`;

    try {
        const r = await fetch(localPath);
        if (r.ok) {
            const data = await r.json();
            applyMenuToDom(data);
            return;
        }
        throw new Error('local not ok');
    } catch (errLocal) {
       
        try {
            const r2 = await fetch(remoteUrl);
            if (r2.ok) {
                const data2 = await r2.json();
                applyMenuToDom(data2);
                return;
            }
            throw new Error('remote not ok ' + r2.status);
        } catch (errRemote) {
            console.error('Error cargando menú JSON (remote)', errRemote);
        }
    }
}



document.addEventListener('DOMContentLoaded', loadMenu);

(function(){
    const MAX_TOP = 100; // starting top in px; submenu moves up as user scrolls down
    let lastScrollY = 60;
    let ticking = false;

    function updateSubmenuPosition() {
        const top = Math.max(60, MAX_TOP - lastScrollY);
        const subMenus = document.querySelectorAll('.headerEv .hdMainLeft nav .mainMenu>li .subMenuWrap');
        subMenus.forEach(el => {
            el.style.top = top + 'px';
            el.style.height = `calc(100vh - ${top}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        lastScrollY = window.scrollY || window.pageYOffset || 0;
        if (!ticking) {
            window.requestAnimationFrame(updateSubmenuPosition);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', () => { lastScrollY = window.scrollY || 0; updateSubmenuPosition(); });
})();


    (function(){
        const MOBILE_BREAK = 640; 
        let locked = false;
        let scrollY = 0;
        const nav = document.querySelector('.headerEv .hdMainLeft nav');
        const hamburguer = document.querySelector('.hamburguer');
        const closeNav = document.querySelector('.headerEv .hdMainLeft nav .closeNav');

        function lockBody() {
            if (locked) return;
            scrollY = window.scrollY || window.pageYOffset || 0;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            locked = true;
        }

        function unlockBody() {
            if (!locked) return;
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            locked = false;
            window.scrollTo(0, scrollY);
        }

        function isNavOpen() {
            if (!nav) return false;
            const cs = window.getComputedStyle(nav);
            const right = cs.right;
           
            if (right && right.indexOf('px') !== -1) {
                const v = parseFloat(right.replace('px',''));
                return v > -50; 
            }

            return cs.pointerEvents === 'auto' || cs.opacity === '1';
        }

        function openNav() {
            if (!nav) return;
            try {
                nav.style.right = '0';
                nav.classList.add('open');
            } catch(e) {}
            lockBody();
        }

        function closeNavFn() {
            if (!nav) return;
            try {
                nav.style.right = '-100%';
                nav.classList.remove('open');
            } catch(e) {}
            unlockBody();
        }

        function maybeLockUnlock() {
            setTimeout(() => {
                if (isNavOpen()) lockBody(); else unlockBody();
            }, 40);
        }

        if (hamburguer) hamburguer.addEventListener('click', openNav);
        if (closeNav) closeNav.addEventListener('click', closeNavFn);

        
        window.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' || ev.key === 'Esc') {
                if (isNavOpen()) {
                    
                    if (closeNav) closeNav.click();
                    unlockBody();
                }
            }
        });

       
        window.addEventListener('resize', () => { if (!isNavOpen()) unlockBody(); });
    })();

    
    (function(){
        const MOBILE_BREAK = 640; 

        function initFooterAccordion() {
            const footerNav = document.querySelector('.footerNav');
            if (!footerNav) return;

            const headers = footerNav.querySelectorAll('.footerCat .footerCatHeader');
            headers.forEach(h => {
                const cat = h.closest('.footerCat');
                const body = cat ? cat.querySelector('.footerCatBody') : null;
                if (!body) return;
                h.setAttribute('role', 'button');
                h.setAttribute('tabindex', '0');
                if (window.innerWidth < MOBILE_BREAK) {
                    cat.classList.remove('open');
                    body.style.maxHeight = '0';
                    h.setAttribute('aria-expanded', 'false');
                } else {
                    body.style.maxHeight = '';
                    h.removeAttribute('aria-expanded');
                }
            });

            footerNav.addEventListener('click', function(e){
                if (window.innerWidth >= MOBILE_BREAK) return;
                const header = e.target.closest('.footerCatHeader');
                if (!header) return;
                const cat = header.closest('.footerCat');
                const body = cat.querySelector('.footerCatBody');
                const isOpen = cat.classList.toggle('open');
                if (isOpen) {
                    body.style.maxHeight = body.scrollHeight + 'px';
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    body.style.maxHeight = '0';
                    header.setAttribute('aria-expanded', 'false');
                }
            });

            footerNav.addEventListener('keydown', function(e){
                if (window.innerWidth >= MOBILE_BREAK) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    const header = e.target.closest('.footerCatHeader');
                    if (!header) return;
                    e.preventDefault();
                    header.click();
                }
            });
        }

        window.addEventListener('load', initFooterAccordion);
        document.addEventListener('DOMContentLoaded', initFooterAccordion);

        window.addEventListener('resize', function(){
            const footerNav = document.querySelector('.footerNav');
            if (!footerNav) return;
            const headers = footerNav.querySelectorAll('.footerCat .footerCatHeader');
            headers.forEach(h => {
                const cat = h.closest('.footerCat');
                const body = cat ? cat.querySelector('.footerCatBody') : null;
                if (!body) return;
                if (window.innerWidth >= MOBILE_BREAK) {
                    body.style.maxHeight = '';
                    cat.classList.remove('open');
                    h.removeAttribute('aria-expanded');
                } else {
                    body.style.maxHeight = '0';
                    h.setAttribute('aria-expanded', 'false');
                }
            });
        });

        const originalApply = window.applyMenuToDom;
        if (typeof originalApply === 'function') {
            window.applyMenuToDom = function(data){
                try { originalApply(data); } catch(e) { console.error(e); }
                initFooterAccordion();
            };
        }
    })();
