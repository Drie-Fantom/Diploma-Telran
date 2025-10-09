// src/common/utils/imgUrl.js
export function imgUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path; // уже абсолютный
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
  const p = String(path).startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
