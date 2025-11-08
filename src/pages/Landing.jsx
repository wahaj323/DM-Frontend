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
  Play,
  Volume2,
  MessageSquare,
  BookMarked,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Landing = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

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

  const platformFeatures = [
    {
      title: "Interactive Course Lessons",
      description:
        "Beautifully designed lessons with rich content blocks, dialogues, and grammar explanations",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Text-to-Speech Pronunciation",
      description:
        "Listen to authentic German pronunciation for every word and sentence",
      icon: Volume2,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "AI-Powered Learning Assistant",
      description:
        "Get instant answers to grammar questions and personalized learning support",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with engaging quizzes and get instant feedback",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Personal Dictionary",
      description:
        "Build your vocabulary with smart flashcards and spaced repetition",
      icon: BookMarked,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed analytics and achievements",
      icon: BarChart3,
      color: "from-teal-500 to-teal-600",
    },
  ];

  const benefits = [
    "Teacher-led courses with live instruction",
    "Interactive lessons with audio pronunciation",
    "Personal vocabulary dictionary that grows with you",
    "AI-powered learning assistant",
    "Track your progress with detailed analytics",
    "Download certificates upon completion",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition">
                  <img
                    src={myLogo}
                    alt="DeutschMeister Logo"
                    className="w-20 h-20 text-white"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master German with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                DeutschMeister
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Your personal pathway to German fluency. Learn from expert
              teachers, practice with interactive content, and get AI-powered
              assistance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition border-2 border-gray-200 shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Free trial available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview Carousel */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="w-4 h-4" />
              Platform Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Experience the Future of Language Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what makes DeutschMeister different - interactive lessons, AI
              assistance, and powerful learning tools
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                {/* Content Side */}
                <div className="order-2 md:order-1">
                  <div
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${platformFeatures[currentFeature].color} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4`}
                  >
                    {(() => {
                      const IconComponent =
                        platformFeatures[currentFeature].icon;
                      return <IconComponent className="w-4 h-4" />;
                    })()}
                    Feature {currentFeature + 1} of {platformFeatures.length}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {platformFeatures[currentFeature].title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {platformFeatures[currentFeature].description}
                  </p>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevFeature}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="flex gap-2">
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
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Image Side */}
                <div className="order-1 md:order-2">
                  <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                    <div className="relative z-10 text-center p-8">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r ${platformFeatures[currentFeature].color}`}
                      >
                        {(() => {
                          const IconComponent =
                            platformFeatures[currentFeature].icon;
                          return (
                            <IconComponent className="w-10 h-10 text-white" />
                          );
                        })()}
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${platformFeatures[currentFeature].color} text-white px-6 py-3 rounded-full text-sm font-semibold`}
                      >
                        <Play className="w-4 h-4" />
                        Interactive Demo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              See DeutschMeister in Action
            </h2>
            <p className="text-xl text-gray-300">
              Watch how our platform transforms German learning
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-purple-900 aspect-video flex items-center justify-center">
            <button className="group relative z-10">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition"></div>
              <div className="relative bg-white rounded-full p-8 shadow-xl group-hover:scale-110 transition">
                <Play className="w-12 h-12 text-blue-600" />
              </div>
            </button>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Learn German
            </h2>
            <p className="text-xl text-gray-600">
              A complete learning platform designed by teachers, for students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose DeutschMeister?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We combine the best of traditional teaching with modern
                technology to give you the most effective learning experience
                possible.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg pt-1">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-10 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Ready to Begin?
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Join thousands of students learning German with
                    DeutschMeister. Start your journey to fluency today.
                  </p>
                </div>
                <Link
                  to="/signup"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center px-6 py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl text-lg"
                >
                  Create Free Account
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Students", icon: Users },
              { number: "50+", label: "Course Modules", icon: BookOpen },
              { number: "98%", label: "Success Rate", icon: Award },
              { number: "24/7", label: "AI Support", icon: MessageSquare },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4">
                    <IconComponent className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your German Learning Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join DeutschMeister and get access to expert teachers, interactive
            lessons, and AI-powered learning tools.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-xl text-lg font-semibold transition shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div> */}
              <img
                src={myLogo}
                alt="DeutschMeister Logo"
                className="w-20 h-20 text-white"
              />
              <span className="text-3xl font-bold text-white">
                DeutschMeister
              </span>
            </div>
            <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
              Learn German the right way - with expert guidance and modern
              technology
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-400">
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
              <Link to="/courses" className="hover:text-white transition">
                Courses
              </Link>
              <Link to="/pricing" className="hover:text-white transition">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2025 DeutschMeister. Created by Rao Muhammad Wahaj
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
