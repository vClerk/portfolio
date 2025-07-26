'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Play, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: '3D Product Showcase',
    description: 'Interactive 3D product visualization platform with real-time customization and WebGL rendering.',
    longDescription: 'A comprehensive 3D product showcase platform built with React Three Fiber and Next.js. Features include real-time product customization, interactive lighting controls, and seamless e-commerce integration. The project demonstrates advanced 3D rendering techniques and optimized performance for mobile devices.',
    technologies: ['React Three Fiber', 'Next.js', 'TypeScript', 'WebGL', 'Blender'],
    image: '/placeholder-project1.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: '3D Web App',
  },
  {
    id: 2,
    title: 'Immersive Portfolio Site',
    description: 'A cutting-edge portfolio website featuring particle systems, 3D animations, and interactive storytelling.',
    longDescription: 'An award-winning portfolio website that pushes the boundaries of web design. Built with Three.js and GSAP, it features custom particle systems, physics-based animations, and an immersive user experience that adapts to user interactions.',
    technologies: ['Three.js', 'GSAP', 'WebGL', 'React', 'Framer Motion'],
    image: '/placeholder-project2.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: 'Portfolio',
  },
  {
    id: 3,
    title: 'Virtual Gallery Experience',
    description: 'VR-ready virtual art gallery with spatial audio, realistic lighting, and cross-platform compatibility.',
    longDescription: 'A virtual reality art gallery that brings museum experiences to the web. Features include spatial audio, realistic PBR materials, dynamic lighting systems, and support for both VR headsets and traditional browsers.',
    technologies: ['A-Frame', 'WebXR', 'Three.js', 'Spatial Audio', 'WebGL'],
    image: '/placeholder-project3.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: 'VR Experience',
  },
  {
    id: 4,
    title: 'Real-time Data Visualization',
    description: 'Interactive 3D dashboard for complex data visualization with real-time updates and smooth animations.',
    longDescription: 'A sophisticated data visualization platform that transforms complex datasets into interactive 3D experiences. Features real-time data streaming, customizable chart types, and collaborative features for team analysis.',
    technologies: ['D3.js', 'Three.js', 'WebSocket', 'React', 'Node.js'],
    image: '/placeholder-project4.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: 'Data Visualization',
  },
  {
    id: 5,
    title: 'E-commerce 3D Platform',
    description: 'Next-generation e-commerce platform with 3D product views, AR try-on, and seamless checkout.',
    longDescription: 'A revolutionary e-commerce platform that integrates 3D product visualization and augmented reality. Customers can view products in 3D, try them on using AR, and experience products in their own space before purchasing.',
    technologies: ['React', 'WebXR', 'AR.js', 'Stripe', 'Node.js'],
    image: '/placeholder-project5.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: 'E-commerce',
  },
  {
    id: 6,
    title: 'Interactive Learning Platform',
    description: 'Educational platform with 3D simulations, gamification, and adaptive learning algorithms.',
    longDescription: 'An innovative educational platform that uses 3D simulations and interactive content to enhance learning. Features include physics simulations, chemical reactions in 3D, and adaptive learning paths based on student performance.',
    technologies: ['React', 'Three.js', 'TensorFlow.js', 'WebGL', 'Python'],
    image: '/placeholder-project6.jpg',
    github: 'https://github.com',
    live: 'https://demo.com',
    category: 'Education',
  },
];

const categories = ['All', '3D Web App', 'Portfolio', 'VR Experience', 'Data Visualization', 'E-commerce', 'Education'];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section id="portfolio" className="py-20 bg-gradient-to-b from-background to-background/50">
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
              Portfolio
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A showcase of innovative projects that demonstrate the power of 3D web technologies
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <Play size={48} className="text-white/50" />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </motion.button>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-gray-300 bg-gray-700/50 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400 bg-gray-700/30 px-2 py-1 rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-blue-500 rounded-lg text-blue-400 text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-2xl font-bold text-white">Like What You See?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These projects represent just a glimpse of what&apos;s possible. Let&apos;s collaborate to create something extraordinary for your next project.
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
              Start a Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  {selectedProject.category}
                </span>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </motion.a>
                <motion.a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300"
                >
                  <Github size={18} />
                  <span>View Code</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}