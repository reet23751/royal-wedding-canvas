import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn" | "hi" | "mix";

export interface Milestone {
  year: string;
  title: string;
  text: string;
  bgImage: string;
}

export interface WeddingEvent {
  title: string;
  bn: string;
  date: string;
  venue: string;
  dress: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  desc: string;
  initials: string;
  photo: string;
}

export interface FamilySide {
  title: string;
  members: FamilyMember[];
}

export interface FamilyData {
  sub: string;
  title: string;
  bride: FamilySide;
  groom: FamilySide;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => string;
  getMilestones: () => Milestone[];
  getEvents: () => WeddingEvent[];
  getFamily: () => FamilyData;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // OpeningAnimation
    "opening.youAreInvited": "You Are Invited",
    "opening.forGuest": "for {guestName}",
    
    // BoardingPass
    "boardingPass.shubhVivah": "Auspicious Wedding",
    "boardingPass.royalBoardingPass": "Royal Boarding Pass",
    "boardingPass.flight": "Flight",
    "boardingPass.passenger": "Passenger",
    "boardingPass.honouredGuest": "Honoured Guest",
    "boardingPass.guestSub": "Dear Guest",
    "boardingPass.from": "From",
    "boardingPass.yourHeart": "Your Heart",
    "boardingPass.to": "To",
    "boardingPass.shubhoBibaho": "Shubho Bibaho",
    "boardingPass.date": "Date",
    "boardingPass.dateValue": "07 · Feb",
    "boardingPass.gate": "Gate",
    "boardingPass.seat": "Seat",
    "boardingPass.stubFooter": "Begin your journey into the sky",
    "boardingPass.tapToTakeOff": "Tap to take off →",

    // Hero
    "hero.ganeshayNamah": "Salutations to Lord Ganesha",
    "hero.blessings": "With the blessings of the Almighty",
    "hero.weds": "weds",
    "hero.shubhVivah": "শুভ বিবাহ",
    "hero.dear": "Dear",
    "hero.invitationMessage": "You and your family are cordially invited.",
    "hero.invitationSub": "You and your family are cordially invited to bless the celebration.",
    "hero.day": "Day",
    "hero.dayVal": "Thu",
    "hero.date": "Date",
    "hero.dateVal": "12 Feb",
    "hero.year": "Year",
    "hero.yearVal": "2026",
    "hero.venueCity": "Kolkata · West Bengal",

    // Countdown
    "countdown.awaiting": "Awaiting the Auspicious Day",
    "countdown.title": "Counting the moments",
    "countdown.days": "Days",
    "countdown.hrs": "Hrs",
    "countdown.min": "Min",
    "countdown.sec": "Sec",

    // Story
    "story.sub": "Our Story",
    "story.title": "Our Love Story",

    // Events
    "events.sub": "Wedding Celebrations",
    "events.title": "Wedding Rituals",
    "events.when": "When",
    "events.where": "Where",
    "events.attire": "Attire",
    "events.openMaps": "Open in Maps →",
    "events.tapToView": "Tap to view details",

    // RSVP
    "rsvp.sub": "Your Presence",
    "rsvp.title": "Will you join us?",
    "rsvp.desc": "One tap is all it takes to bless our union.",
    "rsvp.accept": "Accept Invitation",
    "rsvp.thanks": "Thank You {guestName}!",
    "rsvp.thanksDesc": "Your presence is our good fortune.",
    "rsvp.whatsapp": "Share on WhatsApp",
    "rsvp.openVenue": "Open Venue",
    "rsvp.footer": "Yours, Arnab & Rohini Family",
    
    // Contact
    "contact.sub": "Family Contacts",
    "contact.title": "Who to reach",
    "contact.brideSide": "Bride's Side",
    "contact.groomSide": "Groom's Side",
    "contact.venue": "Venues",
    
