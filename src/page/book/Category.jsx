import React, { useState } from 'react';

const categories = [
    {
        name: 'Books',
        subcategories: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy'],
    },
    {
        name: 'Electronics',
        subcategories: ['Mobile', 'Laptop', 'Camera', 'Accessories'],
    },
    {
        name: 'Clothing',
        subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
    },
];

const CategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory('');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Category Filter</h1>
            <div className="flex">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <ul className="list-none">
                        {categories.map((category) => (
                            <li key={category.name}>
                                <button
                                    className={`block p-2 w-full text-left rounded hover:bg-gray-200 ${
                                        selectedCategory === category.name ? 'bg-gray-300' : ''
                                    }`}
                                    onClick={() => handleCategoryChange(category.name)}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">Subcategories</h2>
                    {selectedCategory && (
                        <ul className="list-none">
                            {categories
                                .find((cat) => cat.name === selectedCategory)
                                .subcategories.map((subcategory) => (
                                    <li key={subcategory}>
                                        <button
                                            className={`block p-2 w-full text-left rounded hover:bg-gray-200 ${
                                                selectedSubcategory === subcategory ? 'bg-gray-300' : ''
                                            }`}
                                            onClick={() => setSelectedSubcategory(subcategory)}
                                        >
                                            {subcategory}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Selected Category:</h3>
                <p>{selectedCategory || 'None'}</p>
                <h3 className="text-lg font-semibold">Selected Subcategory:</h3>
                <p>{selectedSubcategory || 'None'}</p>
            </div>
        </div>
    );
};

export default CategoryFilter;