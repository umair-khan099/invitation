// Single source of truth for all client-editable wedding invitation data.
// Data is based on the physical wedding invitation card.

export const weddingData = {
  couple: {
    brideName: "Sultana Tabassum",
    groomName: "Md. Belal Ansari",
    brideInitial: "S",
    groomInitial: "B",
    monogram: "S ♥ B",
    subtitle: "A blessed beginning of two lives, joined together in faith and love."
  },

  hero: {
    bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    bismillahTranslation:
      "In the name of Allah, the Most Gracious, the Most Merciful",

    greeting: "In the Name of Allah, the Most Beneficent & the Most Merciful",

    invitationText:
      "Mrs. & Mr. Md. Salamuddin Ansari request the pleasure of your company on the auspicious occasion of the Wedding Ceremony of their daughter.",

    weddingDate: "28 October 2026",

    venueSummary: "",

    scrollPrompt: "Scroll to explore their story"
  },

  bride: {
    role: "THE BRIDE",
    name: "Sultana Tabassum",

    fatherName: "Md. Salamuddin Ansari",

    motherName: "",

    profession: "Gov. Teacher",

    personalLine:
      "With the blessings of Allah and the love of her family, she begins a beautiful new chapter of life.",

    quote: ""
  },

  groom: {
    role: "THE GROOM",
    name: "Md. Belal Ansari",

    fatherName: "Dr. Md. Islam Ansari",

    motherName: "",

    profession: "Army Officer",

    personalLine:
      "With faith, family blessings, and the grace of Allah, he begins a sacred new chapter of life.",

    quote: ""
  },

  union: {
    title: "TWO LIVES",
    subtitle: "ONE BLESSED BEGINNING",

    description:
      "Two families come together in the blessed occasion of marriage, with prayers, love, and the blessings of Allah."
  },

  dua: {
    title: "Sacred Du'a for the Union",

    arabic:
      "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",

    transliteration:
      "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fii khayr",

    translation:
      "May Allah bless you, shower His blessings upon you, and join you together in goodness.",

    reference: "Sunan Abi Dawud 2130",

    ending: "آمين يا رب العالمين"
  },

  events: [
    {
      id: "barat",
      title: "Arrival of Barat",
      date: "28 October 2026",
      time: "07:00 PM",
      venue: "",
      address: "https://maps.app.goo.gl/xpLCdYrU3jjE6aNz5?g_st=ac",
      colorTag: "Royal Gold & Ivory",
      description:
        "The arrival of the Barat and the beginning of the wedding celebrations.",
      gmapUrl: ""
    },

    {
      id: "nikah",
      title: "Nikah",
      date: "28 October 2026",
      time: "08:00 PM",
      venue: "",
      address: "",
      colorTag: "Pure White & Gold",
      description:
        "The sacred solemnization of marriage in the presence of family and loved ones.",
      gmapUrl: ""
    },

    {
      id: "dinner",
      title: "Dinner",
      date: "28 October 2026",
      time: "After Nikah",
      venue: "",
      address: "https://maps.app.goo.gl/xpLCdYrU3jjE6aNz5?g_st=ac",
      colorTag: "Soft Blush & Gold",
      description:
        "Dinner will be served after the Nikah ceremony.",
      gmapUrl: ""
    },

    {
      id: "return-barat",
      title: "Return of Barat",
      date: "29 October 2026",
      time: "07:00 AM",
      venue: "",
      address: "https://maps.app.goo.gl/xpLCdYrU3jjE6aNz5?g_st=ac",
      colorTag: "Soft Blush & Sage",
      description:
        "Return of the Barat on the following morning.",
      gmapUrl: ""
    }
  ],

  countdown: {
    targetDate: "2026-10-28T20:00:00",

    heading: "Counting Down to the Blessed Day",

    subtext:
      "Insha'Allah, we look forward to celebrating this blessed occasion with you."
  },

  greetings: {
    enabled: true,

    heading: "Send Your Blessings & Wishes",

    subtext:
      "Your du'as and warm wishes mean the world to the couple. Send your blessings and wishes for their new journey together.",

    whatsappNumber: ""
  },

  footer: {
    closingText:
      "With love, prayers and blessings from the Ansari family.",

    islamicSignoff: "جَزَاكُمُ اللهُ خَيْرًا",

    copyright: "© 2026 Sultana Tabassum & Md. Belal Ansari. Crafted with devotion."
  },

  family: {
    brideSide: {
      father: "Md. Salamuddin Ansari",
      grandfather: "Late Qasim Ansari",
      address: "Vill. & P.O. Sarenja, P.S. Rajpur, Dist. Buxar (Bihar)"
    },

    groomSide: {
      father: "Dr. Md. Islam Ansari",
      address: "Vill. Mukhranw, P.S. Kuchhila, Dist. Kaimur (Bhabua), Bihar"
    },

    weddingFrom: {
      name: "Md. Salamuddin Ansari",
      relation: "S/o Late Qasim Ansari",
      address: "Vill. & P.O. Sarenja, P.S. Rajpur, Dist. Buxar (Bihar)",
      mobile: "9939908958"
    },

    rsvp: [
      "Md. Hussain Ansari",
      "Qari Nazeer Ahmad",
      "Md. Sagir Ansari",
      "Md. Abdullah",
      "Md. Ashfaque",
      "Md. Saddam",
      "Mufti Asad Ahmad Hussain",
      "Md. Arshad",
      "Athar",
      "Md. Rafi Salman",
      "Shahrukh Sultan",
      "Salim Jawed",
      "Abuzar",
      "All Relatives & Friends"
    ]
  }
};