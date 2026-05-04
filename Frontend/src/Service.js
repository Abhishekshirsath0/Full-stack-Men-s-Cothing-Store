export const AddDataToServer = async ({
  Firstname, Lastname, Address, Email, Phone, Password,
}) => {
  const response = await fetch("http://localhost:8000/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Firstname, Lastname, Address, Email, Phone, Password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to register user");
  }

  return mapServerDataintoLocalData(await response.json());
  console.log("step 1");
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
  if (!response.ok) throw new Error("Failed to fetch users");
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

// =================== PRODUCTS ===================

const mapProductDataIntoLocalData = (product) => ({
  _id: product?._id,
  ProductName: product?.ProductName,
  Brand: product?.Brand,
  Price: product?.Price,
  Discount: product?.Discount,
  Category: product?.Category,
  Description: product?.Description,
  Size: product?.Size,
  Images: product?.Images, // 👈 added
  createdAt: product?.createdAt,
  updatedAt: product?.updatedAt,
});

export const AddProductToServer = async (productData) => {
  try {
    const response = await fetch("http://localhost:8000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to add product");
    return mapProductDataIntoLocalData(data);
  } catch (error) {
    console.error("AddProductToServer Error:", error.message);
    return null;
  }
};

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
    const response = await fetch(`http://localhost:8000/api/items/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update product");
    return mapProductDataIntoLocalData(data);
  } catch (error) {
    console.error("UpdateProductToServer Error:", error.message);
    return null;
  }
};

// 👇 NEW — upload images to cloudinary via your backend
export const UploadImagesToServer = async (imageFiles) => {
  const urls = await Promise.all(
    imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:8000/images/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) throw new Error("Image upload failed");
      return data.data; // cloudinary URL
    })
  );
  return urls;
};