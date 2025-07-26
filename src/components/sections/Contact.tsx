'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import Scene from '@/components/3d/Scene';
import { FloatingObject } from '@/components/3d/FloatingObjects';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@portfolio.dev',
    href: 'mailto:hello@portfolio.dev',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
    <section id="contact" className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Scene 
          camera={{ position: [0, 0, 8], fov: 60 }} 
          controls={false}
          loadingText="Loading Contact Background..."
        >
          <FloatingObject position={[-4, 2, -3]} type="sphere" color="#3b82f6" scale={0.5} speed={0.3} />
          <FloatingObject position={[4, -1, -2]} type="torus" color="#8b5cf6" scale={0.3} speed={0.5} />
          <FloatingObject position={[-2, -3, 1]} type="box" color="#06b6d4" scale={0.4} speed={0.4} />
          <FloatingObject position={[3, 3, -1]} type="sphere" color="#ec4899" scale={0.3} speed={0.6} />
        </Scene>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Get In Touch
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s collaborate on something amazing together.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Let&apos;s Connect</h3>
                <p className="text-gray-400 leading-relaxed">
                  I&apos;m always excited to discuss new projects, creative ideas, or opportunities to be part of your visions. 
                  Whether you have a project in mind or just want to chat about the latest in web technology, I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white group-hover:text-blue-400 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="space-y-4 pt-6">
                <h4 className="text-lg font-semibold text-white">What I Can Help With</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>3D Web Applications & Interactive Experiences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Modern React & Next.js Development</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Performance Optimization & SEO</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>UI/UX Design & Animation</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-green-400">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                      Subject *
                    </label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6 pt-8"
          >
            <h3 className="text-2xl font-bold text-white">Prefer a Quick Chat?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sometimes it&apos;s easier to just have a conversation. Feel free to reach out directly, 
              and we can schedule a call to discuss your project in detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="mailto:hello@portfolio.dev"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Email Me Directly
              </motion.a>
              <motion.a
                href="tel:+15551234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-blue-400 rounded-full text-blue-400 font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Schedule a Call
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}