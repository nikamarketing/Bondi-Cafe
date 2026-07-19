// ============================================================
// generate-brand-assets.mjs — Aaron's Koshe brand assets
//
// Dependency-free PNG generation (pure node:zlib) for:
//   public/assets/images/og-image.png      1200×630 social card
//   public/assets/images/favicon-256.png   256×256
//   public/assets/images/favicon-32.png    32×32
//   public/assets/images/apple-touch-icon.png 180×180
//   public/favicon.ico                     32×32 (PNG-in-ICO)
//
// Run: node scripts/generate-brand-assets.mjs
// ============================================================
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';

const IMG_DIR = path.resolve('public/assets/images');
const PUB_DIR = path.resolve('public');

// ── Colors ──────────────────────────────────────────────────
const NAVY_TOP = [14, 62, 99];      // #0E3E63
const NAVY_BOT = [8, 43, 71];       // #082B47
const BLUE = [21, 88, 140];         // #15588C
const AQUA = [63, 169, 208];        // #3FA9D0
const AQUA_LIGHT = [124, 199, 227]; // #7CC7E3
const WHITE = [245, 248, 251];      // #F5F8FB

// ── Minimal PNG encoder ─────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Tiny raster canvas (supersampled) ───────────────────────
class Canvas {
  constructor(width, height, ss = 3) {
    this.w = width; this.h = height; this.ss = ss;
    this.W = width * ss; this.H = height * ss;
    this.px = new Float64Array(this.W * this.H * 3);
  }
  setPx(x, y, rgb) {
    if (x < 0 || y < 0 || x >= this.W || y >= this.H) return;
    const i = (y * this.W + x) * 3;
    this.px[i] = rgb[0]; this.px[i + 1] = rgb[1]; this.px[i + 2] = rgb[2];
  }
  fillVerticalGradient(top, bot) {
    for (let y = 0; y < this.H; y++) {
      const t = y / (this.H - 1);
      const rgb = [0, 1, 2].map(i => top[i] + (bot[i] - top[i]) * t);
      for (let x = 0; x < this.W; x++) this.setPx(x, y, rgb);
    }
  }
  fillRect(x0, y0, x1, y1, rgb) {
    const s = this.ss;
    for (let y = Math.round(y0 * s); y < Math.round(y1 * s); y++)
      for (let x = Math.round(x0 * s); x < Math.round(x1 * s); x++)
        this.setPx(x, y, rgb);
  }
  fillRoundedRect(x0, y0, x1, y1, r, rgb) {
    const s = this.ss;
    const R = r * s;
    const X0 = x0 * s, Y0 = y0 * s, X1 = x1 * s, Y1 = y1 * s;
    for (let y = Math.round(Y0); y < Math.round(Y1); y++) {
      for (let x = Math.round(X0); x < Math.round(X1); x++) {
        const cx = Math.max(X0 + R, Math.min(x, X1 - R));
        const cy = Math.max(Y0 + R, Math.min(y, Y1 - R));
        if ((x - cx) ** 2 + (y - cy) ** 2 <= R * R || (x >= X0 + R && x <= X1 - R) || (y >= Y0 + R && y <= Y1 - R)) {
          this.setPx(x, y, rgb);
        }
      }
    }
  }
  fillTriangle(p1, p2, p3, rgb) {
    const s = this.ss;
    const [a, b, c] = [p1, p2, p3].map(p => [p[0] * s, p[1] * s]);
    const minX = Math.floor(Math.min(a[0], b[0], c[0]));
    const maxX = Math.ceil(Math.max(a[0], b[0], c[0]));
    const minY = Math.floor(Math.min(a[1], b[1], c[1]));
    const maxY = Math.ceil(Math.max(a[1], b[1], c[1]));
    const sign = (p, q, r) => (p[0] - r[0]) * (q[1] - r[1]) - (q[0] - r[0]) * (p[1] - r[1]);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const p = [x + 0.5, y + 0.5];
        const d1 = sign(p, a, b), d2 = sign(p, b, c), d3 = sign(p, c, a);
        const neg = d1 < 0 || d2 < 0 || d3 < 0;
        const pos = d1 > 0 || d2 > 0 || d3 > 0;
        if (!(neg && pos)) this.setPx(x, y, rgb);
      }
    }
  }
  line(x0, y0, x1, y1, width, rgb) {
    const s = this.ss;
    const ax = x0 * s, ay = y0 * s, bx = x1 * s, by = y1 * s;
    const hw = (width * s) / 2;
    const minX = Math.floor(Math.min(ax, bx) - hw), maxX = Math.ceil(Math.max(ax, bx) + hw);
    const minY = Math.floor(Math.min(ay, by) - hw), maxY = Math.ceil(Math.max(ay, by) + hw);
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy || 1;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / len2));
        const px = ax + t * dx, py = ay + t * dy;
        if ((x - px) ** 2 + (y - py) ** 2 <= hw * hw) this.setPx(x, y, rgb);
      }
    }
  }
  polyline(points, width, rgb) {
    for (let i = 0; i < points.length - 1; i++) {
      this.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], width, rgb);
    }
  }
  // Downsample supersampled buffer to final RGBA
  toPng() {
    const rgba = Buffer.alloc(this.w * this.h * 4);
    const s = this.ss, n = s * s;
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        let r = 0, g = 0, b = 0;
        for (let sy = 0; sy < s; sy++) {
          for (let sx = 0; sx < s; sx++) {
            const i = ((y * s + sy) * this.W + (x * s + sx)) * 3;
            r += this.px[i]; g += this.px[i + 1]; b += this.px[i + 2];
          }
        }
        const o = (y * this.w + x) * 4;
        rgba[o] = Math.round(r / n);
        rgba[o + 1] = Math.round(g / n);
        rgba[o + 2] = Math.round(b / n);
        rgba[o + 3] = 255;
      }
    }
    return encodePng(this.w, this.h, rgba);
  }
}

