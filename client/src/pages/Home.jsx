import React, { useState } from "react";
import { motion } from "framer-motion";

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
  Monitor,
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

const courses = [
  {
    title: "ফ্রন্টএন্ড ডেভেলপমেন্ট",
    tag: "React, Tailwind, Vite",
    duration: "৩ মাস",
    level: "বেসিক → প্রো",
    highlight: ["প্রজেক্ট-ভিত্তিক", "জব পোর্টফোলিও", "ইন্টারভিউ গাইড"],
  },
  {
    title: "গ্রাফিক ডিজাইন",
    tag: "Photoshop, Illustrator",
    duration: "২ মাস",
    level: "বেসিক",
    highlight: ["ব্র্যান্ডিং", "সোশ্যাল মিডিয়া ডিজাইন", "ফ্রিল্যান্সিং টিপস"],
  },
  {
    title: "মাইক্রোসফট অফিস এক্সপার্ট",
    tag: "Word, Excel, PowerPoint",
    duration: "১.৫ মাস",
    level: "শুরু থেকে",
    highlight: ["অফিস অটোমেশন", "ডাটা ফর্মুলা", "প্রেজেন্টেশন স্কিল"],
  },
  {
    title: "ফুল-স্ট্যাক ডেভেলপমেন্ট",
    tag: "Node, Express, MongoDB",
    duration: "৪ মাস",
    level: "ইন্টারমিডিয়েট",
    highlight: ["এপিআই ডেভেলপমেন্ট", "অ্যাডমিন ড্যাশবোর্ড", "ডেপ্লয়মেন্ট"],
  },
];

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

    console.log("Payload:", payload);

    fetch("https://tci-backend.vercel.app/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setFormMsg(data.message); // spelling backend-এর মতোই রাখতে হবে
        console.log("Success:", data);
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
            <span>Tangail Computer Institute</span>
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
            <Button className="rounded-2xl">ডেমো ক্লাস</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-tr from-indigo-100 via-white to-pink-100" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                আপনার ক্যারিয়ার শুরু হোক
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                  {" "}
                  টেক স্কিলে
                </span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 max-w-xl">
                প্রজেক্ট-ভিত্তিক কোর্স, ইন্ডাস্ট্রি এক্সপার্ট মেন্টর আর জব-রেডি
                কারিকুলাম—সবকিছু এক জায়গায়।
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-2xl">
                  <a href="#courses" className="flex items-center">
                    কোর্স দেখুন <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="rounded-2xl"
                >
                  <a href="#contact">ফ্রি কাউন্সেলিং</a>
                </Button>
              </div>

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

      {/* Courses */}
      <section id="courses" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">জনপ্রিয় কোর্স</h2>
              <p className="text-slate-600">
                স্কিল আপগ্রেড করতে বেছে নিন আপনার কোর্স।
              </p>
            </div>
            <Button variant="outline" className="rounded-2xl">
              সব কোর্স
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <Card
                key={c.title}
                className="group rounded-2xl hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{c.title}</CardTitle>
                  <div className="text-sm text-slate-500">{c.tag}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {c.duration}
                    </span>
                    <span className="text-slate-500">{c.level}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {c.highlight.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> {h}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full rounded-2xl">অ্যাডমিশন নিন</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                কেন TCI Training?
              </h2>
              <p className="mt-4 text-slate-600">
                ইন্ডাস্ট্রি-অ্যালাইন্ড কারিকুলাম, ১:১ মেন্টরশিপ, এবং ক্যারিয়ার
                সাপোর্ট—সব কিছুই আপনার জন্য।
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  "রিয়েল-লাইফ প্রজেক্ট",
                  "জব-প্লেসমেন্ট সহায়তা",
                  "ফ্রিল্যান্সিং গাইড",
                  "লাইফটাইম রিসোর্স",
                ].map((item) => (
                  <div
                    key={item}
                    className="p-4 border rounded-2xl text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="rounded-3xl">
                <CardContent className="p-6">
                  <div className="text-lg font-semibold mb-4">
                    সাম্প্রতিক স্টুডেন্ট ফিডব্যাক
                  </div>
                  <div className="space-y-4">
                    <blockquote className="p-4 bg-white border rounded-2xl">
                      <p className="text-slate-700">
                        “সিলেবাসটা খুব প্র্যাকটিক্যাল। ইন্টারভিউতে কাজে লেগেছে।”
                      </p>
                      <div className="mt-2 text-sm text-slate-500">
                        — তাসফিয়া, ফ্রন্টএন্ড ব্যাচ
                      </div>
                    </blockquote>
                    <blockquote className="p-4 bg-white border rounded-2xl">
                      <p className="text-slate-700">
                        “মেন্টররা সবসময় পাশে ছিল। পোর্টফোলিও বানাতে হেল্প
                        করেছে।”
                      </p>
                      <div className="mt-2 text-sm text-slate-500">
                        — রাফি, ফুল-স্ট্যাক ব্যাচ
                      </div>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            চলতি ব্যাচের শিডিউল
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "সকাল ব্যাচ",
                time: "সকাল ১০টা – ১২টা",
                days: "রবি, মঙ্গল, বৃহস্পতি",
              },
              {
                name: "বিকাল ব্যাচ",
                time: "বিকাল ৩টা – ৫টা",
                days: "সোম, বুধ, শুক্র",
              },
              {
                name: "নাইট ব্যাচ",
                time: "রাত ৮টা – ১০টা",
                days: "রবি – বৃহস্পতিবার",
              },
            ].map((s) => (
              <Card key={s.name} className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{s.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 space-y-1">
                  <div>সময়: {s.time}</div>
                  <div>দিন: {s.days}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
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
                  id="my-textarea"
                  rows="5"
                  placeholder="আপনার জিজ্ঞাসা বা ম্যাসেজ বিস্তারিত লিখুন"
                  value={formData.userComments}
                  onChange={(e) =>
                    setFormData({ ...formData, userComments: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                ></textarea>
                <span className={`${formMsg != "" ? "hidden" : "flex"}`}>
                  {formMsg}
                </span>
                <Button type="submit" className="rounded-2xl">
                  সাবমিট
                </Button>
                <p className="text-xs text-slate-500">
                  সাবমিট করলেই আপনার ডেটা সিকিউর থাকবে।
                </p>
              </form>
            </div>
            <div>
              <Card className="rounded-3xl">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5" /> +880 1722440899
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" /> hello@tci.institute
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" /> ১২৩, টাংগাইল।
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
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
