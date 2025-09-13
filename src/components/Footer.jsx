import React from "react";
import { motion } from "motion/react";
function Footer() {
  return (
    <>
      <footer>
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 10 }}
          transition={{ duration: 3 }}
          className="mt-10 text-gray-500 w-[90%] text-sm flex gap-4 items-center"
        >
          <p>Powered by Free Dictionary API</p>{" "}
          <p className="text-[#009c9c] font-sans">@Torekul Islam</p>
        </motion.div>
      </footer>
    </>
  );
}

export default Footer;