// ── Stroke font (polylines in a 1×1 box, y down) ────────────
const FONT = {
  A: [[[0, 1], [0.5, 0], [1, 1]], [[0.22, 0.62], [0.78, 0.62]]],
  B: [[[0, 0], [0, 1]], [[0, 0], [0.68, 0], [0.85, 0.12], [0.85, 0.38], [0.68, 0.5], [0, 0.5]], [[0.68, 0.5], [0.9, 0.62], [0.9, 0.88], [0.68, 1], [0, 1]]],
  C: [[[0.92, 0.14], [0.62, 0], [0.3, 0], [0.02, 0.24], [0.02, 0.76], [0.3, 1], [0.62, 1], [0.92, 0.86]]],
  D: [[[0, 0], [0, 1]], [[0, 0], [0.58, 0], [0.95, 0.28], [0.95, 0.72], [0.58, 1], [0, 1]]],
  E: [[[0.95, 0], [0, 0], [0, 1], [0.95, 1]], [[0, 0.5], [0.7, 0.5]]],
  F: [[[0.95, 0], [0, 0], [0, 1]], [[0, 0.5], [0.7, 0.5]]],
  H: [[[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]]],
  I: [[[0.5, 0], [0.5, 1]]],
  K: [[[0, 0], [0, 1]], [[0.95, 0], [0.02, 0.55]], [[0.34, 0.36], [0.95, 1]]],
  N: [[[0, 1], [0, 0], [1, 1], [1, 0]]],
  O: [[[0.3, 0], [0.7, 0], [1, 0.28], [1, 0.72], [0.7, 1], [0.3, 1], [0, 0.72], [0, 0.28], [0.3, 0]]],
  R: [[[0, 0], [0, 1]], [[0, 0], [0.68, 0], [0.9, 0.14], [0.9, 0.4], [0.68, 0.54], [0, 0.54]], [[0.55, 0.54], [0.95, 1]]],
  S: [[[0.9, 0.12], [0.62, 0], [0.3, 0], [0.05, 0.14], [0.05, 0.36], [0.3, 0.5], [0.7, 0.5], [0.95, 0.64], [0.95, 0.86], [0.68, 1], [0.34, 1], [0.06, 0.88]]],
  T: [[[0, 0], [1, 0]], [[0.5, 0], [0.5, 1]]],
  U: [[[0, 0], [0, 0.74], [0.26, 1], [0.74, 1], [1, 0.74], [1, 0]]],
  '&': [[[0.92, 1], [0.2, 0.34], [0.2, 0.14], [0.36, 0], [0.56, 0], [0.7, 0.14], [0.7, 0.3], [0.1, 0.68], [0.1, 0.86], [0.3, 1], [0.56, 1], [0.88, 0.58]]],
  "'": [[[0.55, 0], [0.4, 0.3]]],
  '·': [[[0.42, 0.5], [0.58, 0.5]]],
  ' ': [],
};

function drawText(cv, text, cx, y, size, width, rgb, spacing = 0.32) {
  const glyphW = size * 0.72;
  const adv = glyphW + size * spacing;
  const widths = [...text].map(ch => (ch === ' ' ? glyphW * 0.6 : ch === "'" || ch === '·' ? glyphW * 0.4 : glyphW));
  const total = widths.reduce((a, b) => a + b, 0) + (text.length - 1) * size * spacing;
  let x = cx - total / 2;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const glyph = FONT[ch] || [];
    const w = widths[i];
    for (const stroke of glyph) {
      cv.polyline(stroke.map(([gx, gy]) => [x + gx * w, y + gy * size]), width, rgb);
    }
    x += w + size * spacing;
  }
}

