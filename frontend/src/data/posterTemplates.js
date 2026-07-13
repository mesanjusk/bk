// Poster templates for the Create Poster tool.
//
// This is a Canva-style, JSON-driven layer system — nothing about a poster's
// look is hardcoded in the editor. Every template is a plain JS object:
//
//   {
//     id: string,               // unique, used as the draft's storage key
//     name: string,              // shown on the template picker card
//     background: string,        // Cloudinary (or any) image URL — the base artwork
//     elements: Element[],       // editable layers stacked on top, in draw order
//   }
//
// Element shapes:
//
//   TEXT   { id, type: 'text',  text, x, y, width, fontSize, fontWeight,
//            color, fontFamily?, lineHeight? }
//   IMAGE  { id, type: 'image', x, y, width, height, src, fit? }   // src: '' = empty placeholder, user uploads
//   SHAPE  { id, type: 'shape', shape: 'rect', x, y, width, height, fill }
//
// x/y/width/height are all in the fixed design space below (CANVAS_WIDTH x
// CANVAS_HEIGHT), scaled responsively at render time — see PosterCanvas.jsx.
//
// To add a new template: drop a new object into `posterTemplates`. No
// editor code needs to change — the canvas, controls panel and export all
// read purely from this JSON.
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 1000; // 4:5 ratio

// Placeholder backgrounds — these stand in for real poster artwork until
// designed backgrounds are uploaded to Cloudinary and swapped in below.
// They apply a soft blur + brand-color tint to a Cloudinary demo asset so
// the canvas has believable full-bleed art to preview the layout against.
function placeholderBackground(tintHex) {
  return (
    'https://res.cloudinary.com/demo/image/upload/' +
    `w_${CANVAS_WIDTH},h_${CANVAS_HEIGHT},c_fill,g_auto,e_blur:1500,e_saturation:-70,e_brightness:15,` +
    `e_colorize:55,co_rgb:${tintHex}/sample.jpg`
  );
}

