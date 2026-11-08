<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Crown,
  Paintbrush,
  Building2,
  Sparkles,
  ShieldCheck,
  Layers,
  MessageCircle,
  Sliders,
  ZoomIn,
  ZoomOut,
  Hammer,
  CheckCircle2,
  Check,
  MapPin,
  Clock,
  Star,
  Quote,
  Compass,
  Phone,
  Mail,
  Globe,
  User,
  Calendar,
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Palette
} from 'lucide-vue-next'

// ==========================================
// 1. BILINGUAL CAMEROON LANGUAGE SYSTEM (FR / EN)
// ==========================================
const lang = ref('fr')
const toggleLanguage = () => {
  lang.value = lang.value === 'fr' ? 'en' : 'fr'
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang.value
  }
}

const translations = {
  fr: {
    brandSubtitle: "Maître Peintre & Staffeur d'Art Cameroun",
    navCta: 'Rendez-Vous Privé',
    navCtaShort: 'Contact',
    mobileNavTitle: 'Navigation & Expertise',
    whatsappDirectBtn: 'Discussion Directe WhatsApp VIP Cameroun',
    heroBadge: 'Douala • Yaoundé • Kribi • Villas de Haut Standing',
    heroTitleLine1: 'L’Art Sublimé de la',
    heroTitleHighlight: 'Peinture & du Staff',
    heroTitleLine3: 'd’Exception au Cameroun.',
    heroDescription: 'Sous la direction du Maître Artisan Jean-Paul Ndamen, notre atelier métamorphose vos villas de prestige, résidences duplex et façades sous climat tropical avec une rigueur chirurgicale.',
    heroGuaranteeTitle: 'Formules Tropicalisées Anti-Moisissures & Zéro Poussière',
    heroGuaranteeDesc: 'Protection hermétique des marbres et boiseries + peintures anti-humidité haute tenue aux fortes pluies équatoriales et garantie décennale.',
    heroPrimaryCta: 'Demander une Visite sur Chantier',
    heroSecondaryCta: 'Rencontrer Maître Ndamen',
    stat1Label: 'Années d’Excellence',
    stat2Label: 'Villas & Duplex Réalisés',
    stat3Label: 'Garantie Décennale',
    heroCardTag: 'Réalisation Signature',
    heroCardCaption: 'Salon VIP avec Gorges Lumineuses en Staff & Laque Ferrée',
    heroFloat1Title: "15+ Ans au Cameroun",
    heroFloat1Sub: 'Garantie Décennale',
    heroFloat2Title: 'Finitions Haute Couture',
    heroFloat2Sub: 'Staff, Stuc & Tropicalisé',
    locationsHeading: 'Zones d’Intervention Prioritaires au Cameroun',
    aboutPortraitBadge: 'Maître Artisan • Fondateur',
    aboutRole: 'Artisan Peintre-Décorateur & Staffeur',
    aboutInsetTitle: 'Atelier de Staff & Moulures',
    aboutInsetSub: 'Corniches et rosaces sculptées à la main',
    aboutEyebrow: 'À Propos du Maître Artisan',
    aboutHeading1: 'Jean-Paul Ndamen — 15 Ans Dévoués à',
    aboutHeadingHighlight: 'la Splendeur des Demeures Camerounaises.',
    aboutQuote: 'Une belle villa au Cameroun exige une alliance rare : la finesse esthétique des plus grands palais et la maîtrise technique des peintures tropicalisées qui résistent à l’humidité de nos saisons des pluies.',
    aboutBioP1: 'Fort de 15 années d’expérience sur les chantiers les plus prestigieux de Douala (Bonapriso, Denver), Yaoundé (Bastos, Golf) et Kribi, j’ai fondé la Maison Ndamen pour apporter aux propriétaires exigeants et aux bâtisseurs d’exception un savoir-faire sans compromis.',
    aboutBioP2: 'De la fabrication sur-mesure des corniches en staff dans notre atelier jusqu’à l’application des laques miroir et des enduits stuc vénitien ferrés à chaud, je supervise personnellement chaque geste sur votre chantier.',
    aboutCredentials: [
      { title: 'Maîtrise du Climat Tropical', desc: 'Formulations spéciales anti-moisissures, anti-fissures et étanchéité forte pluie pour le littoral et le plateau.' },
      { title: 'Atelier de Staff Intégré à Douala', desc: 'Fabrication locale de corniches lumineuses, rosaces et moulures architecturales en plâtre armé.' },
      { title: 'Supervision Directe sur Site', desc: 'Présence quotidienne de Jean-Paul Ndamen sur vos chantiers à Douala, Yaoundé ou en province.' },
      { title: 'Discrétion & Propreté Hôtelière', desc: 'Protection hermétique des marbres et sanitaires, ponçage aspiré et respect scrupuleux des délais.' }
    ],
    aboutMeetBtn: 'Planifier une Visite avec Jean-Paul Ndamen',
    aboutDirectLine: 'Ligne Directe',
    baEyebrow: 'Métamorphose Interactive de Villas',
    baHeading1: 'Avant & Après :',
    baHeadingHighlight: 'La Preuve par le Résultat',
    baInstructions: 'Glissez le curseur central pour comparer l’état brut du gros œuvre à gauche et la finition livrée par la Maison Ndamen à droite.',
    baCaseStudyTitle: 'Sélectionner une étude de cas',
    baTechNotes: 'Détails Techniques du Chantier',
    servicesEyebrow: 'Expertises & Savoir-Faire d’Élite',
    servicesHeading1: 'Nos Domaines de',
    servicesHeadingHighlight: 'Haute Maîtrise',
    servicesSubtitle: 'Explorez nos prestations en 3D spécialement adaptées aux résidences de haut standing au Cameroun.',
    serviceFormatLabel: 'Engagement Atelier',
    serviceConsultBtn: 'Demander une Visite',
    atelierEyebrow: "Atelier 3D Temps Réel & Modélisation PBR",
    atelierHeading1: "L'Ornementation en Staff :",
    atelierHeadingHighlight: "Explorez en 3D Interactive",
    atelierSubtitle: "Faites pivoter à 360°, inspectez la vue éclatée de nos rosaces et testez nos finitions d'art (Or feuille, Plâtre pur, Laque obsidienne, Stuc ocre rouge, Filaire 3D).",
    atelierDragHint: "Glissez pour pivoter à 360° • Vue éclatée en temps réel",
    atelierExplodeBtn: "Vue Éclatée / Structure",
    atelierAssembleBtn: "Assembler le Staff",
    atelierFinishLabel: "Finitions d'Art Disponibles",
    atelierAnatomyTitle: "Anatomie de la Rosace de Staff Douala",
    atelierSpec1: "Feuilles d'acanthe coulées au plâtre armé de filasse végétale anti-retrait",
    atelierSpec2: "Gorge d'éclairage indirect pour ruban LED 2700K blanc chaud",
    atelierSpec3: "Protection hydrofuge microporeuse adaptée au climat camerounais",
    atelierCustomQuotePrompt: "Besoin d'un motif sur mesure ?",
    atelierOrderStaffBtn: "Commander vos Moulures",
    swatchEyebrow: 'Nuancier Minéral & Tropical',
    swatchHeading1: 'Nuancier &',
    swatchHeadingHighlight: 'Simulateur d’Ambiance',
    swatchSubtitle: 'Testez nos teintes nobles formulées pour capter la lumière équatoriale avec moulures et corniches en staff.',
    swatchMoldingLabel: 'Moulure & Corniche en Staff',
    swatchSelectTitle: 'Choisir une nuance atelier',
    swatchApplyBtn: 'Retenir cette nuance pour mon projet',
    galleryEyebrow: 'Portfolio de Prestige au Cameroun',
    galleryHeading1: 'Galerie de nos',
    galleryHeadingHighlight: 'Réalisations d’Exception',
    surfaceLabel: 'Surface',
    lightboxConsultBtn: 'Discuter d’un Projet Similaire avec Maître Ndamen',
    processEyebrow: 'Rigueur & Exécution',
    processHeading1: 'Notre Protocole en',
    processHeadingHighlight: '4 Étapes Clés',
    stepWord: 'Étape',
    consultEyebrow: 'Prise en Charge VIP & Visite sur Chantier',
    consultHeading1: 'Consultation Privée &',
    consultHeadingHighlight: 'Étude Sur-Mesure',
    consultSubtitle: 'Chaque résidence possède sa configuration et son exposition au climat. Jean-Paul Ndamen se déplace directement sur votre chantier pour un diagnostic technique complet.',
    consultLeftTitle: 'Pourquoi une Visite Technique sur Site ?',
    consultLeftSub: 'Protocole de Diagnostic Certifié',
    consultLeftIntro: 'À Douala, Yaoundé ou Kribi, chaque chantier présente des défis d’humidité et de porosité spécifiques. Notre diagnostic comprend :',
    consultPillars: [
      { title: 'Test d’Humidité & Inspection des Supports', desc: 'Contrôle hygrométrique des maçonneries, planéité à la règle laser et détection des remontées capillaires.' },
      { title: 'Présentation des Échantillons & Profils Staff', desc: 'Pose de planches d’échantillons de teintes réelles et présentation des modèles de corniches dans vos volumes.' },
      { title: 'Devis Forfaitaire Transparent sous 48h', desc: 'Cahier des charges détaillé au mètre carré, engagement sur les délais et garantie décennale.' }
    ],
    directContactLabel: 'Coordonnées Directes de Maître Ndamen',
    formBadge: 'Rendez-Vous Chantier & Étude de Plans',
    formTitle: 'Réserver votre Visite Conseil ou Transmettre vos Plans',
    formAvailability: 'Créneaux disponibles cette semaine (Douala / Yaoundé)',
    formSuccessTitle: 'Votre demande de visite a bien été transmise !',
    formSuccessDesc: 'Jean-Paul Ndamen a bien reçu votre demande et vous appellera sous 24h pour caler le passage sur votre chantier.',
    labelName: 'Votre Nom & Prénom',
    placeholderName: 'Ex : M. Ebanda / Dr. Ngassa / Cabinet Archidesign',
    labelPhoneEmail: 'Téléphone WhatsApp Direct *',
    placeholderContact: 'Ex : +237 6 77 00 22 44',
    labelLocation: 'Ville & Quartier du Projet *',
    labelService: 'Prestation Souhaitée',
    optInterior: 'Peinture Intérieure Haute Décoration & Staff',
    optExterior: 'Ravalement Façade Tropicalisée Anti-Pluie',
    optStaff: 'Staff, Gorges Lumineuses & Faux-Plafonds VIP',
    optComplete: 'Rénovation Complète Villa Duplex Clé en Main',
    labelPropertyType: 'Type de Résidence',
    propVilla: 'Villa Duplex de Standing',
    propApartment: 'Penthouse / Appartement VIP',
    propHotel: 'Hôtel / Siège d’Entreprise / Ambassade',
    propCoast: 'Résidence Balnéaire Kribi / Limbe',
    labelTimeline: 'Délai d’Intervention',
    timeUrgent: 'Urgent (Chantier prêt / Sous 1 à 2 semaines)',
    timeMedium: 'Dans le mois à venir',
    timePlanning: 'Bâtiment en cours de gros œuvre',
    labelNotes: 'Détails du projet (nombre de pièces, état des murs, staff...)',
    selectedShadeLabel: 'Teinte présélectionnée',
    placeholderNotes: 'Indiquez par exemple : Villa duplex 5 pièces à Bonapriso, recherche faux-plafonds staff avec éclairage LED et peinture veloutée lavable...',
    blueprintTitle: 'Envoi direct des Plans & Photos sur WhatsApp',
    blueprintDesc: 'Vous avez des photos de vos pièces ou des plans d’architecte ? Envoyez-les directement sur le WhatsApp privé de Jean-Paul Ndamen pour un pré-diagnostic immédiat.',
    submitBookingBtn: 'Confirmer ma Demande de Visite',
    submitWhatsappBtn: 'Envoyer mon Projet + Photos via WhatsApp',
    reviewsEyebrow: 'Témoignages & Recommandations VIP',
    reviewsHeading1: 'La Parole à nos',
    reviewsHeadingHighlight: 'Clients au Cameroun',
    footerBannerEyebrow: 'Ligne Directe avec le Maître Artisan',
    footerBannerTitle: 'Un Projet de Peinture ou de Staff au Cameroun ?',
    footerBannerSub: 'Contactez directement Jean-Paul Ndamen pour convenir d’une visite à Douala, Yaoundé, Kribi ou partout au Cameroun.',
    footerAboutText: 'Maison de peinture d’art, staff architectural, corniches lumineuses et peintures tropicalisées. Entreprise artisanale camerounaise avec Garantie Décennale.',
    footerContactHeading: 'Contacts Directs',
    footerPhoneLabel: 'Atelier Douala',
    footerMobileLabel: 'Ligne Directe Maître Artisan',
    footerHoursLabel: 'Disponibilité',
    footerHoursValue: 'Lundi – Samedi : 07h30 – 19h00',
    footerAddressHeading: 'Implantations',
    footerDoualaTitle: 'Atelier & Showroom Douala',
    footerYaoundeTitle: 'Antenne Yaoundé',
    footerInsuranceBadge: 'Assurance Décennale & RC Pro Cameroun',
    footerLinksHeading: 'Accès Rapide',
    footerRights: 'Tous droits réservés. Maîtrise Artisanale Camerounaise.',
    floatingWaTop: 'Jean-Paul Ndamen',
    floatingWaBottom: 'WhatsApp VIP Cameroun'
  },
  en: {
    brandSubtitle: 'Master Painter & Plaster Staffer Cameroon',
    navCta: 'Private Appointment',
    navCtaShort: 'Contact',
    mobileNavTitle: 'Navigation & Expertise',
    whatsappDirectBtn: 'Direct VIP WhatsApp Chat Cameroon',
    heroBadge: 'Douala • Yaoundé • Kribi • Luxury Residential Estates',
    heroTitleLine1: 'The Sublime Art of',
    heroTitleHighlight: 'Bespoke Painting & Staff',
    heroTitleLine3: 'Craftsmanship in Cameroon.',
    heroDescription: 'Led by Master Craftsman Jean-Paul Ndamen, our atelier transforms luxury duplex villas, VIP penthouses, and tropical facades with surgical precision and enduring beauty.',
    heroGuaranteeTitle: 'Tropicalized Anti-Mildew Formulations & Zero Dust',
    heroGuaranteeDesc: 'Hermetic protection of marble and fine woodwork + heavy-rain weatherproofing adapted to equatorial climate and 10-year decennial warranty.',
    heroPrimaryCta: 'Book an On-Site Technical Visit',
    heroSecondaryCta: 'Meet Master Ndamen',
    stat1Label: 'Years of Mastery',
    stat2Label: 'Luxury Estates Completed',
    stat3Label: '10-Year Warranty',
    heroCardTag: 'Signature Commission',
    heroCardCaption: 'VIP Reception with Indirect LED Plaster Staff & Lacquer',
    heroFloat1Title: '15+ Years in Cameroon',
    heroFloat1Sub: '10-Year Warranty',
    heroFloat2Title: 'Haute Couture Finishes',
    heroFloat2Sub: 'Staff, Stucco & Tropicalized',
    locationsHeading: 'Key Priority Service Areas in Cameroon',
    aboutPortraitBadge: 'Master Craftsman • Founder',
    aboutRole: 'Decorative Painter & Architectural Staffer',
    aboutInsetTitle: 'Douala Plaster Workshop',
    aboutInsetSub: 'Hand-sculpted cornices & ceiling roses',
    aboutEyebrow: 'About the Master Craftsman',
    aboutHeading1: 'Jean-Paul Ndamen — 15 Years Dedicated to',
    aboutHeadingHighlight: 'the Splendor of Cameroonian Estates.',
    aboutQuote: 'A magnificent villa in Cameroon requires a rare blend: the aesthetic finesse of grand palaces and the chemical mastery of tropicalized paints that withstand our equatorial rainfall.',
    aboutBioP1: 'With 15 years of hands-on experience in the most prestigious neighborhoods of Douala (Bonapriso, Denver), Yaoundé (Bastos, Golf), and seaside Kribi, I founded Maison Ndamen to offer uncompromising craftsmanship to demanding property owners.',
    aboutBioP2: 'From custom plaster cornice casting in our workshop to mirror-lacquer application and hand-burnished Venetian stucco, I personally supervise every step on your jobsite.',
    aboutCredentials: [
      { title: 'Tropical Climate Mastery', desc: 'Anti-mildew, anti-crack, and waterproof formulations engineered for coastal and highland rain.' },
      { title: 'In-House Plaster Workshop in Douala', desc: 'Local casting of architectural cornices, indirect LED light coves, and fiber-reinforced rosettes.' },
      { title: 'Personal On-Site Supervision', desc: 'Daily presence of Jean-Paul Ndamen on your jobsite in Douala, Yaoundé, or regional villas.' },
      { title: 'Hotel-Grade Cleanliness & Discretion', desc: 'Hermetic protective draping on marble, dust-extracted sanding, and strict adherence to timelines.' }
    ],
    aboutMeetBtn: 'Schedule a Visit with Jean-Paul Ndamen',
    aboutDirectLine: 'Direct Line',
    baEyebrow: 'Interactive Villa Transformation',
    baHeading1: 'Before & After:',
    baHeadingHighlight: 'Visual Proof of Mastery',
    baInstructions: 'Drag the center handle to compare raw structural concrete on the left with our turnkey luxury finish on the right.',
    baCaseStudyTitle: 'Select a Case Study',
    baTechNotes: 'Technical Project Details',
    servicesEyebrow: 'Elite Disciplines & Savoir-Faire',
    servicesHeading1: 'Our Areas of',
    servicesHeadingHighlight: 'Master Expertise',
    servicesSubtitle: 'Explore our 3D services tailored specifically for high-standing residences across Cameroon.',
    serviceFormatLabel: 'Atelier Commitment',
    serviceConsultBtn: 'Request Site Visit',
    atelierEyebrow: "Real-Time 3D Workshop & PBR Rendering",
    atelierHeading1: "Architectural Staff Ornamentation:",
    atelierHeadingHighlight: "Interactive 3D Inspection",
    atelierSubtitle: "Rotate 360°, inspect the exploded assembly of our ceiling roses, and preview luxury finishes (24K Gold leaf, Fine plaster, Obsidian lacquer, Red ochre stucco, 3D Wireframe).",
    atelierDragHint: "Drag to rotate 360° • Real-time exploded view",
    atelierExplodeBtn: "Exploded View / Anatomy",
    atelierAssembleBtn: "Assemble Rosette",
    atelierFinishLabel: "Available Fine Finishes",
    atelierAnatomyTitle: "Douala Staff Ceiling Rose Anatomy",
    atelierSpec1: "Acanthus leaves hand-cast in fiber-reinforced anti-crack plaster",
    atelierSpec2: "Indirect cove lighting channel designed for 2700K warm LED strips",
    atelierSpec3: "Microporous water-repellent protection engineered for Cameroon humidity",
    atelierCustomQuotePrompt: "Need custom plaster profiles?",
    atelierOrderStaffBtn: "Order Custom Moldings",
    swatchEyebrow: 'Tropical & Mineral Swatch Studio',
    swatchHeading1: 'Heritage Swatches &',
    swatchHeadingHighlight: 'Room Moodboard',
    swatchSubtitle: 'Preview signature shades formulated to capture equatorial light alongside bespoke plaster staff cornices.',
    swatchMoldingLabel: 'Bespoke Plaster Cornice & Baseboard',
    swatchSelectTitle: 'Select an Atelier Shade',
    swatchApplyBtn: 'Apply this shade to my project',
    galleryEyebrow: 'Prestige Portfolio in Cameroon',
    galleryHeading1: 'Gallery of',
    galleryHeadingHighlight: 'Masterpieces',
    surfaceLabel: 'Area',
    lightboxConsultBtn: 'Discuss a Similar Project with Master Ndamen',
    processEyebrow: 'Rigor & Craftsmanship',
    processHeading1: 'Our 4-Step',
    processHeadingHighlight: 'Craftsmanship Protocol',
    stepWord: 'Step',
    consultEyebrow: 'VIP Concierge & Jobsite Diagnostic',
    consultHeading1: 'Private Consultation &',
    consultHeadingHighlight: 'Bespoke Jobsite Study',
    consultSubtitle: 'Every residence in Cameroon has its own sun and rain exposure. Jean-Paul Ndamen visits your property in person for a complete technical diagnostic.',
    consultLeftTitle: 'Why an On-Site Technical Diagnostic?',
    consultLeftSub: 'Certified Jobsite Assessment Protocol',
    consultLeftIntro: 'In Douala, Yaoundé, or Kribi, high humidity demands precise substrate evaluation. Our visit includes:',
    consultPillars: [
      { title: 'Moisture Testing & Wall Inspection', desc: 'Hygrometric wall check, laser flatness measurement, and inspection of rising damp.' },
      { title: 'Sample Boards & Plaster Molding Displays', desc: 'Presentation of real painted sample boards and cornice profiles inside your actual rooms.' },
      { title: 'Itemized Fixed-Price Proposal in 48h', desc: 'Detailed square-meter pricing, guaranteed completion dates, and 10-year warranty certificate.' }
    ],
    directContactLabel: 'Master Ndamen Direct Coordinates',
    formBadge: 'Jobsite Appointment & Blueprint Review',
    formTitle: 'Book Your On-Site Consultation or Send Floor Plans',
    formAvailability: 'Appointments available this week (Douala / Yaoundé)',
    formSuccessTitle: 'Your visit request has been received!',
    formSuccessDesc: 'Jean-Paul Ndamen has received your details and will call you within 24 hours to confirm the date and time.',
    labelName: 'Full Name',
    placeholderName: 'e.g. Mr. Ebanda / Dr. Ngassa / Studio Archidesign',
    labelPhoneEmail: 'Direct WhatsApp Phone *',
    placeholderContact: 'e.g. +237 6 77 00 22 44',
    labelLocation: 'Project City & Neighborhood *',
    labelService: 'Required Service',
    optInterior: 'Luxury Interior Painting & Architectural Staff',
    optExterior: 'Weatherproof Tropical Facade Restoration',
    optStaff: 'Plaster Staff, Indirect LED Coves & Ceilings',
    optComplete: 'Full Duplex Villa Turnkey Renovation',
    labelPropertyType: 'Residence Type',
    propVilla: 'Luxury Duplex Villa',
    propApartment: 'VIP Penthouse / Apartment',
    propHotel: 'Hotel / Headquarters / Embassy',
    propCoast: 'Kribi / Limbe Beachside Residence',
    labelTimeline: 'Desired Timeframe',
    timeUrgent: 'Urgent (Ready for painting / 1 to 2 weeks)',
    timeMedium: 'Within the coming month',
    timePlanning: 'Building currently in structural works',
    labelNotes: 'Project Details (number of rooms, wall condition, moldings...)',
    selectedShadeLabel: 'Preselected shade',
    placeholderNotes: 'e.g. 5-bedroom duplex villa in Bonapriso, looking for custom plaster staff with integrated LED and washable velvet paint...',
    blueprintTitle: 'Direct Plans & Photos via WhatsApp',
    blueprintDesc: 'Have floor plans or room photos? Send them directly to Jean-Paul Ndamen’s private WhatsApp for an immediate preliminary review.',
    submitBookingBtn: 'Confirm On-Site Consultation Request',
    submitWhatsappBtn: 'Send Project + Plans via WhatsApp VIP',
    reviewsEyebrow: 'VIP Client Endorsements in Cameroon',
    reviewsHeading1: 'Words from Our',
    reviewsHeadingHighlight: 'Clients in Cameroon',
    footerBannerEyebrow: 'Direct Contact with the Master Craftsman',
    footerBannerTitle: 'Planning a Painting or Staff Project in Cameroon?',
    footerBannerSub: 'Contact Jean-Paul Ndamen directly to schedule an on-site visit in Douala, Yaoundé, Kribi, or anywhere in Cameroon.',
    footerAboutText: 'Bespoke decorative painting, architectural plaster staff, LED cornices, and tropicalized coatings. Certified Cameroonian master company with 10-Year Warranty.',
    footerContactHeading: 'Direct Contacts',
    footerPhoneLabel: 'Douala Workshop',
    footerMobileLabel: 'Master Craftsman Direct Line',
    footerHoursLabel: 'Working Hours',
    footerHoursValue: 'Monday – Saturday: 7:30 AM – 7:00 PM',
    footerAddressHeading: 'Locations',
    footerDoualaTitle: 'Douala Atelier & Showroom',
    footerYaoundeTitle: 'Yaoundé Office',
    footerInsuranceBadge: '10-Year Warranty & Cameroonian Business Insurance',
    footerLinksHeading: 'Quick Navigation',
    footerRights: 'All rights reserved. Cameroonian Master Craftsmanship.',
    floatingWaTop: 'Jean-Paul Ndamen',
    floatingWaBottom: 'WhatsApp VIP Cameroon'
  }
}

