// A small, game-specific icon set. Pieces are draughts discs, including stacked kings.
const discs='<ellipse cx="12" cy="9" rx="8" ry="4"/><ellipse cx="12" cy="9" rx="5" ry="2.3"/><path d="M4 9v5c0 2.2 3.6 4 8 4s8-1.8 8-4V9M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4"/>';
const drawings={
 checker:discs,
 king:'<ellipse cx="12" cy="6" rx="8" ry="3.5"/><ellipse cx="12" cy="6" rx="5" ry="2"/><path d="M4 6v5c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V6M4 11v6c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5v-6M4 14c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5"/>',
 board:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/><path d="M3 3h6v6H3zM15 3h6v6h-6zM9 9h6v6H9zM3 15h6v6H3zM15 15h6v6h-6z" fill="currentColor" stroke="none" opacity=".45"/>',
 book:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 3v18M11 7h6M11 17h6"/><ellipse cx="14" cy="12" rx="3" ry="1.5"/><path d="M11 12v1.5c0 2 6 2 6 0V12"/>',
 settings:'<path d="M3 6h18M3 12h18M3 18h18"/><circle cx="8" cy="6" r="2.5" fill="var(--surface,#1c2323)"/><circle cx="16" cy="12" r="2.5" fill="var(--surface,#1c2323)"/><circle cx="10" cy="18" r="2.5" fill="var(--surface,#1c2323)"/>',
 newgame:'<path d="M3 14V3h11M3 9h6V3M15 3h6v6h-6zM3 15h6v6H3z"/><ellipse cx="16" cy="15" rx="5" ry="2.5"/><path d="M11 15v3c0 3.3 10 3.3 10 0v-3"/>',
 portal:'<rect x="2" y="13" width="8" height="8"/><rect x="14" y="3" width="8" height="8"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="7" r="2"/><path d="m10 14 4-4M11 6h-5v5M13 18h5v-5" stroke-dasharray="2 3"/>',
 undo:'<ellipse cx="16" cy="16" rx="5" ry="2.5"/><path d="M11 16v3c0 3.3 10 3.3 10 0v-3M17 10V8a4 4 0 0 0-4-4H4M7 1 4 4l3 3"/>',
 move:'<ellipse cx="6" cy="17" rx="4" ry="2"/><path d="M2 17v3c0 2.7 8 2.7 8 0v-3M10 12l1-1M13 9l1-1"/><rect x="15" y="2" width="7" height="7"/><circle cx="18.5" cy="5.5" r="1"/>',
 'board-view':'<path d="m12 3 10 6-10 6L2 9zM2 9v5l10 6 10-6V9M7 6l10 6M17 6 7 12M12 15v5"/>',
 reset:'<path d="M20 7v5h-5M20 12a8 8 0 1 0-2 6"/><ellipse cx="11" cy="11" rx="3" ry="1.5"/><path d="M8 11v2c0 2 6 2 6 0v-2"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 7v1M12 11v6"/>',
 'sound-off':'<path d="M10 5 5 9H2v6h3l5 4zM15 9l6 6M21 9l-6 6"/>',
 sound:'<path d="M10 5 5 9H2v6h3l5 4zM14 8a6 6 0 0 1 0 8M17 5a10 10 0 0 1 0 14"/>',
 fullscreen:'<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
};
export const iconMarkup=name=>`<svg viewBox="0 0 24 24" aria-hidden="true">${drawings[name]||drawings.checker}</svg>`;
export function icons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=iconMarkup(el.dataset.icon);});}
