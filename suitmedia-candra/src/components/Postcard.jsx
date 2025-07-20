export default function PostCard({ post }) {
  const image = post?.small_image?.[0]?.url;
  const imageUrl = image?.startsWith("http")
    ? image
    : image
    ? `https://suitmedia-backend.suitdev.com${image}`
    : null;

  const title = post?.title || "No Title";

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-3">{title}</h3>
      </div>
    </div>
  );
}
