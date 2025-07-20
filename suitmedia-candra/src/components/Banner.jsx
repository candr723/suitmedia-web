export default function Banner({ bannerUrl, bannerOffset }) {
  return (
    <section className="relative pt-20">
      <div
        className="relative h-[400px] overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: `translateY(${bannerOffset}px)`,
            }}
          />
        )}

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            transform: `translateY(${bannerOffset * 0.5}px)`,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Ideas
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white drop-shadow">
            Where all our great things begin
          </p>
        </div>
      </div>
    </section>
  );
}
