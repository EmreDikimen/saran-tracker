# coffee_icon.jpeg'den şeffaf arka planlı dolu ve boş fincan PNG'leri üretir.
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out_dir = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.float32)
H, W, _ = a.shape

# 1) Arka plan: saf beyaza yakın ve dışarıya (ya da kulp boşluğuna) bağlı pikseller.
white = (a.min(axis=2) >= 250)
mask = Image.fromarray((white * 255).astype(np.uint8)).copy()  # kopya: aksi halde dolgu salt okunur belleğe yazılamıyor
for seed in [(0, 0), (965, 800)]:
    ImageDraw.floodfill(mask, seed, 128)
bg = np.asarray(mask) == 128

# 2) Kenar halkası: beyazla karışmış çizgi pikselleri; beyazdan ayrıştırıp yumuşak alfa ver.
ring = np.asarray(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
ring &= ~bg
ref = np.array([75, 47, 35], np.float32)  # çizgi rengi
alpha = np.ones((H, W), np.float32)
alpha[bg] = 0
ra = ((255 - a[ring]) / (255 - ref)).max(axis=1).clip(0, 1)
alpha[ring] = ra
rgb = a.copy()
safe = np.maximum(ra, 1e-3)[:, None]
rgb[ring] = ((a[ring] - (1 - ra)[:, None] * 255) / safe).clip(0, 255)

# 3) Boş fincan: kahve yüzeyini (köpük deseni dahil) fincanın iç rengiyle değiştir.
coffee = np.array([196, 126, 57], np.float32)
near = (np.linalg.norm(a - coffee, axis=2) < 45)
near[850:, :] = False  # alttaki kahve çekirdekleri hariç
ys, xs = np.nonzero(near)
cy, cx = (ys.min() + ys.max()) / 2, (xs.min() + xs.max()) / 2
ry, rx = (ys.max() - ys.min()) / 2 + 2, (xs.max() - xs.min()) / 2 + 2
yy, xx = np.mgrid[0:H, 0:W]
inside = ((yy - cy) / ry) ** 2 + ((xx - cx) / rx) ** 2 <= 1
lum = a.mean(axis=2)
core = ((yy - cy) / (ry * 0.9)) ** 2 + ((xx - cx) / (rx * 0.9)) ** 2 <= 1
surface = core | (inside & (lum > 120))  # yalnızca kenar bandındaki koyu çizgileri koru
empty_rgb = rgb.copy()
# Üstten alta hafif koyulaşan iç gölge: fincanın içi boş görünür.
shade = np.clip((yy - (cy - ry)) / (2 * ry), 0, 1)[..., None]
inner = np.array([238, 232, 223], np.float32) * (1 - shade) + np.array([222, 213, 200], np.float32) * shade
empty_rgb[surface] = inner[surface]

# 4) Kırp, kareye tamamla, küçült.
ys, xs = np.nonzero(alpha > 0.02)
pad = 12
t, b, l, r = ys.min() - pad, ys.max() + pad, xs.min() - pad, xs.max() + pad
side = max(b - t, r - l)
for name, data in [("cup_full.png", rgb), ("cup_empty.png", empty_rgb)]:
    rgba = np.dstack([data, alpha * 255]).astype(np.uint8)[t:b, l:r]
    tile = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    crop = Image.fromarray(rgba, "RGBA")
    tile.paste(crop, ((side - crop.width) // 2, (side - crop.height) // 2))
    tile.resize((192, 192), Image.LANCZOS).save(f"{out_dir}/{name}", optimize=True)
    print(name, crop.size)
