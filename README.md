﻿# Super Select 

A highly customizable, lightweight, and searchable React dropdown component with advanced features like team-based grouping, avatar toggle, position control, and custom dropdown sizes. This component is perfect for managing user selection in complex UIs, such as task management or scheduling systems.

## Features

- Grouped Teams & Members: Organize users under teams for easy selection.
- Customizable Dropdown Position: Choose from `top`, `bottom`, `left`, or `right`.
- Dropdown Size Variants: Available sizes - `xs`, `sm`, `md`, `lg`, `xl`.
- Avatar Toggle: Optionally show or hide user avatars.
- Pre-selection: Provide a pre-selected user ID.
- Lightweight & Fast: Optimized for performance.
- Accessible Search Bar: Easily search through users.

## Installation

Install via NPM:

```bash
npm install super-searchable-selectbox
```

### Usage

Here's an example of how to use the SuperSearchableSelectBox component in your React application:


```js
import React from 'react';
import Dropdown, { Team, User } from 'super-searchable-selectbox';

const teams: Team[] = [
  {
    id: 1,
    name: 'Development',
    organization: 'Tech Corp',
    members: [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Developer', title: 'Frontend Dev' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Developer', title: 'Backend Dev', avatar: 'https://via.placeholder.com/50' }
    ]
  },
  {
    id: 2,
    name: 'Marketing',
    organization: null,
    members: [{ id: 3, name: 'Eve', email: 'eve@example.com', role: 'Marketer', title: 'SEO Expert' }]
  }
];

const App = () => {
  const handleUserSelect = (userId: number | null) => {
    console.log('Selected User ID:', userId);
  };

  return (
    <UserDropdown
      teams={teams}
      onUserSelect={handleUserSelect}
      defaultSelectedUserId={1}
      showAvatar={true}
      showTitle={true}
      dropdownPosition="bottom"
      dropdownSize="md"
    />
  );
};

export default App;
```


## Props


|     Prop     | Type	            | Default     |      Description            |
| :---- | :----: | ----: | :---- |
|     teams     |     Team[]     |     -     |     List of teams with members.
|     onUserSelect     |     (userId: number | null) => void     |     -     |     Callback when a user is selected. Sends null if unassigned.     |
|     defaultSelectedUserId     |     number | null     |     null     |     Pre-selected user ID.     |
|     showAvatar     |     boolean     |     true     |     Toggle display of user avatars.     |
|     showTitle     |     boolean     |     true     |     Toggle display of team titles.     |
|     dropdownPosition     |     'top'| 'bottom'| 'left'| 'right'|'bottom'     |     Control dropdown position.     |
|     dropdownSize     |     'xs'|'sm'| 'md'| 'lg'| 'xl'|'md'|     Control dropdown size.     |



## Dropdown Sizes

| Size     |     Width     |     Max Height |
| :---- | :----: | ----: |
| xs     |     150px     |     150px |
| sm     |     200px     |     200px |
| md     |     250px     |     250px |
| lg     |     300px     |     300px |
| xl     |     350px     |     350px |



## Repository

This package is open-source. Feel free to contribute or raise issues in the repository:

https://github.com/vengatbap/super-searchable-selectbox



## License
This project is licensed under the MIT License.


## Author

Vengatesan B

GitHub: https://github.com/vengatbap/
LinkedIn
Instagram: https://www.instagram.com/unknowncoder.me/

