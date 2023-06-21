import React, { useState, useEffect } from "react";

export default function Menu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://10.0.1.244/api/v1/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  function getParentCategories(categories) {
    return categories.filter((category) => category.parent_id === null);
  }

  function getSubCategories(categories, parentId) {
    return categories.filter((category) => category.parent_id === parentId);
  }

  function ParentMenu({ category, subCategories }) {
    return (
      <li>
        {category.name}
        <ul>
          {subCategories.map((subCategory) => (
            <SubMenu key={subCategory.id} subCategory={subCategory} />
          ))}
        </ul>
      </li>
    );
  }

  function SubMenu({ subCategory }) {
    return <li>{subCategory.name}</li>;
  }

  return (
    <ul>
      {getParentCategories(categories).map((parentCategory) => (
        <ParentMenu
          key={parentCategory.id}
          category={parentCategory}
          subCategories={getSubCategories(categories, parentCategory.id)}
        />
      ))}
    </ul>
  );
}


