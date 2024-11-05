import { useState } from "react";
import { Trash2, Mail, UserPlus } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  email: string;
  role: string;
  password: string;
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Carlos Corbin",
      status: "Active",
      email: "carlos@example.com",
      role: "Developer",
    },
    {
      id: 2,
      name: "Allysa M",
      status: "Active",
      email: "allysa@example.com",
      role: "Designer",
    },
    {
      id: 3,
      name: "Ashton Coira",
      status: "Active",
      email: "ashton@example.com",
      role: "Manager",
    },
    {
      id: 4,
      name: "Redan Abella",
      status: "Inactive",
      email: "redan@example.com",
      role: "Analyst",
    },
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<Omit<TeamMember, "id">>({
    name: "",
    status: "Active",
    email: "",
    role: "",
  });

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = () => {
    if (editingMember) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === editingMember.id ? editingMember : member
        )
      );
      setIsEditModalOpen(false);
      setEditingMember(null);
    }
  };

  const handleAddMember = () => {
    const newId = Math.max(...teamMembers.map((m) => m.id)) + 1;
    setTeamMembers([...teamMembers, { ...newMember, id: newId }]);
    setIsAddModalOpen(false);
    setNewMember({ name: "", status: "Active", email: "", role: "" });
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          My Team Members (Ameco Capital Inc)
        </h1>
        <button
          className="bg-green-500 hover:bg-green-600 rounded-md text-white text-sm font-semibold py-2 px-4"
          onClick={() => setIsAddModalOpen(true)}
        >
          <UserPlus className="inline-block w-5 mr-2" /> Add New Team Member
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white hover:bg-red-100 cursor-pointer p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200 relative group"
            onClick={() => handleEditMember(member)}
          >
            <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-600">{member.name[0]}</span>
            </div>
            <h2 className="text-center font-semibold">{member.name}</h2>
            <p className="text-center text-sm text-gray-500">
              ({member.status})
            </p>
            <button
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveMember(member.id);
              }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {isEditModalOpen && editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Team Member</h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editingMember.name}
              onChange={(e) =>
                setEditingMember({ ...editingMember, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editingMember.email}
              onChange={(e) =>
                setEditingMember({ ...editingMember, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editingMember.password}
              onChange={(e) =>
                setEditingMember({ ...editingMember, password: e.target.value })
              }
              placeholder="Password"
            />
            <select
              className="w-full mb-2 p-2 border rounded"
              value={editingMember.status}
              onChange={(e) =>
                setEditingMember({
                  ...editingMember,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={editingMember.role}
              onChange={(e) =>
                setEditingMember({ ...editingMember, role: e.target.value })
              }
              placeholder="Role"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold py-2 px-4 mr-2"
                onClick={handleUpdateMember}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Team Member</h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              placeholder="Name"
            />

            <select
              className="w-full mb-2 p-2 border rounded"
              value={newMember.status}
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              className="w-full mb-4 p-2 border rounded"
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
              placeholder="Role"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              disabled
              placeholder="Email"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={newMember.password}
              onChange={(e) =>
                setNewMember({ ...newMember, password: e.target.value })
              }
              disabled
              placeholder="Password"
            />

            <div className="flex justify-end">
              <button
                className="bg-black disabled:hidden hover:bg-black text-white font-semibold py-2 px-4 rounded-md mr-2"
                disabled={newMember?.email ? true : false}
                onClick={() => {
                  setNewMember({
                    ...newMember,
                    password: "fakepass",
                    email: "fakepass@gmail.com",
                  });
                }}
              >
                Generate Credentials
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                onClick={handleAddMember}
              >
                Add Member
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
