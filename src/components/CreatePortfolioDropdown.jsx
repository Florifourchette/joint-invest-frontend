import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useAppContext } from "../contexts/AppContext";

export default function CreatePortfolioDropdown({
  newPortfolioUsername,
  setNewPortfolioUsername,
  userId,
}) {
  const { contextUsers } = useAppContext();
  const [myFriends, setMyFriends] = useState([]);

  useEffect(() => {
    const onlyMe = contextUsers.filter((user) => user.id !== Number(userId));
    setMyFriends(onlyMe);
  }, [userId]);

  const friendOptions = myFriends.map((friend) => ({
    value: friend.username,
    key: friend.id,
    text: friend.username,
    image: { avatar: true, src: "/profile_3.png" },
  }));

  return (
    <Dropdown
      placeholder="Select friend"
      upward={false}
      fluid
      selection
      required
      options={friendOptions}
      value={newPortfolioUsername}
      onChange={(e, data) => setNewPortfolioUsername(data.value)}
      style={{
        border: "solid 1px #31231E",
        width: "300px",
        maxWidth: "100%",
        margin: "0",
      }}
    />
  );
}
