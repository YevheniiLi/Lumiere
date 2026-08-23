export interface TripTemplate {
  region: string;
  itinerary: { day: string; plan: string }[];
  hotels: { name: string; area: string; price: string }[];
  restaurants: { name: string; cuisine: string; note: string }[];
  transport: string[];
  budget: { category: string; estimate: string }[];
  weather: string;
  packingList: string[];
  tips: string[];
}

export const tripTemplates: Record<string, TripTemplate> = {
  italy: {
    region: "Italy",
    itinerary: [
      {
        day: "Day 1–2",
        plan: "Rome — Colosseum, Roman Forum, and Trastevere by evening.",
      },
      {
        day: "Day 3",
        plan: "Train to Florence — Duomo, Uffizi, sunset from Piazzale Michelangelo.",
      },
      {
        day: "Day 4–5",
        plan: "Cinque Terre — village-hopping by train and coastal trail.",
      },
      { day: "Day 6–7", plan: "Venice — canals on foot, Murano and Burano by boat." },
    ],
    hotels: [
      { name: "Residenza Trastevere", area: "Rome, Trastevere", price: "€140–180/night" },
      {
        name: "Hotel Palazzo Vecchio",
        area: "Florence, Centro Storico",
        price: "€160–210/night",
      },
      {
        name: "Locanda Vernazza",
        area: "Cinque Terre, Vernazza",
        price: "€120–160/night",
      },
    ],
    restaurants: [
      {
        name: "Roscioli",
        cuisine: "Roman trattoria",
        note: "Book ahead for cacio e pepe.",
      },
      {
        name: "Trattoria Mario",
        cuisine: "Florentine",
        note: "No-frills bistecca alla fiorentina.",
      },
      {
        name: "Trattoria dal Billy",
        cuisine: "Ligurian seafood",
        note: "Above Manarola, sunset views.",
      },
    ],
    transport: [
      "High-speed Trenitalia/Italo trains between major cities — book 1–2 weeks ahead for better fares.",
      "Cinque Terre Treno Card covers unlimited trains between villages plus the coastal trail.",
      "Venice is entirely on foot and vaporetto (water bus) — no cars.",
    ],
    budget: [
      { category: "Stays", estimate: "€150/night avg" },
      { category: "Food", estimate: "€45–65/day" },
      { category: "Trains", estimate: "€120 total (7 days)" },
      { category: "Activities", estimate: "€25–40/day" },
    ],
    weather: "Apr–Jun and Sep–Oct: mild, 18–26°C, fewer crowds than peak summer.",
    packingList: [
      "Comfortable walking shoes (cobblestones everywhere)",
      "A layer for cool evenings, even in summer",
      "Modest shoulders/knees coverage for churches",
      "Portable phone charger for full days out",
      "A crossbody bag — pickpocket-aware cities",
      "Reusable water bottle (public fountains are common)",
    ],
    tips: [
      "Validate paper train tickets before boarding, or risk a fine.",
      "Lunch is often 1–3pm and dinner rarely starts before 7:30pm.",
      "Tap water is safe and free at public fountains in most cities.",
      "Skip-the-line tickets for the Uffizi and Colosseum are worth the small fee.",
    ],
  },
  japan: {
    region: "Japan",
    itinerary: [
      {
        day: "Day 1–3",
        plan: "Tokyo — Shibuya, Asakusa, teamLab, a day trip to Kamakura.",
      },
      { day: "Day 4", plan: "Shinkansen to Hakone — Mt. Fuji views, onsen, Lake Ashi." },
      {
        day: "Day 5–7",
        plan: "Kyoto — Fushimi Inari at dawn, Arashiyama, Gion in the evening.",
      },
      { day: "Day 8", plan: "Osaka — Dotonbori street food and Osaka Castle." },
    ],
    hotels: [
      {
        name: "Shibuya Stream Excel Hotel",
        area: "Tokyo, Shibuya",
        price: "¥22,000–28,000/night",
      },
      {
        name: "Hakone Gora Onsen Inn",
        area: "Hakone",
        price: "¥30,000–40,000/night (with dinner)",
      },
      {
        name: "Kyoto Machiya Residence",
        area: "Kyoto, Higashiyama",
        price: "¥18,000–24,000/night",
      },
    ],
    restaurants: [
      {
        name: "Sushi Dai",
        cuisine: "Sushi",
        note: "Arrive before 6am or expect a long line.",
      },
      {
        name: "Ichiran",
        cuisine: "Ramen",
        note: "Solo booths, fully customizable broth.",
      },
      {
        name: "Nishiki Market stalls",
        cuisine: "Street food",
        note: "Kyoto's 400-year-old market street.",
      },
    ],
    transport: [
      "Japan Rail Pass (7/14/21-day) covers most Shinkansen and JR lines — buy before arrival.",
      "IC cards (Suica/Pasmo) work on nearly all city trains, subways, and buses.",
      "Reserve Shinkansen seats for Mt. Fuji-side views on the Tokyo–Kyoto leg.",
    ],
    budget: [
      { category: "Stays", estimate: "¥24,000/night avg" },
      { category: "Food", estimate: "¥5,000–8,000/day" },
      { category: "JR Pass", estimate: "¥50,000 (7-day)" },
      { category: "Activities", estimate: "¥3,000–5,000/day" },
    ],
    weather:
      "Mar–May (cherry blossoms) and Oct–Nov (autumn color): 12–20°C, comfortable for walking.",
    packingList: [
      "Slip-on shoes (frequent shoe removal indoors)",
      "Cash — many smaller restaurants are cash-only",
      "A compact umbrella (rain is common, even in spring)",
      "Portable Wi-Fi router or eSIM, arranged before arrival",
      "Coin purse — vending machines and lockers use coins",
      "A light scarf, useful for both weather and temple etiquette",
    ],
    tips: [
      "Trains stop running around midnight — plan late nights around the last departure.",
      "Tipping isn't expected anywhere, including restaurants and taxis.",
      "Convenience stores (konbini) are genuinely good for fast, cheap meals.",
      "Suica/Pasmo cards now also work as a tap-to-pay at many shops.",
    ],
  },
  europe: {
    region: "Europe",
    itinerary: [
      { day: "Day 1–3", plan: "Paris — Louvre, Montmartre, a Seine-side evening." },
      {
        day: "Day 4–5",
        plan: "Train to Amsterdam — canal walk, Jordaan, Van Gogh Museum.",
      },
      {
        day: "Day 6–8",
        plan: "Flight to Prague — Old Town, Charles Bridge, Prague Castle.",
      },
      {
        day: "Day 9–10",
        plan: "Vienna — coffeehouses, Schönbrunn, a night at the opera.",
      },
    ],
    hotels: [
      {
        name: "Hôtel des Grands Boulevards",
        area: "Paris, 2nd arr.",
        price: "€180–230/night",
      },
      { name: "Canal House Suites", area: "Amsterdam, Jordaan", price: "€160–200/night" },
      { name: "Hotel Josef", area: "Prague, Old Town", price: "€110–150/night" },
    ],
    restaurants: [
      {
        name: "Le Comptoir du Relais",
        cuisine: "French bistro",
        note: "Classic Saint-Germain address.",
      },
      {
        name: "Café de Reiger",
        cuisine: "Dutch-European",
        note: "Jordaan neighborhood favorite.",
      },
      {
        name: "Lokál",
        cuisine: "Czech pub",
        note: "Proper Pilsner and hearty classics.",
      },
    ],
    transport: [
      "A Eurail Pass makes sense for 3+ countries; otherwise book budget flights early.",
      "City transit passes (Paris Navigo, Amsterdam GVB, Prague Lítačka) cover metro, tram, and bus.",
      "Night trains between Amsterdam and Prague save a hotel night.",
    ],
    budget: [
      { category: "Stays", estimate: "€165/night avg" },
      { category: "Food", estimate: "€40–60/day" },
      { category: "Intercity travel", estimate: "€180 total (10 days)" },
      { category: "Activities", estimate: "€20–35/day" },
    ],
    weather:
      "May–Jun and Sep: 15–23°C across most of the route, before or after peak summer crowds.",
    packingList: [
      "A universal power adapter (Type C/E/F across most of the route)",
      "Packable rain layer — weather shifts quickly city to city",
      "Comfortable shoes for cobblestone old towns",
      "A slim daypack for museum days",
      "Printed or downloaded rail/flight confirmations",
      "A money belt for crowded transit hubs",
    ],
    tips: [
      "Book major museums (Louvre, Van Gogh) online in advance — lines run long.",
      "Validate train tickets where required (Czech Republic, Austria) before boarding.",
      "Sunday closures are common for smaller shops across all four cities.",
      "Tap water is safe to drink everywhere on this route.",
    ],
  },
  patagonia: {
    region: "Patagonia",
    itinerary: [
      { day: "Day 1–2", plan: "Fly into El Calafate — Perito Moreno Glacier boat tour." },
      {
        day: "Day 3–5",
        plan: "Bus to El Chaltén — Laguna de los Tres and Fitz Roy trekking.",
      },
      { day: "Day 6–7", plan: "Cross into Chile — Torres del Paine, W Trek highlights." },
      {
        day: "Day 8",
        plan: "Puerto Natales — rest day, glacier-fed lake views before departure.",
      },
    ],
    hotels: [
      { name: "Kau Yatun Estancia", area: "El Calafate", price: "US$110–150/night" },
      { name: "Nothofagus B&B", area: "El Chaltén", price: "US$70–100/night" },
      { name: "Hotel Vendaval", area: "Puerto Natales", price: "US$90–130/night" },
    ],
    restaurants: [
      {
        name: "Mi Rancho",
        cuisine: "Patagonian lamb",
        note: "Slow-roasted cordero, El Calafate staple.",
      },
      {
        name: "La Cervecería",
        cuisine: "Trekker's pub food",
        note: "El Chaltén's post-hike gathering spot.",
      },
      {
        name: "Afrigonia",
        cuisine: "African-Patagonian fusion",
        note: "Unexpected standout in Puerto Natales.",
      },
    ],
    transport: [
      "Regional flights (El Calafate ↔ Ushuaia/Buenos Aires) save days versus overland buses.",
      "Cross-border buses (El Calafate–Puerto Natales) run daily but require passport checks.",
      "El Chaltén itself is walkable — most trailheads start right from town.",
    ],
    budget: [
      { category: "Stays", estimate: "US$100/night avg" },
      { category: "Food", estimate: "US$35–50/day" },
      { category: "Transport", estimate: "US$150 total (8 days)" },
      { category: "Park fees/tours", estimate: "US$40–70/day" },
    ],
    weather:
      "Nov–Mar (Southern Hemisphere summer): 8–18°C, but wind is constant — layer regardless of forecast.",
    packingList: [
      "A genuine windproof shell — Patagonian wind is relentless",
      "Broken-in hiking boots, waterproof",
      "Thermal base layers, even in summer",
      "Trekking poles for the W Trek's descents",
      "Sunglasses and high-SPF sunscreen (thin ozone layer at this latitude)",
      "A dry bag for electronics on glacier boat tours",
    ],
    tips: [
      "Weather changes fast — build a buffer day into any glacier or trek itinerary.",
      "Book W Trek refugios months ahead in peak season (Dec–Feb).",
      "Argentine pesos and Chilean pesos aren't interchangeable — carry both.",
      "Wind can close the Perito Moreno boat tours; keep a flexible day free.",
    ],
  },
};

export const tripTemplateKeywords = Object.keys(tripTemplates);
