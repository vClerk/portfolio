'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Award, Users } from 'lucide-react';

const timeline = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovation Co.',
    description: 'Leading development of cutting-edge 3D web applications using React Three Fiber and modern web technologies.',
    icon: Award,
  },
  {
    year: '2023',
    title: 'Frontend Developer',
    company: 'Digital Agency Ltd.',
    description: 'Specialized in creating immersive user experiences with advanced animations and 3D graphics.',
    icon: Users,
  },
  {
    year: '2022',
    title: 'Web Developer',
    company: 'Startup Ventures',
    description: 'Built responsive web applications and gained expertise in modern JavaScript frameworks.',
    icon: MapPin,
  },
  {
    year: '2021',
    title: 'Computer Science Graduate',
    company: 'University',
    description: 'Graduated with honors, specializing in computer graphics and web development.',
    icon: Calendar,
  },
];

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Lines of Code', value: '100K+' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate about creating digital experiences that push the boundaries of what&apos;s possible on the web
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">My Journey</h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I&apos;m a passionate developer with a love for creating immersive digital experiences. 
                  My journey in web development began with curiosity about how websites work, and it has 
                  evolved into a deep expertise in modern 3D web technologies.
                </p>
                <p>
                  With a strong foundation in computer science and years of hands-on experience, 
                  I specialize in bringing static designs to life through interactive animations, 
                  3D graphics, and cutting-edge web technologies.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to 
                  open-source projects, or experimenting with the latest in web graphics and 
                  interactive design.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20"
                  >
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Experience Timeline</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-600"></div>
                
                <div className="space-y-8">
                  {timeline.map((item) => (
                    <motion.div
                      key={item.year}
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      className="relative flex items-start space-x-4"
                    >
                      {/* Timeline Icon */}
                      <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                        <item.icon size={20} className="text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-blue-400">{item.year}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                        <p className="text-blue-300 text-sm mb-2">{item.company}</p>
                        <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-2xl font-bold text-white">Ready to Work Together?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I&apos;m always excited to take on new challenges and collaborate on innovative projects. 
              Let&apos;s create something amazing together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let&apos;s Connect
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}