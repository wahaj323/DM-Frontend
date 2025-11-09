import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import myLogo from "../components/logo/logo.jpg";
import {
  BookOpen,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Volume2,
  MessageSquare,
  BookMarked,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  X,
} from "lucide-react";

const Landing = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  // REPLACE image paths with your actual screenshot paths
  const platformFeatures = [
    {
      title: "Interactive Course Lessons",
      description:
        "Beautifully designed lessons with rich content blocks, dialogues, and grammar explanations",
      image: "/images/lesson-preview.jpg", // CHANGE THIS
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Text-to-Speech Pronunciation",
      description:
        "Listen to authentic German pronunciation for every word and sentence",
      image: "https://res.cloudinary.com/dmdemru8r/image/upload/v1761896295/deutschmeister/profiles/b4intcf7ds1io8zvqsee.jpg", // CHANGE THIS
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "AI-Powered Learning Assistant",
      description:
        "Get instant answers to grammar questions and personalized learning support",
      image: "/images/ai-preview.jpg", // CHANGE THIS
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with engaging quizzes and get instant feedback",
      image: "/images/quiz-preview.jpg", // CHANGE THIS
      color: "from-green-500 to-green-600",
    },
    {
      title: "Personal Dictionary",
      description:
        "Build your vocabulary with smart flashcards and spaced repetition",
      image: "/images/dictionary-preview.jpg", // CHANGE THIS
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and achievements",
      image: "/images/progress-preview.jpg", // CHANGE THIS
      color: "from-teal-500 to-teal-600",
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
    { number: "A1-B2", label: "CEFR Levels", icon: Award },
    { number: "24/7", label: "AI Support", icon: MessageSquare },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % platformFeatures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % platformFeatures.length);
  };

  const prevFeature = () => {
    setCurrentFeature(
      (prev) => (prev - 1 + platformFeatures.length) % platformFeatures.length
    );
  };

  // REPLACE with your WhatsApp Business number (with country code, no + or spaces)
  const whatsappNumber = "923001234567"; // Example: 923001234567
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in learning German with DeutschMeister."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
        <MessageCircle className="w-7 h-7" />
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
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <span>Free trial available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Section */}
      <section className="py-8 sm:py-12 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="p-4 sm:p-5 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg flex-shrink-0">
                  <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Have Questions? Let's Chat!
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                    Connect directly with us on WhatsApp for course details,
                    enrollment, or any questions.
                  </p>
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 sm:gap-3 bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              Platform Preview
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Experience Modern Language Learning
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              See what makes <span className="font-semibold text-gray-900">Deutsch</span>
              <span className="font-semibold text-red-600">Meister</span> different
              - interactive lessons, AI assistance, and powerful learning tools
            </p>
          </div>

          {/* Enhanced Carousel with Image Support */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12 items-center">
                {/* Content Side */}
                <div className="order-2 lg:order-1 flex flex-col">
                  <div
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${platformFeatures[currentFeature].color} text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 self-start`}
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    Feature {currentFeature + 1} of {platformFeatures.length}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 min-h-[4rem] sm:min-h-[5rem] flex items-center">
                    {platformFeatures[currentFeature].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 flex-grow">
                    {platformFeatures[currentFeature].description}
                  </p>

                  {/* Carousel Controls - Fixed Position */}
                  <div className="flex items-center gap-4 mt-auto">
                    <button
                      onClick={prevFeature}
                      className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                    <div className="flex gap-2 flex-1 justify-center">
                      {platformFeatures.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentFeature(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentFeature
                              ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                              : "w-2 bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to feature ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextFeature}
                      className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Image Side - NOW SUPPORTS REAL SCREENSHOTS */}
                <div className="order-1 lg:order-2">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-video">
                    <img
                      key={currentFeature}
                      src={platformFeatures[currentFeature].image}
                      alt={platformFeatures[currentFeature].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = e.target.parentElement.querySelector('.fallback-placeholder');
                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                      onLoad={(e) => {
                        e.target.style.display = "block";
                        const fallback = e.target.parentElement.querySelector('.fallback-placeholder');
                        if (fallback) {
                          fallback.style.display = "none";
                        }
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className="fallback-placeholder absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 hidden items-center justify-center">
                      <div className="text-center p-8">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl bg-gradient-to-r ${platformFeatures[currentFeature].color}`}
                        >
                          <BookMarked className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Feature Screenshot
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Instructions Comment */}
          {/* 
            TO CHANGE CAROUSEL IMAGES:
            1. Place your screenshot images in: public/images/ folder
            2. Update the 'image' property in platformFeatures array above
            3. Example: image: "/images/my-lesson-screenshot.jpg"
            4. Recommended image size: 1200x800px (3:2 aspect ratio)
            5. Format: JPG or PNG
          */}
        </div>
      </section>

      {/* Features Grid */}
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="bg-white rounded-xl p-2">
                  <img
                    src={myLogo}
                    alt="DeutschMeister Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                  />
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-bold">
                <span className="text-white">Deutsch</span>
                <span className="text-red-500">Meister</span>
              </span>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
              Learn German the right way - with expert guidance and modern
              technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 mb-4">
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link
                to="/courses"
                className="hover:text-white transition-colors"
              >
                Courses
              </Link>
              <Link
                to="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 mb-6">
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
                href="tel:+923001234567"
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
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 <span className="text-gray-400">Deutsch</span>
              <span className="text-red-500">Meister</span>. Created by Rao
              Muhammad Wahaj
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
