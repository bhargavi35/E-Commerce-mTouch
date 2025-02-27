"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeLoader } from "react-spinners";
import Truncate from "react-truncate";

export default function ProductDetailsClient({ product: initialProduct }) {
    const [product, setProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(!initialProduct);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (!product) {
            setLoading(true);
            fetch(`https://fakestoreapi.com/products/${params.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [product]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FadeLoader color="#3b82f6" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-semibold text-red-500">Product Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl w-full p-5">
                <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.title}</h1>

                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="rounded-lg shadow-md"
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-4">
                        <p className="text-gray-700 text-sm leading-6">
                            <Truncate lines={!showMore ? 3 : 0} ellipsis={<span>... </span>}>
                                {product.description}
                            </Truncate>
                        </p>

                        <button
                            className="text-blue-500 text-sm mt-2 focus:outline-none"
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </button>

                        <p className="text-lg font-semibold text-gray-900 mt-3">
                            Price: <span className="text-blue-600">${product.price}</span>
                        </p>

                        <button className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg shadow-md hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
