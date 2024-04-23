import { createContext, useEffect, useState } from "react";

const modeContext = createContext({
    darkMode: false,
    ontoggleDarkMode: ()=>{},
});

export function ModeContextProvider({children}){
    const [darkMode, setDarkMode] = useState(false);
    const handletoggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
      console.log('mode change btn clicked')
    };
    useEffect(() => {
      const root = document.documentElement;
      if (darkMode) {
        root.style.setProperty("--white", "#111");
        root.style.setProperty("--black", "#f2efef");
        root.style.setProperty("--grey", "#1b1b1b");
        root.style.setProperty("--darkgrey", "#DDDCDD");
      } else {
        root.style.setProperty("--white", "#f2efef");
        root.style.setProperty("--black", "#111");
        root.style.setProperty("--grey", "#888");
        root.style.setProperty("--darkgrey", "#1b1b1b");
      }
    }, [darkMode]);
    const modeCtx = {
        darkMode,
        ontoggleDarkMode: handletoggleDarkMode,
    }
    return(
        <modeContext.Provider value={modeCtx}>
            {children}
        </modeContext.Provider>
    );
}
export default modeContext;