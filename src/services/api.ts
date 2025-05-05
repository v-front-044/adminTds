/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_ENDPOINTS } from "@/lib/constants";
import { toast } from "sonner";

export interface User {
  id: string; // login
  first_name: string;
  last_name?: string | null;
  keitaro_login: string;
  keitaro_personal_group_name?: string | null;
  tg_username?: string;
  role: string;
  managed_users: string[];
  keitaro_user_id: number;
  notion_user_id?: string | null;
  tg_chat_id?: number;
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

    const result = await response.json();
    const data = result.data || {};

    const users: User[] = Object.entries(data).map(([login, user]: [string, any]) => ({
      id: login,
      first_name: user.first_name,
      last_name: user.last_name,
      keitaro_login: user.keitaro_login || login,
      keitaro_personal_group_name: user.keitaro_personal_group_name,
      tg_username: user.tg_username,
      role: user.role,
      managed_users: user.managed_users || [],
      keitaro_user_id: user.keitaro_user_id,
      notion_user_id: user.notion_user_id,
      tg_chat_id: user.tg_chat_id,
    }));

    return users;
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
    const url = API_ENDPOINTS.logs;
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
