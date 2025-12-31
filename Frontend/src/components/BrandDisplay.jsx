import { assets } from "../assets/assets";
import { motion } from "motion/react";

const images = [
    { src: assets.lg, name: "LG" },
    { src: assets.samsung, name: "Samsung" },
    { src: assets.apple, name: "Apple" },
    { src: assets.vivo, name: "Vivo" },
    { src: assets.xiaomi, name: "Xiaomi" },
    { src: assets.motorola, name: "Motorola" },
    { src: assets.adidas, name: "Adidas" },
    { src: assets.gucci, name: "Gucci" },
    { src: assets.hm, name: "H&M" },
    { src: assets.prada, name: "Prada" },
    { src: assets.puma, name: "Puma" },
    { src: assets.reebok, name: "Reebok" },
    { src: assets.rockstar, name: "Rockstar" },
    { src: assets.rolex, name: "Rolex" },
    { src: assets.zara, name: "Zara" },
    { src: assets.vs, name: "VS" },
    { src: assets.triumph, name: "Triumph" },
    { src: assets.zivame, name: "Zivame" },
    { src: assets.woodland, name: "Woodland" },
    { src: assets.bosch, name: "Bosch" },
    { src: assets.armani, name: "Armani" },
    { src: assets.converse, name: "Converse" },
    { src: assets.louisVuitton, name: "Louis Vuitton" },
    { src: assets.nike, name: "Nike" },
    { src: assets.versace, name: "Versace" },
];

const BrandDisplay = () => {
    return (
        <>
            <div className="text-center my-6 mt-10">
                <h2 className="text-xl md:text-3xl font-semibold tracking-tight">
                    Powered by Global Brands
                </h2>
                <p className="mt-3 text-gray-600 text-sm md:text-base">
                    We collaborate with globally recognized brands to deliver exceptional quality and trust.
                </p>
            </div>
            <div className="overflow-hidden w-full my-10">
                <motion.div
                    className="flex gap-10 w-max will-change-transform"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        duration: 40,
                    }}
                >

                    {images.concat(images).map((item, i) => (
                        <img
                            loading="lazy"
                            key={`${item.name}-${i}`}
                            src={item.src}
                            alt={item.name}
                            className="h-32 w-40 object-contain"
                        />
                    ))}
                </motion.div>
            </div>
        </>

    );
};

export default BrandDisplay;
