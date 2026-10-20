"""
Reproducible portrait processing script for Om Prakash Chaubey's portfolio.

Behavior:
1. If `_inputs/profile-cutout.png` exists (a pre-cutout transparent PNG supplied by Om),
   loads it directly, skips background removal, crops to head-and-torso framing,
   applies studio grayscale (with subtle warm silver/orange duotone highlights) and a
   soft bottom-edge fade, and saves `public/images/portrait.png` (< 300 KB).
2. Otherwise, loads `_inputs/profile.jpg` (leaving `_inputs/` completely untouched)
   and applies the Section 4 circular crop with dark-gradient studio overlay fallback.
   Does NOT attempt any network downloads (`rembg` model fetches are disabled).

Usage:
  uv run --link-mode=copy --with pillow --with numpy python scripts/process-portrait.py
"""

from __future__ import annotations

import io
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps


def apply_studio_grayscale(rgb_img: Image.Image) -> Image.Image:
    """Convert RGB image to rich studio grayscale matching the reference design."""
    gray = ImageOps.grayscale(rgb_img)
    gray = ImageEnhance.Contrast(gray).enhance(1.22)
    gray = ImageEnhance.Brightness(gray).enhance(0.98)
    rgb_out = Image.merge("RGB", (gray, gray, gray))
    rgb_out = ImageEnhance.Sharpness(rgb_out).enhance(1.15)
    return rgb_out


def process_supplied_cutout(cutout_img: Image.Image) -> Image.Image:
    """
    Process a user-supplied transparent PNG (`_inputs/profile-cutout.png`):
    1. Crops to non-empty alpha bounding box (head-and-torso).
    2. Applies studio grayscale treatment to the RGB channels while preserving transparency.
    3. Applies a subtle bottom-edge fade so the bottom edge blends cleanly into the hero.
    """
    rgba = ImageOps.exif_transpose(cutout_img).convert("RGBA")
    r, g, b, a = rgba.split()

    # Trim excess transparent margins around the cutout, then keep head-and-torso framing
    bbox = a.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        w = right - left
        h = bottom - top
        pad_x = int(w * 0.06)
        pad_top = int(h * 0.04)
        crop_left = max(0, left - pad_x)
        crop_top = max(0, top - pad_top)
        crop_right = min(rgba.width, right + pad_x)
        # Keep head-and-torso (up to 96% of subject height)
        crop_bottom = min(rgba.height, top + int(h * 0.96))
        rgba = rgba.crop((crop_left, crop_top, crop_right, crop_bottom))
        r, g, b, a = rgba.split()

    rgb_toned = apply_studio_grayscale(Image.merge("RGB", (r, g, b)))

    # Smooth alpha slightly and fade the bottom 4% so the cutout sits cleanly on the hero border
    alpha_np = np.array(a, dtype=np.float32)
    height_px, _ = alpha_np.shape
    fade_rows = int(height_px * 0.04)
    if fade_rows > 0:
        ramp = np.linspace(1.0, 0.0, fade_rows, dtype=np.float32)[:, None]
        alpha_np[height_px - fade_rows :, :] *= ramp

    final_alpha = Image.fromarray(np.clip(alpha_np, 0, 255).astype(np.uint8), mode="L")
    tr, tg, tb = rgb_toned.split()
    return Image.merge("RGBA", (tr, tg, tb, final_alpha))


