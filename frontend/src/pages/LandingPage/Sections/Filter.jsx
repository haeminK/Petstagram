import React, { useState } from 'react'
import useCategories from '../../../hooks/useCategories';
import petCategoryList from '../../../utils/petCategoryList';

const Filter = ({ categories, handleCategoriesChange }) => {
    // const { categories, handleCategoriesChange } = useCategories(petCategoryList);


    const categoryCheckboxes = petCategoryList.map(category => {
        const isSelected = categories.includes(category);
        return <button
            key={category}
            name='categories'
            value={category}
            className={`border py-1 px-3 mr-2 m-2 rounded-3xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            type="button"
            onClick={handleCategoriesChange}
        >
            {category}
        </button>
    })

    return (
        <div className='w-[33%] h-[200px] px-4 sticky top-[130px] z-10'>
            <h1 className='m-5 text-3xl'>Filter</h1>
            <div>
                {categoryCheckboxes}
            </div>
        </div>
    )
}

export default Filter