const t = computed(() => translations[lang.value])

// ==========================================
// 2. SCROLL, PARALLAX, PROGRESS & SCROLLSPY
// ==========================================
const isScrolled = ref(false)
const scrollY = ref(0)
const scrollProgress = ref(0)
const mobileMenuOpen = ref(false)
const activeSection = ref('accueil')

const navLinks = computed(() => [
  { id: 'accueil', label: lang.value === 'fr' ? 'Accueil' : 'Home', href: '#accueil' },
  { id: 'apropos', label: lang.value === 'fr' ? 'Le Maître Artisan' : 'About Me', href: '#apropos' },
  { id: 'avant-apres', label: lang.value === 'fr' ? 'Avant / Après' : 'Before / After', href: '#avant-apres' },
  { id: 'services', label: lang.value === 'fr' ? 'Expertises' : 'Services', href: '#services' },
  { id: 'atelier-3d', label: lang.value === 'fr' ? 'Atelier 3D' : '3D Studio', href: '#atelier-3d' },
  { id: 'nuancier', label: lang.value === 'fr' ? 'Nuancier' : 'Color Studio', href: '#nuancier' },
  { id: 'galerie', label: lang.value === 'fr' ? 'Réalisations' : 'Portfolio', href: '#galerie' },
  { id: 'consultation', label: lang.value === 'fr' ? 'Consultation' : 'Consultation', href: '#consultation' },
  { id: 'contact', label: lang.value === 'fr' ? 'Contact' : 'Contact', href: '#contact' }
])

const handleScroll = () => {
  const currentY = window.scrollY
  scrollY.value = currentY
  isScrolled.value = currentY > 36

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min(100, Math.max(0, (currentY / docHeight) * 100)) : 0

  const spyTriggerY = currentY + 240
  for (const link of navLinks.value) {
    const el = document.getElementById(link.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const absoluteTop = rect.top + currentY
      if (spyTriggerY >= absoluteTop && spyTriggerY < absoluteTop + rect.height) {
        activeSection.value = link.id
        break
      }
    }
  }
}

