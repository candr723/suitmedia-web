import axios from "axios";

const BASE_URL = "https://suitmedia-backend.suitdev.com";

// Axios instance (optional untuk reuse konfigurasi)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function fetchIdeas({
  page = 1,
  size = 10,
  sort = "-published_at",
}) {
  try {
    const res = await api.get("/api/ideas", {
      params: {
        "page[number]": page,
        "page[size]": size,
        "append[]": ["small_image", "medium_image"],
        sort: sort,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch ideas:", error);
    throw new Error("Failed to fetch ideas");
  }
}

export async function fetchBannerImage() {
  try {
    const res = await api.get("/api/ideas");
    const data = res.data;

    const img =
      data?.data?.[0]?.attributes?.thumbnail?.data?.attributes?.url ||
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

    return img.startsWith("http") ? img : `${BASE_URL}${img}`;
  } catch (error) {
    console.error("Failed to fetch banner image:", error);
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";
  }
}