export const posterTemplates = [
  {
    id: 'student-marksheet',
    name: 'Student Marksheet',
    background: placeholderBackground('3f5945'),
    elements: [
      { id: 'photo', type: 'image', x: 60, y: 60, width: 220, height: 220, fit: 'cover', src: '' },
      {
        id: 'studentName',
        type: 'text',
        text: 'Student Name',
        x: 310,
        y: 65,
        width: 430,
        fontSize: 34,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Playfair Display, serif',
      },
      {
        id: 'classRoll',
        type: 'text',
        text: 'Class: ____    Roll No: ____',
        x: 310,
        y: 125,
        width: 430,
        fontSize: 20,
        fontWeight: 'normal',
        color: '#f6f1e7',
        fontFamily: 'Inter, sans-serif',
      },
      {
        id: 'academicYear',
        type: 'text',
        text: 'Academic Year: 2025–26',
        x: 310,
        y: 165,
        width: 430,
        fontSize: 18,
        fontWeight: 'normal',
        color: '#f6f1e7',
        fontFamily: 'Inter, sans-serif',
      },
      { id: 'marksPanel', type: 'shape', shape: 'rect', x: 60, y: 330, width: 680, height: 520, fill: '#f6f1e7' },
      {
        id: 'marksHeading',
        type: 'text',
        text: 'Mark Sheet',
        x: 90,
        y: 360,
        width: 620,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#22301f',
        fontFamily: 'Playfair Display, serif',
      },
      {
        id: 'marksList',
        type: 'text',
        text: 'Mathematics: __ / 100\nScience: __ / 100\nEnglish: __ / 100\nSocial Studies: __ / 100\n\nTotal: __ / 400\nPercentage: __ %',
        x: 90,
        y: 420,
        width: 620,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#2e2e2a',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.9,
      },
      {
        id: 'remarks',
        type: 'text',
        text: 'Remarks: __________________________',
        x: 90,
        y: 740,
        width: 620,
        fontSize: 20,
        fontWeight: 'normal',
        color: '#3a332b',
        fontFamily: 'Inter, sans-serif',
      },
      {
        id: 'signature',
        type: 'text',
        text: 'Class Teacher: __________     Principal: __________',
        x: 90,
        y: 800,
        width: 620,
        fontSize: 18,
        fontWeight: 'normal',
        color: '#3a332b',
        fontFamily: 'Inter, sans-serif',
      },
    ],
  },
  {
    id: 'blood-donation',
    name: 'Blood Donation Poster',
    background: placeholderBackground('7c2d3a'),
    elements: [
      {
        id: 'heading',
        type: 'text',
        text: 'Blood Donation Camp',
        x: 60,
        y: 60,
        width: 680,
        fontSize: 46,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Playfair Display, serif',
      },
      {
        id: 'subheading',
        type: 'text',
        text: 'Every drop counts. Join us and save a life.',
        x: 60,
        y: 150,
        width: 680,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#f8f1ec',
        fontFamily: 'Inter, sans-serif',
      },
      { id: 'photo', type: 'image', x: 60, y: 220, width: 680, height: 420, fit: 'cover', src: '' },
      {
        id: 'detailsPanel',
        type: 'shape',
        shape: 'rect',
        x: 60,
        y: 670,
        width: 680,
        height: 260,
        fill: 'rgba(255,255,255,0.92)',
      },
      {
        id: 'organizer',
        type: 'text',
        text: 'Organized by: __________',
        x: 90,
        y: 700,
        width: 620,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3a2020',
        fontFamily: 'Inter, sans-serif',
      },
      {
        id: 'details',
        type: 'text',
        text: 'Date: __________\nVenue: __________\nContact: __________',
        x: 90,
        y: 750,
        width: 620,
        fontSize: 20,
        fontWeight: 'normal',
        color: '#3a332b',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.7,
      },
    ],
  },
  {
    id: 'scholarship',
    name: 'Scholarship Announcement',
    background: placeholderBackground('b08b57'),
    elements: [
      { id: 'photo', type: 'image', x: 60, y: 60, width: 680, height: 400, fit: 'cover', src: '' },
      { id: 'panel', type: 'shape', shape: 'rect', x: 0, y: 480, width: 800, height: 520, fill: '#f6f1e7' },
      {
        id: 'heading',
        type: 'text',
        text: 'Scholarship Applications Open',
        x: 60,
        y: 510,
        width: 680,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#22301f',
        fontFamily: 'Playfair Display, serif',
      },
      {
        id: 'subheading',
        type: 'text',
        text: 'Supporting first-generation learners since 2016.',
        x: 60,
        y: 600,
        width: 680,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#4b5d4f',
        fontFamily: 'Inter, sans-serif',
      },
      {
        id: 'details',
        type: 'text',
        text: 'Last date to apply: __________\nEligibility: __________',
        x: 60,
        y: 670,
        width: 680,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#3a332b',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.8,
      },
      {
        id: 'contact',
        type: 'text',
        text: 'Apply at: __________',
        x: 60,
        y: 900,
        width: 680,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3f5945',
        fontFamily: 'Inter, sans-serif',
      },
    ],
  },
  {
    id: 'volunteer',
    name: 'Volunteer Recruitment',
    background: placeholderBackground('22301f'),
    elements: [
      {
        id: 'heading',
        type: 'text',
        text: 'Become a Volunteer',
        x: 60,
        y: 60,
        width: 680,
        fontSize: 44,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Playfair Display, serif',
      },
      {
        id: 'subheading',
        type: 'text',
        text: 'Give your time. Change a life.',
        x: 60,
        y: 150,
        width: 680,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#f6f1e7',
        fontFamily: 'Inter, sans-serif',
      },
      { id: 'photo', type: 'image', x: 60, y: 210, width: 680, height: 480, fit: 'cover', src: '' },
      {
        id: 'detailsPanel',
        type: 'shape',
        shape: 'rect',
        x: 60,
        y: 720,
        width: 680,
        height: 200,
        fill: 'rgba(246,241,231,0.94)',
      },
      {
        id: 'details',
        type: 'text',
        text: 'Sign up: __________\nContact: __________',
        x: 90,
        y: 755,
        width: 620,
        fontSize: 22,
        fontWeight: 'normal',
        color: '#22301f',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.8,
      },
    ],
  },
];

export function cloneTemplate(template) {
  return {
    ...template,
    elements: template.elements.map((el) => ({ ...el })),
  };
}
