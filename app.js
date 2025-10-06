// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Abrir modal desde múltiples botones
const btnsAbrir = [ 'btnAbrirReserva', 'btnAbrirReserva2', 'btnAbrirReserva3' ]
  .map(id => document.getElementById(id))
  .filter(Boolean);
const modal = document.getElementById('modalOk');
const btnCerrarModal = document.getElementById('btnCerrarModal');
btnsAbrir.forEach(b => b.addEventListener('click', () => {
  document.getElementById('formReserva').scrollIntoView({behavior:'smooth', block:'start'});
}));

btnCerrarModal?.addEventListener('click', () => modal.close());

// Slots simulados (demo)
const slotList = document.getElementById('slotList');
const baseSlots = [
  { hora: '16:00', mentor: 'Ing. Sistemas' },
  { hora: '17:00', mentor: 'Medicina' },
  { hora: '18:30', mentor: 'Administración' },
  { hora: '19:00', mentor: 'Diseño' }
];
function renderSlots(){
  slotList.innerHTML = '';
  baseSlots.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'slot';
    el.innerHTML = `
      <div><strong>${s.hora}</strong> · <span style="color:#036280">${s.mentor}</span></div>
      <button class="take" data-i="${i}">Tomar</button>
    `;
    slotList.appendChild(el);
  });
  slotList.querySelectorAll('.take').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = Number(e.currentTarget.dataset.i);
      const sel = baseSlots[i];
      const f = document.getElementById('formReserva');
      f.area.value = inferArea(sel.mentor);
      f.hora.value = sel.hora.replace(':','-'); // formatea HH:MM -> HH-MM para input time (fallback)
      f.scrollIntoView({behavior:'smooth'});
    });
  });
}
renderSlots();

function inferArea(txt){
  const t = txt.toLowerCase();
  if(t.includes('sistemas') || t.includes('software') || t.includes('ing')) return 'Tecnología';
  if(t.includes('medicina') || t.includes('salud')) return 'Salud';
  if(t.includes('admin') || t.includes('negocio')) return 'Negocios';
  if(t.includes('diseño') || t.includes('arte')) return 'Artes & Diseño';
  return '';
}

// Validación básica y “envío”
const form = document.getElementById('formReserva');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if(!data.area || !data.fecha || !data.hora || !data.email){
    alert('Completa todos los campos.');
    return;
  }
  // Simula envío
  console.log('Reserva enviada:', data);
  modal.showModal();
  form.reset();
});

