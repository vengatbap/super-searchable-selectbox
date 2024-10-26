import React from 'react';
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    title: string;
    avatar?: string;
}
export interface Team {
    id: number;
    name: string;
    organization: string | null;
    members: User[];
}
export type DropdownSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface UserDropdownProps {
    teams: Team[];
    onUserSelect?: (userId: number | null) => void;
    defaultSelectedUserId?: number | null;
    showAvatar?: boolean;
    showTitle?: boolean;
    dropdownPosition?: 'top' | 'bottom' | 'left' | 'right';
    dropdownSize?: DropdownSize;
}
declare const UserDropdown: React.FC<UserDropdownProps>;
export default UserDropdown;
