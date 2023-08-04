import React from "react";

function AccountListItem({ user_id, name, budget }) {
  return (
    <li>
      user ID: {user_id}, category: {name}, budget: {budget}
    </li>
  );
}

export default CategoryListItem;