import { ProductCategoryBanner } from "./ProductCategoryBanner";

export const SpeakerBanner = () => {
  const mockSpeakers: [
    { id: 1; title: string; image: string },
    { id: 2; title: string; image: string },
  ] = [
    {
      id: 1,
      title: "Barrison SoundSphere 360",
      image: "/images/product (12).png",
    },
    {
      id: 2,
      title: "Barrison SoundWave Pro",
      image: "/images/product (20).png",
    },
  ];

  return (
    <ProductCategoryBanner
      tagline="Sonic Brilliance"
      headline="Speakers & Audio Systems"
      description="Experience soundscapes with unparalleled clarity and depth. Our speaker collection delivers immersive audio performance, from compact desktop solutions to powerful home theater systems."
      heroImage="/images/banner3.jpg"
      products={mockSpeakers}
    />
  );
};
