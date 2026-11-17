/* ---------- Datos ----------
   link:   página oficial sobre el tema/puesto de la tarjeta
   cerca:  sede más cercana a Monterrey (texto)
   mapa:   búsqueda que se manda a Google Maps para el mapita */
const trabajo = [
  { nombre:"Google", sede:"Mountain View, CA · 1998",
    mx:"CDMX (Centro de Excelencia de Ingeniería)",
    puesto:"Security Engineer / Detection & Response",
    sueldo:"Sin dato público para México", na:true, mty:false,
    link:"https://cloud.google.com/security", linkTxt:"Google Cloud Security",
    cerca:"Google México · CDMX", mapa:"Google México, Montes Urales 445, Lomas de Chapultepec, CDMX" },
  { nombre:"IBM", sede:"Armonk, NY · 1911",
    mx:"Guadalajara (campus desde 1975, nube híbrida e IA) y CDMX",
    puesto:"SOC Analyst / X-Force",
    sueldo:"Sin dato específico", na:true, mty:false,
    link:"https://www.ibm.com/x-force", linkTxt:"IBM X-Force",
    cerca:"IBM México · Santa Fe, CDMX", mapa:"IBM México, Santa Fe, Ciudad de México" },
  { nombre:"Cisco", sede:"San José, CA · 1984",
    mx:"CDMX (Cisco Support Center), Guadalajara y Monterrey",
    puesto:"Technical Support Engineer – Security (TAC)",
    sueldo:"~$32,000 MXN/mes (rango $30K–$44K)", na:false, mty:true,
    link:"https://www.cisco.com/c/en/us/products/security/index.html", linkTxt:"Cisco Security",
    cerca:"Cisco · Monterrey", mapa:"Cisco Systems, Monterrey, Nuevo León" },
  { nombre:"Palo Alto Networks", sede:"Santa Clara, CA · 2005",
    mx:"CDMX",
    puesto:"Technical Support / Systems Engineer",
    sueldo:"Sin dato específico", na:true, mty:false,
    link:"https://www.paloaltonetworks.com/network-security", linkTxt:"Network Security",
    cerca:"Palo Alto Networks · CDMX", mapa:"Palo Alto Networks, Ciudad de México" },
  { nombre:"Microsoft", sede:"Redmond, WA · 1975",
    mx:"CDMX, Querétaro y Monterrey (más de 1,000 empleados)",
    puesto:"Security Analyst / Identity Security (Entra ID, Active Directory)",
    sueldo:"Sin dato específico", na:true, mty:true,
    link:"https://www.microsoft.com/security/business/identity-access/microsoft-entra-id", linkTxt:"Microsoft Entra ID",
    cerca:"Microsoft · Monterrey", mapa:"Microsoft México, Monterrey, Nuevo León" },
  { nombre:"Fortinet", sede:"Sunnyvale, CA · 2000",
    mx:"CDMX",
    puesto:"Technical Support Engineer – FortiGate",
    sueldo:"~$57,000 MXN/mes (rango $45K–$67K)", na:false, mty:false,
    link:"https://www.fortinet.com/products/next-generation-firewall", linkTxt:"FortiGate NGFW",
    cerca:"Fortinet México · CDMX", mapa:"Fortinet México, Ciudad de México" }
];

const practicas = [
  { nombre:"Scitum (Telmex)", sede:"Ciudad de México · filial de Telmex",
    mx:"CDMX, con presencia en Monterrey y Guadalajara",
    puesto:"Ciberseguridad (SOC / servicios administrados de seguridad)",
    nota:"", mty:true,
    link:"https://www.scitum.com.mx/", linkTxt:"Scitum Ciberseguridad",
    cerca:"Scitum · Monterrey", mapa:"Scitum, Monterrey, Nuevo León" },
  { nombre:"Overclockers", sede:"Monterrey, N.L.",
    mx:"Monterrey",
    puesto:"Soporte TI",
    nota:"Trabajo aquí actualmente", mty:true, actual:true,
    link:"https://www.overclockers.com.mx/", linkTxt:"Overclockers México",
    cerca:"Overclockers · Monterrey", mapa:"Overclockers, Monterrey, Nuevo León" },
  { nombre:"LEGO", sede:"Billund, Dinamarca · 1932",
    mx:"Planta de manufactura en Monterrey (Apodaca, N.L.)",
    puesto:"Soporte TI",
    nota:"", mty:true,
    link:"https://www.lego.com/en-us/careers", linkTxt:"LEGO Careers",
    cerca:"LEGO Operaciones de México · Apodaca", mapa:"LEGO Operaciones de México, Apodaca, Nuevo León" }
];