const scrollToSection = (id) => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
  activeSection.value = id
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

// ==========================================
// 3. CAMEROON INTERVENTION ZONES
// ==========================================
const cameroonZones = [
  { name: 'DOUALA', desc: 'Bonapriso • Denver • Bonanjo • Makepe' },
  { name: 'YAOUNDÉ', desc: 'Bastos • Golf • Santa Barbara • Odza' },
  { name: 'KRIBI', desc: 'Villas Balnéaires & Résidences Océan' },
  { name: 'LIMBE', desc: 'Façades Côtières Anti-Salinité' },
  { name: 'OUEST & BAFOUSSAM', desc: 'Grandes Résidences & Chefferies' }
]

// ==========================================
// 4. 3D TILT ENGINE
// ==========================================
const cardTilts = ref({
  hero3d: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  painter3d: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  interieur: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  exterieur: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  staff: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false },
  consult3d: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false }
})

const handleCardMouseMove = (e, key) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const maxTilt = key === 'consult3d' ? 4 : 8.5
  const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt
  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt
  cardTilts.value[key] = {
    rotateX: Number(rotateX.toFixed(2)),
    rotateY: Number(rotateY.toFixed(2)),
    glareX: Math.round((x / rect.width) * 100),
    glareY: Math.round((y / rect.height) * 100),
    isHovered: true
  }
}

const handleCardMouseLeave = (key) => {
  cardTilts.value[key] = { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false }
}

const get3DCardStyle = (key) => {
  const st = cardTilts.value[key] || { rotateX: 0, rotateY: 0, isHovered: false }
  const scale = st.isHovered ? '1.018, 1.018, 1.018' : '1, 1, 1'
  return {
    transform: `perspective(1200px) rotateX(${st.rotateX}deg) rotateY(${st.rotateY}deg) scale3d(${scale})`
  }
}

const get3DGlareStyle = (key) => {
  const st = cardTilts.value[key] || { glareX: 50, glareY: 50, isHovered: false }
  return {
    opacity: st.isHovered ? 1 : 0,
    background: `radial-gradient(circle at ${st.glareX}% ${st.glareY}%, rgba(251, 191, 36, 0.22), transparent 60%)`
  }
}

// ==========================================
// 5. BEFORE / AFTER SLIDER WITH INERTIA
// ==========================================
const sliderContainer = ref(null)
const sliderPosition = ref(52)
const sliderTarget = ref(52)
let sliderVelocity = 0
let sliderRafId = null
const isDraggingSlider = ref(false)
const hasInteractedWithSlider = ref(false)
const activeComparisonIndex = ref(0)

const comparisonShowcases = computed(() => [
  {
    id: 1,
    title: lang.value === 'fr' ? 'Villa Duplex VIP — Bonapriso, Douala' : 'VIP Duplex Villa — Bonapriso, Douala',
    location: 'Douala • Bonapriso',
    surface: '320 m²',
    beforeLabel: lang.value === 'fr' ? 'Avant • Béton & Humidité' : 'Before • Raw Concrete & Damp',
    afterLabel: lang.value === 'fr' ? 'Après • Staff Lumineux & Laque' : 'After • LED Staff & Lacquer',
    beforeImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    notes: lang.value === 'fr'
      ? 'Traitement complet anti-salpêtre et humidité, création de corniches en staff avec gorge LED et peinture veloutée lavable haute lessivabilité.'
      : 'Complete anti-damp treatment, custom plaster staff coves with integrated indirect LED, and scrub-resistant washable velvet paint.'
  },
  {
    id: 2,
    title: lang.value === 'fr' ? 'Résidence Diplomatique — Bastos, Yaoundé' : 'Diplomatic Residence — Bastos, Yaoundé',
    location: 'Yaoundé • Bastos',
    surface: '450 m²',
    beforeLabel: lang.value === 'fr' ? 'Avant • Façade Fissurée' : 'Before • Weathered Cracks',
    afterLabel: lang.value === 'fr' ? 'Après • Siloxane Tropical' : 'After • Tropical Siloxane Shield',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    notes: lang.value === 'fr'
      ? 'Ravalement complet avec résine élastomère armée résistant aux fortes averses de Yaoundé et corniches extérieures traitées hydrofuges.'
      : 'Full facade restoration using elastomeric bridging resin resistant to torrential rainfall and hydrophobic architectural moldings.'
  }
])

const currentComparison = computed(() => comparisonShowcases.value[activeComparisonIndex.value])

const animateSliderPhysics = () => {
  const diff = sliderTarget.value - sliderPosition.value
  sliderVelocity = sliderVelocity * 0.74 + diff * 0.22
  if (Math.abs(diff) > 0.01 || Math.abs(sliderVelocity) > 0.01) {
    sliderPosition.value = Math.min(95, Math.max(5, sliderPosition.value + sliderVelocity))
  }
  sliderRafId = requestAnimationFrame(animateSliderPhysics)
}

const setSliderTarget = (val) => {
  hasInteractedWithSlider.value = true
  sliderTarget.value = Math.min(95, Math.max(5, Math.round(val)))
}

const updateSliderFromEvent = (clientX) => {
  if (!sliderContainer.value) return
  const rect = sliderContainer.value.getBoundingClientRect()
  setSliderTarget(((clientX - rect.left) / rect.width) * 100)
}

const startSliderDrag = (e) => {
  isDraggingSlider.value = true
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  updateSliderFromEvent(clientX)
}

const onSliderMove = (e) => {
  if (!isDraggingSlider.value) return
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  updateSliderFromEvent(clientX)
}

const stopSliderDrag = () => {
  isDraggingSlider.value = false
}

// ==========================================
// 6. CORE SERVICES IN CAMEROON
// ==========================================
const services = computed(() => [
  {
    key: 'interieur',
    id: 'Peinture Intérieure',
    badge: lang.value === 'fr' ? 'Haute Décoration' : 'Haute Decoration',
    title: lang.value === 'fr' ? 'Peinture Intérieure & Boiseries' : 'Luxury Interior Painting',
    subtitle: lang.value === 'fr' ? 'Salons VIP, suites parentales & boiseries' : 'VIP reception salons, suites & woodwork',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    commitment: lang.value === 'fr' ? 'Diagnostic & Échantillons sur Site' : 'On-Site Diagnostic & Samples',
    description: lang.value === 'fr'
      ? 'Sublimation de vos intérieurs par des laques tendues miroir, des mats profonds lessivables et un traitement imperméable spécial climat équatorial.'
      : 'Elevating interiors with mirror-finish lacquers, scrub-resistant velvety mattes, and breathable waterproofing tailored to tropical heat.',
    features: lang.value === 'fr'
      ? [
          'Peintures lavables haute durabilité et anti-moisissures',
          'Triple ratissage croisé et ponçage aspiré zéro poussière',
          'Mise en valeur soignée des portes en bois massif et plinthes',
          'Pigments nobles sans odeur et respectueux de la santé'
        ]
      : [
          'High-durability scrub-resistant anti-mildew paints',
          'Triple cross-skimming compound & dust-free HEPA sanding',
          'Fine woodcraft finishing on solid hardwood doors & frames',
          'Odorless, non-toxic luxury pigments'
        ]
  },
  {
    key: 'exterieur',
    id: 'Façades Tropicalisées',
    badge: lang.value === 'fr' ? 'Protection Tropicale' : 'Tropical Weather Shield',
    title: lang.value === 'fr' ? 'Façades & Ravalement Tropicalisé' : 'Tropical Facade Restoration',
    subtitle: lang.value === 'fr' ? 'Étanchéité fortes pluies, anti-UV & Kribi littoral' : 'Heavy rainproofing, UV shield & coastal protection',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    commitment: lang.value === 'fr' ? 'Garantie Décennale Certifiée' : 'Certified 10-Year Warranty',
    description: lang.value === 'fr'
      ? 'Bouclier climatique absolu contre les pluies torrentielles et le soleil équatorial : résines siloxanes perlantes, pontage des fissures et anti-moisissure.'
      : 'Climatic armor engineered for torrential rains and intense equatorial sun: beading siloxane resins, crack bridging, and anti-salinity defense.',
    features: lang.value === 'fr'
      ? [
          'Nettoyage haute pression et traitement fongicide radical',
          'Pontage élastomère armé des micro-fissures structurelles',
          'Revêtement siloxane perlant microporeux hydrofuge',
          'Protection anti-corrosion des grilles et garde-corps en fer forgé'
        ]
      : [
          'Controlled power wash & deep fungicidal treatment',
          'Reinforced elastomeric mesh bridging on structural cracks',
          'Water-repellent beading siloxane microporous finish',
          'Anti-corrosion enamel protection on wrought-iron gates'
        ]
  },
  {
    key: 'staff',
    id: 'Staff & Décors',
    badge: lang.value === 'fr' ? 'Atelier Local' : 'Local Casting Workshop',
    title: lang.value === 'fr' ? 'Staff, Corniches & Décors Lumineux' : 'Plaster Staff & LED Cornices',
    subtitle: lang.value === 'fr' ? 'Faux-plafonds staffés, rosaces & stuc vénitien' : 'Staff coffered ceilings, rosettes & Venetian stucco',
    icon: Crown,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    commitment: lang.value === 'fr' ? 'Moulage Sur-Mesure à l’Atelier' : 'Bespoke In-House Casting',
    description: lang.value === 'fr'
      ? 'Création et pose d’ornements en plâtre fibré moulés à Douala : corniches pour éclairage indirect LED, rosaces centrales et stucs vénitiens ferrés.'
      : 'Hand-casting and installation of fiber-reinforced plaster ornaments in Douala: indirect LED lighting cornices, central rosettes, and burnished stucco.',
    features: lang.value === 'fr'
      ? [
          'Corniches lumineuses LED intégrées pour faux-plafonds',
          'Rosaces monumentales pour lustres et encadrements muraux',
          'Enduits décoratifs : Stuc Vénitien, Marmorino ferré à chaud',
          'Plâtre armé de fibres naturelles imputrescibles et incombustibles'
        ]
      : [
          'Integrated architectural LED light coves for high ceilings',
          'Monumental chandelier ceiling roses and wall panel frames',
          'Artisan Venetian Stucco and hot steel-troweled Marmorino',
          'Natural fiber-reinforced plaster: rot-proof and fire-resistant'
        ]
  }
])

// ==========================================
// 6b. 3D ATELIER STATE & FINISH CONTROLS
// ==========================================
const activeFinish = ref('gold')
const isExploded = ref(false)

const finishOptions = computed(() => [
  {
    id: 'gold',
    name: lang.value === 'fr' ? 'Or Feuille 24K Ferré' : '24K Burnished Gold Leaf',
    desc: lang.value === 'fr' ? 'Reflets chauds & ornementation royale' : 'Warm royal specular highlights',
    color: '#dcab45'
  },
  {
    id: 'plaster',
    name: lang.value === 'fr' ? 'Plâtre Fin Pur d’Atelier' : 'Pure Workshop Plaster Staff',
    desc: lang.value === 'fr' ? 'Matité calcaire minérale et toucher soyeux' : 'Silky mineral chalk matte finish',
    color: '#f1ece3'
  },
  {
    id: 'lacquer',
    name: lang.value === 'fr' ? 'Laque Noire Obsidienne' : 'Obsidian Mirror Lacquer',
    desc: lang.value === 'fr' ? 'Profondeur miroir & éclat contemporain' : 'High-gloss mirror depth & luster',
    color: '#0e1016'
  },
  {
    id: 'ochre',
    name: lang.value === 'fr' ? 'Stuc Ocre Minérale Rouge' : 'Red Ochre Mineral Stucco',
    desc: lang.value === 'fr' ? 'Pigments naturels de terre rouge camerounaise' : 'Cameroonian earth natural pigments',
    color: '#a65f3a'
  },
  {
    id: 'blueprint',
    name: lang.value === 'fr' ? 'Écorché Filaire 3D' : '3D Wireframe Blueprint',
    desc: lang.value === 'fr' ? 'Structure interne et lignes de force' : 'Internal geometry & architectural wireframe',
    color: '#3b82f6'
  }
])

const activeFinishObj = computed(() => {
  return finishOptions.value.find(f => f.id === activeFinish.value) || finishOptions.value[0]
})

const switchFinish = (finishKey) => {
  activeFinish.value = finishKey
}

const toggleExplode = () => {
  isExploded.value = !isExploded.value
}

