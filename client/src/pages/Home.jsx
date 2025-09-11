import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import slide1 from "../img/01.jpeg";
import slide2 from "../img/02.jpeg";
import slide4 from "../img/04.jpeg";

import { Button } from "../components/ui/button";
import Logo from "../img/logo.jpeg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";

import {
  GraduationCap,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

import Slider from "@/components/Slider";
import Teachers from "@/components/Teachers";
import AddressCard from "@/components/AddressCard";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;
// demo slides
const demoSlides = [
  {
    src: slide1,
    caption: "সার্টিফিকেট বিতরন",
    tag: "Tangail Computer Institute",
  },
  { src: slide2, caption: "বিদায় অনুষ্ঠান", tag: "Tangail Computer Institute" },
  {
    src: slide4,
    caption: "সার্টিফিকেট বিতরন",
    tag: "Tangail Computer Institute",
  },
];

// stats data
const stats = [
  { label: "স্টুডেন্ট", value: "২,৫০০+" },
  { label: "লাইভ ব্যাচ", value: "১২" },
  { label: "প্লেসমেন্ট", value: "৮৫%" },
  { label: "ইন্সট্রাক্টর", value: "১৫+" },
];

export default function Home() {
  const [formMsg, setFormMsg] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    userComments: "",
    courseName: "",
    duration: "",
  });

  const [courses, setCourses] = useState([]); // backend থেকে আসবে

  // Fetch courses from backend
  useEffect(() => {
    fetch(`${baseUrl}/course`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userName: formData.userName,
      mobileNumber: formData.mobileNumber,
      userComments: formData.userComments,
      course: [
        {
          courseName: formData.courseName,
          duration: formData.duration,
        },
      ],
    };

    fetch(`${baseUrl}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormMsg(data.message);
        setTimeout(() => {
          setFormMsg("");
        }, 2000);
        setFormData({
          userName: "",
          mobileNumber: "",
          userComments: "",
          courseName: "",
          duration: "",
        });
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-xl">
            <img src={Logo} alt="TCI" className="h-8 w-8" />
            <span className="text-sm md:text-md">
              Tangail Computer Institute
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#courses" className="hover:text-slate-700">
              কোর্স
            </a>
            <a href="#why" className="hover:text-slate-700">
              কেন আমরা
            </a>
            <a href="#schedule" className="hover:text-slate-700">
              শিডিউল
            </a>
            <a href="#contact" className="hover:text-slate-700">
              যোগাযোগ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button className="py-1 rounded-2xl text-xs md:text-md">
              ডেমো ক্লাস
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-2 max-w-7xl grid grid-cols-1 md:grid-cols-8 gap-6 items-center px-4 md:px-6 lg:px-8 py-10 bg-gradient-to-bl from-[#ffffff] to-[#aac9ec] shadow-2xl rounded-xl">
        {/* Left Content */}
        <div className="flex flex-col col-span-3 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Tangail Computer Institute
          </h2>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
            আপনার ক্যারিয়ার শুরু হোক{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              টিসিআই এর সাথে
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto md:mx-0">
            প্রজেক্ট-ভিত্তিক কোর্স, ইন্ডাস্ট্রি এক্সপার্ট মেন্টর আর জব-রেডি
            কারিকুলাম—সবকিছু এক জায়গায়।
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <a href="#courses" className="flex items-center">
                কোর্স দেখুন <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-2xl border-2 hover:bg-slate-50 transition"
            >
              <a href="#contact">ফ্রি কাউন্সেলিং</a>
            </Button>
          </div>
        </div>

        {/* Right Content (Slider) */}
        <div className="col-span-5">
          <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
            <Slider
              slides={demoSlides}
              autoPlay
              interval={3500}
              loop
              showArrows
              showDots
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-blue-500 to-sky-300 max-w-7xl mx-auto rounded-xl mt-4 shadow-md p-4">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-tr from-indigo-100 via-white to-pink-100" />
        </div>
        <div className="mx-auto max-w-7xl px-2 py-2">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s) => (
                  <Card key={s.label} className="rounded-2xl">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                <Card className="rounded-3xl shadow-xl">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          icon: GraduationCap,
                          title: "সার্টিফিকেট",
                          text: "প্রতিটি কোর্স শেষে ভেরিফাইড সার্টিফিকেট।",
                        },
                        {
                          icon: Users,
                          title: "মেন্টর সাপোর্ট",
                          text: "লাইভ ক্লাস + কমিউনিটি সহায়তা।",
                        },
                        {
                          icon: Clock,
                          title: "ফ্লেক্সিবল টাইম",
                          text: "সকাল, বিকাল ও রাতের ব্যাচ।",
                        },
                        {
                          icon: Star,
                          title: "পোর্টফোলিও",
                          text: "৩+ রিয়েল প্রজেক্ট যুক্ত।",
                        },
                      ].map((f) => (
                        <div key={f.title} className="p-4 border rounded-2xl">
                          <f.icon className="h-6 w-6" />
                          <div className="mt-2 font-semibold">{f.title}</div>
                          <p className="text-sm text-slate-600">{f.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section
        id="courses"
        className="max-w-7xl mx-auto py-10 bg-gradient-to-bl from-[#b9c9eb] to-[#e5e7eb] rounded-2xl mt-6 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                জনপ্রিয় কোর্স
              </h2>
              <p className="text-slate-600 mt-2">
                স্কিল আপগ্রেড করতে বেছে নিন আপনার কোর্স।
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl px-6 py-2 border-gray-400 hover:bg-gray-100 transition"
            >
              সব কোর্স
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((c) => (
              <Card
                key={c._id}
                className="group rounded-2xl hover:shadow-xl transition bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {c.courseName}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {c.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg"
                      >
                        {t.tagName}
                      </span>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Duration */}
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {c.courseDuration}
                    </span>
                  </div>

                  {/* Course Topics */}
                  <ul className="space-y-2 text-sm text-gray-700">
                    {c.courseTitel?.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {t.titelName}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/student"
                    state={{
                      courseName: c.courseName,
                      courseDuration: c.courseDuration,
                    }}
                    className="block text-center bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    অ্যাডমিশন নিন
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="max-w-7xl mx-auto mt-4 py-16 bg-gradient-to-br from-[#c7ecee] to-[#a29bfe] rounded-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white px-8 py-4 rounded-lg shadow-md">
              <h2 className="text-3xl md:text-4xl font-bold">
                অ্যাডমিশন বা জিজ্ঞাসা?
              </h2>
              <p className="mt-3 text-slate-600">
                ফর্মটি পূরণ করুন, আমাদের টিম কল করবে।
              </p>

              <form
                className="mt-6 grid grid-cols-1 gap-4 max-w-md"
                onSubmit={handleSubmit}
              >
                <Input
                  placeholder="আপনার নাম"
                  required
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
                <Input
                  type="tel"
                  placeholder="মোবাইল নম্বর"
                  required
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                />
                <Input
                  placeholder="কোন কোর্সে আগ্রহী?"
                  value={formData.courseName}
                  onChange={(e) =>
                    setFormData({ ...formData, courseName: e.target.value })
                  }
                />
                <Input
                  placeholder="কোর্সের সময়কাল"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
                <textarea
                  rows="5"
                  placeholder="আপনার জিজ্ঞাসা বা ম্যাসেজ বিস্তারিত লিখুন"
                  value={formData.userComments}
                  onChange={(e) =>
                    setFormData({ ...formData, userComments: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
                {formMsg && <span className="text-green-600">{formMsg}</span>}
                <Button type="submit" className="rounded-2xl">
                  সাবমিট
                </Button>
                <p className="text-xs text-slate-500">
                  সাবমিট করলেই আপনার ডেটা সিকিউর থাকবে।
                </p>
              </form>
            </div>

            <AddressCard />
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section
        id="teachers"
        className="max-w-7xl mx-auto py-4 mt-4 rounded-xl shadow-lg bg-gradient-to-br from-[#82ccdd] to-[#60a3bc]"
      >
        <Teachers />
      </section>

      {/* Footer */}
      <footer className="border-t bg-blue-950 mt-4  text-white rounded-none md:rounded-t-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-sm  flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div>
            © {new Date().getFullYear()} Tangail Computer Institute. সর্বস্বত্ব
            সংরক্ষিত।
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-800">
              টার্মস
            </a>
            <a href="#" className="hover:text-slate-800">
              প্রাইভেসি
            </a>
            <a href="#" className="hover:text-slate-800">
              রিফান্ড পলিসি
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
