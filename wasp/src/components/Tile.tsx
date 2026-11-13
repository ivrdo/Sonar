type TileProps = {
  variant: "round" | "wide";
  image?: string;
  title: string;
  subtitle: string;
};

export function Tile({ variant, image, title, subtitle }: TileProps) {
  // oblik slike ovisi o varijanti, a isti je i za placeholder
  const oblik =
    variant === "round"
      ? "aspect-square rounded-full"
      : "aspect-[3/2] rounded-lg";

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      {image ? (
        <img
          src={image}
          alt={`${title}`}
          className={`bg-akcent-mekani mb-1 w-full object-cover ${oblik}`}
        />
      ) : (
        <div className={`bg-akcent-mekani mb-1 w-full ${oblik}`} />
      )}
      <p className="text-tekst-prva desktop:text-xs truncate text-[15px] font-semibold">
        {title}
      </p>
      <p className="text-tekst-druga desktop:text-[11px] truncate text-sm">
        {subtitle}
      </p>
    </div>
  );
}

export default Tile;