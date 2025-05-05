
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getUsers, User } from "@/services/api";
import UsersTable from "@/components/UsersTable";
import UserCreateDialog from "@/components/UserCreateDialog";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">All Users</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create User</Button>
      </div>

      {isLoading ? (
        <div className="h-40 flex items-center justify-center">
          <p className="text-gray-500">Loading users...</p>
        </div>
      ) : (
        <UsersTable users={users} onUserUpdated={fetchUsers} />
      )}

      <UserCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onUserCreated={fetchUsers}
      />
    </div>
  );
};

export default UsersPage;
