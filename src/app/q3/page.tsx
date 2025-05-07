"use client";

import React, { useEffect, useMemo, useState } from "react";
import { GET } from "../q2/page";

// refactor this component to use newest react syntaxes
// such hooks, functional component etc

type User = {
  id: number;
  name: string;
};

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GET(
      "https://jsonplaceholder.typicode.com/users",
      (data: User[]) => {
        setUsers(data);
        setLoading(false);
      },
      (error: any) => {
        setError(error);
        setLoading(false);
      }
    );
  }, []);

  //optimization :- only re-calculate User list when user state changes.
  const userListItems = useMemo(
    () =>
      users.map((user: User) => (
        <MemoizedUserItem key={user.id} user={user} />
      )),
    [users]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <ul>{userListItems}</ul>;
}

//UserItem
const UserListItem = ({ user }: { user: User }) => {
  return <li key={user.id}>{user.name}</li>;
};

//optimization :- re-render if user changes
const MemoizedUserItem = React.memo(UserListItem);

export default function Q3Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Q3 - User List (Class Component)
      </h1>
      <UserList />
    </div>
  );
}
