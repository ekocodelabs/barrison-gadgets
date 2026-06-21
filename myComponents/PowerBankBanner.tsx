import { ProductCategoryBanner } from "./ProductCategoryBanner";

export const PowerbankBanner = () => {
  const mockPowerbanks: [
    { id: 1; title: string; image: string },
    { id: 2; title: string; image: string },
  ] = [
    {
      id: 1,
      title: "VoltMax 20K Ultra Fast Charge",
      image: "/images/powerbank2.jpg",
    },
    {
      id: 2,
      title: "AeroWireless Slim 10K MagSafe",
      image: "/images/powerbank3.jpg",
    },
  ];

  return (
    <ProductCategoryBanner
      tagline="Infinite Runtime"
      headline="Powerbanks & Chargers"
      description="Engineered with cutting edge high-density lithium polymer cell architecture to keep your high-performance workspace fully powered anywhere on earth."
      heroImage="/images/powerbank1.jpg"
      products={mockPowerbanks}
    />
  );
};
