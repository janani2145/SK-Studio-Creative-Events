/**
 * ============================================================================
 * SK CREATIVE EVENTS
 * Ella content, photos, contact details um inga mattum thaan.
 *
 * PHOTOS:
 *  - Client oda original photos   -> public/images/birthdays, public/images/team
 *  - Free stock photos (Pexels/Unsplash, free commercial licence) -> `stock` keela.
 *    `npm run fetch-stock` run panna, avanga ellam public/images/stock la
 *    download aagi, site local file ah use pannum.
 * ============================================================================
 */

import localStock from "./stock-local.json";

/* ---------- Stock photos (free licence) ---------- */
const pexels = (id, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const stockSources = {
  // Modern floral wedding stage (Pexels)
  "wedding-floral-stage": pexels(39725718),
  // Services
  dj: pexels(15349818, 1400),
  catering: pexels(35041879, 1400),
  mehndi: pexels(12718210, 1400),
  "photo-booth": "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=75",
};

// Uses the downloaded copy in /public/images/stock when it exists, else the online link
export const stock = (key) => (localStock.includes(key) ? `/images/stock/${key}.jpg` : stockSources[key]);

/* ---------- Brand ---------- */
export const brand = {
  name: "SK Creative Events",
  fullName: "SK Creative Events",
  descriptor: "",
  tagline: "Your success is our satisfaction",
  city: "Chennai",
  serviceArea: "Chennai and across Tamil Nadu",
  logo: "/images/logo/sk-logo.png",
  announcement: "Now booking celebration dates. WhatsApp 89397 34391 to check yours.",
};

/* ---------- Founder ---------- */
// TODO: owner name podunga (empty ah irundha "Founder" mattum kaattum)
export const founder = {
  name: "Saran Raj",
  role: "Proprietor, SK Creative Events",
  photo: "/images/team/founder.jpg",
  quote:
    "Every setup we build has a child's name on it, or a couple's. That's why we treat each one like it's the only event that day.",
};

export const team = {
  photo: "/images/team/sk-crew-team.jpg",
  width: 1600,
  height: 1200,
  caption: "The SK Creative Events crew. If you see these jerseys at your hall, your setup is in good hands.",
};

/* ---------- Contact ---------- */
export const contact = {
  phone: "+91 89397 34391",
  phoneHref: "tel:+918939734391",
  phone2: "+91 97517 34391",
  phone2Href: "tel:+919751734391",
  whatsapp: "918939734391",
  whatsappMessage: "Hi SK Creative Events! I'd like to plan a celebration. Can we talk?",
  email: "", // TODO: email irundha podunga (empty na site la kaattadhu)
  address: "No 7/4 8th Cross Street Dr.Subburayan Nagar Kodambakkam Chennai-600083",
  mapQuery: "No 7/4 8th Cross Street Dr.Subburayan Nagar Kodambakkam Chennai-600083",
  hours: "Every day, 9 am to 9 pm",
  socials: {
    instagram: "https://www.instagram.com/sk.creative.events/",
    facebook: "",
    youtube: "",
  },
};

export const whatsappLink = (message = contact.whatsappMessage) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapEmbedUrl = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=14&output=embed`;
export const mapLinkUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

/* ---------- Single-page navigation (section ids on the home page) ---------- */
export const navLinks = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "About Us", id: "about" },
  { label: "Contact", id: "contact" },
];

/* ---------- Client's original birthday photos (all shown in the gallery) ---------- */
// Pudhu photo add panna: public/images/birthdays la podunga, inga oru line add pannunga.
export const birthdayPhotos = [
  { src: "/images/birthdays/birthday-01.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-06.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-17.jpg", w: 1600, h: 1532 },
  { src: "/images/birthdays/birthday-30.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-02.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-27.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-04.jpg", w: 1600, h: 1200 },
  { src: "/images/birthdays/birthday-10.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-05.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-22.jpg", w: 828, h: 626 },
  { src: "/images/birthdays/birthday-13.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-07.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-11.jpg", w: 1024, h: 556 },
  { src: "/images/birthdays/birthday-28.jpg", w: 1600, h: 1200 },
  { src: "/images/birthdays/birthday-36.jpeg", w: 1440, h: 1080 },
  { src: "/images/birthdays/birthday-29.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-15.jpg", w: 720, h: 720 },
  { src: "/images/birthdays/birthday-16.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-21.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-03.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-12.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-08.jpg", w: 1600, h: 1200 },
  { src: "/images/birthdays/birthday-24.jpg", w: 1290, h: 620 },
  { src: "/images/birthdays/birthday-19.jpg", w: 1600, h: 976 },
  { src: "/images/birthdays/birthday-23.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-18.jpg", w: 1290, h: 716 },
  { src: "/images/birthdays/birthday-09.jpg", w: 1448, h: 1086 },
  { src: "/images/birthdays/birthday-33.jpeg", w: 1600, h: 1200 },
  { src: "/images/birthdays/birthday-26.jpg", w: 1600, h: 900 },
  { src: "/images/birthdays/birthday-35.jpeg", w: 1440, h: 1080 },
];

/* ---------- Hero: scroll pannumbodhu intha order la photos diagonal wipe aagum ---------- */
export const heroSlides = [
  {
    id: "wedding",
    image: "/images/stock/heroslideImg.png",
    title: "Wedding and reception stages",
    theme: "Floral arches, soft drapes and a stage seat",
    className: "!object-top",
    objectPosition: "center top",
    transformOrigin: "center top",
  },
  {
    id: "hishan",
    image: "/images/stock/heroslideImg2.png",
    title: "Hishan Aliyar Turns One",
    theme: "Elegant White, Gold & Silver Balloon Decoration"
  }
];

/* ---------- Services ---------- */
// From their own service poster. `feature` cards get the big tiles.
export const services = [
  {
    id: "decoration",
    name: "Theme decorations",
    feature: "primary",
    line: "Our signature. Birthday decoration packages built around your child's name, photos and favourite characters.",
    includes: [
      "Printed theme backdrop",
      "Balloon arch and pillars",
      "Marquee name letters",
      "Pedestals and cake table",
      "Welcome board",
      "Photo journey board",
    ],
    image: "/images/birthdays/birthday-02.jpg",
  },
  {
    id: "catering",
    name: "Catering and snack stalls",
    feature: "wide",
    line: "Veg and non-veg menus, plus popcorn and cotton candy counters.",
    image: stock("catering"),
  }, {
    id: "entries",
    name: "Grand entries",
    line: "Make the entrance the moment everyone films.",
    includes: ["Bridal entry", "Cold pyro", "Low fog", "Paper blast", "Balloon blast", "Elephant tusk entry"],
    image: "/images/services/service-entry.png",
  },
  {
    id: "dj",
    name: "DJ music",
    line: "Sound, lights and a DJ for the dance floor.",
    image: "/images/services/Dj.jpg",
  },

  {
    id: "booths",
    name: "Photo booths",
    line: "360 selfie booth and magic mirror photo booth.",
    image: "/images/services/photo-booth.png",
  },
  {
    id: "live",
    name: "Live bands",
    line: "Chenda melam, Punjabi dhol and band set.",
    image: "/images/services/service-live-bands1.png",
  },
  {
    id: "mehndi",
    name: "Mehandi and tattoo",
    line: "Mehandi and tattoo artists for the bride, family and guests.",
    image: "/images/services/mehandi.png",
  },
  {
    id: "games",
    name: "Games and entertainment",
    line: "Games, hosts and activities that keep the kids busy.",
    image: "/images/services/Game-zone.png",
  },
];

/* ---------- About / Why us ---------- */
export const reasons = [
  { title: "One team, one booking", text: "Decor, DJ, catering, entries, photo booths and mehandi. You talk to one person, not ten vendors." },
  { title: "Themes made for your child", text: "Names, photos, colours and favourite characters printed into the setup. No reused banners." },
  { title: "Ready before guests arrive", text: "Our crew reaches hours early and finishes before the hall opens. We pack up after, too." },
  { title: "Clear quotes on WhatsApp", text: "An itemised package quote before you pay any advance. What's on the quote is what you pay." },
  { title: "Our own trained crew", text: "The team in black and gold jerseys works for SK Creative Events. Same people, same standard, every event." },
  { title: "Any hall, any budget", text: "A living-room birthday or a full banquet hall. We size the package to your space and budget." },
];

/* ---------- Surprise spotlight (video with optional sound) ---------- */
export const surprise = {
  video: "/videos/surprise-anniversary.mp4",
  poster: "/videos/surprise-anniversary.jpg",
  label: "Anniversary surprise",
  text: "Anniversaries, birthdays and proposals. You bring them to the door blindfolded; we have the room glowing, the balloons up and the cake waiting.",
};

/* ---------- Reels (muted, looping, compressed in /public/videos) ---------- */
export const reels = [
  { src: "/videos/reel-01.mp4", poster: "/videos/reel-01.jpg", label: "Balloon entrance arch" },
  { src: "/videos/reel-02.mp4", poster: "/videos/reel-02.jpg", label: "Butterfly first birthday" },
  { src: "/videos/reel-03.mp4", poster: "/videos/reel-03.jpg", label: "Light tunnel and cold pyro entry" },
  { src: "/videos/reel-04.mp4", poster: "/videos/reel-04.jpg", label: "Chenda melam" },
];

export const steps = [
  { title: "Message us", text: "Send the date, venue, guest count and your theme idea on WhatsApp or call." },
  { title: "Get a design and quote", text: "We share a theme mock-up, colour palette and an itemised quote. Change anything you like." },
  { title: "We build it", text: "Backdrops get printed, props get made and our crew sets everything up on the day." },
  { title: "You celebrate", text: "Enjoy the party and the photos. We take everything down once you're done." },
];

// TODO: client oda original reviews (Google / WhatsApp) inga maathunga.
export const testimonials = [
  { quote: "They printed our son's photos into the backdrop and the whole hall looked like a palace. Every guest stopped for a photo.", name: "Sameera", event: "First birthday, royal theme" },
  { quote: "We gave them a Pinterest picture and a budget. What we got looked better than the picture.", name: "Karthik and Divya", event: "Butterfly birthday" },
  { quote: "Setup was done before we reached the hall. We just walked in and enjoyed the day.", name: "Priya", event: "Jungle theme birthday" },
];