const sueldos = [
  { nivel:"Trainee SOC", exp:"0–1 año", min:16000, max:25000 },
  { nivel:"Junior", exp:"", min:23000, max:38000 },
  { nivel:"Mid", exp:"", min:42000, max:68000 },
  { nivel:"Senior", exp:"", min:70000, max:105000 }
];

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const icon = id => `<svg class="ic" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const pad = n => String(n).padStart(2, "0");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Tarjetas ---------- */
const row = (ic, label, val, cls = "") =>
  `<div class="row">${icon(ic)}<dt>${label}</dt><dd class="${cls}">${esc(val)}</dd></div>`;

const tag = e =>
  e.actual ? `<span class="tag tag-actual">Actual</span>`
  : e.mty ? `<span class="tag">MTY</span>` : "";

const card = (e, i, cuerpo) => `
  <article class="card">
    <header class="card-head">
      <span class="card-idx" aria-hidden="true">${pad(i + 1)}</span>
      <h3>${esc(e.nombre)}</h3>
      ${tag(e)}
    </header>
    <dl class="rows">${cuerpo}</dl>
    <div class="map">
      <p class="map-label">${icon("pin")} Sede más cercana: <span>${esc(e.cerca)}</span></p>
      <iframe title="Mapa de ${esc(e.cerca)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=${encodeURIComponent(e.mapa)}&output=embed"></iframe>
    </div>
    <a class="btn" href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">
      <span>${esc(e.linkTxt)}</span>${icon("arrow")}<span class="sr-only">(se abre en otra pestaña)</span>
    </a>
  </article>`;

document.getElementById("cards").innerHTML = trabajo.map((e, i) => card(e, i,
  row("globe", "Sede global · Fundación", e.sede) +
  row("pin", "Oficinas en México", e.mx) +
  row("user", "Puesto de interés", e.puesto) +
  row("money", "Sueldo", e.sueldo, e.na ? "salary na" : "salary")
)).join("");

document.getElementById("cards-practicas").innerHTML = practicas.map((e, i) => card(e, i,
  row("globe", "Sede global", e.sede) +
  row("pin", "Presencia en México", e.mx) +
  row("term", "Área de prácticas", e.puesto) +
  (e.nota ? row("user", "Nota", e.nota, "salary") : "")
)).join("");

/* ---------- Contadores del header ---------- */
document.getElementById("n-trabajo").textContent = trabajo.length;
document.getElementById("n-practicas").textContent = practicas.length;
document.getElementById("n-mty").textContent = [...trabajo, ...practicas].filter(e => e.mty).length;

/* ---------- Tabla ---------- */
document.getElementById("tbody").innerHTML = trabajo.map(e => `
  <tr>
    <th scope="row">${esc(e.nombre)}${e.mty ? '<span class="mini-mty">MTY</span>' : ""}</th>
    <td>${esc(e.sede)}</td>
    <td>${esc(e.mx)}</td>
    <td>${esc(e.puesto)}</td>
    <td class="money ${e.na ? "na" : ""}">${esc(e.sueldo)}</td>
  </tr>`).join("");

/* ---------- Barras (se animan con transform en CSS) ---------- */
const MAX = 108000;
const fmt = n => "$" + n.toLocaleString("en-US");
document.getElementById("bars").innerHTML = sueldos.map((s, i) => {
  const left = (s.min / MAX) * 100;
  const width = ((s.max - s.min) / MAX) * 100;
  const fin = left + width;
  const pos = fin > 70 ? `right:${100 - left + 1.5}%` : `left:${fin + 1.5}%`;
  return `
  <div class="bar-row" style="--i:${i}">
    <div class="bar-label">${s.nivel}${s.exp ? `<small>${s.exp}</small>` : ""}</div>
    <div class="track" role="img" aria-label="${s.nivel}: de ${fmt(s.min)} a ${fmt(s.max)} MXN">
      <div class="bar" style="left:${left}%;width:${width}%"></div>
      <span class="bar-text" style="${pos}">${fmt(s.min)} – ${fmt(s.max)}</span>
    </div>
  </div>`;
}).join("");

/* ---------- Aparición al hacer scroll ---------- */
const targets = document.querySelectorAll(".sec-head, .card, .terminal, .chart");
targets.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
targets.forEach(el => io.observe(el));

/* ---------- Sección activa en la barra superior ---------- */
const links = [...document.querySelectorAll(".topbar a[href^='#']:not(.brand)")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.toggleAttribute("aria-current", a.hash === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));

/* ---------- Máquina de escribir ---------- */
const titulo = "Empresas de ciberseguridad en las que me gustaría trabajar";
const typed = document.getElementById("typed");
if (reduce) typed.textContent = titulo;
else {
  let n = 0;
  (function type(){
    typed.textContent = titulo.slice(0, n++);
    if (n <= titulo.length) setTimeout(type, 45 + Math.random() * 40);
  })();
}

/* ---------- Lluvia de código (fondo fijo de toda la página) ---------- */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
const chars = "01アイウエオカキクケコサシスセソ{}[]<>/$#@%&ABCDEF0123456789";
const size = 16;
let cols, drops;
function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.ceil(canvas.width / size);
  drops = Array.from({ length: cols }, () => Math.random() * -60);
  ctx.font = size + "px 'JetBrains Mono', monospace";
}
function draw(){
  ctx.fillStyle = "rgba(6,9,14,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let c = 0; c < cols; c++) {
    ctx.fillStyle = Math.random() > .93 ? "#5ad8ff" : "#3ee08f";
    ctx.fillText(chars[(Math.random() * chars.length) | 0], c * size, drops[c] * size);
    if (drops[c] * size > canvas.height && Math.random() > .975) drops[c] = 0;
    drops[c]++;
  }
}
resize();
window.addEventListener("resize", resize);

if (reduce) {
  for (let k = 0; k < 60; k++) draw();      // un fotograma fijo, sin movimiento
} else {
  let last = 0;
  (function loop(t){
    requestAnimationFrame(loop);
    if (document.hidden || t - last < 55) return;
    last = t;
    draw();
  })(0);
}
