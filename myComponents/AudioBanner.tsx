import { ProductCategoryBanner } from "./ProductCategoryBanner";

export const AudioBanner = () => {
  const mockAudio: [
    { id: 1; title: string; image: string },
    { id: 2; title: string; image: string },
  ] = [
    {
      id: 1,
      title: "Barrison StudioPro Wireless ANC",
      image: "/images/headphone2.jpg",
    },
    {
      id: 2,
      title: "AirBuds Pro Minimalist Edition",
      image: "/images/headphone3.jpg",
    },
  ];

  return (
    <ProductCategoryBanner
      tagline="Acoustic Perfection"
      headline="Studio Earbuds & Headsets"
      description="Immerse yourself completely within lossless acoustic dimensions. Featuring dynamic active noise cancellation algorithms built for audiophiles."
      heroImage="/images/headphone1.jpg"
      products={mockAudio}
      reverseLayout={true} // Alternating clean aesthetic symmetry layout
    />
  );
};
