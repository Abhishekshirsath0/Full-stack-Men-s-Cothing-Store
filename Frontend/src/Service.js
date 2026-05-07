const API = "https://full-stack-men-s-cothing-store-2.onrender.com";

/** AUTH HEADER */
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** SAFE ARRAY */
const safeArray = (data) => (Array.isArray(data) ? data : []);

// ─────────────────────────────
// MAPS
// ─────────────────────────────

const mapUser = (user = {}) => ({
  _id: user._id,
  Firstname: user.Firstname,
  Lastname: user.Lastname,
  Address: user.Address,
  Email: user.Email,
  Phone: user.Phone,
  Usertype: user.Usertype,
});

const mapProduct = (product = {}) => ({
  _id: product._id,
  ProductName: product.ProductName,
  Brand: product.Brand,
  Price: product.Price,
  Discount: product.Discount,
  Category: product.Category,
  Description: product.Description,
  Size: product.Size,
  Images: product.Images,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

// ─────────────────────────────
// AUTH
// ─────────────────────────────

export const AuthenticateUser = async ({ Email, Password }) => {
  try {
    const res = await fetch(`${API}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ Email, Password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Login failed" };
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(mapUser(data.user)));

    return data;
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};

export const LogoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ─────────────────────────────
// USERS
// ─────────────────────────────

export const AddDataToServer = async (data) => {
  const res = await fetch(`${API}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "User create failed");

  return mapUser(result.user || result);
};

export const GetDataFromServer = async () => {
  try {
    const res = await fetch(`${API}/api/user`, {
      headers: authHeader(),
    });

    const data = await res.json();
    return safeArray(data).map(mapUser);
  } catch {
    return [];
  }
};

export const DeleteUserFromServer = async (_id) => {
  try {
    const res = await fetch(`${API}/api/user/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    const data = await res.json();
    return data?.success === true;
  } catch {
    return false;
  }
};

export const UpdateUserRoleOnServer = async (_id, role) => {
  try {
    const res = await fetch(`${API}/api/user/${_id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({ role }),
    });

    const data = await res.json();
    return res.ok ? data : false;
  } catch {
    return false;
  }
};

// ─────────────────────────────
// PRODUCTS
// ─────────────────────────────

export const AddProductToServer = async (productData) => {
  try {
    const res = await fetch(`${API}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Product add failed");

    return mapProduct(data);
  } catch (err) {
    return null;
  }
};

export const GetProductFromServer = async () => {
  try {
    const res = await fetch(`${API}/api/items`);
    const data = await res.json();

    return safeArray(data).map(mapProduct);
  } catch {
    return [];
  }
};

export const DeleteProductFromServer = async (_id) => {
  try {
    const res = await fetch(`${API}/api/items/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    const data = await res.json();
    return data?.success === true;
  } catch {
    return false;
  }
};

export const UpdateProductToServer = async (_id, updatedProduct) => {
  try {
    const res = await fetch(`${API}/api/items/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Update failed");

    return mapProduct(data);
  } catch {
    return null;
  }
};

// ─────────────────────────────
// IMAGE UPLOAD (FIXED - IMPORTANT)
// ─────────────────────────────

export const UploadImagesToServer = async (imageFiles) => {
  try {
    const urls = await Promise.all(
      imageFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`${API}/api/images/upload`, {
          method: "POST",
          body: formData, // ❗ DO NOT add headers here
        });

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Backend returned HTML (check Render route)");
        }

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Upload failed");
        }

        return data.data;
      })
    );

    return urls;
  } catch (err) {
    console.error("Upload error:", err.message);
    return [];
  }
};
