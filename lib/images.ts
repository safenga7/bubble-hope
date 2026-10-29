// Central place for every image URL so a dead link is a one-line fix.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  // Hero
  heroCup: u("photo-1558857563-b371033873b8", 1400),
  // Menu items
  brownSugar: u("photo-1525385133512-2f3bdd039054", 800),
  mangoColada: u("photo-1623065422902-30a2d299bbe4", 800),
  matchaLatte: u("photo-1536256263959-770b48d82b0a", 800),
  waffle: u("photo-1562376552-0d160a2f238d", 800),
  tarotea: u("photo-1558160074-4d7d8bdf4256", 800),
  // Kids area
  kidsPlay: u("photo-1566140967404-b8b3932483f5", 1200),
  kidsParty: u("photo-1530103862676-de8c9debad1d", 1000),
  kidsBalloon: u("photo-1513151233558-d860c5398176", 800),
  kidsArt: u("photo-1513364776144-60967b0f800f", 800),
  kidsTreats: u("photo-1563729784474-d77dbb933a9e", 800),
  // Locations
  storeFront: u("photo-1559329007-40df8a9345d8", 1200),
  cafeInterior: u("photo-1554118811-1e0d58224f24", 1000),
  cafeCozy: u("photo-1493857671505-72967e2e2760", 800),
  baristaWork: u("photo-1442512595331-e89e73853f31", 800),
};
