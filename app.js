(function () {
  var cfg = window.WEDDING || {};
  var card = document.getElementById('card');
  var intro = document.getElementById('intro');
  var introWrap = document.getElementById('intro-wrap');

  /* ---------- Nội dung từ config.js ---------- */
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = cfg[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-needs]').forEach(function (el) {
    el.hidden = !cfg[el.getAttribute('data-needs')];
  });
  if (cfg.qrImage) {
    document.querySelectorAll('[data-qr]').forEach(function (el) {
      var img = document.createElement('img');
      img.src = cfg.qrImage;
      img.alt = 'Mã QR mừng cưới';
      img.style.cssText = 'display:block;width:100%;height:100%;object-fit:contain';
      el.replaceWith(img);
    });
  }

  /* ---------- Tên khách mời ----------
     ?to=Anh%20Nam  hoặc  #Anh-Nam  hoặc  #k.<base64url của tên có dấu> */
  function fromHash() {
    var h = (location.hash || '').replace(/^#/, '');
    if (!h) return '';
    if (h.indexOf('k.') === 0) {
      try {
        var b = h.slice(2).replace(/-/g, '+').replace(/_/g, '/');
        while (b.length % 4) b += '=';
        var bin = atob(b), bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new TextDecoder().decode(bytes);
      } catch (e) { return ''; }
    }
    try { h = decodeURIComponent(h); } catch (e) {}
    return h.replace(/[-_.~]+/g, ' ');
  }
  var guest = '';
  try { guest = new URLSearchParams(location.search).get('to') || ''; } catch (e) {}
  if (!guest) guest = fromHash();
  guest = guest.trim().slice(0, 60);
  document.querySelectorAll('[data-guest]').forEach(function (el) { el.textContent = guest; });
  document.querySelectorAll('.if-guest').forEach(function (el) { el.hidden = !guest; });

  /* ---------- Màn mở thiệp ---------- */
  var openBtn = document.getElementById('open-card');
  if (openBtn && intro) {
    openBtn.addEventListener('click', function () {
      card.className = 'go';
      intro.style.transform = 'translateY(-100%)';
      setTimeout(function () { if (introWrap) introWrap.hidden = true; }, 950);
    });
  } else if (card) {
    card.className = 'go';
  }

  /* ---------- Xem ảnh lớn ---------- */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lb-img');
  var lbCount = document.getElementById('lb-count');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-lb]'));
  var cur = -1, lastFocus = null;
  function show(i) {
    var n = thumbs.length;
    cur = (i + n) % n;
    var im = thumbs[cur].querySelector('img');
    lbImg.src = im.getAttribute('src');
    lbImg.alt = im.getAttribute('alt') || '';
    lbCount.textContent = (cur + 1) + ' / ' + n;
  }
  function closeLb() {
    lb.hidden = true;
    cur = -1;
    if (lastFocus) lastFocus.focus();
  }
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      lastFocus = t;
      show(i);
      lb.hidden = false;
      var c = lb.querySelector('[data-act="close"]');
      if (c) c.focus();
    });
  });
  if (lb) {
    lb.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var a = b.getAttribute('data-act');
      if (a === 'close') closeLb();
      if (a === 'prev') show(cur - 1);
      if (a === 'next') show(cur + 1);
    });
    var stage = document.getElementById('lb-stage'), tx = null;
    stage.addEventListener('touchstart', function (e) { tx = e.touches[0] ? e.touches[0].clientX : null; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (tx == null) return;
      var d = (e.changedTouches[0] ? e.changedTouches[0].clientX : tx) - tx;
      tx = null;
      if (Math.abs(d) > 40) show(cur + (d < 0 ? 1 : -1));
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- Xác nhận tham dự → Google Sheet ---------- */
  var form = document.getElementById('rsvp');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var btnLabel = btn.textContent;
  var guests = form.elements.namedItem('guests');
  var status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'margin:0;font-size:14px;line-height:1.6;text-align:center;min-height:1.6em';
  form.appendChild(status);

  var thanks = document.createElement('div');
  thanks.hidden = true;
  thanks.setAttribute('role', 'status');
  thanks.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:12px 0';
  thanks.innerHTML = '<p data-thanks style="margin:0;font-size:17px;line-height:1.7"></p>' +
    '<button type="button" data-again style="min-height:44px;padding:0 20px;border:0;background:none;color:inherit;font:inherit;font-size:14px;text-decoration:underline;cursor:pointer">Sửa lại câu trả lời</button>';
  form.after(thanks);

  function attendValue() {
    var r = form.querySelector('input[name="attend"]:checked');
    return r ? r.value : '';
  }
  function syncGuests() {
    var no = attendValue() === 'Không';
    guests.disabled = no;
    guests.parentElement.style.opacity = no ? '0.4' : '';
  }
  form.addEventListener('change', function () { syncGuests(); status.textContent = ''; });
  form.addEventListener('input', function () { status.textContent = ''; });

  var nameInput = form.elements.namedItem('fullname');
  if (guest && !nameInput.value) nameInput.value = guest;

  function showThanks(name, attend) {
    thanks.querySelector('[data-thanks]').textContent = attend === 'Không'
      ? 'Cảm ơn ' + name + ' đã báo cho chúng tôi. Mong có dịp gặp bạn sau!'
      : 'Cảm ơn ' + name + '! Hẹn gặp bạn ngày 06.12.2026.';
    form.hidden = true;
    thanks.hidden = false;
  }
  thanks.querySelector('[data-again]').addEventListener('click', function () {
    thanks.hidden = true;
    form.hidden = false;
    status.textContent = '';
  });
  try {
    var saved = JSON.parse(localStorage.getItem('rsvp-sent') || 'null');
    if (saved && saved.name) showThanks(saved.name, saved.attend);
  } catch (e) {}

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var attend = attendValue();
    if (!name) { status.textContent = 'Bạn nhập họ tên giúp chúng tôi nhé.'; nameInput.focus(); return; }
    if (!attend) { status.textContent = 'Bạn chọn có đến được hay không nhé.'; form.querySelector('input[name="attend"]').focus(); return; }
    if (!cfg.sheetUrl) { status.textContent = 'Thiệp chưa được nối với Google Sheet nên chưa gửi được.'; return; }

    var body = new URLSearchParams();
    body.set('fullname', name);
    body.set('attend', attend);
    body.set('guests', attend === 'Không' ? '0' : guests.value);
    body.set('message', (form.elements.namedItem('message').value || '').trim());
    body.set('invited', guest);
    body.set('template', document.body.getAttribute('data-template') || '');

    btn.disabled = true;
    btn.textContent = 'ĐANG GỬI…';
    status.textContent = '';
    fetch(cfg.sheetUrl, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () {
        try { localStorage.setItem('rsvp-sent', JSON.stringify({ name: name, attend: attend })); } catch (e) {}
        showThanks(name, attend);
      })
      .catch(function () {
        status.textContent = 'Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại nhé.';
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = btnLabel;
      });
  });
})();
