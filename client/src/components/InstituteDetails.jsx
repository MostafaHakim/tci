import React from "react";

function InstituteDetails() {
  return (
    <section className="max-w-7xl  mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left side - Video */}
      <div className="w-full">
        <iframe
          className="w-full h-64 md:h-80 rounded-xl shadow-lg"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Institute Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Right side - Text */}
      <div className=" h-full flex flex-col items-start justify-start space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          আমাদের ইন্সটিটিউট
        </h2>
        <p className="text-gray-600 leading-relaxed">
          আমাদের ইন্সটিটিউট দীর্ঘদিন ধরে শিক্ষার্থীদের মানসম্মত শিক্ষা প্রদান
          করে আসছে। এখানে আধুনিক ল্যাব, অভিজ্ঞ শিক্ষক এবং বাস্তবমুখী প্রশিক্ষণের
          মাধ্যমে শিক্ষার্থীরা নিজেদের ভবিষ্যৎ গড়ে তুলতে পারে।
        </p>
        <p className="text-gray-600 leading-relaxed">
          আমাদের লক্ষ্য হচ্ছে শিক্ষার্থীদের শুধু বইয়ের জ্ঞান নয়, বরং বাস্তব
          জীবনের দক্ষতা অর্জনে সহায়তা করা।
        </p>
      </div>
    </section>
  );
}

export default InstituteDetails;
