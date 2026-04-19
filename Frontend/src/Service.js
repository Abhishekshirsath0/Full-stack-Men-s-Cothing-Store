export const AddDataToServer = async ({
  Firstname,
  Lastname,
  Address,
  Email,
  Phone,
  Password,
}) => {
  const response = await fetch("http://localhost:8000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // ✅ fixed
    body: JSON.stringify({
      Firstname,
      Lastname,
      Address,
      Email,
      Phone,
      Password,
    }),
  });

  return mapServerDataintoLocalData(await response.json());
};
const mapServerDataintoLocalData = (user) => ({
  _id: user._id,
  Firstname: user.Firstname,
  Lastname: user.Lastname,
  Address: user.Address,
  Email: user.Email,
  Phone: user.Phone,
  Usertype: user.Usertype,
});

export const GetDataFromServer = async () => {
  const response = await fetch("http://localhost:8000/api/user");
  const data = await response.json();

  return data.map(mapServerDataintoLocalData);
};

export const DeleteUserFromSErver = async (_id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/user/${_id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data?.message === "User deleted successfully";
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const UpdateUserRoleOnServer = async (_id, role) => {
  try {
    const response = await fetch(`http://localhost:8000/api/user/${_id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    const data = await response.json();

    return response.ok ? data : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//===================THIS IS THE PRODUCTS APIS==========================
export const AddProductToServer = async ({
  ProductName,
  Brand,
  Price,
  Discount,
  Category,
  Description,
  Size,
}) => {
  try {
    const response = await fetch("http://localhost:8000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProductName,
        Brand,
        Price,
        Discount,
        Category,
        Description,
        Size,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    return mapProductDataIntoLocalData(data);
  } catch (error) {
    console.error("AddProductToServer Error:", error.message);
    return null;
  }
};
const mapProductDataIntoLocalData = (product) => ({
  _id: product?._id,
  ProductName: product?.ProductName,
  Brand: product?.Brand,
  Price: product?.Price,
  Discount: product?.Discount,
  Category: product?.Category,
  Description: product?.Description,
  Size: product?.Size,
  createdAt: product?.createdAt,
  updatedAt: product?.updatedAt,
});

export const GetProductFromServer = async () => {
  const response = await fetch("http://localhost:8000/api/items");
  const data = await response.json();
  return data.map(mapProductDataIntoLocalData);
};

export const DeleteProductFromSErver = async (_id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/items/${_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data?.success === true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const UpdateProductToServer = async (_id, updatedProduct) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/items/${_id}`,
      {
        method: "PUT", // or PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return data;
  } catch (error) {
    console.error("Update Product Error:", error);
    return null;
  }
};
