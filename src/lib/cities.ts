export const popularCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export async function searchCitiesAPI(query: string): Promise<string[]> {
  if (!query.trim() || query.length < 2) return popularCities;

  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    });

    if (!res.ok) return filterLocal(query);

    const data = await res.json();
    if (!data.data || !Array.isArray(data.data)) return filterLocal(query);

    const lower = query.toLowerCase();
    return data.data
      .filter((city: string) => city.toLowerCase().includes(lower))
      .slice(0, 15);
  } catch {
    return filterLocal(query);
  }
}

// Offline fallback
const allCities = [
  ...popularCities,
  "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut",
  "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Navi Mumbai", "Ranchi", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada",
  "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati",
  "Mysore", "Bhubaneswar", "Noida", "Kochi", "Dehradun", "Mangalore",
  "Udaipur", "Thiruvananthapuram", "Kozhikode", "Gurgaon",
  "Remote / Work from anywhere",
];

function filterLocal(query: string): string[] {
  const lower = query.toLowerCase();
  return allCities.filter((c) => c.toLowerCase().includes(lower)).slice(0, 15);
}