    // Blessings
    "blessing.sub": "Blessings & Wishes",
    "blessing.title": "Bless the Couple",
    "blessing.placeholder": "Write your warm wishes and blessings here...",
    "blessing.name": "Your Name",
    "blessing.send": "Send Blessings",
    "blessing.success": "Your blessings have been showered on the couple!",
    "blessing.viewAll": "Blessing Wall",
    "blessing.heartCount": "{count} Blessings",
  },
  bn: {
    // OpeningAnimation
    "opening.youAreInvited": "আপনাকে সাদর আমন্ত্রণ",
    "opening.forGuest": "অতিথি: {guestName}-এর জন্য",
    
    // BoardingPass
    "boardingPass.shubhVivah": "শুভ বিবাহ",
    "boardingPass.royalBoardingPass": "রয়েল বোর্ডিং পাস",
    "boardingPass.flight": "উড়ান",
    "boardingPass.passenger": "যাত্রী",
    "boardingPass.honouredGuest": "সম্মানিত অতিথি",
    "boardingPass.guestSub": "প্রিয় অতিথি",
    "boardingPass.from": "প্রস্থান",
    "boardingPass.yourHeart": "আপনার হৃদয়",
    "boardingPass.to": "গন্তব্য",
    "boardingPass.shubhoBibaho": "শুভ বিবাহ",
    "boardingPass.date": "তারিখ",
    "boardingPass.dateValue": "০৭ · ফেব্রুয়ারি",
    "boardingPass.gate": "গেট",
    "boardingPass.seat": "আসন",
    "boardingPass.stubFooter": "আকাশপথে যাত্রা শুরু করুন",
    "boardingPass.tapToTakeOff": "ওড়ার জন্য স্পর্শ করুন →",

    // Hero
    "hero.ganeshayNamah": "শ্রী শ্রী গণেশায় নমঃ",
    "hero.blessings": "সর্বশক্তিমানের আশীর্বাদে",
    "hero.weds": "পরিণয়সূত্রে",
    "hero.shubhVivah": "শুভ বিবাহ",
    "hero.dear": "প্রিয়",
    "hero.invitationMessage": "আপনি ও আপনার পরিবারকে সাদর আমন্ত্রণ।",
    "hero.invitationSub": "অনুষ্ঠানটিকে ধন্য করতে আপনি ও আপনার পরিবার সাদর আমন্ত্রিত।",
    "hero.day": "বার",
    "hero.dayVal": "বৃহস্পতি",
    "hero.date": "তারিখ",
    "hero.dateVal": "১২ ফেব্রুয়ারি",
    "hero.year": "বছর",
    "hero.yearVal": "২০২৬",
    "hero.venueCity": "কলকাতা · পশ্চিমবঙ্গ",

    // Countdown
    "countdown.awaiting": "শুভ দিনের প্রতীক্ষায়",
    "countdown.title": "মুহূর্ত গণনা করা হচ্ছে",
    "countdown.days": "দিন",
    "countdown.hrs": "ঘণ্টা",
    "countdown.min": "মিনিট",
    "countdown.sec": "সেকেন্ড",

    // Story
    "story.sub": "আমাদের গল্প",
    "story.title": "আমাদের প্রেম কাহিনী",

    // Events
    "events.sub": "উৎসবের অনুষ্ঠানসমূহ",
    "events.title": "বিয়ের আচার-অনুষ্ঠান",
    "events.when": "কখন",
    "events.where": "কোথায়",
    "events.attire": "পোশাক",
    "events.openMaps": "ম্যাপে দেখুন →",
    "events.tapToView": "বিস্তারিত দেখতে স্পর্শ করুন",

    // RSVP
    "rsvp.sub": "আপনার উপস্থিতি",
    "rsvp.title": "আপনি কি আসছেন?",
    "rsvp.desc": "আমাদের নতুন জীবনকে আশীর্বাদ করতে একটি ট্যাপই যথেষ্ট।",
    "rsvp.accept": "আমন্ত্রণ গ্রহণ করুন",
    "rsvp.thanks": "ধন্যবাদ {guestName}!",
    "rsvp.thanksDesc": "আপনার উপস্থিতি আমাদের জন্য সৌভাগ্যের।",
    "rsvp.whatsapp": "হোয়াটসঅ্যাপে শেয়ার করুন",
    "rsvp.openVenue": "ভেন্যু দেখুন",
    "rsvp.footer": "ইতি, আরনব ও রোহিনী পরিবার",

    // Contact
    "contact.sub": "পারিবারিক যোগাযোগ",
    "contact.title": "যোগাযোগের ঠিকানা",
    "contact.brideSide": "কনের পরিবার",
    "contact.groomSide": "বরের পরিবার",
    "contact.venue": "অনুষ্ঠানস্থল",
    
    // Blessings
    "blessing.sub": "আশীর্বাদ ও শুভেচ্ছা",
    "blessing.title": "শুভেচ্ছা বার্তা",
    "blessing.placeholder": "নবদম্পতির উদ্দেশ্যে আপনার সুন্দর শুভেচ্ছা ও আশীর্বাদ লিখুন...",
    "blessing.name": "আপনার নাম",
    "blessing.send": "শুভেচ্ছা পাঠান",
    "blessing.success": "আপনার আন্তরিক শুভেচ্ছা নবদম্পতির কাছে পৌঁছে গেছে!",
    "blessing.viewAll": "শুভেচ্ছা দেয়াল",
    "blessing.heartCount": "{count}টি আশীর্বাদ",
  },
  hi: {
    // OpeningAnimation
    "opening.youAreInvited": "आप सादर आमंत्रित हैं",
    "opening.forGuest": "अतिथि: {guestName} के लिए",
    
    // BoardingPass
    "boardingPass.shubhVivah": "शुभ विवाह",
    "boardingPass.royalBoardingPass": "शाही बोर्डिंग पास",
    "boardingPass.flight": "उड़ान",
    "boardingPass.passenger": "यात्री",
    "boardingPass.honouredGuest": "सम्मानित अतिथि",
    "boardingPass.guestSub": "प्रिय अतिथि",
    "boardingPass.from": "प्रस्थान",
    "boardingPass.yourHeart": "आपका हृदय",
    "boardingPass.to": "गंतव्य",
    "boardingPass.shubhoBibaho": "शुभ विवाह",
    "boardingPass.date": "दिनांक",
    "boardingPass.dateValue": "07 · फ़र",
    "boardingPass.gate": "द्वार",
    "boardingPass.seat": "स्थान",
    "boardingPass.stubFooter": "आकाश मार्ग से यात्रा शुरू करें",
    "boardingPass.tapToTakeOff": "उड़ान भरने के लिए स्पर्श करें →",

    // Hero
    "hero.ganeshayNamah": "श्री श्री गणेशाय नमः",
    "hero.blessings": "ईश्वर के आशीर्वाद से",
    "hero.weds": "संग",
    "hero.shubhVivah": "शुभ विवाह",
    "hero.dear": "प्रिय",
    "hero.invitationMessage": "आप और आपके परिवार का सादर आमंत्रण है।",
    "hero.invitationSub": "उत्सव को आशीर्वाद देने के लिए आप और आपका परिवार सादर आमंत्रित हैं।",
    "hero.day": "दिन",
    "hero.dayVal": "गुरुवार",
    "hero.date": "दिनांक",
    "hero.dateVal": "12 फ़र",
    "hero.year": "वर्ष",
    "hero.yearVal": "2026",
    "hero.venueCity": "कोलकाता · पश्चिम बंगाल",

    // Countdown
    "countdown.awaiting": "शुभ दिन की प्रतीक्षा में",
    "countdown.title": "पलों की गिनती",
    "countdown.days": "दिन",
    "countdown.hrs": "घंटे",
    "countdown.min": "मिनट",
    "countdown.sec": "सेकंड",

    // Story
    "story.sub": "हमारी कहानी",
    "story.title": "हमारी प्रेम कहानी",

    // Events
    "events.sub": "उत्सव के कार्यक्रम",
    "events.title": "विवाह की रस्में",
    "events.when": "कब",
    "events.where": "कहाँ",
    "events.attire": "पोशाक",
    "events.openMaps": "मानचित्र में खोलें →",
    "events.tapToView": "विवरण देखने के लिए स्पर्श करें",

    // RSVP
    "rsvp.sub": "आपकी उपस्थिति",
    "rsvp.title": "क्या आप हमारे साथ शामिल होंगे?",
    "rsvp.desc": "हमारे गठबंधन को आशीर्वाद देने के लिए बस एक स्पर्श पर्याप्त है।",
    "rsvp.accept": "निमंत्रण स्वीकार करें",
    "rsvp.thanks": "धन्यवाद {guestName}!",
    "rsvp.thanksDesc": "आपकी उपस्थिति हमारे लिए सौभाग्य की बात है।",
    "rsvp.whatsapp": "व्हाट्सएप पर साझा करें",
    "rsvp.openVenue": "स्थान देखें",
    "rsvp.footer": "सादर, अर्णब और रोहिणी परिवार",

    // Contact
    "contact.sub": "पारिवारिक संपर्क",
    "contact.title": "संपर्क सूत्र",
    "contact.brideSide": "दुल्हन का परिवार",
    "contact.groomSide": "दूल्हे का परिवार",
    "contact.venue": "आयोजन स्थल",
    
    // Blessings
    "blessing.sub": "आशीर्वाद और शुभकामनाएं",
    "blessing.title": "शुभकामनाएं भेजें",
    "blessing.placeholder": "नवदंपति के लिए अपनी शुभकामनाएं और आशीर्वाद यहाँ लिखें...",
    "blessing.name": "आपका नाम",
    "blessing.send": "आशीर्वाद भेजें",
    "blessing.success": "आपकी शुभकामनाएं और आशीर्वाद नवदंपति तक पहुंच गए हैं!",
    "blessing.viewAll": "शुभकामना दीवार",
    "blessing.heartCount": "{count} आशीर्वाद",
  },
  mix: {
    // OpeningAnimation
    "opening.youAreInvited": "You Are Invited! ज़रूर आना!",
    "opening.forGuest": "specially for {guestName}",
    
    // BoardingPass
    "boardingPass.shubhVivah": "Shubh Vivah",
    "boardingPass.royalBoardingPass": "Royal Boarding Pass",
    "boardingPass.flight": "Flight",
    "boardingPass.passenger": "Passenger",
    "boardingPass.honouredGuest": "Aziiz Mehmaan",
    "boardingPass.guestSub": "Pyaare Guest",
    "boardingPass.from": "From",
    "boardingPass.yourHeart": "Dil Se",
    "boardingPass.to": "To",
    "boardingPass.shubhoBibaho": "Shubho Bibaho",
    "boardingPass.date": "Date",
    "boardingPass.dateValue": "07 · Feb",
    "boardingPass.gate": "Gate",
    "boardingPass.seat": "Seat",
    "boardingPass.stubFooter": "Chalo flight board karein!",
    "boardingPass.tapToTakeOff": "Tap to take off →",

    // Hero
    "hero.ganeshayNamah": "Shree Shree Ganeshay Namah",
    "hero.blessings": "With the blessings of God",
    "hero.weds": "weds",
    "hero.shubhVivah": "Shubh Vivah",
    "hero.dear": "Pyaare",
    "hero.invitationMessage": "Aap aur aapki family cordially invited hain.",
    "hero.invitationSub": "Join us and bless the beautiful couple on this special day.",
    "hero.day": "Day",
    "hero.dayVal": "Thu",
    "hero.date": "Date",
    "hero.dateVal": "12 Feb",
    "hero.year": "Year",
    "hero.yearVal": "2026",
    "hero.venueCity": "Kolkata · West Bengal",

    // Countdown
    "countdown.awaiting": "Awaiting Shubh Din",
    "countdown.title": "Counting the beautiful moments",
    "countdown.days": "Days",
    "countdown.hrs": "Hours",
    "countdown.min": "Mins",
    "countdown.sec": "Secs",

    // Story
    "story.sub": "Humari Story",
    "story.title": "Our Love Story",

    // Events
    "events.sub": "Wedding Functions",
    "events.title": "Wedding Rituals",
    "events.when": "When",
    "events.where": "Where",
    "events.attire": "Attire",
    "events.openMaps": "Open in Maps →",
    "events.tapToView": "Tap to view details",

    // RSVP
    "rsvp.sub": "Aapki Presence",
    "rsvp.title": "Will you join us?",
    "rsvp.desc": "Just one tap to bless our beautiful union!",
    "rsvp.accept": "Accept Invitation",
    "rsvp.thanks": "Thank You {guestName}!",
    "rsvp.thanksDesc": "Aapka aana humare liye सौभाग्य ki baat hai!",
    "rsvp.whatsapp": "WhatsApp par share karein",
    "rsvp.openVenue": "Open Venue Location",
    "rsvp.footer": "Regards, Arnab & Rohini Family",

    // Contact
    "contact.sub": "Family Contacts",
    "contact.title": "Contact Details",
    "contact.brideSide": "Bride's Side",
    "contact.groomSide": "Groom's Side",
    "contact.venue": "Venues",
    
    // Blessings
    "blessing.sub": "Blessings & Wishes",
    "blessing.title": "Shubhkamnayein & Blessings",
    "blessing.placeholder": "Apne warm wishes aur blessings yahan likhein...",
    "blessing.name": "Aapka Name",
    "blessing.send": "Send Blessings",
    "blessing.success": "Aapka pyaara blessings couple tak pahunch gaya hai!",
    "blessing.viewAll": "Blessing Wall",
    "blessing.heartCount": "{count} Blessings",
  },
};

