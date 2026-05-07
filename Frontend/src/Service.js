
const API = "https://full-stack-men-s-cothing-store-2.onrender.com

";

/** Auth header from localStorage token */
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const mapUser = (user) => ({
  _id: user._id,
  Firstname: user.Firstname,
  Lastname: user.Lastname,
  Address: user.Address,
  Email: user.Email,
  Phone: user.Phone,
  Usertype: user.Usertype,
});

const mapProduct = (product) => ({
  _id: product?._id,
  ProductName: product?.ProductName,
  Brand: product?.Brand,
  Price: product?.Price,
  Discount: product?.Discount,
  Category: product?.Category,
  Description: product?.Description,
  Size: product?.Size,
  Images: product?.Images,
  createdAt: product?.createdAt,
  updatedAt: product?.updatedAt,
});

// ─────────────────────────────────────────────
//  AUTHENTICATION
// ─────────────────────────────────────────────

export const AuthenticateUser = async ({ Email, Password }) => {
  try {
    const response = await fetch(`${API}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ Email, Password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(mapUser(data.user)));
      return data;
    }

    // Return error message so UI can display it
    return { success: false, message: data.message || "Invalid credentials" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
};

export const LogoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ─────────────────────────────────────────────
//  USERS  (admin-only endpoints send auth header)
// ─────────────────────────────────────────────

export const AddDataToServer = async (data) => {
  const response = await fetch(`${API}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error("Backend is NOT returning JSON (check route/port)");
  }

  if (!response.ok) throw new Error(result.message || "Failed to register user");
  return mapUser(result.user ?? result);
};

export const GetDataFromServer = async () => {
  const response = await fetch(`${API}/api/user`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.map(mapUser);
};

export const DeleteUserFromServer = async (_id) => {
  try {
    const response = await fetch(`${API}/api/user/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    const data = await response.json();
    return data?.success === true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// FIX: backend route is /:userId/role — keep consistent
export const UpdateUserRoleOnServer = async (_id, role) => {
  try {
    const response = await fetch(`${API}/api/user/${_id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ role }),
    });
    const data = await response.json();
    return response.ok ? data : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};


//  PRODUCTS


export const AddProductToServer = async (productData) => {
  try {
    const response = await fetch(`${API}/api/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to add product");
    return mapProduct(data);
  } catch (error) {
    console.error("AddProductToServer Error:", error.message);
    return null;
  }
};

export const GetProductFromServer = async () => {
  const response = await fetch(`${API}/api/items`);
  const data = await response.json();
  return data.map(mapProduct);
};

export const DeleteProductFromServer = async (_id) => {
  try {
    const response = await fetch(`${API}/api/items/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
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
    const response = await fetch(`${API}/api/items/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update product");
    return mapProduct(data);
  } catch (error) {
    console.error("UpdateProductToServer Error:", error.message);
    return null;
  }
};

export const UploadImagesToServer = async (imageFiles) => {
  const urls = await Promise.all(
    imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API}/images/upload`, {
        method: "POST",
        headers: authHeader(), // no Content-Type — browser sets multipart boundary
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error("Image upload failed");
      return data.data;
    })
  );
  return urls;
};
