import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { updateData, updateMod } from "../store/diconarySlice";

function Hero() {
  const dispatch = useDispatch();

  // ========================
  //  Search State
  // ========================
  const [word, setWord] = useState("");

  // Fetch word data from Dictionary API
  const fetchWord = async (words) => {
    if (!words) {
      dispatch(updateData(undefined));
      console.log("⚠️ Enter a word before searching");
      return;
    }

    try {
      // const response = await fetch(
      //   `https://api.dictionaryapi.dev/api/v2/entries/en/${words}`
      // );
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${words}`
        )}`
      );

      const result = await response.json();
      console.log(result);

      dispatch(updateData(result));
    } catch (error) {
      console.error(" Error fetching word:", error);
    }
  };

  // ========================
  //  Theme Handling
  // ========================
  const mod = useSelector((state) => state.data.mod);
  const [isDark, setIsDark] = useState(false);

  // On first load → use saved theme or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      dispatch(updateMod(savedTheme));
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      dispatch(updateMod(prefersDark ? "dark" : "light"));
      setIsDark(prefersDark);
    }
  }, [dispatch]);

  // Update <html> + localStorage when theme changes
  useEffect(() => {
    if (!mod) return;

    setIsDark(mod === "dark");
    localStorage.setItem("theme", mod);

    document.documentElement.classList.toggle("dark", mod === "dark");
  }, [mod]);

  // Toggle theme
  const themeHandler = () => {
    dispatch(updateMod(mod === "dark" ? "light" : "dark"));
  };

  // ========================
  //  UI
  // ========================
  return (
    <div className="min-h-[44vh] md:min-h-[54vh] px-3 w-full shadow dark:bg-[#393E46] bg-[#1C352D]">
      {/* Header Section */}
      <div className="p-2 pt-5 max-w-7xl mx-auto flex justify-between items-center">
        {/* App Title */}
        <motion.h1
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-100 text-[40px]"
          style={{ fontFamily: "Rancho" }}
        >
          Dictionary
        </motion.h1>

        {/* Dark/Light Mode Button */}
        <motion.button
          aria-label="dark-light mode button"
          onClick={themeHandler}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.6 }}
          initial={{ x: 110, opacity: 0, rotate: 0 }}
          animate={{
            rotate: !isDark ? -720 : -360,
            x: 0,
            opacity: 1,
          }}
          exit={{ rotate: 360 }}
          transition={{ duration: 1 }}
          className="h-12 w-12 bg-[#f9f6f3] dark:bg-[#222831] shadow-2xl rounded-full grid place-content-center"
        >
          {isDark ? (
            <FontAwesomeIcon
              icon={faSun}
              className="text-gray-200 text-[25px]"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              className="text-[#252525] text-[27px]"
            />
          )}
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.div className="w-full mt-[12vh]">
        {/* Hero Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "anticipate" }}
          className="text-[22px] sm:text-[34px] md:text-[39px] font-bold text-center dark:text-gray-200 text-white"
        >
          Search Anything, Instantly.
        </motion.h3>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, width: "64px" }}
          animate={{ opacity: 1, width: "85%" }}
          transition={{ duration: 1.5, ease: "anticipate" }}
          className="w-[85%] max-w-xl rounded-full shadow-2xl mt-8 h-13 bg-[#F9F6F3] mx-auto flex justify-center items-center py-1"
        >
          {/* Input */}
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "anticipate" }}
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWord(word)}
            placeholder="Search a word..."
            className="h-full w-full text-[18px] rounded-l-full outline-0 p-2 px-5"
          />

          {/* Search Button */}
          <button
            onClick={() => fetchWord(word)}
            className="h-12 w-16 rounded-full"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-700 text-2xl"
            />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
