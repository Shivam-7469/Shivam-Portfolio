import { ProjectItem, ServiceItem, Photograph } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Experience', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Video Editing & Post',
    description: 'Precision cutting, rhythm, and narrative flow that keeps the audience immersed.',
  },
  {
    id: '2',
    title: 'Cinematic Color Grading',
    description: 'Creating atmosphere and mood through color theory and premium look development.',
  },
  {
    id: '3',
    title: 'Motion Graphics',
    description: 'Seamless integration of 2D/3D elements to enhance the visual language.',
  },
  {
    id: '4',
    title: 'Brand Films',
    description: 'High-end commercial storytelling that elevates brand identity.',
  },
  {
    id: '5',
    title: 'Website Design',
    description: 'Modern, responsive, and visually stunning website design and development.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Economic Growth 🇮🇳',
    category: 'podcast',
    imageUrl: 'https://i.im.ge/eBgBJz/Thumbnail.jpg',
    videoUrl: 'https://youtube.com/shorts/gsuVIRJEbQo?si=wMkLjeR_m-4Fagp1',
    description: 'A cinematic showcase.'
  },
  {
    id: 'p2',
    title: 'Elvy Labs',
    category: 'Product',
    imageUrl: 'https://i.im.ge/eB8MPF/End_Frame.jpg',
    videoUrl: 'https://youtube.com/shorts/IAvu7apsxW8?feature=share',
    description: 'High-energy rhythmic editing.'
  },
  {
    id: 'p3',
    title: 'Neon Dreams',
    category: 'high furries',
    imageUrl: 'https://i.im.ge/2026/01/26/GvWXfC.oar3.jpeg',
    videoUrl: 'https://youtube.com/shorts/CtCuCLLLKuU?si=Nxy1IjY7eQ_rrQSF',
    description: 'Surrealist motion graphics.'
  },
  {
    id: 'p4',
    title: 'Midnight Tokyo',
    category: 'Travel',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=W7Hk2re8jQI',
    description: 'Atmospheric night vibes.'
  },
  {
    id: 'p5',
    title: 'The Great Entrepreneur',
    category: 'Podcast edit',
    imageUrl: 'https://i.im.ge/2026/01/26/GvWruq.oardefault.jpeg',
    videoUrl: 'https://youtube.com/shorts/M78_oJ-slfc?si=mclsry8KulzF0v6q',
    description: 'Fast-paced fashion cuts.'
  },
  {
    id: 'p6',
    title: 'If Olympic Did not Ban Drugs ',
    category: 'YouTUbe Shorts',
    imageUrl: 'https://i.im.ge/eB8uQh/Middle_Frame.jpg',
    videoUrl: 'https://youtube.com/shorts/x0CK-iDmobI?si=VnU_uSNYxlS7EcIr',
    description: 'Dynamic movement tracking.'
  },
];

export const PHOTOGRAPHS: Photograph[] = [
  {
    id: 'ph1',
    url: 'https://i.im.ge/eBg8Ir/1767755521263.jpg',
    alt: 'Street photography',
    aspectRatio: 'portrait'
  },
  {
    id: 'ph2',
    url: 'https://i.im.ge/eBggMm/1767755521259.jpg',
    alt: 'Architecture',
    aspectRatio: 'landscape'
  },
  {
    id: 'ph3',
    url: 'https://i.im.ge/eBgREW/1767755521250.jpg',
    alt: 'Landscape',
    aspectRatio: 'landscape'
  },
  {
    id: 'ph4',
    url: 'https://i.im.ge/eBgWJ0/IMG_2960.jpg',
    alt: 'Mood lighting',
    aspectRatio: 'portrait'
  },
  {
    id: 'ph5',
    url: 'https://i.im.ge/eBgKdT/IMG_3086.jpg',
    alt: 'Moody silhouette',
    aspectRatio: 'square'
  },
  {
    id: 'ph6',
    url: 'https://i.im.ge/eBgVNc/IMG_2959.jpg',
    alt: 'Nature',
    aspectRatio: 'portrait'
  }
];
