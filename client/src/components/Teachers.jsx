import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Teacher1 from "../img/t1.jpg";
import Teacher2 from "../img/t2.jpg";
import Teacher3 from "../img/t3.jpg";

const teachers = [
  {
    name: "মোঃ ওবায়েদুল কাদের",
    subject: "Microsoft Office",
    img: Teacher1,
    bio: "Experienced in algebra, calculus, and geometry with 10+ years of teaching.",
  },
  {
    name: "আল আমিন",
    subject: "SEO , Web & Apps Development",
    img: Teacher2,
    bio: "Passionate about explaining physics concepts in a fun and practical way.",
  },
  {
    name: "শারমিন সুলতানা",
    subject: "Digital Marrketing",
    img: Teacher3,
    bio: "Helps students improve communication, grammar, and creative writing.",
  },
];

const cardVariants = (isEven) => ({
  hidden: { opacity: 0, x: isEven ? -100 : 100, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

function Teachers() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Meet Our Teachers
        </h2>

        <div className="flex flex-col space-y-6">
          {teachers.map((teacher, index) => {
            const isEven = index % 2 === 0;
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <motion.div
                ref={ref}
                key={index}
                variants={cardVariants(isEven)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`flex items-center bg-white shadow-lg p-6 transition-all duration-500 hover:shadow-xl w-full md:w-2/3
                  ${
                    isEven
                      ? "rounded-none md:rounded-r-full justify-end mr-auto"
                      : "rounded-none md:rounded-l-full ml-auto"
                  }
                `}
              >
                <div
                  className={`flex items-center ${
                    isEven ? "flex-row-reverse justify-end" : "flex-row"
                  }`}
                >
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <div
                    className={`${isEven ? "text-right" : "text-left"} mx-4`}
                  >
                    <h3 className="text-xl font-semibold text-gray-700">
                      {teacher.name}
                    </h3>
                    <p className="text-indigo-500 font-medium">
                      {teacher.subject}
                    </p>
                    <p className="text-gray-600 text-sm">{teacher.bio}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Teachers;
