
const {
  SAMPLE_PROPERTIES,
  matchesSearch,
  addFavourite,
  removeFavourite
} = require("./searchUtils");

// Helper to filter using matchesSearch
function filterWithCriteria(criteria) {
  return SAMPLE_PROPERTIES.filter(p => matchesSearch(p, criteria));
}

describe("matchesSearch", () => {
  test("filters by minimum price", () => {
    const results = filterWithCriteria({ minPrice: 800000, type: "any" });
    const ids = results.map(p => p.id);
    expect(ids).toEqual(["prop3"]); // only the expensive house
  });

  test("filters by maximum bedrooms", () => {
    const results = filterWithCriteria({ maxBedrooms: 3, type: "any" });
    const ids = results.map(p => p.id);
    // prop1: 3 beds, prop2: 2 beds, prop3: 4 beds
    expect(ids.sort()).toEqual(["prop1", "prop2"].sort());
  });

  test("filters by postcode area (case-insensitive)", () => {
    const results = filterWithCriteria({ postcode: "br5", type: "any" });
    const ids = results.map(p => p.id);
    expect(ids).toEqual(["prop1"]); // only prop1 has BR5 in location
  });

  test("filters by date range", () => {
    const results = filterWithCriteria({
      dateFrom: "2023-01-01",
      dateTo: "2023-12-31",
      type: "any"
    });
    const ids = results.map(p => p.id);
    expect(ids).toEqual(["prop3"]);
  });

  test("applies multiple criteria together", () => {
    // Houses only, min 3 beds, min price 800k
    const results = filterWithCriteria({
      type: "House",
      minBedrooms: 3,
      minPrice: 800000
    });
    const ids = results.map(p => p.id);
    expect(ids).toEqual(["prop3"]);
  });
});

describe("favourites helpers", () => {
  test("addFavourite adds a new id", () => {
    const start = [];
    const updated = addFavourite(start, "prop1");
    expect(updated).toEqual(["prop1"]);
  });

  test("addFavourite does not add duplicates", () => {
    const start = ["prop1"];
    const updated = addFavourite(start, "prop1");
    expect(updated).toEqual(["prop1"]); // no change
  });

  test("removeFavourite removes an id", () => {
    const start = ["prop1", "prop2"];
    const updated = removeFavourite(start, "prop1");
    expect(updated).toEqual(["prop2"]);
  });

  test("removeFavourite on non-existent id leaves array unchanged", () => {
    const start = ["prop1"];
    const updated = removeFavourite(start, "prop999");
    expect(updated).toEqual(["prop1"]);
  });
});
