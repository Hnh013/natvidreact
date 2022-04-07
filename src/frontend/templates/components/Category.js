import React from 'react';
import '../../styles/components/category.css';

export const Category = (props) => {
        return (
            <div className="category d-flex ai-c jc-c h-100 bg-over txt-bee">{ props.category.categoryName }</div>
        );
};