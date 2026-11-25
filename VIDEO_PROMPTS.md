# Hy·Me·Up! Scroll-Scrub Video & Keyframe Prompt Guide (Opsi 1)

Dokumen ini berisi panduan dan prompt siap pakai untuk membuat video scroll-scrub ala `https://sambalhap.vercel.app/` (16:9 `1920×1080`, 24–30 fps) dengan alur:

**Tirai Biru Tertutup → Tirai Terbuka → Produk Lama → Putaran Transisi (tanpa elemen bahan) → Produk Baru Berputar di atas Limbo Sky Blue**

---

## Rahasia Agar Teks Kemasan TIDAK Berantakan di AI Video
Model AI video (Kling, Veo, Runway, Seedance/Hailuo, Luma) hampir pasti mengacak teks kecil saat produk diputar lambat 180°–360° (terutama sisi belakang kemasan). Agar teks kemasan tetap **100% tajam dan terbaca**:

1. **Gunakan fitur Image-to-Video dengan Start Frame + End Frame (First/Last Frame)** — jangan Text-to-Video murni.
2. **Jangan minta AI mengarang teks bagian belakang.** Buat transisi putarannya memakai **fast whip-spin / rotational motion blur di tengah putaran (saat produk melewati sudut 90°–270°)**, lalu melambat (*ease-out*) dan berhenti tepat di **End Frame (foto asli tampak depan produk baru)** sehingga teks kemasan depan terkunci 100% tajam.
3. **Pisahkan jadi 2 klip pendek (4–5 detik per klip)** lalu gabungkan mulus di After Effects / CapCut / `ffmpeg` menjadi satu file `hero-scroll.mp4` (durasi total ~8–10 detik). Ini jauh lebih terkontrol daripada memaksa 1 generasi AI mengerjakan tirai + 2 kemasan sekaligus.
4. **Siapkan 3 Keyframe Image (16:9 `1920×1080`) di atas Limbo Sky Blue yang sama** sebelum masuk ke Image-to-Video:
   - `frame_01_curtain_closed.png` — Tirai biru tertutup penuh.
   - `frame_02_old_product.png` — Foto asli **Produk Lama** berdiri tegak di tengah limbo Sky Blue (`#57CAF9` → `#EAF5FB`), tirai biru sudah terbuka di tepi kiri & kanan.
   - `frame_03_new_product.png` — Foto asli **Produk Baru (`Hy·Me·Up! Hybrid Complete Sunscreen SPF 50 PA++++`)** berdiri tegak di tengah limbo Sky Blue yang persis sama, tanpa tirai.

---

## Prompt 0 — Keyframe Background Prep (Opsional, untuk Image Editing / Nano Banana / Flux / Photoshop)
Gunakan jika foto produk lama & baru perlu disamakan pencahayaan dan latar limbo Sky Blue-nya sebelum dianimasikan:

```text
Place the exact uploaded skincare tube upright at the center of a seamless bright sky-blue studio cyclorama limbo background (smooth studio gradient from luminous Sky Blue #57CAF9 at the top to soft pale sky #EAF5FB at the floor horizon). Preserve 100% of the product shape, cap, colors, logo, and every single printed letter on the packaging verbatim without altering or regenerating any text. Clean luxury K-beauty commercial studio lighting, soft diffused top key light, subtle crisp specular reflection along the edges, gentle grounded contact shadow underneath the cap on the sky-blue studio floor. Minimalist, zero extra props, zero floating ingredients, 16:9 widescreen composition, 8k commercial product photography.
```

---

## Prompt 1 — Klip 1: Tirai Biru Tertutup → Terbuka Menampilkan Produk Lama (`4–5 detik`)
**Setup Image-to-Video (Kling / Veo / Runway / Luma):**
- **Start Frame**: `frame_01_curtain_closed.png` (tirai sutra biru tertutup penuh)
- **End Frame**: `frame_02_old_product.png` (tirai biru terbuka ke kiri-kanan, menampilkan foto asli Produk Lama di tengah limbo Sky Blue)

**Prompt:**
```text
Luxury minimalist skincare studio commercial shot on a static locked-off camera, 16:9 widescreen. Starting from heavy silky sky-blue and deep ocean-blue studio curtains completely closed across the frame, the twin blue curtains part smoothly and symmetrically to the left and right edges with realistic soft fabric ripples and gentle studio rim lighting. As the curtains glide open, they unveil the skincare product standing perfectly upright and motionless at the center of a bright seamless sky-blue cyclorama limbo background (#57CAF9 to #EAF5FB). Keep the camera completely steady with only an imperceptible 2% push-in. Maintain razor-sharp focus on the product packaging so all printed text and logos remain completely crisp, undistorted, and legible. Zero floating objects, zero ingredients, zero particles, ultra-clean commercial lighting, smooth cinematic 30fps motion.
```

