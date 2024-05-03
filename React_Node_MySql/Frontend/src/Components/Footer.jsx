import React, { useState, useEffect} from 'react';
import LocalizedStrings from "react-localization";
import localizations from "../localization";
import UserProfile from '../Utils/UserProfile';

const Footer = () => {

  const [lang, setLang] = useState("en");
  let strings = new LocalizedStrings(localizations);

  const languageHandler = (e) => {
    let lang = e.target.value;
    setLang(lang)
  }

  strings.setLanguage(lang);

  const [name, setName] = useState("");
  useEffect(() => {
    setName(UserProfile.getName());
  },[]);


  return (
    <div className={"all-right-reserved-bg-color"}>
      <div>
       <label>All Rights Reserved By Helal Khan © 2023-2024</label>
      </div>
      <div>
        <select onChange={languageHandler}>
          <option value="en">En- English</option>
          <option value="bn">Bn- Bangla</option>
          <option value="hi">In- Hindi</option>
          <option value="ru">Ru- Russian</option>
        </select> 
      </div>
      <p>{strings.name + " : " + strings.age + " : " + strings.address + " : " + strings.contactNo}</p>
      <p>Local storage value:{name}</p>
    </div>
  );
};

export default Footer;
