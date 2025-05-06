import React, { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { User, updateUser } from '@/services/api'

interface UserEditDialogProps {
	user: User
	open: boolean
	onClose: () => void
	onUserUpdated: () => void
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({
	user,
	open,
	onClose,
	onUserUpdated,
}) => {
	const [formData, setFormData] = useState<Partial<User>>({
		first_name: user.first_name,
		last_name: user.last_name || '',
		tg_username: user.tg_username || '',
		role: user.role,
		keitaro_login: user.keitaro_login,
		keitaro_personal_group_name: user.keitaro_personal_group_name || '',
		keitaro_user_id: user.keitaro_user_id || 0,
		notion_user_id: user.notion_user_id || '',
		tg_chat_id: user.tg_chat_id || 0,
	})

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]:
				name === 'keitaro_user_id' || name === 'tg_chat_id'
					? parseInt(value, 10)
					: value,
		})
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const result = await updateUser(user.id, formData)
			if (result) {
				onUserUpdated()
				onClose()
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 py-4 md:grid-cols-2 sm:grid-cols-1'>
						<div className='grid gap-2'>
							<Label htmlFor='first_name'>First Name</Label>
							<Input
								id='first_name'
								name='first_name'
								value={formData.first_name}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='last_name'>Last Name</Label>
							<Input
								id='last_name'
								name='last_name'
								value={formData.last_name}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='keitaro_login'>Email (Keitaro Login)</Label>
							<Input
								id='keitaro_login'
								name='keitaro_login'
								type='email'
								value={formData.keitaro_login}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='tg_username'>Telegram Username</Label>
							<Input
								id='tg_username'
								name='tg_username'
								value={formData.tg_username}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='role'>Role</Label>
							<Select
								value={formData.role}
								onValueChange={value => handleSelectChange('role', value)}
							>
								<SelectTrigger>
									<SelectValue placeholder='Select a role' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='BUSINESS_DEVELOPER'>
										Business Developer
									</SelectItem>
									<SelectItem value='BUYER'>Buyer</SelectItem>
									<SelectItem value='BUYER_ASSISTANT'>
										Buyer Assistant
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='keitaro_personal_group_name'>Keitaro Group</Label>
							<Input
								id='keitaro_personal_group_name'
								name='keitaro_personal_group_name'
								value={formData.keitaro_personal_group_name}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='keitaro_user_id'>Keitaro User ID</Label>
							<Input
								id='keitaro_user_id'
								name='keitaro_user_id'
								type='number'
								value={formData.keitaro_user_id}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='notion_user_id'>Notion User ID</Label>
							<Input
								id='notion_user_id'
								name='notion_user_id'
								value={formData.notion_user_id}
								onChange={handleChange}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='tg_chat_id'>Telegram Chat ID</Label>
							<Input
								id='tg_chat_id'
								name='tg_chat_id'
								type='number'
								value={formData.tg_chat_id}
								onChange={handleChange}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant='outline' type='button' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Confirm'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default UserEditDialog
