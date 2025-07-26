'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Scene from '@/components/3d/Scene';
import { FloatingObject } from '@/components/3d/FloatingObjects';

const skillCategories = [
  {
    title: 'Frontend Development',
    color: '#3b82f6',
    position: [-2, 1, 0] as [number, number, number],
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Three.js', level: 85 },
      { name: 'CSS/SCSS', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Backend Development',
    color: '#8b5cf6',
    position: [2, -0.5, 0] as [number, number, number],
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    title: '3D & Animation',
    color: '#06b6d4',
    position: [0, -1.5, 1] as [number, number, number],
    skills: [
      { name: 'React Three Fiber', level: 88 },
      { name: 'Framer Motion', level: 92 },
      { name: 'WebGL', level: 78 },
      { name: 'Blender', level: 70 },
      { name: 'GSAP', level: 85 },
      { name: 'Canvas API', level: 82 },
    ],
  },
  {
    title: 'Tools & Workflow',
    color: '#ec4899',
    position: [-1.5, -1, -1] as [number, number, number],
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'Webpack', level: 85 },
      { name: 'Jest', level: 82 },
      { name: 'Figma', level: 88 },
      { name: 'VS Code', level: 98 },
    ],
  },
];

const technologies = [
  'React', 'TypeScript', 'Three.js', 'Next.js', 'Node.js', 'Python',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Vercel', 'Figma',
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="skills" className="py-20 bg-gradient-to-b from-background/50 to-background">
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
              Skills & Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, interactive web experiences
            </p>
          </motion.div>

          {/* 3D Skills Visualization */}
          <motion.div variants={itemVariants} className="relative h-96 rounded-xl overflow-hidden">
            <Scene 
              camera={{ position: [0, 0, 6], fov: 60 }} 
              controls={true}
              loadingText="Loading Interactive Skills..."
            >
              {skillCategories.map((category, index) => (
                <FloatingObject
                  key={category.title}
                  position={category.position}
                  type={index % 3 === 0 ? 'sphere' : index % 3 === 1 ? 'box' : 'torus'}
                  color={category.color}
                  scale={0.8}
                  speed={0.5 + index * 0.2}
                />
              ))}
            </Scene>
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="text-center space-y-2 bg-black/30 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white">Interactive 3D Skills</h3>
                <p className="text-gray-300">Drag to explore different skill categories</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-xs">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: [0.6, -0.05, 0.01, 0.99] as const
                          }}
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Tags */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-white">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech) => (
                <motion.span
                  key={tech}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-2xl font-bold text-white">Interested in My Skillset?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I&apos;m always learning and expanding my expertise. Let&apos;s discuss how my skills can help bring your project to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              See My Work
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}