import React, { useState, useEffect } from "react";
import "./App.css";
import { getUser, User } from "./get-user";
import CustomInput from "./CustomInput";

//type is a user or null, function will return an user or null
function App() {
  const [text, setText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  //we will await our user from getUser function, and we fetch our data

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    //do not forget to call function here
    fetchUser();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }
  return (
    <div>
      {user ? <p>Username: {user.name}</p> : null}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed:{text ? text : "..."}</p>
    </div>
  );
}
export default App;
