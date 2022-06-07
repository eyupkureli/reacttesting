import React, { useState, useEffect } from "react";
import "./App.css";
import { getUser, User} from './get-user';


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
      {user ? <p>Username: {user.name}</p>: null}
      <CustomInput value={text} onChange={handleChange}>
        Input:
      </CustomInput>
      <p>You typed:{text ?? "..."}</p>
    </div>
  );
}

interface CustomInputProps {
  children: React.ReactNode;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

function CustomInput({ children, value, onChange }: CustomInputProps) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Example"
      ></input>
    </div>
  );
}

export default App;
