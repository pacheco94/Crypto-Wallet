import React, {useEffect} from "react";

const AccountListener = ({onAccontChange}) => {

    useEffect(()=> {
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', onAccontChange);

            return () => {
                window.ethereum.removeListener('accountsChage',onAccontChange);
            };
        }

    },[onAccontChange]);
    return null;
};

export default AccountListener;