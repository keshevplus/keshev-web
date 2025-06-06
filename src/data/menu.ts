export interface MenuItem {
  label: string
  path: string
}

export const menuData: MenuItem[] = [
  { label: 'בית',      path: '/' },
  { label: 'אודותנו',     path: '/about' },
  { label: 'שירותינו',  path: '/services' },
  { label: 'מהי ADHD',      path: '/adhd' },
  { label: 'תהליך האבחון', path: '/diagnosis' },
  { label: 'שאלונים',     path: '/forms' },
  { label: 'יצירת קשר',   path: '/contact' },
]
