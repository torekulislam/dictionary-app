import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

function MainSection() {
  const result = useSelector((state) => state.data?.data);
  const data = result?.[0];

  //  Animation preset
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5, ease: "anticipate" },
  };

  //  Audio play helper
  const playAudio = () => {
    const audioUrl =
      data?.phonetics?.[1]?.audio ||
      data?.phonetics?.find((p) => p.audio)?.audio;
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="w-full min-h-[48vh] md:min-h-[38vh] py-10 p-3">
      <AnimatePresence mode="wait">
        {/*  Word Data Available */}
        {data && Object.keys(data).length > 0 ? (
          <motion.div key={data.word} {...fadeUp} className="grid gap-9">
            {/* Word + Audio */}
            <div className="flex items-center gap-5">
              <h3 className="text-7xl font-bold text-gray-800 dark:text-gray-200">
                {data.word}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                onClick={playAudio}
                className="border dark:border-gray-200 p-3 rounded-full h-12 w-12 grid place-content-center hover:bg-[#1c81613d] dark:hover:bg-[#2d2e2e3d]"
              >
                <FontAwesomeIcon
                  icon={faVolumeHigh}
                  className="text-gray-800 dark:text-gray-200 text-[29px]"
                />
              </motion.button>
            </div>

            {/* Phonetic */}
            <div className="flex items-center gap-3">
              <h4 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                Phonetic:
              </h4>
              <p className="text-3xl text-gray-700 dark:text-gray-200">
                {data.phonetic || data?.phonetics?.[0]?.text || "---"}
              </p>
            </div>

            {/* Meanings */}
            {data.meanings?.map((meaning, index) => (
              <div
                key={index}
                className="border-b border-gray-500 pb-5 last:border-0"
              >
                <h4 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                  {meaning.partOfSpeech}
                </h4>
                <div className="ml-4 mt-4 space-y-2">
                  {meaning.definitions?.map((def, i) => (
                    <p
                      key={i}
                      className="text-xl text-gray-700 dark:text-gray-200"
                    >
                      <span className="text-2xl mr-2">{i + 1}.</span>
                      {def.definition}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          // ❌ No Data / Error / Welcome
          <motion.div
            key={result?.title || "welcome"}
            {...fadeUp}
            className="grid gap-4 text-center"
          >
            <h3 className="text-5xl text-gray-800 dark:text-gray-200">
              {result?.title || "Dictionary"}
            </h3>
            <p className="text-2xl text-gray-700 dark:text-gray-300">
              {result?.message ||
                " Welcome! Start by searching any word above."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainSection;