// ==========================================
// 7. SWATCHES CALIBRATED FOR CAMEROON
// ==========================================
const colorMoodboardSwatches = [
  { id: 'sable-kribi', name: 'Sable d’Or de Kribi', brand: 'Maison Ndamen • Mat Soyeux', hex: '#EADBCE', moldingHex: '#FFFFFF', climate: 'Résistant Climat Littoral', undertone: 'Chaleur minérale dorée évoquant les plages de Kribi, idéale pour les grands salons ouverts.' },
  { id: 'ivoire-bastos', name: 'Ivoire Royal de Bastos', brand: 'Finition Velours Tropical', hex: '#F5EFE6', moldingHex: '#FAF7F2', climate: 'Haute Réflectance Solaire', undertone: 'Blanc chaud lumineux qui capte la clarté naturelle sans éblouir, parfait avec corniches blanches.' },
  { id: 'terre-bafoussam', name: 'Ocre Rouge des Hauts Plateaux', brand: 'Enduit Stuc Minéral', hex: '#9C5838', moldingHex: '#FDFBF7', climate: 'Pigments Minéraux Purs', undertone: 'Chaleur tellurique des terres nobles de l’Ouest camerounais, sublime sur un mur d’accent.' },
  { id: 'vert-mont-cameroun', name: 'Vert Forêt du Mont Cameroun', brand: 'Velours Minéral Lavable', hex: '#3B5244', moldingHex: '#F7F4EB', climate: 'Anti-Moisissure Formulé', undertone: 'Vert botanique majestueux et feutré, créant une fraîcheur naturelle dans les réceptions.' },
  { id: 'ebene-sanaga', name: 'Ébène Précieuse de la Sanaga', brand: 'Laque Tendue Miroir', hex: '#161922', moldingHex: '#D4AF37', climate: 'Finition Spéculaire', undertone: 'Profondeur noire satinée réhaussée de filets dorés en staff pour bibliothèques et bureaux VIP.' }
]

const selectedSwatch = ref(colorMoodboardSwatches[1])

// ==========================================
// 8. PORTFOLIO IN CAMEROON
// ==========================================
const activeGalleryTab = ref('Tous')
const galleryTabs = computed(() => [
  { id: 'Tous', label: lang.value === 'fr' ? 'Tous' : 'All Works' },
  { id: 'Intérieur', label: lang.value === 'fr' ? 'Intérieur' : 'Interior' },
  { id: 'Façades', label: lang.value === 'fr' ? 'Façades' : 'Facades' },
  { id: 'Staff & Décors', label: lang.value === 'fr' ? 'Staff & Décors' : 'Staff & Moldings' }
])

const selectedProject = ref(null)
const isLightboxZoomed = ref(false)
const lightboxTouchStartX = ref(0)

const portfolioProjects = computed(() => [
  {
    id: 1,
    title: lang.value === 'fr' ? 'Villa d’Honneur — Bonapriso, Douala' : 'State Duplex Villa — Bonapriso, Douala',
    category: 'Intérieur',
    categoryLabel: lang.value === 'fr' ? 'Intérieur' : 'Interior',
    location: 'Douala • Bonapriso',
    surface: '280 m²',
    finish: lang.value === 'fr' ? 'Velours Soyeux & Staff' : 'Silk Velvet & Staff',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Salon d’apparat avec triple ratissage croisé, corniches lumineuses LED en staff et teinte ivoire chaud lessivable.'
      : 'Grand reception salon with 3-pass skimming, integrated LED plaster cornices, and scrub-resistant warm ivory velvet.'
  },
  {
    id: 2,
    title: lang.value === 'fr' ? 'Résidence de Maître — Bastos, Yaoundé' : 'Executive Residence — Bastos, Yaoundé',
    category: 'Façades',
    categoryLabel: lang.value === 'fr' ? 'Façades' : 'Facades',
    location: 'Yaoundé • Bastos',
    surface: '420 m²',
    finish: lang.value === 'fr' ? 'Siloxane Anti-Pluie' : 'Heavy Rain Siloxane',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Ravalement complet d’une villa duplex avec traitement imperméabilisant anti-fissures résistant à la saison des pluies.'
      : 'Full exterior restoration using breathable crack-bridging siloxane resin engineered for heavy monsoon rainfall.'
  },
  {
    id: 3,
    title: lang.value === 'fr' ? 'Duplex Contemporain — Denver, Douala' : 'Contemporary Duplex — Denver, Douala',
    category: 'Staff & Décors',
    categoryLabel: lang.value === 'fr' ? 'Staff & Décors' : 'Staff & Moldings',
    location: 'Douala • Denver',
    surface: '160 m²',
    finish: lang.value === 'fr' ? 'Staff Plâtre Fibré Local' : 'Local Fiber Plaster',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Faux-plafonds sculptés sur-mesure dans notre atelier de Douala avec gorges lumineuses et rosaces épurées.'
      : 'Custom cast plaster ceilings sculpted in our Douala workshop with architectural LED coves and modern ceiling rosettes.'
  },
  {
    id: 4,
    title: lang.value === 'fr' ? 'Villa Balnéaire — Front de Mer, Kribi' : 'Seaside Villa — Oceanfront, Kribi',
    category: 'Façades',
    categoryLabel: lang.value === 'fr' ? 'Façades' : 'Facades',
    location: 'Kribi • Océan',
    surface: '310 m²',
    finish: lang.value === 'fr' ? 'Hydrofuge Anti-Sel' : 'Anti-Salt Hydrophobic',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Protection totale des parois côtières contre les embruns marins salins et la forte humidité du littoral équatorial.'
      : 'Total coastal wall armor against ocean salt spray and severe tropical humidity.'
  },
  {
    id: 5,
    title: lang.value === 'fr' ? 'Penthouse VIP — Quartier du Golf, Yaoundé' : 'VIP Penthouse — Golf District, Yaoundé',
    category: 'Intérieur',
    categoryLabel: lang.value === 'fr' ? 'Intérieur' : 'Interior',
    location: 'Yaoundé • Golf',
    surface: '220 m²',
    finish: lang.value === 'fr' ? 'Stuc Vénitien Ferré' : 'Burnished Stucco',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Application d’un enduit Marmorino poli à la lisseuse inox et souligné par des corniches en staff dorées.'
      : 'Steel-troweled Marmorino stucco accented by fine plaster moldings with champagne gold detailing.'
  }
])

const filteredProjects = computed(() => {
  if (activeGalleryTab.value === 'Tous') return portfolioProjects.value
  return portfolioProjects.value.filter((p) => p.category === activeGalleryTab.value)
})

const openLightbox = (project) => {
  selectedProject.value = project
  isLightboxZoomed.value = false
}

const closeLightbox = () => {
  selectedProject.value = null
  isLightboxZoomed.value = false
}

const navigateLightbox = (direction) => {
  if (!selectedProject.value) return
  const list = filteredProjects.value
  const currentIndex = list.findIndex((p) => p.id === selectedProject.value.id)
  if (currentIndex === -1) return
  const nextIndex = (currentIndex + direction + list.length) % list.length
  selectedProject.value = list[nextIndex]
  isLightboxZoomed.value = false
}

const handleLightboxTouchStart = (e) => {
  if (e.touches && e.touches.length > 0) lightboxTouchStartX.value = e.touches[0].clientX
}

const handleLightboxTouchEnd = (e) => {
  if (!e.changedTouches || e.changedTouches.length === 0) return
  const deltaX = e.changedTouches[0].clientX - lightboxTouchStartX.value
  if (Math.abs(deltaX) > 45) navigateLightbox(deltaX < 0 ? 1 : -1)
}

// ==========================================
// 9. CRAFTSMANSHIP PROTOCOL IN CAMEROON
// ==========================================
const activeStepIndex = ref(0)
const craftsmanshipSteps = computed(() => [
  {
    stepNumber: '01',
    title: lang.value === 'fr' ? 'Diagnostic & Traitement Anti-Humidité' : 'Substrate Diagnostic & Moisture Proofing',
    subtitle: lang.value === 'fr' ? 'La clé de la longévité sous climat équatorial' : 'The key to longevity in equatorial climate',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Au Cameroun, aucune peinture ne tient sans un assainissement rigoureux des fonds. Nous testons l’hygrométrie et appliquons un scellement anti-salpêtre.'
      : 'In Cameroon, long-lasting luxury requires thorough substrate prep. We test moisture levels and seal against rising damp and salts.',
    deliverables: lang.value === 'fr'
      ? ['Mesure laser de l’hygrométrie', 'Bâchage hermétique des marbres et carrelages', 'Traitement fongicide des moisissures', 'Ponçage cyclonique aspiré zéro poussière']
      : ['Laser hygrometric moisture test', 'Hermetic protection on tile & marble floors', 'Deep anti-fungal mildew treatment', 'Dust-free cyclonic sanding extraction']
  },
  {
    stepNumber: '02',
    title: lang.value === 'fr' ? 'Impression Fixatrice Tropicale' : 'Tropical Bonding Primer',
    subtitle: lang.value === 'fr' ? 'Blocage de la porosité et barrière anti-infiltrations' : 'Porosity seal & anti-infiltration barrier',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Application d’un primaire fixateur microporeux haute pénétration qui régule les fonds maçonnés et empêche le décollement de la peinture.'
      : 'Application of a deep-penetrating microporous primer regulating concrete absorption and preventing future peeling.',
    deliverables: lang.value === 'fr'
      ? ['Primaire fixateur solvanté anti-humidité', 'Rebouchage au mastic élastique souple', 'Égrenage fin entre les passes', 'Joints d’étanchéité invisibles sur moulures']
      : ['Moisture-resistant bonding primer', 'Flexible elastomeric crack filling', 'Fine sand-leveling between coats', 'Invisible joint sealing on all moldings']
  },
  {
    stepNumber: '03',
    title: lang.value === 'fr' ? 'Pose du Staff & Application Double Couche' : 'Plaster Staff & Double Coat Finish',
    subtitle: lang.value === 'fr' ? 'Pose des corniches atelier et richesse pigmentaire' : 'Workshop cornice installation & pigment richness',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Collage au plâtre fin des corniches et rosaces coulées dans notre atelier de Douala, suivi de 2 couches croisées de peinture veloutée ou laque.'
      : 'Seamless bonding of plaster cornices and rosettes cast in our Douala workshop, followed by 2 cross coats of premium velvet paint.',
    deliverables: lang.value === 'fr'
      ? ['Alignement laser des corniches et gorges LED', 'Rechampi chirurgical à la brosse', 'Peintures lavables haute lessivabilité', 'Contrôle continu de l’épaisseur du film']
      : ['Laser alignment of LED coves & cornices', 'Surgical cutting-in with precision brushes', 'High-scrub washable tropical paints', 'Continuous dry-film thickness inspection']
  },
  {
    stepNumber: '04',
    title: lang.value === 'fr' ? 'Réception Lumière Rasante & Garantie' : 'Raking-Light Handover & Warranty',
    subtitle: lang.value === 'fr' ? 'Contrôle qualité contradictoire et remise du certificat' : 'Joint quality signoff and warranty delivery',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: lang.value === 'fr'
      ? 'Inspection minutieuse sous projecteur rasant, nettoyage complet prêt à emménager et délivrance de votre attestation de Garantie Décennale.'
      : 'Meticulous surface inspection under raking light, turnkey white-glove cleaning, and delivery of your 10-Year Decennial Warranty.',
    deliverables: lang.value === 'fr'
      ? ['Inspection rasante en présence du client', 'Nettoyage blanc hôtelier complet', 'Remise du carnet de référence des teintes', 'Certificat de Garantie Décennale Cameroun']
      : ['Raking-light walkthrough with client', 'Move-in ready white-glove clean', 'Complete architectural color logbook', 'Cameroon 10-Year Decennial Warranty Certificate']
  }
])

const currentProcessStep = computed(() => craftsmanshipSteps.value[activeStepIndex.value])

// ==========================================
// 10. REAL PRIVATE CONSULTATION (NO FAKE CALCULATOR)
// ==========================================
const consultForm = ref({
  name: '',
  contact: '',
  location: 'Douala — Bonapriso',
  serviceType: 'Peinture Intérieure Haute Décoration & Staff',
  propertyType: 'Villa Duplex de Standing',
  timeline: 'Prioritaire (Sous 1 à 2 semaines)',
  selectedShade: 'Ivoire Royal de Bastos (Maison Ndamen)',
  notes: ''
})

const consultationSubmitted = ref(false)
const consultationRefCode = ref('7420')

const applySwatchToConsultation = (swatch) => {
  selectedSwatch.value = swatch
  consultForm.value.selectedShade = `${swatch.name} (${swatch.brand})`
  scrollToSection('consultation')
}

const selectServiceForConsultation = (serviceId) => {
  consultForm.value.serviceType = serviceId
  scrollToSection('consultation')
}

const submitConsultation = () => {
  consultationRefCode.value = String(Math.floor(1000 + Math.random() * 9000))
  consultationSubmitted.value = true
}

const sendConsultationViaWhatsApp = () => {
  const f = consultForm.value
  const intro = lang.value === 'fr'
    ? `Bonjour Maître Jean-Paul Ndamen,\nJe souhaite planifier une visite conseil pour mon chantier au Cameroun :`
    : `Hello Master Jean-Paul Ndamen,\nI would like to schedule an on-site consultation for my project in Cameroon:`
  const msg = `${intro}\n• Nom / Client : ${f.name || 'Client Privé'}\n• Contact : ${f.contact || 'Via WhatsApp'}\n• Localisation : ${f.location}\n• Prestation : ${f.serviceType} (${f.propertyType})\n• Délai : ${f.timeline}\n• Teinte souhaitée : ${f.selectedShade}\n• Notes : ${f.notes || 'Je vous joins les photos/plans dans cette discussion.'}`
  window.open(`https://wa.me/237677002244?text=${encodeURIComponent(msg)}`, '_blank')
}

