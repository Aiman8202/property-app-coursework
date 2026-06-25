
// A small sample dataset just for testing.

const SAMPLE_PROPERTIES = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "Petts Wood Road, Orpington BR5",
    added: { year: 2022, month: 10, day: 12 }
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    location: "Crofton Road, Orpington BR6",
    added: { year: 2022, month: 9, day: 14 }
  },
  {
    id: "prop3",
    type: "House",
    bedrooms: 4,
    price: 925000,
    location: "Bromley Road, Shortlands BR2",
    added: { year: 2023, month: 2, day: 5 }
  }
];


function matchesSearch(property, criteria) {
  if (criteria.type !== "any" && property.type !== criteria.type) return false;

  if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
  if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;

  if (criteria.minBedrooms && property.bedrooms < Number(criteria.minBedrooms)) return false;
  if (criteria.maxBedrooms && property.bedrooms > Number(criteria.maxBedrooms)) return false;

  if (
    criteria.postcode &&
    !property.location.toUpperCase().includes(criteria.postcode.toUpperCase())
  ) {
    return false;
  }

  if (criteria.dateFrom || criteria.dateTo) {
    const addedDate = new Date(
      property.added.year,
      property.added.month - 1,
      property.added.day
    );
    if (criteria.dateFrom && addedDate < new Date(criteria.dateFrom)) return false;
    if (criteria.dateTo && addedDate > new Date(criteria.dateTo)) return false;
  }

  return true;
}

// Pure favourites helpers for testing
function addFavourite(favourites, id) {
  if (favourites.includes(id)) {
    return favourites; // no duplicates
  }
  return [...favourites, id];
}

function removeFavourite(favourites, id) {
  return favourites.filter(fid => fid !== id);
}

module.exports = {
  SAMPLE_PROPERTIES,
  matchesSearch,
  addFavourite,
  removeFavourite
};
