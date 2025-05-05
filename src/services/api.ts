
import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface Log {
  id: string;
  timestamp: string;
  user: string;
  ip: string;
  action: string;
  status: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(API_ENDPOINTS.users);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.users || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users");
    return [];
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  try {
    const response = await fetch(`${API_ENDPOINTS.users}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    
    const data = await response.json();
    toast.success("User updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Failed to update user");
    return null;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_ENDPOINTS.users}${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    
    toast.success("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
    return false;
  }
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  try {
    const response = await fetch(API_ENDPOINTS.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    
    const data = await response.json();
    toast.success("User created successfully");
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error("Failed to create user");
    return null;
  }
}

export async function getLogs(date?: string, page: number = 1): Promise<Log[]> {
  try {
    let url = API_ENDPOINTS.logs;
    const params = new URLSearchParams();
    
    if (date) params.append("date", date);
    params.append("page", page.toString());
    params.append("limit", "100");
    
    const finalUrl = `${url}?${params.toString()}`;
    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }
    
    const data = await response.json();
    return data.logs || [];
  } catch (error) {
    console.error("Error fetching logs:", error);
    toast.error("Failed to load logs");
    return [];
  }
}
