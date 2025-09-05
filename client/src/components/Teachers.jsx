import React from "react";
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

function Teachers() {
  return (
    <section className="py-12 bg-sky-500">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Teachers
        </h2>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={teacher.img}
                alt={teacher.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {teacher.name}
              </h3>
              <p className="text-indigo-500 font-medium">{teacher.subject}</p>
              <p className="text-gray-600 mt-3 text-sm">{teacher.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teachers;