**Negative Prompt (jika tool mendukung):**
```text
warped text, garbled typography, morphing label, shaky camera, floating droplets, ingredients, water splash, cluttered background, harsh dark shadows, sudden cuts, extra hands
```

---

## Prompt 2 — Klip 2: Transisi Putaran Produk Lama → Produk Baru Berputar (`5 detik`)
**Setup Image-to-Video (Kling / Veo / Runway / Luma):**
- **Start Frame**: `frame_02_old_product.png` (Produk Lama berdiri di tengah limbo Sky Blue — crop/bersihkan tirai di tepi agar full limbo Sky Blue)
- **End Frame**: `frame_03_new_product.png` (Produk Baru berdiri di tengah limbo Sky Blue, tampak depan super tajam)

**Prompt:**
```text
Ultra-clean commercial skincare product transformation on a seamless bright sky-blue studio limbo background (#57CAF9 to #EAF5FB), locked-off static camera, 16:9 widescreen. The skincare tube standing upright at center begins to rotate smoothly around its vertical center axis, accelerating into a sleek high-speed 360-degree studio whip-spin. At the peak midpoint of the spin, natural fast rotational motion blur and a clean luminous sky-blue glass light sweep across the silhouette seamlessly transform the old tube into the new Hy·Me·Up! Hybrid Complete Sunscreen tube. The new tube decelerates with silky ease-out from the spin and settles squarely front-facing in hero position, holding completely crisp, readable, unaltered front packaging typography with a subtle glossy vertical specular light highlight gliding softly across the clean studio tube. No floating ingredients, no splashes, no extra objects, pure product rotation only, seamless bright sky-blue cyclorama floor, 30fps commercial studio footage.
```

**Negative Prompt (jika tool mendukung):**
```text
slow back-side reveal, invented back label text, unreadable gibberish text, melting packaging, floating fruits, droplets, splashes, particles, camera shake, background color shift, beige background, morphing artifacts
```

---

## Prompt 3 (Alternatif — 1 Klip Langsung untuk Veo 3 / Kling Multi-Beat `8 detik`)
Jika Anda ingin mencoba langsung dalam 1 generasi (Start Frame = Tirai Biru Tertutup, End Frame = Produk Baru tampak depan di limbo Sky Blue):

```text
Continuous single-take commercial studio sequence on a static locked-off camera, 16:9 widescreen. First 3 seconds: lush pleated sky-blue silk studio curtains part smoothly left and right to unveil the previous skincare tube standing centered on a bright seamless sky-blue limbo cyclorama (#57CAF9 to #EAF5FB). Next 3 seconds: the tube accelerates into a crisp vertical-axis 360-degree whip-spin with clean rotational motion blur and a bright studio specular light sweep at peak velocity, transforming seamlessly mid-spin into the new skincare sunscreen tube without lingering on the back side. Final 2 seconds: the new tube decelerates gracefully to a dead-center front-facing hero stop with razor-sharp, completely legible packaging typography and soft studio light glint. Pure product focus only—zero floating ingredients, zero splashes, zero props, consistent luminous sky-blue studio limbo background throughout.
```

---

## Cara Memasukkan Video Hasil Render ke Website
1. Gabungkan Klip 1 + Klip 2 (atau simpan hasil render tunggal) menjadi satu file bernama **`hero-scroll.mp4`** (dan opsional frame pertama **`hero-poster.jpg`**).
2. *(Sangat disarankan agar scrub scroll 100% mulus di Safari, Chrome & mobile)* Jalankan perintah `ffmpeg` ini agar setiap frame menjadi keyframe (*all-intra*, tanpa audio):
   ```bash
   ffmpeg -i input_render.mp4 -an -c:v libx264 -pix_fmt yuv420p -g 1 -keyint_min 1 -movflags +faststart -crf 20 public/media/hero-scroll.mp4
   ```
3. Taruh file tersebut di folder:
   - `public/media/hero-scroll.mp4`
   - `public/media/hero-poster.jpg` *(opsional)*
4. Website akan **otomatis mendeteksi** `/media/hero-scroll.mp4` dan langsung beralih dari mode placeholder interaktif ke mode **GSAP ScrollTrigger Video Scrubbing** seperti `https://sambalhap.vercel.app/`.
