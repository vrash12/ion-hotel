(() => {
  'use strict';
  const data = window.hotelData;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const photo = (src, alt) => {
    const img = make('img');
    img.src = src; img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
    return img;
  };
  const button = (text, action) => {
    const el = make('button', '', text); el.type = 'button';
    el.addEventListener('click', action); return el;
  };
  $$('[data-text]').forEach(el => { el.textContent = data[el.dataset.text]; });
  $$('[data-link]').forEach(el => {
    el.href = data.links[el.dataset.link];
    if (el.href.startsWith('https:')) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
  });

  // The mobile menu works with pointer, keyboard and Escape.
  const menu = $('.menu-toggle');
  const nav = $('#navigation');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
  });
  $$('a', nav).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
  window.addEventListener('scroll', () => $('.header').classList.toggle('compact', window.scrollY > 40), { passive: true });

  const roomDialog = $('#room-dialog');
  const photoDialog = $('#photo-dialog');
  let lastFocus;
  function showDialog(dialog) {
    lastFocus = document.activeElement;
    document.body.classList.add('modal-open'); dialog.showModal();
  }
  $$('dialog').forEach(dialog => {
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    } });
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true }); });
  });
  function startInquiry(roomId) {
    if (roomDialog.open) { lastFocus = $('#guest-name'); roomDialog.close(); }
    $('#room-preference').value = roomId;
    $('#inquire').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    $('#guest-name').focus({ preventScroll: true });
  }
  function showRoom(room) {
    const content = $('#room-dialog-content'); content.replaceChildren();
    content.append(photo(room.image, room.alt));
    const copy = make('div', 'room-detail-copy');
    const title = make('h2', '', room.name); title.id = 'room-dialog-title';
    copy.append(title, make('p', 'room-bed', room.beds), make('p', '', room.description));
    const features = make('ul'); room.features.forEach(f => features.append(make('li', '', f)));
    copy.append(features, make('p', 'section-note', 'Contact for current rates. The hotel will confirm room occupancy, bed setup and inclusions.'));
    const inquire = button('Inquire about this room ↗', () => startInquiry(room.id)); inquire.className = 'button';
    copy.append(inquire); content.append(copy); showDialog(roomDialog);
  }
  data.rooms.forEach(room => {
    const card = make('article', 'room-card');
    const imageButton = button('', () => showRoom(room)); imageButton.className = 'room-image';
    imageButton.setAttribute('aria-label', `View ${room.name}`); imageButton.append(photo(room.image, room.alt));
    const info = make('div', 'room-info');
    info.append(make('p', 'room-tag', room.tag), make('h3', '', room.name), make('p', 'room-bed', room.beds));
    const actions = make('div', 'room-actions');
    const details = button('Room details', () => showRoom(room)); details.setAttribute('aria-label', `${room.name} details`);
    const inquire = button('Inquire ↗', () => startInquiry(room.id)); inquire.setAttribute('aria-label', `Inquire about ${room.name}`);
    actions.append(details, inquire); info.append(actions); card.append(imageButton, info); $('#room-grid').append(card);
    const option = make('option', '', room.name); option.value = room.id; $('#room-preference').append(option);
  });

  // Small functional amenity icons, with all labels available as text.
  const icons = {
    wifi: '<path d="M3 9a15 15 0 0 1 18 0M6 13a10 10 0 0 1 12 0M9 17a5 5 0 0 1 6 0"/><circle cx="12" cy="21" r=".6"/>',
    parking: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    coffee: '<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5ZM17 9h2a3 3 0 0 1 0 6h-2M8 3v2M13 3v2M2 22h19"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    lift: '<rect x="3" y="2" width="18" height="20" rx="1"/><path d="M8 17V7m-3 3 3-3 3 3m5-3v10m-3-3 3 3 3-3"/>',
    meeting: '<rect x="4" y="3" width="16" height="11" rx="1"/><path d="M8 21v-4h8v4M12 14v3M8 7h8M8 10h5"/>'
  };
  data.amenities.forEach(item => {
    const el = make('div', 'amenity');
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true'); icon.innerHTML = icons[item.icon];
    el.append(icon, make('span', '', item.name)); $('#amenity-grid').append(el);
  });

  let visiblePhotos = data.gallery;
  let photoIndex = 0;
  function updatePhoto() {
    const item = visiblePhotos[photoIndex];
    $('#large-photo').src = item.src; $('#large-photo').alt = item.alt;
    $('#photo-caption').textContent = `${item.caption} · ${photoIndex + 1} / ${visiblePhotos.length}`;
  }
  function movePhoto(delta) { photoIndex = (photoIndex + delta + visiblePhotos.length) % visiblePhotos.length; updatePhoto(); }
  function renderGallery(filter = 'All') {
    visiblePhotos = data.gallery.filter(item => filter === 'All' || item.category === filter);
    $('#gallery-grid').replaceChildren();
    visiblePhotos.forEach((item, index) => {
      const el = button('', () => { photoIndex = index; updatePhoto(); showDialog(photoDialog); });
      el.className = 'gallery-item'; el.setAttribute('aria-label', `Open photo: ${item.alt}`);
      const wrap = make('span', 'gallery-image'); wrap.append(photo(item.src, item.alt));
      el.append(wrap, make('span', 'gallery-caption', item.caption)); $('#gallery-grid').append(el);
    });
  }
  $$('[data-filter]').forEach(el => el.addEventListener('click', () => {
    $$('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === el)));
    renderGallery(el.dataset.filter);
  }));
  $('#photo-prev').addEventListener('click', () => movePhoto(-1));
  $('#photo-next').addEventListener('click', () => movePhoto(1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
  });
  renderGallery();

  // Local calendar dates avoid UTC rollover and work without network requests.
  function dateString(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
  function nextDay(value) { const [y,m,d] = value.split('-').map(Number); return dateString(new Date(y, m - 1, d + 1)); }
  function bindDates(start, end) {
    function update() {
      const today = dateString(new Date()); start.min = today;
      end.min = start.value && start.value >= today ? nextDay(start.value) : nextDay(today);
      start.setCustomValidity(start.value && start.value < today ? 'Choose today or a future date.' : '');
      end.setCustomValidity(end.value && end.value < end.min ? 'Check-out must be after check-in.' : '');
    }
    start.addEventListener('input', update); end.addEventListener('input', update); update(); return update;
  }
  const validateQuick = bindDates($('#quick-in'), $('#quick-out'));
  const validateInquiry = bindDates($('#check-in'), $('#check-out'));
  $('#quick-form').addEventListener('submit', event => {
    event.preventDefault(); validateQuick(); if (!event.currentTarget.reportValidity()) return;
    $('#check-in').value = $('#quick-in').value; $('#check-out').value = $('#quick-out').value; $('#guests').value = $('#quick-guests').value;
    validateInquiry(); startInquiry($('#room-preference').value);
  });
  $('#inquiry-form').addEventListener('input', () => { $('#form-result').hidden = true; });
  $('#inquiry-form').addEventListener('submit', event => {
    event.preventDefault(); validateInquiry();
    $('#guest-name').setCustomValidity($('#guest-name').value.trim() ? '' : 'Please enter a name.');
    if (!event.currentTarget.reportValidity()) return;
    const result = $('#form-result'); result.replaceChildren();
    result.append(make('h4', '', 'Your sample inquiry is ready.'), make('p', '', 'This was a preview only. Nothing has been sent or saved, and no room has been reserved. Contact Ion Hotel by phone or Facebook to confirm your stay.'));
    result.hidden = false; result.focus({ preventScroll: true }); result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  $('#guest-name').addEventListener('input', () => $('#guest-name').setCustomValidity(''));
})();