// ── Yacht glyph ─────────────────────────────────────────────
function drawYacht(cv, cx, cy, scale) {
  const s = scale;
  // mast
  cv.line(cx, cy - 1.05 * s, cx, cy - 0.06 * s, 0.07 * s, WHITE);
  // mainsail (aft)
  cv.fillTriangle([cx - 0.07 * s, cy - 0.95 * s], [cx - 0.07 * s, cy - 0.1 * s], [cx - 0.72 * s, cy - 0.1 * s], WHITE);
  // jib (fore)
  cv.fillTriangle([cx + 0.07 * s, cy - 0.85 * s], [cx + 0.07 * s, cy - 0.1 * s], [cx + 0.66 * s, cy - 0.1 * s], AQUA);
  // pennant
  cv.fillTriangle([cx, cy - 1.05 * s], [cx + 0.28 * s, cy - 0.97 * s], [cx, cy - 0.89 * s], AQUA_LIGHT);
  // hull
  cv.fillTriangle([cx - 0.85 * s, cy], [cx + 0.85 * s, cy], [cx + 0.6 * s, cy + 0.28 * s], WHITE);
  cv.fillTriangle([cx - 0.85 * s, cy], [cx + 0.6 * s, cy + 0.28 * s], [cx - 0.58 * s, cy + 0.28 * s], WHITE);
  // waterline waves
  cv.polyline([[cx - 1.15 * s, cy + 0.42 * s], [cx - 0.9 * s, cy + 0.3 * s], [cx - 0.65 * s, cy + 0.42 * s], [cx - 0.4 * s, cy + 0.3 * s], [cx - 0.15 * s, cy + 0.42 * s]], 0.06 * s, AQUA_LIGHT);
  cv.polyline([[cx + 0.15 * s, cy + 0.42 * s], [cx + 0.4 * s, cy + 0.3 * s], [cx + 0.65 * s, cy + 0.42 * s], [cx + 0.9 * s, cy + 0.3 * s], [cx + 1.15 * s, cy + 0.42 * s]], 0.06 * s, AQUA_LIGHT);
}

// ── OG image 1200×630 ───────────────────────────────────────
function buildOgImage() {
  const cv = new Canvas(1200, 630, 2);
  cv.fillVerticalGradient(NAVY_TOP, NAVY_BOT);
  // subtle horizon waves
  for (let i = 0; i < 4; i++) {
    const y = 470 + i * 36;
    const pts = [];
    for (let x = -20; x <= 1220; x += 40) {
      pts.push([x, y + (x / 40 % 2 === 0 ? -5 : 5)]);
    }
    cv.polyline(pts, 2.2, [AQUA[0], AQUA[1], AQUA[2]].map((c, j) => c * 0.45 + NAVY_BOT[j] * 0.55));
  }
  drawYacht(cv, 600, 175, 105);
  drawText(cv, "AARON'S KOSHE", 600, 312, 74, 7.5, WHITE, 0.32);
  // divider
  cv.line(410, 452, 790, 452, 2.5, AQUA);
  drawText(cv, 'CAFE & RESTAURANT · BONDI BEACH', 600, 495, 30, 3.4, AQUA_LIGHT, 0.42);
  return cv.toPng();
}

// ── Favicon: sail mark on rounded blue tile ─────────────────
function buildFavicon(size) {
  const cv = new Canvas(size, size, 3);
  // transparent-ish corners not supported (opaque canvas) — use full tile
  cv.fillVerticalGradient(BLUE, NAVY_BOT);
  drawYacht(cv, size / 2, size * 0.62, size * 0.36);
  return cv.toPng();
}

// ── ICO wrapper (single PNG-compressed 32×32 entry) ─────────
function buildIco(png32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);  // reserved
  header.writeUInt16LE(1, 2);  // type: icon
  header.writeUInt16LE(1, 4);  // count
  const entry = Buffer.alloc(16);
  entry[0] = 32;               // width
  entry[1] = 32;               // height
  entry[2] = 0;                // palette
  entry[3] = 0;                // reserved
  entry.writeUInt16LE(1, 4);   // planes
  entry.writeUInt16LE(32, 6);  // bpp
  entry.writeUInt32LE(png32.length, 8);
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, png32]);
}

fs.mkdirSync(IMG_DIR, { recursive: true });
fs.writeFileSync(path.join(IMG_DIR, 'og-image.png'), buildOgImage());
const fav256 = buildFavicon(256);
const fav32 = buildFavicon(32);
fs.writeFileSync(path.join(IMG_DIR, 'favicon-256.png'), fav256);
fs.writeFileSync(path.join(IMG_DIR, 'favicon-32.png'), fav32);
fs.writeFileSync(path.join(IMG_DIR, 'apple-touch-icon.png'), buildFavicon(180));
fs.writeFileSync(path.join(PUB_DIR, 'favicon.ico'), buildIco(fav32));
console.log('Brand assets generated: og-image.png, favicon-256/32.png, apple-touch-icon.png, favicon.ico');
