import React, { useState } from 'react'

const useCategories = (initialCategories) => {
    const [categories, setCategories] = useState(initialCategories);

    const handleCategoriesChange = (event) => {
        const value = event.target.value;

        setCategories(prevState => {
            const isSelected = prevState.includes(value);
            if (isSelected) {
                return prevState.filter(category => category !== value);
            } else {
                return [...prevState, value];
            }
        })
    }

    return { categories, setCategories, handleCategoriesChange }
}

export default useCategories