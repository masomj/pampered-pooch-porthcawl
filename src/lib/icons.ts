// Inline icon paths (Lucide-style, 24x24 viewBox, stroke currentColor). Static, trusted markup.
export const icons = {
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 6L2 7"></path>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle>',
  clock: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z"></path>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  scissors:
    '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"></path>',
  heart: '<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"></path>',
  drop: '<path d="M12 2.7s6 6.3 6 11.3a6 6 0 0 1-12 0c0-5 6-11.3 6-11.3z"></path>',
  quote: '<path d="M3 21c3 0 7-1 7-8V5H3v7h4c0 4-2 6-4 6M14 21c3 0 7-1 7-8V5h-7v7h4c0 4-2 6-4 6"></path>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"></path>',
  close: '<path d="M18 6 6 18M6 6l12 12"></path>',
} as const
export type IconName = keyof typeof icons
