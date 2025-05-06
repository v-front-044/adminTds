/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Edit, Trash2 } from 'lucide-react'
import { User } from '@/services/api'
import UserEditDialog from './UserEditDialog'
import UserDeleteDialog from './UserDeleteDialog'

interface UsersTableProps {
	users: User[]
	onUserUpdated: () => void
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onUserUpdated }) => {
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [deletingUser, setDeletingUser] = useState<User | null>(null)
	const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

	const handleEditClick = (user: User) => setEditingUser(user)
	const handleDeleteClick = (user: User) => setDeletingUser(user)

	const toggleManagedUsers = (id: string) => {
		const updated = new Set(expandedRows)
		updated.has(id) ? updated.delete(id) : updated.add(id)
		setExpandedRows(updated)
	}

	const formatName = (user: User) =>
		`${user.first_name} ${user.last_name || ''}`.trim()

	return (
		<>
			<div className='bg-white rounded-md shadow overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Telegram</TableHead>
							<TableHead>Keitaro Group</TableHead>
							<TableHead>Keitaro ID</TableHead>
							<TableHead>Notion ID</TableHead>
							<TableHead>Chat ID</TableHead>
							<TableHead>Managed Users</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length > 0 ? (
							users.map(user => (
								<React.Fragment key={user.id}>
									<TableRow>
										<TableCell className='font-medium'>
											{formatName(user)}
										</TableCell>
										<TableCell>{user.keitaro_login}</TableCell>
										<TableCell>
											<span className='px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'>
												{user.role}
											</span>
										</TableCell>
										<TableCell>{user.tg_username || 'Not set'}</TableCell>
										<TableCell>
											{user.keitaro_personal_group_name || '-'}
										</TableCell>
										<TableCell>{user.keitaro_user_id}</TableCell>
										<TableCell>{user.notion_user_id || '-'}</TableCell>
										<TableCell>{user.tg_chat_id || '-'}</TableCell>
										<TableCell>
											{user.managed_users && user.managed_users.length > 0 ? (
												<Button
													variant='outline'
													size='sm'
													onClick={() => toggleManagedUsers(user.id)}
												>
													{expandedRows.has(user.id) ? 'Hide' : 'Show'}
												</Button>
											) : (
												'-'
											)}
										</TableCell>
										<TableCell className='text-right'>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant='outline'
														size='sm'
														className='h-8 px-2 lg:px-3'
													>
														Actions
														<ChevronDown className='ml-2 h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end' className='w-[160px]'>
													<DropdownMenuItem
														onClick={() => handleEditClick(user)}
														className='cursor-pointer'
													>
														<Edit className='mr-2 h-4 w-4' />
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => handleDeleteClick(user)}
														className='text-red-600 cursor-pointer'
													>
														<Trash2 className='mr-2 h-4 w-4' />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>

									{/* Додатково для Managed Users */}
									{expandedRows.has(user.id) && (
										<TableRow>
											<TableCell colSpan={10} className='bg-gray-50'>
												<div className='text-sm'>
													<strong>Managed Users:</strong>{' '}
													<ul className='list-disc list-inside mt-1 space-y-1'>
														{user.managed_users.map(email => (
															<li key={email}>{email}</li>
														))}
													</ul>
												</div>
											</TableCell>
										</TableRow>
									)}
								</React.Fragment>
							))
						) : (
							<TableRow>
								<TableCell colSpan={10} className='text-center py-6'>
									No users found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{editingUser && (
				<UserEditDialog
					user={editingUser}
					open={!!editingUser}
					onClose={() => setEditingUser(null)}
					onUserUpdated={onUserUpdated}
				/>
			)}

			{deletingUser && (
				<UserDeleteDialog
					user={deletingUser}
					open={!!deletingUser}
					onClose={() => setDeletingUser(null)}
					onUserDeleted={onUserUpdated}
				/>
			)}
		</>
	)
}

export default UsersTable
