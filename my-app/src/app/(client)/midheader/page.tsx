import React from "react";

const FeaturedProduct = ({
  imageSrc,
  title,
}: {
  imageSrc: string;
  title: string;
}) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
    <img
      src={imageSrc}
      alt={title}
      className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <p className="absolute bottom-0 left-0 right-0 text-xl text-white font-bold text-center py-4 px-2 bg-black bg-opacity-75 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      {title}
    </p>
  </div>
);

const MidHeader = () => {
  const featuredProducts = [
    {
      imageSrc: "https://nobero.com/cdn/shop/files/og.jpg?v=1722234051",
      title: "Nobero Plain Classic Fit T-Shirt",
    },
    {
      imageSrc:
        "https://urbaneyogi.com/wp-content/uploads/2019/10/v-neck-yellow-min-e1571212055691-scaled.jpg",
      title: "Yellow T-shirt Mens",
    },
    {
      imageSrc:
        "https://nobero.com/cdn/shop/files/black_8f2f0bb4-9293-4d6f-a179-c918d7602384.jpg?v=1712232992",
      title: "Plain Classic Fit T-Shirt",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MidHeader;
