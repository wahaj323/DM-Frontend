import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  BookMarked,
  Zap,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Video,
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  Clock,
  Download,
  User,
  Star,
  Shield,
  TrendingUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import mylogo from "../components/logo/logo.jpg";

const Landing = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  // Platform Features for Carousel
  const platformFeatures = [
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and achievements",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762758672/Screenshot_2025-11-09_1.12.32_PM_yeydhd.png",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Interactive Course Lessons",
      description:
        "Beautifully designed lessons with rich content blocks, dialogues, and grammar explanations",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762758680/Screenshot_2025-11-09_1.13.36_PM_v7spzy.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Text-to-Speech Pronunciation",
      description:
        "Listen to authentic German pronunciation for every word and sentence",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762758661/Screenshot_2025-11-09_1.14.48_PM_rx2nes.png",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "AI-Powered Learning Assistant",
      description:
        "Get instant answers to grammar questions and personalized learning support",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762758659/Screenshot_2025-11-09_1.15.01_PM_xoelnh.png",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with engaging quizzes and get instant feedback",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762759667/Screenshot_2025-11-10_12.02.41_PM_jignzr.png",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Personal Dictionary",
      description:
        "Build your vocabulary with smart flashcards and spaced repetition",
      image:
        "https://res.cloudinary.com/dmdemru8r/image/upload/v1762758675/Screenshot_2025-11-09_1.15.20_PM_ric5oe.png",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Structured Learning",
      description:
        "Follow a clear path from A1 to fluency with expertly designed courses",
    },
    {
      icon: Users,
      title: "Live Teaching",
      description:
        "Learn directly from experienced teachers via live Google Meet sessions",
    },
    {
      icon: Award,
      title: "Interactive Content",
      description:
        "Practice with audio pronunciation, dialogues, and engaging exercises",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description:
        "Get instant help with grammar and vocabulary from our AI tutor",
    },
  ];

  const benefits = [
    "Teacher-led courses with live instruction",
    "Interactive lessons with audio pronunciation",
    "Personal vocabulary dictionary that grows with you",
    "AI-powered learning assistant",
    "Track your progress with detailed analytics",
    "Certificates upon course completion",
  ];

  const stats = [
    { number: "100+", label: "Happy Students", icon: Users },
    { number: "15+", label: "Course Modules", icon: BookOpen },
    { number: "A1-A2", label: "CEFR Levels", icon: Award },
    { number: "24/7", label: "AI Support", icon: MessageSquare },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % platformFeatures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [platformFeatures.length]);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % platformFeatures.length);
  };

  const prevFeature = () => {
    setCurrentFeature(
      (prev) => (prev - 1 + platformFeatures.length) % platformFeatures.length
    );
  };

  const whatsappNumber = "923043284369";
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in enrolling in the German A1 Course with DeutschMeister."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // PDF link for course outline - REPLACE with your actual Cloudinary link
  const courseOutlinePDF = "https://drive.google.com/file/d/1ZpV7nuvGnGR47aqJsogG5AnewxM14uY8/view?usp=sharing";

  const scrollToAboutTeacher = () => {
    document.getElementById("about-teacher")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Placeholder images - REPLACE with your actual images
  const myLogo = mylogo;
  const teacherPhoto = "https://res.cloudinary.com/dmdemru8r/image/upload/v1763631411/579822093_4292553557729951_1456120427787537131_n_txozdy.jpg";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-2 transform group-hover:scale-105 transition-transform">
                  <img
                    src={myLogo}
                    alt="DeutschMeister Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Master German with
              <br className="sm:hidden" />
              <span className="inline-block mt-2 sm:mt-0 sm:ml-3">
                <span className="text-gray-900">Deutsch</span>
                <span className="text-red-600">Meister</span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4">
              Your personal pathway to German fluency. Learn from expert
              teachers, practice with interactive content, and get AI-powered
              assistance every step of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all border-2 border-gray-200 shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span>Free Demo Class available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 CURRENT COURSE OFFERING SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Urgency Banner */}
          {/* <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-full text-sm font-semibold animate-pulse">
              <Clock className="w-4 h-4" />
              Only 3 seats remaining for this batch — Enrollments close Friday
            </div>
          </div> */}

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-[0_25px_100px_-20px_rgba(0,0,0,0.25)] border-2 border-transparent bg-clip-padding backdrop-blur-sm overflow-hidden"
            style={{
              backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box"
            }}>
            <div className="p-6 sm:p-10 lg:p-14">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse">
                  <GraduationCap className="w-5 h-5" />
                  CURRENT INTAKE - LIMITED SEATS AVAILABLE
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
                  🎓 German A1 Complete Course
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Master German from scratch with live classes, expert guidance, and lifetime access to our premium digital platform
                </p>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-10">
                {/* LEFT: Course Essentials */}
                <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-2xl p-6 lg:p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    📚 What You'll Get
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Clock, text: "6-Week Intensive Program", gradient: "from-blue-500 to-blue-600" },
                      { icon: Calendar, text: "4 Live Classes Per Week (Flexible evening slots)", gradient: "from-purple-500 to-purple-600" },
                      { icon: Users, text: "Max 2 Students Per Batch (Premium small-group learning)", gradient: "from-pink-500 to-pink-600" },
                      { icon: Video, text: "Live Interactive Sessions (Google Meet with screen sharing)", gradient: "from-green-500 to-green-600" },
                      { icon: FileText, text: "Digital Notes & Study Material (Downloadable PDFs)", gradient: "from-orange-500 to-orange-600" },
                      { icon: Target, text: "Beginner-Friendly Curriculum (No prior knowledge needed)", gradient: "from-teal-500 to-teal-600" },
                      { icon: Award, text: "A1 Goethe Exam Preparation (Official certification-aligned)", gradient: "from-yellow-500 to-yellow-600" },
                      { icon: BookMarked, text: "8 Complete Learning Modules (Structured progression)", gradient: "from-indigo-500 to-indigo-600" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base pt-2 leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Premium Platform Access */}
                <div className="relative">
                  {/* Value Badge */}
                  <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ₨5,000 Value
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 lg:p-8 text-white shadow-2xl h-full relative overflow-hidden">
                    {/* Sparkle Animation Effect */}
                    <div className="absolute top-4 right-4 animate-pulse">
                      <Sparkles className="w-8 h-8 text-yellow-300" />
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-2">
                      ✨ EXCLUSIVE BONUS
                    </h3>
                    <p className="text-lg mb-6 text-purple-100">
                      Premium Platform Access — <span className="font-bold">Included FREE!</span>
                    </p>
                    <p className="text-base mb-6 text-purple-100">
                      Lifetime access to DeutschMeister's advanced learning platform:
                    </p>
                    
                    <div className="space-y-3">
                      {[
                        "Complete interactive course lessons",
                        "All 8 modules with detailed explanations",
                        "Smart quizzes with instant feedback",
                        "Personal progress tracking dashboard",
                        "AI learning assistant (24/7 support)",
                        "Vocabulary dictionary with flashcards",
                        "Free lifetime platform updates",
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all">
                          <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-10">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-3 border-transparent shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box"
                  }}>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-2xl sm:text-3xl text-gray-400 line-through">
                        ₨15,000
                      </div>
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        SAVE 20%
                      </div>
                    </div>
                    
                    <div className="relative inline-block">
                      <Sparkles className="absolute -top-2 -left-8 w-6 h-6 text-yellow-500 animate-pulse" />
                      <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-purple-500 animate-pulse" />
                      <div className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₨12,000
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-500 mt-4">
                      One-time fee • No hidden charges • Money-back guarantee
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    FASTEST
                  </div>
                  <FaWhatsapp className="w-6 h-6" />
                  Enroll via WhatsApp
                </a>

                <a
                  href={courseOutlinePDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Download className="w-5 h-5" />
                  Download Complete Syllabus
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={scrollToAboutTeacher}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 sm:px-8 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold transition-all border-2 border-gray-300 hover:border-gradient shadow-md hover:shadow-lg"
                >
                  <User className="w-5 h-5" />
                  Meet Your Instructor
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                {[
                  { icon: Shield, text: "Secure Payment" },
                  { icon: Star, text: "4.9/5 Student Rating" },
                  { icon: Award, text: "Goethe-Certified Curriculum" },
                  { icon: TrendingUp, text: "Money-Back Guarantee" },
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Carousel */}
      <section className="py-12 sm:py-16 lg:py-24 xl:py-32 px-4 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Zap className="w-4 h-4 animate-pulse" />
              Platform Preview
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 leading-tight">
              Experience Modern Language Learning
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              See what makes{" "}
              <span className="font-semibold text-gray-900">Deutsch</span>
              <span className="font-semibold text-red-600">Meister</span>{" "}
              different - interactive lessons, AI assistance, and powerful
              learning tools
            </p>
          </div>

          <div className="relative px-2 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-200/50">
              <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-8 lg:p-12 xl:p-16 items-center">
                <div className="order-2 lg:order-1 lg:col-span-2 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${platformFeatures[currentFeature].color} text-white px-3 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-lg`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Feature {currentFeature + 1} of {platformFeatures.length}
                    </div>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 lg:mb-6 leading-tight">
                      {platformFeatures[currentFeature].title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-2xl text-gray-600 leading-relaxed">
                      {platformFeatures[currentFeature].description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                    <button
                      onClick={prevFeature}
                      className="group p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
                    </button>
                    <div className="flex gap-2 sm:gap-3 flex-1 justify-center">
                      {platformFeatures.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentFeature(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentFeature
                              ? "w-10 sm:w-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
                              : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-6 sm:hover:w-8"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextFeature}
                      className="group p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" />
                    </button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-3 w-full">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 group">
                    <div className="hidden lg:block">
                      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-3 border-b-2 border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1 mx-4 h-6 bg-gray-700 rounded flex items-center px-3">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                            <div className="h-3 w-32 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      </div>

                      <div className="relative bg-white aspect-[16/10]">
                        <img
                          key={currentFeature}
                          src={platformFeatures[currentFeature].image}
                          alt={platformFeatures[currentFeature].title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-2xl h-4 border-t border-gray-700"></div>
                    </div>

                    <div className="block lg:hidden relative rounded-xl overflow-hidden aspect-video">
                      <img
                        key={currentFeature}
                        src={platformFeatures[currentFeature].image}
                        alt={platformFeatures[currentFeature].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
          {/* =========================
          ⭐ ABOUT TEACHER SECTION
      ============================ */}
      <section
        id="about-teacher"
        className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden"
      >
        {/* Background Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <User className="w-4 h-4" />
              Your Instructor
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
              Meet Your Teacher –{" "}
              <span className="text-gray-900">Muhammad</span>
              <span className="text-red-600"> Wahaj</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Learn German with a passionate instructor who blends real-world
              experience, expert guidance, and a structured teaching approach.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-200/50 relative overflow-hidden">
            {/* Sparkles */}
            <div className="absolute top-6 right-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>

            <div className="grid lg:grid-cols-3 gap-10 items-center">
              {/* Teacher Photo */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30"></div>
                  <img
                    src={teacherPhoto}
                    alt="Instructor"
                    className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover shadow-2xl border-4 border-white"
                  />
                </div>
              </div>

              {/* Teacher Description */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Hi, I'm Wahaj — Your German Instructor 👋
                </h3>

                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                  I am a Software Engineering graduate from{" "}
                  <span className="font-semibold">NED University</span>,
                  currently working at a leading software house in Karachi.  
                  I have studied German formally and passed levels up to{" "}
                  <span className="font-semibold">B1 from the Goethe-Institut</span>.
                  My journey into the German language began when I planned for higher
                  studies in Germany — now I help students start their own German
                  journey through structured, beginner-friendly teaching.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      icon: GraduationCap,
                      text: "Software Engineering Graduate (NED)",
                    },
                    {
                      icon: Award,
                      text: "Goethe-Institut Certified (up to B1)",
                    },
                    {
                      icon: Briefcase,
                      text: "Working at a Karachi Software House",
                    },
                    {
                      icon: BookOpen,
                      text: "Founder & Lead Instructor – DeutschMeister",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                    >
                      <item.icon className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Contact Instructor on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Features Grid Section
      ============================ */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Everything You Need to Learn German
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              A complete learning platform designed by teachers, for students
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Why Choose{" "}
                <span className="text-gray-900">Deutsch</span>
                <span className="text-red-600">Meister</span>?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                We combine the best of traditional teaching with modern
                technology to give you an effective and engaging learning
                experience.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base lg:text-lg pt-1">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Ready to Begin?
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    Join students learning German with{" "}
                    <span className="font-semibold text-gray-900">Deutsch</span>
                    <span className="font-semibold text-red-600">Meister</span>.
                    Start your journey to fluency today.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  Create Free Account
                </Link>
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-4">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-4 sm:p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-3 sm:mb-4">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
            Start Your German Learning Journey Today
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-8 sm:mb-10 leading-relaxed px-4">
            Join <span className="font-semibold text-white">Deutsch</span>
            <span className="font-semibold text-red-400">Meister</span> and get
            access to expert teachers, interactive lessons, and AI-powered
            learning tools.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white rounded-xl p-2">
              <img
                src={myLogo}
                alt="Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
              />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">
              <span className="text-white">Deutsch</span>
              <span className="text-red-500">Meister</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-2xl mx-auto">
            Learn German the right way — with expert guidance and a modern learning platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 mb-4">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <Link to="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-400 mb-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="tel:+923043284369"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a
              href="mailto:info@deutschmeister.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>

          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Deutsch<span className="text-red-500">Meister</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
