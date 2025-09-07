// import React, { useEffect, useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// export default function Settings() {
//   const [admins, setAdmins] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     adminName: "",
//     adminPassword: "",
//   });
//   const [addFormData, setAddFormData] = useState({
//     adminName: "",
//     adminPassword: "",
//     adminType: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showAddPassword, setShowAddPassword] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const adminTypeLocals = localStorage.getItem("adminType");
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     fetchAdmin();
//   }, []);

//   const fetchAdmin = async () => {
//     try {
//       const res = await fetch(`${baseUrl}/admin`);
//       const data = await res.json();
//       setAdmins(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ----------------- Validation -----------------
//   const validate = (data, isAdd = false) => {
//     const newErrors = {};
//     if (!data.adminName.trim()) newErrors.adminName = "Admin name is required.";
//     if (!data.adminPassword.trim())
//       newErrors.adminPassword = "Password is required.";
//     else if (data.adminPassword.length < 6)
//       newErrors.adminPassword = "Password must be at least 6 characters.";
//     if (isAdd && !data.adminType.trim())
//       newErrors.adminType = "Admin type is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ----------------- Edit Admin -----------------
//   const handleEdit = (admin) => {
//     setEditingId(admin._id);
//     setFormData({
//       adminName: admin.adminName,
//       adminPassword: admin.adminPassword,
//     });
//     setErrors({});
//     setShowPassword(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!validate(formData)) return;

//     try {
//       const res = await fetch(`${baseUrl}/admin/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (res.ok) {
//         const updated = await res.json();
//         setAdmins((prev) =>
//           prev.map((admin) => (admin._id === editingId ? updated : admin))
//         );
//         setEditingId(null);
//         setSuccessMessage("Admin updated successfully!");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setFormData({ adminName: "", adminPassword: "" });
//     setErrors({});
//     setShowPassword(false);
//   };

//   // ----------------- Add Admin -----------------
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddAdmin = async () => {
//     if (!validate(addFormData, true)) return;

//     try {
//       const res = await fetch(`${baseUrl}/admin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(addFormData),
//       });
//       if (res.ok) {
//         setSuccessMessage("Admin added successfully!");
//         setAddFormData({ adminName: "", adminPassword: "", adminType: "" });
//         setShowAddForm(false);
//         fetchAdmin();
//         setTimeout(() => setSuccessMessage(""), 3000);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {successMessage && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
//           {successMessage}
//         </div>
//       )}

//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Settings</h1>

//       <div className="mb-6">
//         <button
//           onClick={() => setShowAddForm(true)}
//           className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition ${
//             adminTypeLocals !== "Main" ? "hidden" : "block"
//           }`}
//         >
//           Add Admin
//         </button>
//       </div>

//       {/* ----------------- Admin List ----------------- */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {admins.map((admin) => (
//           <div
//             key={admin._id}
//             className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
//           >
//             {editingId === admin._id ? (
//               <div className="flex flex-col gap-4">
//                 <input
//                   name="adminName"
//                   value={formData.adminName}
//                   onChange={handleChange}
//                   placeholder="Admin Name"
//                   className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                     errors.adminName ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors.adminName && (
//                   <p className="text-red-500 text-sm">{errors.adminName}</p>
//                 )}

//                 <div className="relative">
//                   <input
//                     name="adminPassword"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.adminPassword}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                       errors.adminPassword
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute right-3 top-3 text-gray-500"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                   {errors.adminPassword && (
//                     <p className="text-red-500 text-sm">
//                       {errors.adminPassword}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleSave}
//                     className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold text-gray-700 mb-1">
//                     Name: <span className="font-normal">{admin.adminName}</span>
//                   </p>
//                   <p className="font-semibold text-gray-700">
//                     Password:{" "}
//                     <span className="font-normal">{admin.adminPassword}</span>
//                   </p>
//                   <p className="font-semibold text-gray-700">
//                     <span className="font-normal">{admin.adminType}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleEdit(admin)}
//                   className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
//                     adminTypeLocals !== "Main" ? "hidden" : "block"
//                   }`}
//                 >
//                   Edit
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ----------------- Add Admin Modal ----------------- */}
//       {showAddForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl w-96 relative">
//             <h2 className="text-xl font-bold mb-4">Add New Admin</h2>

//             <div className="mb-3">
//               <input
//                 name="adminName"
//                 value={addFormData.adminName}
//                 onChange={handleAddChange}
//                 placeholder="Admin Name"
//                 className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                   errors.adminName ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.adminName && (
//                 <p className="text-red-500 text-sm">{errors.adminName}</p>
//               )}
//             </div>