const MILESTONES: Record<Language, Milestone[]> = {
  en: [
    { 
      year: "2019", 
      title: "First Meeting", 
      text: "It was a golden monsoon afternoon in College Street. The aroma of old books filled the air, blending with the steam of hot bhaar-er-cha. Arnab and Rohini's eyes met across a crowded stall as both reached for the same copy of Rabindranath Tagore's poetry. A simple conversation sparked a connection that neither of them could forget, setting the stage for a beautiful lifetime together.",
      bgImage: "/story_1.png"
    },
    { 
      year: "2021", 
      title: "Friendship", 
      text: "As months passed, their friendship blossomed like a beautiful night-blooming jasmine. Long walks across the majestic Howrah Bridge at sunset slowly transformed into late-night phone conversations that lasted until dawn. They shared their deepest dreams, silent fears, and endless laughter, realizing that they had found their true soulmate and ultimate safe haven in each other.",
      bgImage: "/story_2.png"
    },
    { 
      year: "2023", 
      title: "The Proposal", 
      text: "Under the grand, glowing chandeliers of Victoria Memorial on a cool winter evening, Arnab took Rohini's hand in his. With a heart full of devotion and eyes reflecting a lifetime of love, he knelt down on one knee, holding a sparkling ring. Rohini's breath caught, and with tears of pure joy glistening in her eyes, she whispered a beautiful, tearful 'yes' that echoed through the royal gardens.",
      bgImage: "/story_3.png"
    },
    { 
      year: "2025", 
      title: "Engagement", 
      text: "Surrounded by the warm smiles and blessings of both families, their union was officially sealed in a grand ceremony. The resonant sound of the shankha filled the air with holy vibrations, and the application of sacred sindoor and traditional shankha-pola marked the beautiful promise of forever. It was a celebration of two hearts and two families blending into one harmonious journey.",
      bgImage: "/story_4.png"
    },
  ],
  bn: [
    { 
      year: "২০১৯", 
      title: "প্রথম আলাপ", 
      text: "কলেজ স্ট্রিটের এক অপরূপ সোনাঝরা বর্ষার বিকেল। পুরোনো বইয়ের মদির গন্ধ চারিদিকে ভেসে বেড়াচ্ছিল, যার সঙ্গে মিশেছিল ভাঁড়ের গরম চায়ের মিষ্টি সুবাস। একটি জনাকীর্ণ দোকানের সামনে হঠাৎই অর্ণব ও রোহিণীর চোখাচোখি হয়, যখন দুজনেই রবীন্দ্রনাথ ঠাকুরের একটি কবিতার বই একসঙ্গে স্পর্শ করে। সেই সাধারণ আলাপচারিতা থেকেই এমন এক হৃদয়ের মেলবন্ধন শুরু হলো, যা সময়ের সাথে সাথে এক মহীরূহে পরিণত হয়েছে।",
      bgImage: "/story_1.png"
    },
    { 
      year: "২০২১", 
      title: "বন্ধুত্ব", 
      text: "সময় পেরিয়ে যাওয়ার সাথে সাথে, শিউলি ফুলের মতো ফুটে উঠল তাদের অমলিন বন্ধুত্ব। গোধূলির আলোয় হাওড়া ব্রিজের ওপর দীর্ঘ পদচারণা ধীরে ধীরে রূপ নিল শেষ না হওয়া রাতের ফোনালাপে, যা ভোর হওয়া পর্যন্ত চলত। তারা ভাগ করে নিল তাদের অন্তরের গভীরতম স্বপ্ন, চাপা ভয় আর অনন্তকালের অম্লান হাসি; বুঝতে পারল যে তারা একে অপরের মধ্যে খুঁজে পেয়েছে তাদের প্রকৃত আত্মার আত্মীয়।",
      bgImage: "/story_2.png"
    },
    { 
      year: "২০২৩", 
      title: "প্রস্তাব", 
      text: "শীতের এক শান্ত সন্ধ্যায়, ভিক্টোরিয়া মেমোরিয়ালের রাজকীয় ঝাড়বাতির আলোয় অর্ণব আলতো করে রোহিণীর হাত দুটি নিজের হাতে নিল। গভীর ভালোবাসায় ভরা চোখ আর উৎসর্গীকৃত মন নিয়ে সে এক হাঁটু গেড়ে বসল এবং একটি চমৎকার আংটি তুলে ধরল। রোহিণীর শ্বাস যেন থমকে গেল, এবং আনন্দের অশ্রুসজল চোখে সে ফিসফিস করে সেই পরম আকাঙ্ক্ষিত 'হ্যাঁ' কথাটি বলল।",
      bgImage: "/story_3.png"
    },
    { 
      year: "২০২৫", 
      title: "বাগদান", 
      text: "উভয় পরিবারের উষ্ণ হাসি আর আন্তরিক আশীর্বাদে ঘেরা এক আড়ম্বরপূর্ণ অনুষ্ঠানের মাধ্যমে তাদের মিলন আনুষ্ঠানিকভাবে সম্পন্ন হলো। শঙ্খের পবিত্র ধ্বনি বাতাসে পবিত্র কম্পন সৃষ্টি করল, এবং শঙ্খ-পলা ও সিঁদুর পরানোর মাধ্যমে চিরকাল পাশে থাকার অঙ্গীকার দৃঢ় হলো। এটি ছিল দুটি মন এবং দুটি পরিবারের এক সুন্দর ও সুরেলা যাত্রার আনন্দময় সূচনা।",
      bgImage: "/story_4.png"
    },
  ],
  hi: [
    { 
      year: "2019", 
      title: "पहली मुलाकात", 
      text: "कॉलेज स्ट्रीट की वह मानसून वाली सुनहरी दोपहर आज भी याद है। पुरानी किताबों की भीनी-भीनी खुशबू और कुल्हड़ की गरम चाय की भाप के बीच, जब दोनों ने एक ही दुकान पर रबीन्द्रनाथ टैगोर की कविताओं की किताब को छुआ, तो अर्णब और रोहिणी की आँखें पहली बार मिलीं। उस हल्की सी बातचीत ने दोनों के दिलों में एक गहरा रिश्ता जगा दिया, जिसने उनके इस खूबसूरत सफर की बुनियाद रखी।",
      bgImage: "/story_1.png"
    },
    { 
      year: "2021", 
      title: "दोस्ती", 
      text: "जैसे-जैसे महीने बीतते गए, उनकी दोस्ती चमेली के फूलों की तरह महकने लगी। सूर्यास्त के समय हावड़ा ब्रिज पर लंबी सैर धीरे-धीरे देर रात तक चलने वाले फोन कॉल्स में बदल गई, जो अक्सर भोर होने तक चलते थे। उन्होंने अपने गहरे सपने, खामोश डर और अंतहीन हँसी एक-दूसरे के साथ साझा की, और महसूस किया कि वे एक-दूसरे के सच्चे हमसफर बन चुके हैं।",
      bgImage: "/story_2.png"
    },
    { 
      year: "2023", 
      title: "प्रस्ताव", 
      text: "सर्दियों की एक ठंडी शाम, विक्टोरिया मेमोरियल के भव्य झूमरों की रोशनी के नीचे, अर्णब ने रोहिणी का हाथ अपने हाथों में ले लिया। दिल में बेपनाह प्यार और आँखों में जीवन भर का साथ लेकर, वह एक घुटने पर बैठ गया और एक खूबसूरत अंगूठी उनके सामने रख दी। रोहिणी की सांसें जैसे थम गईं, और आँखों में खुशी के आँसू लिए उन्होंने वह खूबसूरत 'हाँ' कह दिया।",
      bgImage: "/story_3.png"
    },
    { 
      year: "2025", 
      title: "सगाई", 
      text: "दोनों परिवारों की प्यारी मुस्कान और ढेर सारे आशीर्वाद के बीच, एक भव्य समारोह में उनका गठबंधन हमेशा के लिए तय हो गया। शंख की पावन गूँज से पूरा वातावरण पवित्र हो उठा, और पारंपरिक शंख-पोला तथा सिंदूर के साथ हमेशा साथ निभाने का वादा किया गया। यह दो दिलों और दो परिवारों का एक सुरम्य मिलन था, जिसने एक नए अध्याय की शुरुआत की।",
      bgImage: "/story_4.png"
    },
  ],
  mix: [
    { 
      year: "2019", 
      title: "First Meeting", 
      text: "College Street par monsoon ki ek shaam, bookshops aur bhaar-er-cha ke beech. Ek crowded stall par dono ne ek hi book ko touch kiya, aur Arnab aur Rohini ki eyes mili. Us simple conversation ne ek aisi special chemistry start ki jise dono kabhi bhool nahi paaye, leading to this beautiful lifetime connection together.",
      bgImage: "/story_1.png"
    },
    { 
      year: "2021", 
      title: "Friendship", 
      text: "Months beet-te gaye aur unki dosti ek pyaare phool ki tarah khil gayi. Sunset ke time Howrah Bridge ki lambi walks slowly late-night phone conversations mein change ho gayi jo subah tak chalti thi. Dono ne apne sabhi dreams, fears aur endless laughter share kiye, aur realized kiya ki unhe ek doosre mein apna ultimate soulmate mil chuka hai.",
      bgImage: "/story_2.png"
    },
    { 
      year: "2023", 
      title: "The Proposal", 
      text: "Sardiyon ki ek cool evening thi, Victoria Memorial ke royal chandeliers ke neeche, Arnab ne Rohini ka haath thama. Apne dil mein dher saara pyaar aur eyes mein lifetime ka commitment lekar, he went down on one knee with a gorgeous ring. Rohini was completely speechless, aur usne khushi ke aansuo ke saath ek sweet 'yes' keh diya.",
      bgImage: "/story_3.png"
    },
    { 
      year: "2025", 
      title: "Engagement", 
      text: "Dono families ki warm smiles aur blessings ke beech, unka rishta officially bandh gaya. Shankh ki shubh sound ne air ko pure vibrations se bhar diya, aur traditional shankha-pola aur sindoor ke saath forever ka promise seal ho gaya. Yeh do pyaare dilon aur families ka ek shandaar celebration tha, marking the beautiful road ahead.",
      bgImage: "/story_4.png"
    },
  ],
};

const EVENTS: Record<Language, WeddingEvent[]> = {
  en: [
    { title: "Aiburo Bhaat", bn: "আইবুড়ো ভাত", date: "10 Feb · 1:00 PM", venue: "Bride's Home", dress: "Yellow Traditional" },
    { title: "Gaye Holud", bn: "গায়ে হলুদ", date: "11 Feb · 10:00 AM", venue: "Family Courtyard", dress: "Yellow & White" },
    { title: "Sangeet", bn: "সঙ্গীত সন্ধ্যা", date: "11 Feb · 7:00 PM", venue: "The Glasshouse", dress: "Festive Wear" },
    { title: "Biye", bn: "বিয়ে", date: "12 Feb · 6:00 PM", venue: "Jorasanko Thakur Bari", dress: "Bengali Traditional" },
    { title: "Bou Bhaat", bn: "বৌভাত", date: "14 Feb · 12:30 PM", venue: "Groom's Residence", dress: "Formal Indian" },
    { title: "Reception", bn: "প্রীতিভোজ", date: "14 Feb · 7:30 PM", venue: "ITC Royal Bengal", dress: "Black Tie · Indian" },
  ],
  bn: [
    { title: "আইবুড়ো ভাত", bn: "Aiburo Bhaat", date: "১০ ফেব্রুয়ারি · দুপুর ১:০০", venue: "কনের বাড়ি", dress: "হলুদ ঐতিহ্যবাহী পোশাক" },
    { title: "গায়ে হলুদ", bn: "Gaye Holud", date: "১১ ফেব্রুয়ারি · সকাল ১০:০০", venue: "পারিবারিক উঠোন", dress: "হলুদ ও সাদা পোশাক" },
    { title: "সঙ্গীত সন্ধ্যা", bn: "Sangeet", date: "১১ ফেব্রুয়ারি · সন্ধ্যা ৭:০০", venue: "দ্য গ্লাসহাউস", dress: "উৎসবের পোশাক" },
    { title: "বিয়ে", bn: "Biye", date: "১২ ফেব্রুয়ারি · সন্ধ্যা ৬:০০", venue: "জোড়াসাঁকো ঠাকুরবাড়ি", dress: "ঐতিহ্যবাহী বাঙালি পোশাক" },
    { title: "বৌভাত", bn: "Bou Bhaat", date: "১৪ ফেব্রুয়ারি · দুপুর ১২:৩০", venue: "বরের বাসস্থান", dress: "আনুষ্ঠানিক ভারতীয় পোশাক" },
    { title: "প্রীতিভোজ", bn: "Reception", date: "১৪ ফেব্রুয়ারি · সন্ধ্যা ৭:৩০", venue: "আইটিসি রয়্যাল বেঙ্গল", dress: "কালো টাই বা ভারতীয় পোশাক" },
  ],
  hi: [
    { title: "आईबुड़ो भात", bn: "Aiburo Bhaat", date: "10 फ़र · दोपहर 1:00 बजे", venue: "दुल्हन का घर", dress: "पारंपरिक पीला" },
    { title: "हल्दी", bn: "Gaye Holud", date: "11 फ़र · सुबह 10:00 बजे", venue: "पारिवारिक आँगन", dress: "पीला और सफेद" },
    { title: "संगीत", bn: "Sangeet", date: "11 फ़र · शाम 7:00 बजे", venue: "द ग्लासहाउस", dress: "उत्सवी परिधान" },
    { title: "विवाह", bn: "Biye", date: "12 फ़र · शाम 6:00 बजे", venue: "जोड़ासाँको ठाकुर बाड़ी", dress: "पारंपरिक बंगाली" },
    { title: "बहुभात", bn: "Bou Bhaat", date: "14 फ़र · दोपहर 12:30 बजे", venue: "दूल्हे का घर", dress: "औपचारिक भारतीय" },
    { title: "रिसेप्शन", bn: "Reception", date: "14 फ़र · शाम 7:30 बजे", venue: "आईटीसी रॉयल बंगाल", dress: "ब्लैक टाई या भारतीय" },
  ],
  mix: [
    { title: "Aiburo Bhaat", bn: "আইবুড়ো ভাত", date: "10 Feb · 1:00 PM", venue: "Bride's Home", dress: "Yellow Traditional" },
    { title: "Gaye Holud", bn: "গায়ে হলুদ", date: "11 Feb · 10:00 AM", venue: "Family Courtyard", dress: "Yellow & White" },
    { title: "Sangeet", bn: "সঙ্গীত সন্ধ্যা", date: "11 Feb · 7:00 PM", venue: "The Glasshouse", dress: "Festive Wear" },
    { title: "Biye (Shaadi)", bn: "বিয়ে", date: "12 Feb · 6:00 PM", venue: "Jorasanko Thakur Bari", dress: "Bengali Traditional" },
    { title: "Bou Bhaat", bn: "বৌভাত", date: "14 Feb · 12:30 PM", venue: "Groom's Residence", dress: "Formal Indian" },
    { title: "Reception", bn: "প্রীতিভোজ", date: "14 Feb · 7:30 PM", venue: "ITC Royal Bengal", dress: "Black Tie / Indian" },
  ],
};

