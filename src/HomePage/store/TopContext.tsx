import { createContext, useState } from "react";
const TopContext = createContext({
    tempname: "",
    setTempNames: (username: string) => {},
});

interface Props {
    children: JSX.Element | JSX.Element[];
}

const TopProvider = ({ children }: Props): JSX.Element => {
    const [tempname, setTempName] = useState<string>("");

    const setTempNames = (username: string) => {
        setTempName(username);
    };

    return (
        <TopContext.Provider
            value={{
                tempname,
                setTempNames,
            }}
        >
            {children}
        </TopContext.Provider>
    );
};

export { TopContext, TopProvider };