//             <div className="mb-3 relative">
//               <input
//                 name="adminPassword"
//                 type={showAddPassword ? "text" : "password"}
//                 value={addFormData.adminPassword}
//                 onChange={handleAddChange}
//                 placeholder="Password"
//                 className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                   errors.adminPassword ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowAddPassword((prev) => !prev)}
//                 className="absolute right-3 top-3 text-gray-500"
//               >
//                 {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//               {errors.adminPassword && (
//                 <p className="text-red-500 text-sm">{errors.adminPassword}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <select
//                 name="adminType"
//                 value={addFormData.adminType}
//                 onChange={handleAddChange}
//                 className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
//                   errors.adminType ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">--Select Type--</option>
//                 <option value="Main">Main</option>
//                 <option value="Temporary">Temporary</option>
//               </select>
//               {errors.adminType && (
//                 <p className="text-red-500 text-sm">{errors.adminType}</p>
//               )}
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddAdmin}
//                 className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setShowAddForm(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [admins, setAdmins] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    adminName: "",
    adminPassword: "",
  });
  const [addFormData, setAddFormData] = useState({
    adminName: "",
    adminPassword: "",
    adminType: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const adminTypeLocals = localStorage.getItem("adminType");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin`);
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Validation -----------------
  const validate = (data, isAdd = false) => {
    const newErrors = {};
    if (!data.adminName.trim()) newErrors.adminName = "Admin name is required.";
    if (!data.adminPassword.trim())
      newErrors.adminPassword = "Password is required.";
    else if (data.adminPassword.length < 6)
      newErrors.adminPassword = "Password must be at least 6 characters.";
    if (isAdd && !data.adminType.trim())
      newErrors.adminType = "Admin type is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------- Edit Admin -----------------
  const handleEdit = (admin) => {
    setEditingId(admin._id);
    setFormData({
      adminName: admin.adminName,
      adminPassword: admin.adminPassword,
    });
    setErrors({});
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!validate(formData)) return;

    try {
      const res = await fetch(`${baseUrl}/admin/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        setAdmins((prev) =>
          prev.map((admin) => (admin._id === editingId ? updated : admin))
        );
        setEditingId(null);
        setSuccessMessage("Admin updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ adminName: "", adminPassword: "" });
    setErrors({});
    setShowPassword(false);
  };

  // ----------------- Delete Admin -----------------
  const handleDelete = async (admin) => {
    if (admin.adminType === "Main") {
      alert("Main admin cannot be deleted!");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${admin.adminName}?`))
      return;

    try {
      const res = await fetch(`${baseUrl}/admin/${admin._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAdmins((prev) => prev.filter((a) => a._id !== admin._id));
        setSuccessMessage("Admin deleted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Add Admin -----------------
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async () => {
    if (!validate(addFormData, true)) return;

    try {
      const res = await fetch(`${baseUrl}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      });
      if (res.ok) {
        setSuccessMessage("Admin added successfully!");
        setAddFormData({ adminName: "", adminPassword: "", adminType: "" });
        setShowAddForm(false);
        fetchAdmin();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Settings</h1>

      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition ${
            adminTypeLocals !== "Main" ? "hidden" : "block"
          }`}
        >
          Add Admin
        </button>
      </div>

      {/* ----------------- Admin List ----------------- */}
      <div className="grid gap-6 md:grid-cols-2">
        {admins.map((admin) => (
          <div
            key={admin._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            {editingId === admin._id ? (
              <div className="flex flex-col gap-4">
                <input
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Admin Name"
                  className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.adminName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.adminName && (
                  <p className="text-red-500 text-sm">{errors.adminName}</p>
                )}

                <div className="relative">
                  <input
                    name="adminPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.adminPassword}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.adminPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.adminPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.adminPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-gray-700 mb-1">
                  Name: <span className="font-normal">{admin.adminName}</span>
                </p>
                <p className="font-semibold text-gray-700 mb-1">
                  Password:{" "}
                  <span className="font-normal">{admin.adminPassword}</span>
                </p>
                <p className="font-semibold text-gray-700 mb-3">
                  Type: <span className="font-normal">{admin.adminType}</span>
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(admin)}
                    className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
                      adminTypeLocals !== "Main" ? "hidden" : "block"
                    }`}
                  >
                    Edit
                  </button>

                  {admin.adminType !== "Main" && (
                    <button
                      onClick={() => handleDelete(admin)}
                      className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition ${
                        adminTypeLocals !== "Main" ? "hidden" : "block"
                      }`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ----------------- Add Admin Modal ----------------- */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>

            <div className="mb-3">
              <input
                name="adminName"
                value={addFormData.adminName}
                onChange={handleAddChange}
                placeholder="Admin Name"
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.adminName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.adminName && (
                <p className="text-red-500 text-sm">{errors.adminName}</p>
              )}
            </div>

            <div className="mb-3 relative">
              <input
                name="adminPassword"
                type={showAddPassword ? "text" : "password"}
                value={addFormData.adminPassword}
                onChange={handleAddChange}
                placeholder="Password"
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.adminPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowAddPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.adminPassword && (
                <p className="text-red-500 text-sm">{errors.adminPassword}</p>
              )}
            </div>

            <div className="mb-4">
              <select
                name="adminType"
                value={addFormData.adminType}
                onChange={handleAddChange}
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.adminType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">--Select Type--</option>
                <option value="Main">Main</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.adminType && (
                <p className="text-red-500 text-sm">{errors.adminType}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddAdmin}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