const FAMILY_DATA: Record<Language, FamilyData> = {
  en: {
    sub: "Family Blessings",
    title: "Meet the Families",
    bride: {
      title: "Bride's Family",
      members: [
        { name: "Samar Sen", relation: "Father", desc: "The guiding pillar of Rohini's life, always radiating wisdom and unconditional love.", initials: "SS", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Sunanda Sen", relation: "Mother", desc: "The warm heart of the home whose love and culinary magic bind the family together.", initials: "SS", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Sayantani Sen", relation: "Sister", desc: "Rohini's best friend and confidante, adding spark and color to every ceremony.", initials: "SS", photo: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Amit Sen", relation: "Uncle", desc: "The fun-loving uncle who ensures the music never stops and everyone is on the dance floor.", initials: "AS", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Minati Sen", relation: "Grandmother", desc: "The keeper of age-old traditions and family recipes, blessing everyone with her warm smile.", initials: "MS", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Joydeep Sen", relation: "Cousin", desc: "The tech-savvy cousin who is capture-ready with his camera, making sure every memory is preserved.", initials: "JS", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    },
    groom: {
      title: "Groom's Family",
      members: [
        { name: "Dipak Roy", relation: "Father", desc: "Arnab's strength and inspiration, leading with patience and a warm smile.", initials: "DR", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Krishna Roy", relation: "Mother", desc: "The sweetest soul who fills the house with joy, music, and divine blessings.", initials: "KR", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Anirban Roy", relation: "Brother", desc: "The dynamic brother, managing the chaos of the big day with flawless ease.", initials: "AR", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Shreya Roy", relation: "Sister-in-law", desc: "The lovely bhabhi who brings charm, warmth, and beautiful designs to the family.", initials: "SR", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Bimal Roy", relation: "Grandfather", desc: "The family patriarch whose stories of yesteryears and hearty laughter fill the house with joy.", initials: "BR", photo: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Riya Roy", relation: "Cousin", desc: "The energetic coordinator who keeps the schedules running and manages the sangeet rehearsals.", initials: "RR", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    }
  },
  bn: {
    sub: "পারিবারিক বন্ধন",
    title: "পরিবারের সদস্যবৃন্দ",
    bride: {
      title: "কনের পরিবার",
      members: [
        { name: "সমর সেন", relation: "বাবা", desc: "রোহিণীর জীবনের পথপ্রদর্শক, যিনি সর্বদা স্নেহ ও জ্ঞানে আমাদের পরিচালিত করেন।", initials: "স", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "সুনন্দা সেন", relation: "মা", desc: "পরিবারের স্নেহের আধার, যাঁর হাতের সুস্বাদু রান্না আর ভালবাসা আমাদের বেঁধে রাখে।", initials: "সু", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "সায়ন্তনী সেন", relation: "বোন", desc: "রোহিণীর প্রিয় বন্ধু ও সহচরী, প্রতিটি অনুষ্ঠানে আনন্দের রং ছড়িয়ে দিচ্ছেন।", initials: "সা", photo: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "অমিত সেন", relation: "কাকা", desc: "আমুদে কাকা, যিনি নিশ্চিত করেন যে গান কখনো থামবে না এবং সবাই যেন ডান্স ফ্লোরে থাকে।", initials: "অ", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "মিনতি সেন", relation: "ঠাকুমা", desc: "বহু বছরের ঐতিহ্য ও পারিবারিক রান্নার রহস্যের রক্ষক, যাঁর মিষ্টি হাসি সবাইকে আশীর্বাদ করে।", initials: "মি", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "জয়দীপ সেন", relation: "ভাই", desc: "প্রযুক্তি-প্রেমী ভাই, যে সবসময় তার ক্যামেরা নিয়ে প্রস্তুত থাকে যাতে প্রতিটি স্মৃতি ধরে রাখা যায়।", initials: "জ", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    },
    groom: {
      title: "বরের পরিবার",
      members: [
        { name: "দীপক রায়", relation: "বাবা", desc: "অর্ণবের অনুপ্রেরণা ও শক্তি, যিনি সর্বদা ধৈর্য আর হাসিমুখে আমাদের আগলে রাখেন।", initials: "দী", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "কৃষ্ণা রায়", relation: "মা", desc: "অত্যন্ত স্নেহময়ী এক প্রাণ, যাঁর উপস্থিতি ঘরটিকে সুখ, সুর ও আশীর্বাদে ভরিয়ে দেয়।", initials: "কৃ", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "অনির্বাণ রায়", relation: "ভাই", desc: "বরের প্রাণবন্ত ভাই, যিনি উৎসবের সমস্ত কাজ হাসিমুখে নিপুণভাবে সামলাচ্ছেন।", initials: "অ", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "শ্রেয়া রায়", relation: "বৌদি", desc: "মিষ্টি বৌদি, যিনি পরিবারে সুন্দর নকশা, আন্তরিকতা আর আকর্ষণ নিয়ে এসেছেন।", initials: "শ্র", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "বিমল রায়", relation: "দাদু", desc: "পরিবারের অভিভাবক, যাঁর অতীতের গল্প আর প্রাণখোলা হাসি পুরো বাড়িকে আনন্দে ভরিয়ে রাখে।", initials: "বি", photo: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "রিয়া রায়", relation: "বোন", desc: "সবসময় চনমনে বোন, যে অনুষ্ঠানের সময়সূচি বজায় রাখে এবং সঙ্গীত মহড়া তদারকি করে।", initials: "রি", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    }
  },
  hi: {
    sub: "पारिवारिक आशीर्वाद",
    title: "परिवार के सदस्य",
    bride: {
      title: "दुल्हन का परिवार",
      members: [
        { name: "समर सेन", relation: "पिता", desc: "रोहिणी के जीवन के मार्गदर्शक स्तंभ, जो हमेशा ज्ञान और प्रेम बिखेरते हैं।", initials: "स", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "सुनंदा सेन", relation: "माता", desc: "परिवार का स्नेहमयी हृदय, जिनका प्रेम और रसोई का जादू सबको बांधे रखता है।", initials: "सु", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "सायंतनी सेन", relation: "बहन", desc: "रोहिणी की सबसे अच्छी सहेली और विश्वासपात्र, जो शादी के हर उत्सव में रंग भर रही हैं।", initials: "सा", photo: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "अमित सेन", relation: "चाचा", desc: "मस्ती-पसंद चाचा, जो यह सुनिश्चित करते हैं कि संगीत कभी न रुके और हर कोई डांस फ्लोर पर हो।", initials: "अ", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "मिनती सेन", relation: "दादी", desc: "सदियों पुरानी परंपराओं और पारिवारिक व्यंजनों की रक्षक, जो सबको अपनी प्यारी मुस्कान से आशीर्वाद देती हैं।", initials: "मि", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "जयदीप सेन", relation: "भाई", desc: "तकनीक-प्रेमी भाई जो हमेशा कैमरे के साथ तैयार रहते हैं, ताकि हर याद को सहेजा जा सके।", initials: "ज", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    },
    groom: {
      title: "दूल्हे का परिवार",
      members: [
        { name: "दीपक रॉय", relation: "पिता", desc: "अर्णब की ताकत and प्रेरणा, जो हमेशा धैर्य and मुस्कान के साथ राह दिखाते हैं।", initials: "दी", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "कृष्णा रॉय", relation: "माता", desc: "एक अत्यंत स्नेहमयी आत्मा जो घर को खुशियों, संगीत and दिव्य आशीर्वाद से भर देती हैं।", initials: "कृ", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "अनिर्बान रॉय", relation: "भाई", desc: "दूल्हे के ऊर्जावान भाई, जो शादी की सभी व्यवस्थाओं को बड़ी ही सहजता से संभाल रहे हैं।", initials: "अ", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "श्रेया रॉय", relation: "भाभी", desc: "प्यारी भाभी जो परिवार में आकर्षण, गर्मजोशी and सुंदर डिजाइन लाती हैं।", initials: "श्र", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "बिमल रॉय", relation: "दादा", desc: "परिवार के मुखिया जिनकी पुरानी कहानियाँ and दिलकश हँसी घर को खुशियों से भर देती है।", initials: "बि", photo: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "रिया रॉय", relation: "बहन", desc: "ऊर्जावान बहन जो कार्यक्रमों के समय का ध्यान रखती हैं and संगीत के रिहर्सल को संभालती हैं।", initials: "रि", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    }
  },
  mix: {
    sub: "Family Blessings",
    title: "Meet the Families",
    bride: {
      title: "Bride's Family",
      members: [
        { name: "Samar Sen", relation: "Father / Papa", desc: "The guiding pillar of Rohini's life, always radiating wisdom and unconditional love.", initials: "SS", photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Sunanda Sen", relation: "Mother / Mummy", desc: "The warm heart of the home whose love and culinary magic bind the family together.", initials: "SS", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Sayantani Sen", relation: "Sister / Didi", desc: "Rohini's best friend and confidante, adding spark and color to every ceremony.", initials: "SS", photo: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Amit Sen", relation: "Uncle / Chacha", desc: "The fun-loving uncle jo music kabhi rukne nahi dete aur sabko nachate hain.", initials: "AS", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Minati Sen", relation: "Dadi", desc: "Age-old traditions aur recipes ki protector, sabko apni pyari smile se bless karne wali.", initials: "MS", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Joydeep Sen", relation: "Cousin / Bhai", desc: "Humara tech-savvy cousin jo hamesha camera ke saath ready rehta hai memories capture karne ke liye.", initials: "JS", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    },
    groom: {
      title: "Groom's Family",
      members: [
        { name: "Dipak Roy", relation: "Father / Papa", desc: "Arnab's strength and inspiration, leading with patience and a warm smile.", initials: "DR", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Krishna Roy", relation: "Mother / Mummy", desc: "The sweetest soul who fills the house with joy, music, and divine blessings.", initials: "KR", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Anirban Roy", relation: "Brother / Bhaiya", desc: "The dynamic brother, managing the chaos of the big day with flawless ease.", initials: "AR", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Shreya Roy", relation: "Bhabhi", desc: "The lovely bhabhi who brings charm, warmth, and beautiful designs to the family.", initials: "SR", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Bimal Roy", relation: "Dada", desc: "The family patriarch whose stories of yesteryears and hearty laughter fill the house with joy.", initials: "BR", photo: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&h=150&q=80" },
        { name: "Riya Roy", relation: "Sister", desc: "Super energetic cousin sister jo schedules aur sangeet rehearsals manage karti hai.", initials: "RR", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80" }
      ]
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("vivah_lang") as Language;
    if (saved && ["en", "bn", "hi", "mix"].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("vivah_lang", lang);
  };

  const t = (key: string, variables?: Record<string, string>): string => {
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS.en;
    let translation = dictionary[key] || TRANSLATIONS.en[key] || key;

    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        translation = translation.replace(new RegExp(`{${k}}`, "g"), v);
      });
    }

    return translation;
  };

  const getMilestones = () => MILESTONES[language] || MILESTONES.en;
  const getEvents = () => EVENTS[language] || EVENTS.en;
  const getFamily = () => FAMILY_DATA[language] || FAMILY_DATA.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, getMilestones, getEvents, getFamily }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