// ==========================================
// 11. TESTIMONIALS (CAMEROON & DIASPORA)
// ==========================================
const activeTestimonialIndex = ref(0)
const testimonials = computed(() => [
  {
    id: 1,
    name: 'Dr. Samuel Ebanda',
    role: lang.value === 'fr' ? 'Propriétaire — Villa Duplex, Bonapriso (Douala)' : 'Owner — Duplex Villa, Bonapriso (Douala)',
    project: lang.value === 'fr' ? 'Peinture Intérieure & Faux-Plafonds Staff (320 m²)' : 'Interior Painting & Plaster Staff Ceilings (320 m²)',
    quote: lang.value === 'fr'
      ? 'Un professionnalisme exceptionnel. Les corniches lumineuses en staff façonnées dans l’atelier de Maître Ndamen ont donné une allure de palace à notre salon. La peinture résiste parfaitement à l’humidité de Douala.'
      : 'Exceptional professionalism. The indirect LED plaster cornices cast in Master Ndamen’s workshop gave our reception rooms a palace feel. The paint withstands Douala’s humidity flawlessly.'
  },
  {
    id: 2,
    name: 'Cabinet d’Architecture Archidesign Bastos',
    role: lang.value === 'fr' ? 'Architecte en Chef — Bastos (Yaoundé)' : 'Lead Architect — Bastos (Yaoundé)',
    project: lang.value === 'fr' ? 'Ravalement Façade & Stuc Vénitien (480 m²)' : 'Facade Restoration & Venetian Stucco (480 m²)',
    quote: lang.value === 'fr'
      ? 'Nous confions les chantiers les plus prestigieux de nos clients VIP à Jean-Paul Ndamen depuis 5 ans. Sa maîtrise du climat tropical camerounais et son souci du détail sont incomparables.'
      : 'We have entrusted our VIP clients’ most demanding projects to Jean-Paul Ndamen for 5 years. His mastery of Cameroon’s tropical climate and meticulous attention to detail are second to none.'
  },
  {
    id: 3,
    name: 'Mme Béatrice Fotso',
    role: lang.value === 'fr' ? 'Propriétaire — Villa Balnéaire, Kribi' : 'Owner — Seaside Villa, Kribi',
    project: lang.value === 'fr' ? 'Façade Anti-Sel & Peinture Intérieure (290 m²)' : 'Anti-Salt Facade & Interior Velvet (290 m²)',
    quote: lang.value === 'fr'
      ? 'Sur le front de mer à Kribi, l’air salin abîme tout très vite. Deux ans après le passage de la Maison Ndamen, la façade est impeccable, sans la moindre trace d’écaillage. Respect des délais exemplaire.'
      : 'Right on the oceanfront in Kribi, salt air ruins walls rapidly. Two years after Maison Ndamen’s work, the facade remains pristine with zero peeling. Timelines were rigorously respected.'
  }
])

const currentTestimonial = computed(() => testimonials.value[activeTestimonialIndex.value])
const nextTestimonial = () => { activeTestimonialIndex.value = (activeTestimonialIndex.value + 1) % testimonials.value.length }
const prevTestimonial = () => { activeTestimonialIndex.value = (activeTestimonialIndex.value - 1 + testimonials.value.length) % testimonials.value.length }

