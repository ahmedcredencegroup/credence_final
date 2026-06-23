// Project galleries are resolved from the filesystem so adding a new project's
// photos is just a matter of dropping files into:
//   src/assets/projects/<slug>/full/NN.jpg   (full-size, opened in the lightbox)
//   src/assets/projects/<slug>/thumb/NN.jpg  (small, shown in the grid)
// Files are ordered by filename, so name them 01.jpg, 02.jpg, ...

const thumbMods = import.meta.glob("../assets/projects/*/thumb/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const fullMods = import.meta.glob("../assets/projects/*/full/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export type GalleryImage = { thumb: string; full: string };

function group(mods: Record<string, string>) {
  const out: Record<string, { key: string; url: string }[]> = {};
  for (const [path, url] of Object.entries(mods)) {
    const m = path.match(/projects\/([^/]+)\/(?:thumb|full)\/(.+)\.jpg$/);
    if (!m) continue;
    (out[m[1]] ??= []).push({ key: m[2], url });
  }
  for (const k in out) out[k].sort((a, b) => a.key.localeCompare(b.key));
  return out;
}

const T = group(thumbMods);
const F = group(fullMods);

export const galleries: Record<string, GalleryImage[]> = {};
for (const slug of Object.keys(F)) {
  const fulls = F[slug];
  const thumbs = T[slug] ?? [];
  galleries[slug] = fulls.map((f, i) => ({
    full: f.url,
    thumb: thumbs[i]?.url ?? f.url,
  }));
}

export const getGallery = (slug: string): GalleryImage[] => galleries[slug] ?? [];
