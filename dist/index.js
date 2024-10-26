'use-client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
// Size Mapping
const sizeMap = {
    xs: { width: '150px', maxHeight: '150px' },
    sm: { width: '200px', maxHeight: '200px' },
    md: { width: '250px', maxHeight: '250px' },
    lg: { width: '300px', maxHeight: '300px' },
    xl: { width: '350px', maxHeight: '350px' },
};
const UserDropdown = ({ teams, onUserSelect, defaultSelectedUserId = null, showAvatar = true, showTitle = true, dropdownPosition = 'bottom', dropdownSize = 'md', }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(defaultSelectedUserId);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsOpen((prev) => !prev);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSelect = (user) => {
        const userId = user ? user.id : null;
        setSelectedUserId(userId);
        setIsOpen(false);
        onUserSelect && onUserSelect(userId);
    };
    const renderAvatar = (user) => showAvatar && user.avatar ? (_jsx("img", { className: "w-8 h-8 rounded-full", src: user.avatar, alt: `${user.name} avatar` })) : (_jsx("div", { className: "w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white", children: user.name[0].toUpperCase() }));
    const filteredTeams = teams.map((team) => (Object.assign(Object.assign({}, team), { members: team.members.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())) })));
    const selectedUser = teams.flatMap((team) => team.members).find((user) => user.id === selectedUserId);
    return (_jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsx("button", { onClick: toggleDropdown, className: "border px-4 py-2 rounded", children: selectedUser ? selectedUser.name : 'Unassigned' }), isOpen && (_jsxs("div", { className: `z-10 bg-white rounded-xs shadow-lg absolute ${dropdownPosition}`, style: sizeMap[dropdownSize], children: [_jsx("div", { className: "p-3", children: _jsx("input", { type: "text", className: "block w-full p-2 text-sm border", placeholder: "Search users", value: search, onChange: (e) => setSearch(e.target.value) }) }), _jsx("ul", { className: "overflow-y-auto custom-scrollbar", children: filteredTeams.map((team) => (_jsxs(React.Fragment, { children: [showTitle && _jsx("li", { className: "px-4 py-2 font-semibold", children: team.name }), team.members.map((user) => (_jsx("li", { children: _jsxs("button", { onClick: () => handleSelect(user), className: `px-4 py-2 ${selectedUserId === user.id ? 'bg-blue-600 text-white' : ''}`, children: [renderAvatar(user), _jsx("span", { className: "ml-2", children: user.name })] }) }, user.id)))] }, team.id))) })] }))] }));
};
export default UserDropdown;
//# sourceMappingURL=index.js.map