def process_circular_fallback(cropped: Image.Image) -> Image.Image:
    """
    Section 4 Fallback: circular crop with dark-gradient studio overlay.
    Suppresses the bright outdoor sky and bottom railing while keeping the
    subject's face and torso crisp against a dark studio vignette.
    """
    size = min(cropped.width, cropped.height)
    square = ImageOps.fit(cropped, (size, size), centering=(0.5, 0.32))
    rgb_toned = apply_studio_grayscale(square)

    arr = np.array(rgb_toned, dtype=np.float32)
    yy, xx = np.mgrid[0:size, 0:size]
    ny = yy / float(size)
    nx = xx / float(size)

    head_dist = ((nx - 0.50) / 0.19) ** 2 + ((ny - 0.28) / 0.21) ** 2
    torso_dist = ((nx - 0.51) / 0.39) ** 2 + ((ny - 0.76) / 0.34) ** 2
    subject_field = np.maximum(
        np.exp(-0.5 * (head_dist**1.6)),
        np.exp(-0.5 * (torso_dist**1.8)),
    )

    bg_dark = np.full_like(arr, 18.0)
    bg_attenuation = 0.18 + 0.82 * np.clip(subject_field * 1.15, 0.0, 1.0)[:, :, None]
    composited = arr * bg_attenuation + bg_dark * (1.0 - bg_attenuation)

    radial_dist = np.sqrt(((nx - 0.5) / 0.5) ** 2 + ((ny - 0.5) / 0.5) ** 2)
    edge_vignette = np.clip(
        1.0 - 0.55 * np.maximum(0.0, (radial_dist - 0.62) / 0.38) ** 1.5, 0.12, 1.0
    )[:, :, None]
    bottom_fade = np.clip(
        1.0 - 0.78 * np.maximum(0.0, (ny - 0.68) / 0.32) ** 1.4, 0.08, 1.0
    )[:, :, None]

    final_rgb = np.clip(composited * edge_vignette * bottom_fade, 0, 255).astype(np.uint8)
    toned_dark = Image.fromarray(final_rgb, mode="RGB")

    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((4, 4, size - 5, size - 5), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=1.2))

    r, g, b = toned_dark.split()
    return Image.merge("RGBA", (r, g, b, mask))


def main() -> int:
    root_dir = Path(__file__).resolve().parent.parent
    cutout_path = root_dir / "_inputs" / "profile-cutout.png"
    jpg_path = root_dir / "_inputs" / "profile.jpg"
    output_path = root_dir / "public" / "images" / "portrait.png"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if cutout_path.exists():
        print(f"Found user-supplied cutout: {cutout_path}")
        with Image.open(cutout_path) as cutout_img:
            result_rgba = process_supplied_cutout(cutout_img)
        mode_used = "profile-cutout.png (transparent cutout)"
    elif jpg_path.exists():
        with Image.open(jpg_path) as orig:
            orig_rgb = ImageOps.exif_transpose(orig).convert("RGB")
            width, height = orig_rgb.size
            print(f"Loaded _inputs/profile.jpg ({width}x{height})")

            crop_top = int(height * 0.33)
            crop_bottom = int(height * 0.95)
            crop_height = crop_bottom - crop_top
            crop_width = int(crop_height * 0.88)
            center_x = int(width * 0.53)
            crop_left = max(0, center_x - crop_width // 2)
            crop_right = min(width, crop_left + crop_width)

            cropped = orig_rgb.crop((crop_left, crop_top, crop_right, crop_bottom))
            print(f"Cropped to head-and-torso: {cropped.size}")

        print("Using Section 4 circular crop with dark-gradient studio overlay fallback.")
        result_rgba = process_circular_fallback(cropped)
        mode_used = "circular dark-gradient fallback"
    else:
        print(
            f"Error: Neither {cutout_path} nor {jpg_path} exists.",
            file=sys.stderr,
        )
        return 1

    target_height = 680
    aspect = result_rgba.width / result_rgba.height
    target_width = int(round(target_height * aspect))
    resized = result_rgba.resize((target_width, target_height), Image.Resampling.LANCZOS)

    buf = io.BytesIO()
    resized.save(buf, format="PNG", optimize=True, compress_level=9)
    size_kb = buf.tell() / 1024.0

    if size_kb > 285.0:
        quantized = resized.quantize(
            colors=256,
            method=Image.Quantize.FASTOCTREE,
            dither=Image.Dither.FLOYDSTEINBERG,
        )
        buf = io.BytesIO()
        quantized.save(buf, format="PNG", optimize=True, compress_level=9)
        size_kb = buf.tell() / 1024.0

    output_path.write_bytes(buf.getvalue())
    print(f"Saved {output_path} [{mode_used}] ({target_width}x{target_height}, {size_kb:.1f} KB)")

    if size_kb >= 300.0:
        print(f"Error: Output size {size_kb:.1f} KB exceeds 300 KB limit!", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
