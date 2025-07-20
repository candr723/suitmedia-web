import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { fetchIdeas } from "../util/api";

export default function Ideas() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState(
    () => localStorage.getItem("sort") || "-published_at"
  );
  const [pageSize, setPageSize] = useState(
    () => Number(localStorage.getItem("pageSize")) || 10
  );
  const [page, setPage] = useState(
    () => Number(localStorage.getItem("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

const loadIdeas = async () => {
  setIsLoading(true);
  setError("");

  try {
    const response = await fetchIdeas({ page, size: pageSize, sort });
    console.log("Full Response:", response);

    if (isMounted && response) {
      const { data, meta } = response;

      console.log("Meta:", meta);
      console.log("Current Page:", page);
      console.log("Total Pages:", meta?.pagination?.pageCount);

      setPosts(data || []);
      setTotalPages(meta?.last_page || 1);
    }
  } catch (err) {
    console.error("Error fetching ideas:", err);
    if (isMounted) {
      setError("Gagal memuat data.");
      setPosts([]);
      setTotalPages(1);
    }
  }

  if (isMounted) setIsLoading(false);
};


    loadIdeas();

    localStorage.setItem("sort", sort);
    localStorage.setItem("pageSize", pageSize.toString());
    localStorage.setItem("page", page.toString());

    return () => {
      isMounted = false;
    };
  }, [sort, pageSize, page]);

  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="text-gray-600 order-1">
          Showing {(page - 1) * pageSize + 1} -{" "}
          {Math.min(page * pageSize, posts.length * totalPages)} of{" "}
          {posts.length * totalPages}
        </div>
        <div className="flex items-center order-2 ml-auto gap-4">
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border p-2"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border p-2"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[200px]">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="col-span-full text-center text-red-500">{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Tidak ada data ditemukan.
          </p>
        )}
      </div>

      <div className="mt-10">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
