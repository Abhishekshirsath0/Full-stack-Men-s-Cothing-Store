const API = import.meta.env.VITE_API;

/** Auth header */
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Safe array handler */
const safeArray = (data) => (Array.isArray(data) ? data : []);

// ─────────────────────────────
// MAPS
// ─────────────────────────────

const mapUser = (user) => ({
  _id: user?._id,
  Firstname: user?.Firstname,
  Lastname: user?.Lastname,
  Address: user?.Address,
  Email: user?.Email,
  Phone: user?.Phone,
  Usertype: user?.Usertype,
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

// ─────────────────────────────
// AUTH
// ─────────────────────────────

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

    return {
      success: false,
      message: data.message || "Invalid credentials",
    };
  } catch (error) {
    console.error(error);
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
  const response = await fetch(`${API}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to register user");
  }

  return mapUser(result.user || result);
};

export const GetDataFromServer = async () => {
  try {
    const response = await fetch(`${API}/api/user`, {
      headers: authHeader(),
    });

    const data = await response.json();

    return safeArray(data).map(mapUser);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const DeleteUserFromServer = async (_id) => {
  try {
    const response = await fetch(`${API}/api/user/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    const data = await response.json();
    return data?.success === true;
  } catch {
    return false;
  }
};

export const UpdateUserRoleOnServer = async (_id, role) => {
  try {
    const response = await fetch(`${API}/api/user/${_id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({ role }),
    });

    const data = await response.json();
    return response.ok ? data : false;
  } catch {
    return false;
  }
};

// ─────────────────────────────
// PRODUCTS
// ─────────────────────────────

export const AddProductToServer = async (productData) => {
  try {
    const response = await fetch(`${API}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add product");
    }

    return mapProduct(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const GetProductFromServer = async () => {
  try {
    const response = await fetch(`${API}/api/items`);
    const data = await response.json();

    return safeArray(data).map(mapProduct);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const DeleteProductFromServer = async (_id) => {
  try {
    const response = await fetch(`${API}/api/items/${_id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    const data = await response.json();
    return data?.success === true;
  } catch {
    return false;
  }
};

export const UpdateProductToServer = async (_id, updatedProduct) => {
  try {
    const response = await fetch(`${API}/api/items/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return mapProduct(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

// ─────────────────────────────
// IMAGE UPLOAD
// ─────────────────────────────

export const UploadImagesToServer = async (imageFiles) => {
  try {
    const urls = await Promise.all(
      imageFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(`${API}/images/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
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