let revealObserver = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('mousemove', onSliderMove, { passive: true })
  window.addEventListener('mousemove', onGlobalMouseMove, { passive: true })
  window.addEventListener('mouseup', stopSliderDrag)
  window.addEventListener('touchmove', onSliderMove, { passive: true })
  window.addEventListener('touchend', stopSliderDrag)

  cursorRafId = requestAnimationFrame(animateCustomCursor)
  sliderRafId = requestAnimationFrame(animateSliderPhysics)

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-revealed')
        })
      },
      { threshold: 0.12 }
    )
  // Immediate reveal of all text with full contrast
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', onSliderMove)
  window.removeEventListener('mouseup', stopSliderDrag)
  window.removeEventListener('touchmove', onSliderMove)
  window.removeEventListener('touchend', stopSliderDrag)
  if (sliderRafId) cancelAnimationFrame(sliderRafId)
  if (revealObserver) revealObserver.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden relative">
    <!-- GRAIN OVERLAY -->
    <div
      class="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-overlay"
      style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);"
    ></div>

    <!-- AMBIENT ROYAL GOLD GLOW BACKDROP -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="absolute -top-48 -left-48 w-[38rem] h-[38rem] rounded-full bg-amber-500/10 blur-[150px]"></div>
      <div class="absolute top-1/3 -right-48 w-[34rem] h-[34rem] rounded-full bg-amber-400/5 blur-[140px]"></div>
      <div class="absolute bottom-0 left-1/4 w-[40rem] h-[28rem] rounded-full bg-slate-800/30 blur-[160px]"></div>
    </div>

    <!-- FLOATING NAVBAR + BILINGUAL SWITCHER + SCROLL PROGRESS BAR -->
    <header
      :class="[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl bg-slate-950/90 border-b border-amber-500/20',
        isScrolled ? 'py-2.5 sm:py-3 shadow-2xl shadow-black/80' : 'py-3 sm:py-4 lg:py-5'
      ]"
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        <a
          href="#accueil"
          @click.prevent="scrollToSection('accueil')"
          class="group flex items-center gap-2.5 sm:gap-3 focus:outline-none shrink-0"
        >
          <div class="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[1px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 shrink-0">
            <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center relative overflow-hidden">
              <span class="text-amber-400 font-serif font-bold text-base sm:text-lg">N</span>
            </div>
          </div>
          <div class="min-w-0">
            <span class="block text-sm sm:text-lg font-serif tracking-[0.14em] sm:tracking-[0.18em] text-white font-semibold whitespace-nowrap">
              MAISON <span class="text-amber-400">NDAMEN</span>
            </span>
            <span class="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-amber-300/80 truncate">
              {{ t.brandSubtitle }}
            </span>
          </div>
        </a>

        <nav class="hidden xl:flex items-center gap-1 bg-slate-900/70 border border-amber-500/20 rounded-full px-2.5 py-1.5 backdrop-blur-md">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            @click.prevent="scrollToSection(link.id)"
            :class="[
              'px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300',
              activeSection === link.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-amber-400'
            ]"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            @click="toggleLanguage"
            type="button"
            class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-slate-900/90 border border-amber-500/35 hover:border-amber-400 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-300 transition-all shadow-inner shrink-0"
            :title="lang === 'fr' ? 'Switch to English' : 'Passer en Français'"
          >
            <span class="text-xs sm:text-sm">🇨🇲</span>
            <span :class="lang === 'fr' ? 'text-white underline decoration-amber-400 underline-offset-2' : 'text-slate-400'">FR</span>
            <span class="text-slate-600">/</span>
            <span :class="lang === 'en' ? 'text-white underline decoration-amber-400 underline-offset-2' : 'text-slate-400'">EN</span>
          </button>

          <button
            @click="scrollToSection('consultation')"
            class="hidden sm:inline-flex relative group overflow-hidden rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 shrink-0"
          >
            <span class="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <Sparkles class="w-3.5 h-3.5" />
              <span>{{ t.navCta }}</span>
            </span>
          </button>

          <button
            @click="toggleMobileMenu"
            type="button"
            class="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-colors shrink-0"
            aria-label="Menu"
          >
            <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900/80 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)] transition-all duration-150 ease-out"
          :style="{ width: `${scrollProgress}%` }"
        ></div>
      </div>
    </header>

    <!-- MOBILE DRAWER -->
    <Transition name="fade-slide">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 xl:hidden bg-slate-950/98 backdrop-blur-2xl pt-20 sm:pt-24 px-4 sm:px-8 pb-8 flex flex-col justify-between overflow-y-auto"
      >
        <div class="space-y-2 max-w-lg mx-auto w-full pt-4">
          <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <p class="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              {{ t.mobileNavTitle }}
            </p>
            <span class="text-xs text-slate-400 font-mono">MAISON NDAMEN</span>
          </div>

          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="link.href"
            @click.prevent="scrollToSection(link.id)"
            :class="[
              'flex items-center justify-between py-3 px-4 rounded-2xl text-base sm:text-lg font-serif font-semibold border transition-all',
              activeSection === link.id
                ? 'bg-amber-500/15 border-amber-400/50 text-amber-300'
                : 'border-white/5 text-slate-200 hover:border-amber-500/30'
            ]"
          >
            <span>{{ link.label }}</span>
            <ArrowRight class="w-4 h-4 text-amber-400" />
          </a>

          <button
            @click="scrollToSection('consultation')"
            class="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar class="w-4 h-4" />
            <span>{{ t.heroPrimaryCta }}</span>
          </button>
        </div>

        <div class="pt-6 border-t border-amber-500/20 space-y-3 max-w-lg mx-auto w-full">
          <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30">
            <span class="text-xs uppercase tracking-wider text-slate-300">{{ lang === 'fr' ? 'Langue (Cameroun)' : 'Language (Cameroon)' }}</span>
            <button
              @click="toggleLanguage"
              class="px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase"
            >
              {{ lang === 'fr' ? 'English (EN)' : 'Français (FR)' }}
            </button>
          </div>
          <a
            href="https://wa.me/237677002244"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle class="w-4 h-4" />
            <span>{{ t.whatsappDirectBtn }}</span>
          </a>
        </div>
      </div>
    </Transition>

    <!-- 1. HERO SECTION -->
    <section id="accueil" class="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden z-10 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          <div class="lg:col-span-7 space-y-6 sm:space-y-7">
            <div class="inline-flex max-w-full flex-wrap sm:flex-nowrap items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.18em] font-medium">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0"></span>
              <span class="truncate">{{ t.heroBadge }}</span>
            </div>

            <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-serif font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.07] break-words">
              {{ t.heroTitleLine1 }}
              <span class="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {{ t.heroTitleHighlight }}
              </span>
              {{ t.heroTitleLine3 }}
            </h1>

            <p class="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {{ t.heroDescription }}
            </p>

            <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-900/85 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5 max-w-2xl shadow-lg">
              <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck class="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {{ t.heroGuaranteeTitle }}
                </p>
                <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {{ t.heroGuaranteeDesc }}
                </p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <button
                @click="scrollToSection('consultation')"
                class="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.65)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Calendar class="w-4 h-4" />
                <span>{{ t.heroPrimaryCta }}</span>
                <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                @click="scrollToSection('apropos')"
                class="inline-flex items-center justify-center gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 transition-all duration-300"
              >
                <User class="w-4 h-4 text-amber-400" />
                <span>{{ t.heroSecondaryCta }}</span>
              </button>
            </div>

            <div class="pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
              <div>
                <p class="text-xl sm:text-3xl font-serif font-bold text-amber-400">15+ {{ lang === 'fr' ? 'Ans' : 'Yrs' }}</p>
                <p class="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1 leading-snug">{{ t.stat1Label }}</p>
              </div>
              <div>
                <p class="text-xl sm:text-3xl font-serif font-bold text-white">180+</p>
                <p class="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1 leading-snug">{{ t.stat2Label }}</p>
              </div>
              <div>
                <p class="text-xl sm:text-3xl font-serif font-bold text-amber-400">100%</p>
                <p class="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1 leading-snug">{{ t.stat3Label }}</p>
              </div>
            </div>
          </div>

          <!-- Right Column: 3D Showcase -->
          <div
            class="lg:col-span-5 relative scene-3d max-w-md sm:max-w-lg lg:max-w-none mx-auto w-full"
            @mousemove="handleCardMouseMove($event, 'hero3d')"
            @mouseleave="handleCardMouseLeave('hero3d')"
          >
            <div class="pointer-events-none hidden sm:block absolute -inset-6 rounded-full border border-amber-400/20 orbit-ring-3d"></div>

            <div
              class="relative rounded-3xl p-2 bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-transparent border border-amber-500/30 shadow-2xl shadow-black card-3d transition-transform duration-200 ease-out"
              :style="get3DCardStyle('hero3d')"
            >
              <div
                class="pointer-events-none absolute inset-0 rounded-3xl z-20 transition-opacity duration-300"
                :style="get3DGlareStyle('hero3d')"
              ></div>

              <div class="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Villa de prestige à Bonapriso"
                  class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>

                <div class="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-2xl backdrop-blur-xl bg-slate-950/85 border border-amber-500/30 depth-z-35">
                  <div class="flex items-center justify-between text-[11px] sm:text-xs text-amber-400 uppercase tracking-widest mb-1">
                    <span>{{ t.heroCardTag }}</span>
                    <span>Douala • Bonapriso</span>
                  </div>
                  <p class="text-xs sm:text-sm font-serif text-white font-medium">
                    {{ t.heroCardCaption }}
                  </p>
                </div>
              </div>

              <div class="floating-3d-slow absolute top-3 left-3 sm:-top-5 sm:-left-6 z-30 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl backdrop-blur-xl bg-slate-950/95 border border-amber-400/40 shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold">
                  <span class="text-base sm:xl">🇨🇲</span>
                </div>
                <div>
                  <p class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">{{ t.heroFloat1Title }}</p>
                  <p class="text-[10px] sm:text-[11px] text-amber-300">{{ t.heroFloat1Sub }}</p>
                </div>
              </div>

              <div class="floating-3d-delayed absolute bottom-24 right-3 sm:top-1/3 sm:-right-6 sm:bottom-auto z-30 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl backdrop-blur-xl bg-slate-950/95 border border-amber-400/40 shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Crown class="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">{{ t.heroFloat2Title }}</p>
                  <p class="text-[10px] sm:text-[11px] text-amber-300">{{ t.heroFloat2Sub }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-amber-500/15">
          <p class="text-center text-xs uppercase tracking-[0.25em] text-slate-400 mb-5 sm:mb-6">
            {{ t.locationsHeading }}
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            <div
              v-for="(loc, lIdx) in cameroonZones"
              :key="loc.name"
              :class="[
                'px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-slate-900/60 border border-amber-500/15 hover:border-amber-500/40 transition-all text-center',
                lIdx === 4 ? 'col-span-2 sm:col-span-1' : ''
              ]"
            >
              <p class="text-xs sm:text-sm font-serif font-bold tracking-[0.12em] sm:tracking-[0.15em] text-amber-300">{{ loc.name }}</p>
              <p class="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">{{ loc.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. "ABOUT ME" — LE MAÎTRE ARTISAN CAMEROUNAIS -->
    <section id="apropos" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/15 bg-slate-950/60 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div
            class="lg:col-span-5 relative scene-3d"
            @mousemove="handleCardMouseMove($event, 'painter3d')"
            @mouseleave="handleCardMouseLeave('painter3d')"
          >
            <div
              class="relative rounded-3xl p-2.5 bg-gradient-to-br from-amber-400/50 via-amber-500/15 to-slate-900 border border-amber-500/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] card-3d transition-transform duration-200 ease-out"
              :style="get3DCardStyle('painter3d')"
            >
              <div
                class="pointer-events-none absolute inset-0 rounded-3xl z-20 transition-opacity duration-300"
                :style="get3DGlareStyle('painter3d')"
              ></div>

              <div class="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"
                  alt="Jean-Paul Ndamen — Maître Artisan Peintre & Staffeur"
                  class="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <div class="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                  {{ t.aboutPortraitBadge }}
                </div>

                <div class="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-amber-500/30 depth-z-35">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-xl font-serif font-bold text-white">Jean-Paul Ndamen</h3>
                      <p class="text-xs text-amber-400 uppercase tracking-widest mt-0.5">{{ t.aboutRole }}</p>
                    </div>
                    <svg class="w-24 h-10 text-amber-400 opacity-90" viewBox="0 0 160 50" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                      <path d="M10 35 C20 10, 30 15, 25 38 C35 20, 50 18, 55 35 C65 15, 75 14, 85 35 C95 25, 115 18, 145 28" />
                      <path d="M40 42 L130 38" stroke-width="1.2" stroke-dasharray="3 3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="floating-3d-slow hidden sm:flex absolute -bottom-6 -right-6 z-30 p-2 rounded-2xl bg-slate-950 border border-amber-400/50 shadow-2xl items-center gap-3 max-w-[240px]">
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80"
                  alt="Staff et moulure en atelier"
                  class="w-14 h-14 rounded-xl object-cover shrink-0 border border-amber-500/30"
                />
                <div class="pr-2">
                  <p class="text-[11px] font-bold uppercase tracking-wider text-amber-300">{{ t.aboutInsetTitle }}</p>
                  <p class="text-[11px] text-slate-300 leading-tight mt-0.5">{{ t.aboutInsetSub }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
              <User class="w-3.5 h-3.5" />
              <span>{{ t.aboutEyebrow }}</span>
            </div>

            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {{ t.aboutHeading1 }}
              <span class="text-amber-400">{{ t.aboutHeadingHighlight }}</span>
            </h2>

            <blockquote class="p-5 rounded-2xl bg-slate-900/90 border-l-4 border-amber-400 text-slate-200 font-serif italic text-lg leading-relaxed">
              « {{ t.aboutQuote }} »
            </blockquote>

            <p class="text-slate-300 text-base leading-relaxed">
              {{ t.aboutBioP1 }}
            </p>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              {{ t.aboutBioP2 }}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div
                v-for="(cred, idx) in t.aboutCredentials"
                :key="idx"
                class="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-400/50 transition-all flex items-start gap-3.5"
              >
                <div class="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 font-serif font-bold text-sm">
                  0{{ idx + 1 }}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">{{ cred.title }}</h4>
                  <p class="text-xs text-slate-300 mt-1 leading-relaxed">{{ cred.desc }}</p>
                </div>
              </div>
            </div>

            <div class="pt-4 flex flex-wrap items-center gap-4">
              <button
                @click="scrollToSection('consultation')"
                class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:brightness-110 transition-all"
              >
                {{ t.aboutMeetBtn }}
              </button>
              <a
                href="tel:+237677002244"
                class="px-5 py-3.5 rounded-xl bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Phone class="w-4 h-4" />
                <span>{{ t.aboutDirectLine }} : +237 6 77 00 22 44</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. INTERACTIVE BEFORE & AFTER SLIDER -->
    <section id="avant-apres" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/10 bg-slate-950/40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest mb-4">
              <Sliders class="w-3.5 h-3.5" />
              <span>{{ t.baEyebrow }}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
              {{ t.baHeading1 }} <span class="text-amber-400">{{ t.baHeadingHighlight }}</span>
            </h2>
          </div>
          <p class="text-slate-300 max-w-md text-sm leading-relaxed">
            {{ t.baInstructions }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8">
            <div
              ref="sliderContainer"
              data-interactive
              class="relative w-full h-[380px] sm:h-[500px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-amber-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
              @mousedown="startSliderDrag"
              @touchstart.passive="startSliderDrag"
            >
              <img
                :src="currentComparison.afterImage"
                :alt="currentComparison.title"
                class="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div class="absolute top-5 right-5 z-20 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest">
                {{ currentComparison.afterLabel }}
              </div>

              <div
                class="absolute inset-0 overflow-hidden pointer-events-none"
                :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
              >
                <img
                  :src="currentComparison.beforeImage"
                  :alt="currentComparison.title"
                  class="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90"
                />
                <div class="absolute inset-0 bg-slate-950/30"></div>
                <div class="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-bold uppercase tracking-widest">
                  {{ currentComparison.beforeLabel }}
                </div>
              </div>

              <div
                class="absolute top-0 bottom-0 z-30 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,1)] pointer-events-none"
                :style="{ left: `${sliderPosition}%` }"
              >
                <div
                  :class="[
                    'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.8)] flex items-center justify-center text-amber-400',
                    !hasInteractedWithSlider ? 'swipe-nudge-cue' : ''
                  ]"
                >
                  <ChevronLeft class="w-4 h-4 -mr-1" />
                  <ChevronRight class="w-4 h-4 -ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 space-y-6">
            <div class="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl space-y-5">
              <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                {{ t.baCaseStudyTitle }}
              </span>
              <div class="space-y-2.5">
                <button
                  v-for="(item, index) in comparisonShowcases"
                  :key="item.id"
                  @click="activeComparisonIndex = index"
                  :class="[
                    'w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between',
                    activeComparisonIndex === index
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-amber-500/30'
                  ]"
                >
                  <div>
                    <p class="text-sm font-semibold">{{ item.title }}</p>
                    <p class="text-xs text-amber-300/90 mt-0.5">{{ item.location }} • {{ item.surface }}</p>
                  </div>
                  <ArrowRight class="w-4 h-4 text-amber-400" />
                </button>
              </div>
              <div class="pt-4 border-t border-white/10 space-y-3">
                <p class="text-xs uppercase tracking-wider text-slate-400">{{ t.baTechNotes }} :</p>
                <p class="text-sm text-slate-200 leading-relaxed">{{ currentComparison.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. CORE SERVICES TRIO -->
    <section id="services" data-reveal class="py-20 md:py-28 relative z-10 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
            <Layers class="w-3.5 h-3.5" />
            <span>{{ t.servicesEyebrow }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
            {{ t.servicesHeading1 }} <span class="text-amber-400">{{ t.servicesHeadingHighlight }}</span>
          </h2>
          <p class="text-slate-300 text-sm sm:text-base">
            {{ t.servicesSubtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 scene-3d">
          <div
            v-for="service in services"
            :key="service.key"
            @mousemove="handleCardMouseMove($event, service.key)"
            @mouseleave="handleCardMouseLeave(service.key)"
            :style="get3DCardStyle(service.key)"
            class="group relative rounded-3xl bg-slate-900/90 border border-amber-500/25 hover:border-amber-400/70 transition-all duration-200 ease-out overflow-hidden flex flex-col justify-between shadow-2xl card-3d"
          >
            <div
              class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
              :style="get3DGlareStyle(service.key)"
            ></div>

            <div>
              <div class="relative h-60 overflow-hidden">
                <img :src="service.image" :alt="service.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <span class="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs uppercase tracking-wider font-semibold">
                  {{ service.badge }}
                </span>
              </div>

              <div class="p-7 space-y-5 relative z-10">
                <div>
                  <p class="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-1">{{ service.subtitle }}</p>
                  <h3 class="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">{{ service.title }}</h3>
                </div>
                <p class="text-sm text-slate-300 leading-relaxed">{{ service.description }}</p>
                <ul class="space-y-2.5 pt-2 border-t border-white/10">
                  <li v-for="(feat, fIdx) in service.features" :key="fIdx" class="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="px-7 pb-7 pt-3 relative z-10">
              <div class="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span class="text-xs uppercase tracking-wider text-slate-400 block">{{ t.serviceFormatLabel }}</span>
                  <span class="text-sm font-serif font-bold text-amber-400">{{ service.commitment }}</span>
                </div>
                <button
                  @click="selectServiceForConsultation(service.id)"
                  class="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <span>{{ t.serviceConsultBtn }}</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4b. ATELIER 3D INTERACTIF — MANUFACTURE DU STAFF -->
    <section id="atelier-3d" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/15 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div class="space-y-4 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
              <Crown class="w-3.5 h-3.5" />
              <span>{{ t.atelierEyebrow }}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {{ t.atelierHeading1 }} <span class="text-amber-400">{{ t.atelierHeadingHighlight }}</span>
            </h2>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              {{ t.atelierSubtitle }}
            </p>
          </div>

          <div class="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-amber-500/25 text-amber-300 text-xs shadow-lg">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>{{ t.atelierDragHint }}</span>
          </div>
        </div>

        <!-- Main 3D Studio Container -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- 3D Architectural Rosette Studio Viewport -->
          <div class="lg:col-span-8 relative">
            <div
              class="relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border border-amber-500/35 shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#0b101d] via-[#070b14] to-[#04060c] p-6 sm:p-10 flex flex-col justify-between"
            >
              <!-- Architectural Status Overlay -->
              <div class="flex items-center justify-between z-20">
                <div class="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-amber-500/35 text-[11px] text-amber-300 font-mono uppercase tracking-wider">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Atelier Staff Douala • Modèle Rosace Royale N°4</span>
                </div>
                <div class="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif font-bold">
                  {{ isExploded ? 'Vue Éclatée / Structure' : 'Assemblage Monolithique' }}
                </div>
              </div>

              <!-- Interactive Rosette Architectural Diagram -->
              <div class="relative my-auto flex items-center justify-center py-6">
                <!-- Outer Ring Halo -->
                <div
                  class="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 transition-all duration-700 flex items-center justify-center shadow-2xl"
                  :style="{
                    borderColor: activeFinishObj.color,
                    boxShadow: `0 0 50px ${activeFinishObj.color}25`
                  }"
                >
                  <!-- Concentric Molding Rings -->
                  <div
                    class="absolute inset-4 rounded-full border transition-all duration-700 opacity-60"
                    :style="{ borderColor: activeFinishObj.color }"
                  ></div>
                  <div
                    class="absolute inset-10 rounded-full border-2 border-dashed transition-all duration-700 opacity-40"
                    :style="{ borderColor: activeFinishObj.color }"
                  ></div>

                  <!-- 16 Acanthus Petals Radial Ring -->
                  <div class="absolute inset-16 flex items-center justify-center transition-all duration-700">
                    <svg viewBox="0 0 200 200" class="w-full h-full transform transition-transform duration-700" :class="{ 'scale-110': isExploded }">
                      <circle cx="100" cy="100" r="90" fill="none" :stroke="activeFinishObj.color" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4" />
                      <!-- Radial Petals -->
                      <g v-for="i in 16" :key="i" :transform="`rotate(${i * 22.5} 100 100)`">
                        <path
                          d="M100 20 C108 45, 115 65, 100 85 C85 65, 92 45, 100 20 Z"
                          :fill="activeFinishObj.color"
                          :opacity="isExploded ? 0.75 : 0.9"
                          stroke="#ffffff"
                          stroke-width="0.5"
                          class="transition-all duration-700"
                        />
                      </g>
                      <!-- Inner Ring of Pearl Beads -->
                      <circle cx="100" cy="100" r="38" fill="none" :stroke="activeFinishObj.color" stroke-width="2" />
                      <g v-for="b in 24" :key="'b' + b" :transform="`rotate(${b * 15} 100 100)`">
                        <circle cx="100" cy="62" r="2.5" :fill="activeFinishObj.color" />
                      </g>
                      <!-- Central Finial Boss -->
                      <circle cx="100" cy="100" r="18" :fill="activeFinishObj.color" stroke="#ffffff" stroke-width="1" />
                      <circle cx="100" cy="100" r="8" fill="#ffffff" opacity="0.5" />
                    </svg>
                  </div>

                  <!-- Exploded Dimension Callouts when isExploded is true -->
                  <div v-if="isExploded" class="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 text-[10px] text-amber-300 font-mono tracking-widest uppercase">
                    <div class="flex justify-between items-center">
                      <span class="bg-slate-950/90 px-2 py-1 rounded border border-amber-400/30">01. Cœur d'Acanthe Sculpté</span>
                      <span class="bg-slate-950/90 px-2 py-1 rounded border border-amber-400/30">Ø 900 mm</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="bg-slate-950/90 px-2 py-1 rounded border border-amber-400/30">02. Tore de Perles Fines</span>
                      <span class="bg-slate-950/90 px-2 py-1 rounded border border-amber-400/30">Plâtre Armé Filasse</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Live Explode Toggle Floating in Canvas Bottom Bar -->
              <div class="flex flex-col sm:flex-row items-center justify-between gap-3 z-20 pt-4 border-t border-white/10">
                <div class="text-xs text-slate-300">
                  <span class="text-amber-400 font-bold">{{ activeFinishObj.name }}</span> — {{ activeFinishObj.desc }}
                </div>
                <button
                  @click="toggleExplode"
                  type="button"
                  class="px-5 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-amber-400 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all shadow-xl flex items-center gap-2"
                >
                  <Layers class="w-4 h-4" />
                  <span>{{ isExploded ? t.atelierAssembleBtn : t.atelierExplodeBtn }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Controls & Technical Specifications -->
          <div class="lg:col-span-4 space-y-6">
            <!-- Material Finishes Selector -->
            <div class="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/25 space-y-4 shadow-xl">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-amber-300">{{ t.atelierFinishLabel }}</h3>
                <span class="text-[11px] text-slate-400 font-mono">{{ activeFinish.toUpperCase() }}</span>
              </div>
              <div class="grid grid-cols-1 gap-2.5">
                <button
                  v-for="finish in finishOptions"
                  :key="finish.id"
                  @click="switchFinish(finish.id)"
                  data-interactive
                  :class="[
                    'w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3',
                    activeFinish === finish.id
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg'
                      : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-amber-500/40'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <span class="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-inner" :style="{ backgroundColor: finish.color }"></span>
                    <div>
                      <p class="text-xs font-bold text-white">{{ finish.name }}</p>
                      <p class="text-[11px] text-slate-400 mt-0.5">{{ finish.desc }}</p>
                    </div>
                  </div>
                  <span v-if="activeFinish === finish.id" class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                </button>
              </div>
            </div>

            <!-- Architectural Staff Anatomy Specs -->
            <div class="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/20 space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">{{ t.atelierAnatomyTitle }}</h4>
              <ul class="space-y-2 text-xs text-slate-300">
                <li class="flex items-start gap-2">
                  <span class="text-amber-400 font-bold">•</span>
                  <span>{{ t.atelierSpec1 }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-400 font-bold">•</span>
                  <span>{{ t.atelierSpec2 }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-amber-400 font-bold">•</span>
                  <span>{{ t.atelierSpec3 }}</span>
                </li>
              </ul>
              <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                <span class="text-xs text-slate-400">{{ t.atelierCustomQuotePrompt }}</span>
                <button
                  @click="scrollToSection('consultation')"
                  class="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1"
                >
                  <span>{{ t.atelierOrderStaffBtn }}</span>
                  <ArrowRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. COLOR SWATCH MOODBOARD -->
    <section id="nuancier" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/10 bg-slate-950/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest mb-4">
              <Palette class="w-3.5 h-3.5" />
              <span>{{ t.swatchEyebrow }}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
              {{ t.swatchHeading1 }} <span class="text-amber-400">{{ t.swatchHeadingHighlight }}</span>
            </h2>
          </div>
          <p class="text-slate-300 max-w-md text-sm leading-relaxed">
            {{ t.swatchSubtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7">
            <div
              class="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl transition-colors duration-700 p-6 sm:p-10 min-h-[380px] flex flex-col justify-between"
              :style="{ backgroundColor: selectedSwatch.hex }"
            >
              <div class="h-5 w-full rounded-full shadow-md transition-colors duration-500 border-b border-black/15" :style="{ backgroundColor: selectedSwatch.moldingHex }"></div>
              <div class="my-6 mx-auto w-full max-w-lg rounded-2xl border-4 p-6 backdrop-blur-md bg-slate-950/75 shadow-2xl transition-colors duration-500" :style="{ borderColor: selectedSwatch.moldingHex }">
                <div class="flex items-center justify-between text-xs uppercase tracking-widest text-amber-300 mb-2">
                  <span>{{ selectedSwatch.brand }}</span>
                  <span>{{ selectedSwatch.climate }}</span>
                </div>
                <h3 class="text-2xl font-serif font-bold text-white">{{ selectedSwatch.name }}</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">{{ selectedSwatch.undertone }}</p>
              </div>
              <div class="h-7 w-full rounded-xl shadow-inner transition-colors duration-500 flex items-center justify-between px-4" :style="{ backgroundColor: selectedSwatch.moldingHex }">
                <span class="text-[11px] font-bold uppercase tracking-widest text-slate-900">{{ t.swatchMoldingLabel }}</span>
                <span class="text-[11px] font-mono font-semibold text-slate-800">{{ selectedSwatch.hex }}</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 space-y-5">
            <div class="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-amber-500/20 space-y-5">
              <h3 class="text-lg font-serif font-bold text-white">{{ t.swatchSelectTitle }}</h3>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="swatch in colorMoodboardSwatches"
                  :key="swatch.id"
                  @click="selectedSwatch = swatch"
                  :class="[
                    'p-3 rounded-2xl border text-left transition-all flex items-center gap-3',
                    selectedSwatch.id === swatch.id ? 'bg-amber-500/15 border-amber-400 text-white shadow-md' : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-amber-500/30'
                  ]"
                >
                  <span class="w-8 h-8 rounded-full border border-white/30 shrink-0 shadow-inner" :style="{ backgroundColor: swatch.hex }"></span>
                  <div class="min-w-0">
                    <p class="text-xs font-bold truncate">{{ swatch.name }}</p>
                    <p class="text-[11px] text-amber-300/80 truncate">{{ swatch.brand }}</p>
                  </div>
                </button>
              </div>
              <button
                @click="applySwatchToConsultation(selectedSwatch)"
                class="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Check class="w-4 h-4" />
                <span>{{ t.swatchApplyBtn }} (« {{ selectedSwatch.name }} »)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. PORTFOLIO GALLERY -->
    <section id="galerie" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/10 bg-slate-950/30 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest mb-4">
              <Compass class="w-3.5 h-3.5" />
              <span>{{ t.galleryEyebrow }}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
              {{ t.galleryHeading1 }} <span class="text-amber-400">{{ t.galleryHeadingHighlight }}</span>
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-amber-500/20">
            <button
              v-for="tab in galleryTabs"
              :key="tab.id"
              @click="activeGalleryTab = tab.id"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300',
                activeGalleryTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'text-slate-300 hover:text-amber-400'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <TransitionGroup name="portfolio-grid" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 relative">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            @click="openLightbox(project)"
            class="group cursor-pointer rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-500 shadow-xl flex flex-col justify-between transform hover:-translate-y-1.5"
          >
            <div class="relative h-64 overflow-hidden">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85"></div>
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                {{ project.categoryLabel }}
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-amber-400 mb-1">
                <MapPin class="w-3.5 h-3.5" />
                <span>{{ project.location }}</span>
              </div>
              <h3 class="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">{{ project.title }}</h3>
              <p class="text-xs text-slate-300 mt-2 line-clamp-2">{{ project.description }}</p>
              <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>{{ t.surfaceLabel }} : <strong class="text-white">{{ project.surface }}</strong></span>
                <span class="text-amber-400 font-semibold">{{ project.finish }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- LIGHTBOX MODAL -->
      <Transition name="lightbox">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl"
          @click.self="closeLightbox"
          @touchstart.passive="handleLightboxTouchStart"
          @touchend.passive="handleLightboxTouchEnd"
        >
          <div class="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]">
            <button @click="closeLightbox" class="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-950/90 border border-amber-500/40 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all">
              <X class="w-5 h-5" />
            </button>
            <div class="lg:col-span-7 relative bg-black flex items-center justify-center overflow-hidden min-h-[280px] sm:min-h-[420px]">
              <img :src="selectedProject.image" :alt="selectedProject.title" :class="['w-full h-full object-cover transition-transform duration-500 cursor-zoom-in', isLightboxZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100']" @click="isLightboxZoomed = !isLightboxZoomed" />
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <button @click.stop="navigateLightbox(-1)" class="w-9 h-9 rounded-full bg-slate-950/85 border border-amber-500/40 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950">
                    <ChevronLeft class="w-4 h-4" />
                  </button>
                  <button @click.stop="navigateLightbox(1)" class="w-9 h-9 rounded-full bg-slate-950/85 border border-amber-500/40 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950">
                    <ChevronRight class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div class="space-y-4">
                <span class="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">{{ selectedProject.categoryLabel }}</span>
                <h3 class="text-2xl font-serif font-bold text-white">{{ selectedProject.title }}</h3>
                <p class="text-sm text-slate-300 leading-relaxed">{{ selectedProject.description }}</p>
              </div>
              <button @click="selectServiceForConsultation(selectedProject.category); closeLightbox()" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                {{ t.lightboxConsultBtn }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- 7. CRAFTSMANSHIP PROTOCOL -->
    <section id="processus" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/10 bg-slate-950/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
            <Hammer class="w-3.5 h-3.5" />
            <span>{{ t.processEyebrow }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
            {{ t.processHeading1 }} <span class="text-amber-400">{{ t.processHeadingHighlight }}</span>
          </h2>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <button
            v-for="(step, idx) in craftsmanshipSteps"
            :key="step.stepNumber"
            @click="activeStepIndex = idx"
            :class="[
              'text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300',
              activeStepIndex === idx ? 'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-slate-900 border-amber-400 shadow-lg' : 'bg-slate-900/70 border-white/10 hover:border-amber-500/30'
            ]"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase tracking-widest text-amber-400">{{ t.stepWord }} {{ step.stepNumber }}</span>
            </div>
            <p class="text-sm sm:text-base font-serif font-bold text-white">{{ step.title }}</p>
          </button>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <div :key="currentProcessStep.stepNumber" class="rounded-3xl bg-slate-900/90 border border-amber-500/25 overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
            <div class="lg:col-span-5 relative min-h-[260px]">
              <img :src="currentProcessStep.image" :alt="currentProcessStep.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            </div>
            <div class="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div class="space-y-3">
                <p class="text-xs uppercase tracking-widest text-amber-400 font-semibold">{{ currentProcessStep.subtitle }}</p>
                <h3 class="text-2xl sm:text-3xl font-serif font-bold text-white">{{ currentProcessStep.title }}</h3>
                <p class="text-sm text-slate-300 leading-relaxed">{{ currentProcessStep.description }}</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div v-for="(item, iIdx) in currentProcessStep.deliverables" :key="iIdx" class="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span class="text-xs text-slate-200">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- 8. REAL PRIVATE CONSULTATION & ON-SITE COMMISSION -->
    <section id="consultation" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/15 scene-3d">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
            <Calendar class="w-3.5 h-3.5" />
            <span>{{ t.consultEyebrow }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white">
            {{ t.consultHeading1 }} <span class="text-amber-400">{{ t.consultHeadingHighlight }}</span>
          </h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            {{ t.consultSubtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-5 space-y-6">
            <div class="p-7 rounded-3xl bg-slate-900/90 border border-amber-500/25 space-y-6 shadow-2xl">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck class="w-6 h-6" />
                </div>
                <div>
                  <h3 class="text-xl font-serif font-bold text-white">{{ t.consultLeftTitle }}</h3>
                  <p class="text-xs text-amber-300 uppercase tracking-widest mt-0.5">{{ t.consultLeftSub }}</p>
                </div>
              </div>

              <p class="text-sm text-slate-300 leading-relaxed">
                {{ t.consultLeftIntro }}
              </p>

              <div class="space-y-4 pt-2">
                <div
                  v-for="(pillar, pIdx) in t.consultPillars"
                  :key="pIdx"
                  class="p-4 rounded-2xl bg-slate-950/85 border border-amber-500/20 flex items-start gap-3.5"
                >
                  <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {{ pIdx + 1 }}
                  </span>
                  <div>
                    <h4 class="text-sm font-bold text-white">{{ pillar.title }}</h4>
                    <p class="text-xs text-slate-300 mt-1 leading-relaxed">{{ pillar.desc }}</p>
                  </div>
                </div>
              </div>

              <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-950 to-slate-950 border border-amber-400/35 space-y-3">
                <p class="text-xs font-bold uppercase tracking-widest text-amber-300">{{ t.directContactLabel }}</p>
                <div class="space-y-2 text-xs text-slate-200">
                  <a href="tel:+237677002244" class="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                    <Phone class="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Ligne Directe Jean-Paul Ndamen :</strong> +237 6 77 00 22 44</span>
                  </a>
                  <a href="tel:+237699885522" class="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                    <Phone class="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Atelier Douala (Bonapriso) :</strong> +237 6 99 88 55 22</span>
                  </a>
                  <a href="mailto:contact@maison-ndamen.cm" class="flex items-center gap-2.5 hover:text-amber-400 transition-colors">
                    <Mail class="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>Email :</strong> contact@maison-ndamen.cm</span>
                  </a>
                  <p class="flex items-center gap-2.5 text-slate-300">
                    <MapPin class="w-3.5 h-3.5 text-amber-400" />
                    <span>Douala : Bonapriso &amp; Yaoundé : Bastos</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="lg:col-span-7 scene-3d"
            @mousemove="handleCardMouseMove($event, 'consult3d')"
            @mouseleave="handleCardMouseLeave('consult3d')"
          >
            <div
              class="luxury-shimmer-card p-[1.5px] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] card-3d transition-transform duration-200 ease-out"
              :style="get3DCardStyle('consult3d')"
            >
              <div class="p-7 sm:p-9 rounded-[23px] bg-slate-900/95 backdrop-blur-xl space-y-6 relative overflow-hidden">
                <div
                  class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                  :style="get3DGlareStyle('consult3d')"
                ></div>

                <div class="relative z-10 space-y-6">
                  <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-amber-500/20">
                    <div>
                      <span class="text-xs uppercase tracking-widest text-amber-400 font-bold block">{{ t.formBadge }}</span>
                      <h3 class="text-2xl font-serif font-bold text-white mt-0.5">{{ t.formTitle }}</h3>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                      ● {{ t.formAvailability }}
                    </span>
                  </div>

                  <Transition name="fade-slide">
                    <div
                      v-if="consultationSubmitted"
                      class="p-5 rounded-2xl bg-emerald-950/90 border border-emerald-400/50 text-emerald-100 space-y-2"
                    >
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-bold text-emerald-300">✓ {{ t.formSuccessTitle }}</p>
                        <span class="text-xs font-mono text-emerald-400">DOSSIER #CM-{{ consultationRefCode }}</span>
                      </div>
                      <p class="text-xs text-slate-200 leading-relaxed">
                        {{ t.formSuccessDesc }}
                      </p>
                    </div>
                  </Transition>

                  <form @submit.prevent="submitConsultation" class="space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelName }} *</label>
                        <input
                          v-model="consultForm.name"
                          type="text"
                          required
                          :placeholder="t.placeholderName"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500"
                        />
                      </div>
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelPhoneEmail }} *</label>
                        <input
                          v-model="consultForm.contact"
                          type="text"
                          required
                          :placeholder="t.placeholderContact"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelLocation }} *</label>
                        <select
                          v-model="consultForm.location"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white"
                        >
                          <option value="Douala — Bonapriso">Douala — Bonapriso</option>
                          <option value="Douala — Denver / Makepe">Douala — Denver / Makepe</option>
                          <option value="Douala — Bonanjo / Akwa">Douala — Bonanjo / Akwa</option>
                          <option value="Yaoundé — Bastos">Yaoundé — Bastos</option>
                          <option value="Yaoundé — Quartier du Golf">Yaoundé — Quartier du Golf</option>
                          <option value="Yaoundé — Santa Barbara / Odza">Yaoundé — Santa Barbara / Odza</option>
                          <option value="Kribi — Villas Balnéaires">Kribi — Villas Balnéaires</option>
                          <option value="Limbe / Bafoussam / Autre">Limbe / Bafoussam / Autre ville</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelService }}</label>
                        <select
                          v-model="consultForm.serviceType"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white"
                        >
                          <option value="Peinture Intérieure Haute Décoration & Staff">{{ t.optInterior }}</option>
                          <option value="Ravalement Façade Tropicalisée Anti-Pluie">{{ t.optExterior }}</option>
                          <option value="Staff, Gorges Lumineuses & Faux-Plafonds VIP">{{ t.optStaff }}</option>
                          <option value="Rénovation Complète Villa Duplex Clé en Main">{{ t.optComplete }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelPropertyType }}</label>
                        <select
                          v-model="consultForm.propertyType"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white"
                        >
                          <option value="Villa Duplex de Standing">{{ t.propVilla }}</option>
                          <option value="Penthouse / Appartement VIP">{{ t.propApartment }}</option>
                          <option value="Hôtel / Siège d’Entreprise / Ambassade">{{ t.propHotel }}</option>
                          <option value="Résidence Balnéaire Kribi / Limbe">{{ t.propCoast }}</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">{{ t.labelTimeline }}</label>
                        <select
                          v-model="consultForm.timeline"
                          class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white"
                        >
                          <option value="Prioritaire (Sous 1 à 2 semaines)">{{ t.timeUrgent }}</option>
                          <option value="Dans 1 mois">{{ t.timeMedium }}</option>
                          <option value="Bâtiment en cours de gros œuvre">{{ t.timePlanning }}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <label class="block text-xs uppercase tracking-wider text-slate-300 font-semibold">{{ t.labelNotes }}</label>
                        <span class="text-[11px] text-amber-300">{{ t.selectedShadeLabel }} : {{ consultForm.selectedShade }}</span>
                      </div>
                      <textarea
                        v-model="consultForm.notes"
                        rows="3"
                        :placeholder="t.placeholderNotes"
                        class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/25 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-slate-500"
                      ></textarea>
                    </div>

                    <div class="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center gap-3">
                      <Sparkles class="w-5 h-5 text-amber-400 shrink-0" />
                      <p class="text-xs text-slate-200 leading-relaxed">
                        <strong class="text-amber-300">{{ t.blueprintTitle }} :</strong> {{ t.blueprintDesc }}
                      </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <button
                        type="submit"
                        class="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 class="w-4 h-4" />
                        <span>{{ t.submitBookingBtn }}</span>
                      </button>

                      <button
                        type="button"
                        @click="sendConsultationViaWhatsApp"
                        class="w-full py-4 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle class="w-4 h-4" />
                        <span>{{ t.submitWhatsappBtn }}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. CLIENT TESTIMONIALS -->
    <section id="avis" data-reveal class="py-20 md:py-28 relative z-10 border-t border-amber-500/10 bg-slate-950/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-5 space-y-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase tracking-widest">
              <Quote class="w-3.5 h-3.5" />
              <span>{{ t.reviewsEyebrow }}</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {{ t.reviewsHeading1 }} <span class="text-amber-400">{{ t.reviewsHeadingHighlight }}</span>
            </h2>
            <div class="flex items-center gap-3 pt-2">
              <button @click="prevTestimonial" class="w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all">
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button @click="nextTestimonial" class="w-11 h-11 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all">
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="lg:col-span-7">
            <Transition name="fade-slide" mode="out-in">
              <div :key="currentTestimonial.id" class="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl space-y-6">
                <div class="flex items-center gap-1 text-amber-400">
                  <Star v-for="n in 5" :key="n" class="w-4 h-4 fill-amber-400" />
                </div>
                <p class="text-lg sm:text-xl font-serif text-white leading-relaxed italic">
                  « {{ currentTestimonial.quote }} »
                </p>
                <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p class="text-base font-bold text-white">{{ currentTestimonial.name }}</p>
                    <p class="text-xs text-amber-300">{{ currentTestimonial.role }}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                    {{ currentTestimonial.project }}
                  </span>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- 10. LUXURY CAMEROON CONTACT FOOTER -->
    <footer id="contact" class="relative z-10 bg-[#050811] border-t border-amber-500/30 pt-16 pb-12 text-slate-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-amber-950/30 border border-amber-500/35 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
          <div class="space-y-2 max-w-2xl">
            <span class="text-xs uppercase tracking-[0.25em] text-amber-400 font-bold">{{ t.footerBannerEyebrow }}</span>
            <h3 class="text-2xl sm:text-4xl font-serif font-bold text-white">{{ t.footerBannerTitle }}</h3>
            <p class="text-sm text-slate-300">{{ t.footerBannerSub }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-3.5 shrink-0">
            <a
              href="tel:+237677002244"
              class="px-6 py-4 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Phone class="w-4 h-4" />
              <span>+237 6 77 00 22 44</span>
            </a>
            <a
              href="https://wa.me/237677002244"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <MessageCircle class="w-4 h-4" />
              <span>WhatsApp VIP</span>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pt-4">
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-[1px]">
                <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-amber-400 font-serif font-bold text-lg">
                  N
                </div>
              </div>
              <div>
                <span class="block text-lg font-serif tracking-[0.18em] text-white font-semibold">
                  MAISON <span class="text-amber-400">NDAMEN</span>
                </span>
                <span class="block text-[10px] uppercase tracking-[0.2em] text-amber-300/80">{{ t.brandSubtitle }}</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ t.footerAboutText }}
            </p>
            <div class="pt-2 flex items-center gap-3">
              <button
                @click="toggleLanguage"
                class="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2"
              >
                <span>🇨🇲</span>
                <span>{{ lang === 'fr' ? 'English Version (EN)' : 'Version Française (FR)' }}</span>
              </button>
            </div>
          </div>

          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{{ t.footerContactHeading }}</h4>
            <ul class="space-y-2.5 text-xs">
              <li>
                <span class="text-slate-400 block">{{ t.footerMobileLabel }} :</span>
                <a href="tel:+237677002244" class="text-amber-300 font-semibold hover:text-amber-400 transition-colors">+237 6 77 00 22 44 (Jean-Paul Ndamen)</a>
              </li>
              <li>
                <span class="text-slate-400 block">{{ t.footerPhoneLabel }} :</span>
                <a href="tel:+237699885522" class="text-white font-semibold hover:text-amber-400 transition-colors">+237 6 99 88 55 22 (Atelier Douala)</a>
              </li>
              <li>
                <span class="text-slate-400 block">Email :</span>
                <a href="mailto:contact@maison-ndamen.cm" class="text-white font-semibold hover:text-amber-400 transition-colors">contact@maison-ndamen.cm</a>
              </li>
              <li>
                <span class="text-slate-400 block">{{ t.footerHoursLabel }} :</span>
                <span class="text-slate-200">{{ t.footerHoursValue }}</span>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{{ t.footerAddressHeading }}</h4>
            <div class="space-y-3 text-xs">
              <div>
                <p class="font-bold text-white">{{ t.footerDoualaTitle }}</p>
                <p class="text-slate-400 mt-0.5">Rue des Palmiers, Bonapriso, Douala, Cameroun</p>
              </div>
              <div>
                <p class="font-bold text-white">{{ t.footerYaoundeTitle }}</p>
                <p class="text-slate-400 mt-0.5">Quartier Bastos (Zone Ambassades), Yaoundé, Cameroun</p>
              </div>
              <div class="pt-1">
                <span class="inline-block px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                  {{ t.footerInsuranceBadge }}
                </span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">{{ t.footerLinksHeading }}</h4>
            <ul class="space-y-2 text-xs">
              <li v-for="link in navLinks" :key="link.id">
                <a :href="link.href" @click.prevent="scrollToSection(link.id)" class="text-slate-300 hover:text-amber-400 transition-colors">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MAISON NDAMEN — Jean-Paul Ndamen. {{ t.footerRights }}</p>
          <div class="flex items-center gap-5">
            <a href="https://wa.me/237677002244" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors">WhatsApp VIP</a>
            <a href="mailto:contact@maison-ndamen.cm" class="hover:text-amber-400 transition-colors">Email</a>
            <a href="tel:+237677002244" class="hover:text-amber-400 transition-colors">+237 6 77 00 22 44</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- PERSISTENT FLOATING WHATSAPP BUTTON (CAMEROON) -->
    <a
      href="https://wa.me/237677002244?text=Bonjour%20Maitre%20Ndamen%2C%20je%20souhaite%20planifier%20une%20visite%20de%20mon%20chantier%20au%20Cameroun."
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3 rounded-full bg-slate-950/95 border border-emerald-500/50 hover:border-emerald-400 shadow-[0_10px_35px_rgba(16,185,129,0.35)] transition-all duration-300 hover:-translate-y-1"
    >
      <div class="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md">
        <MessageCircle class="w-5 h-5" />
      </div>
      <div class="hidden sm:block pr-2">
        <span class="block text-[10px] uppercase tracking-widest text-emerald-400 font-bold">{{ t.floatingWaTop }}</span>
        <span class="block text-xs font-semibold text-white">{{ t.floatingWaBottom }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.scene-3d {
  perspective: 1200px;
  transform-style: preserve-3d;
}
.card-3d {
  transform-style: preserve-3d;
  will-change: transform;
}
.depth-z-35 {
  transform: translateZ(35px);
}

@keyframes float3D {
  0%, 100% { transform: translate3d(0, 0px, 45px) rotateX(0deg) rotateY(0deg); }
  50% { transform: translate3d(0, -10px, 60px) rotateX(3deg) rotateY(-3deg); }
}
.floating-3d-slow {
  animation: float3D 5.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.floating-3d-delayed {
  animation: float3D 6.5s cubic-bezier(0.45, 0, 0.55, 1) 1.5s infinite;
}

@keyframes orbitRing {
  0% { transform: rotateX(68deg) rotateZ(0deg); }
  100% { transform: rotateX(68deg) rotateZ(360deg); }
}
.orbit-ring-3d {
  animation: orbitRing 22s linear infinite;
}

@keyframes swipeNudge {
  0%, 100% { transform: translate(-50%, -50%) translateX(0px); }
  25% { transform: translate(-50%, -50%) translateX(-8px); }
  75% { transform: translate(-50%, -50%) translateX(8px); }
}
.swipe-nudge-cue {
  animation: swipeNudge 2.4s ease-in-out infinite;
}

@keyframes shimmerBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.luxury-shimmer-card {
  background: linear-gradient(125deg, rgba(245, 158, 11, 0.85), rgba(251, 191, 36, 0.2), rgba(217, 119, 6, 0.9), rgba(254, 243, 199, 0.75));
  background-size: 300% 300%;
  animation: shimmerBorder 6s ease infinite;
}

[data-reveal] {
  opacity: 0;
  transform: translate3d(0, 32px, 0) rotateX(6deg);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
[data-reveal].is-revealed {
  opacity: 1;
  transform: translate3d(0, 0, 0) rotateX(0deg);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.portfolio-grid-move,
.portfolio-grid-enter-active,
.portfolio-grid-leave-active {
  transition: all 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.portfolio-grid-enter-from,
.portfolio-grid-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(20px);
}
.portfolio-grid-leave-active {
  position: absolute;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
