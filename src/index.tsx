import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import './styles/style.scss'; // Import SCSS styles
import './styles/style.css'; // Import CSS styles

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

const sizeMap: Record<DropdownSize, CSSProperties> = {
  xs: { width: '150px', maxHeight: '150px' },
  sm: { width: '200px', maxHeight: '200px' },
  md: { width: '250px', maxHeight: '250px' },
  lg: { width: '300px', maxHeight: '300px' },
  xl: { width: '350px', maxHeight: '350px' },
};

const UserDropdown: React.FC<UserDropdownProps> = ({
  teams,
  onUserSelect,
  defaultSelectedUserId = null,
  showAvatar = true,
  showTitle = true,
  dropdownPosition = 'bottom',
  dropdownSize = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(defaultSelectedUserId);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (user: User | null) => {
    const userId = user ? user.id : null;
    setSelectedUserId(userId);
    setIsOpen(false);
    onUserSelect && onUserSelect(userId);
  };

  const renderAvatar = (user: User) =>
    showAvatar ? (
      <div className="super-selectbox-avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.name} avatar`} />
        ) : (
          <span>{user.name[0]}</span>
        )}
      </div>
    ) : null;

  const filteredTeams = teams.map((team) => ({
    ...team,
    members: team.members.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const selectedUser = teams.flatMap((team) => team.members).find((user) => user.id === selectedUserId);

  return (
    <div className="super-selectbox" ref={dropdownRef}>

      <button onClick={toggleDropdown} className="super-selectbox-togglr">
        {selectedUser ? selectedUser.name : 'Unassigned'}
      </button>

      {isOpen && (
        <div
          className={`super-selectbox-dropdown ${dropdownPosition}`}
          style={sizeMap[dropdownSize]}
        >
          <div className="p-3">
            <input
              type="text"
              className="block w-full p-2 border rounded"
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul className="overflow-y-auto">
            <li>
              <button
                onClick={() => handleSelect(null)}
                className={`super-selectbox-item ${selectedUserId === null ? 'selected' : ''}`}
              >
                Unassigned
              </button>
            </li>

            {filteredTeams.map((team) => (
              <React.Fragment key={team.id}>
                {showTitle && <li className="super-selectbox-title">{team.name}</li>}
                {team.members.map((user) => (
                  <li key={user.id}>
                    <button
                      onClick={() => handleSelect(user)}
                      className={`super-selectbox-item ${
                        selectedUserId === user.id ? 'selected' : ''
                      }`}
                    >
                      {renderAvatar(user)}
                      <span>{user.name}</span>
                    </button>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
