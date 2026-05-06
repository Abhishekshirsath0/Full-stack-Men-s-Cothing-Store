import { useEffect, useState } from "react";
import { ProfileSkeleton } from "../Skeleton/SkeletonLoader";

const fields = [
  {
    id: "firstName",
    label: "First Name",
    defaultValue: "Abhishek",
    colSpan: 1,
  },
  { id: "lastName", label: "Last Name", defaultValue: "Shirsath", colSpan: 1 },
  {
    id: "email",
    label: "Email",
    defaultValue: "abhishek@gmail.com",
    colSpan: 1,
  },
  { id: "phone", label: "Phone", defaultValue: "+91 9876543210", colSpan: 1 },
  {
    id: "address",
    label: "Address",
    defaultValue: "Mumbai, Maharashtra, India",
    colSpan: 2,
  },
];

const EditableField = ({ label, defaultValue, colSpan }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [temp, setTemp] = useState(defaultValue);

  const handleEdit = () => {
    setTemp(value);
    setIsEditing(true);
  };

  const handleSave = () => {
    setValue(temp);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTemp(value);
    setIsEditing(false);
  };

  return (
    <div className={colSpan === 2 ? "md:col-span-2" : ""}>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="flex items-center justify-between border p-3 rounded-lg mt-1 gap-2">
        {isEditing ? (
          <input
            className="flex-1 outline-none text-sm"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="flex-1 text-sm">{value}</span>
        )}

        {isEditing ? (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleSave}
              className="text-white bg-blue-600  hover:bg-blue-700 text-xs px-3 py-1 rounded-md transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 border border-gray-300 hover:bg-gray-100 text-xs px-3 py-1 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 text-sm shrink-0 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const GenderField = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [gender, setGender] = useState("Male");
  const [temp, setTemp] = useState("Male");

  const handleSave = () => {
    setGender(temp);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTemp(gender);
    setIsEditing(false);
  };

  return (
    <div>
      <label className="text-sm text-gray-500">Gender</label>
      <div className="flex items-center justify-between border p-3 rounded-lg mt-1 gap-2">
        {isEditing ? (
          <div className="flex items-center gap-4 text-sm">
            {["Male", "Female"].map((g) => (
              <label key={g} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={temp === g}
                  onChange={() => setTemp(g)}
                />
                {g}
              </label>
            ))}
          </div>
        ) : (
          <span className="text-sm">{gender}</span>
        )}

        {isEditing ? (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleSave}
              className="text-white  bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded-md transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 border border-gray-300 hover:bg-gray-100 text-xs px-3 py-1 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className=" text-blue-600 hover:text-blue-800 text-sm shrink-0 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const UserInfo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-orange-500 text-white flex items-center justify-center text-xl rounded-full">
            A
          </div>
          <div>
            <h1 className="text-xl font-semibold">Abhishek Shirsath</h1>
            <p className="text-gray-500">Customer • Active</p>
            <p className="text-sm text-gray-400">Joined March 2025</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {fields.slice(0, 2).map((f) => (
            <EditableField key={f.id} {...f} />
          ))}

          <GenderField />

          {fields.slice(2).map((f) => (
            <EditableField key={f.id} {...f} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserInfo;