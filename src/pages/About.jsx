import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const About = () => {
  return (
    <div className="min-h-screen bg-mountain-gray">
      {/* Hero Section */}
      <section className="relative bg-forest-green text-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-sunset-orange opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-sunset-orange opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-nunito font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6 tracking-tight">
              ABOUT <span className="text-sunset-orange">SPORTSEQUIP</span>
            </h1>
            <p className="font-lato text-lg sm:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Equipping the next generation of athletes with premium gear and unwavering support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar Section */}
      <section className="relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white glossy-card grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 text-center shadow-xl">
            {[
              { label: 'Founded', value: '2020' },
              { label: 'Products', value: '500+' },
              { label: 'Athletes Served', value: '10k+' },
              { label: 'Expert Staff', value: '50+' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-nunito font-black text-sunset-orange">{stat.value}</p>
                <p className="text-xs font-lato font-bold text-forest-green uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section: Grid Layout */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-6 border-l-8 border-sunset-orange pl-6">
                OUR <span className="text-sunset-orange">MISSION</span>
              </h2>
              <div className="space-y-6">
                <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                  We empower athletes by making world-class equipment accessible to everyone.
                  Access to quality gear shouldn't be a luxury—it's a necessity for progress.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '🎯', text: 'Performance-Driven Design' },
                    { icon: '🛡️', text: 'Rigorous Quality Standards' },
                    { icon: '🌍', text: 'Global Brand Partners' },
                    { icon: '✨', text: 'Expert Technical Support' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-lato font-bold text-forest-green text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-sunset-orange rounded-2xl rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
                alt="Athletes Training"
                className="relative z-10 w-full h-[350px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section: Alternating Layout */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-4">
              OUR <span className="text-sunset-orange">STORY</span>
            </h2>
            <div className="w-20 h-1 bg-sunset-orange mx-auto"></div>
          </div>

          <div className="space-y-16">
            {/* Story Part 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800"
                  alt="Founder workspace"
                  className="w-full h-[300px] object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="font-nunito font-black text-xl sm:text-2xl text-forest-green mb-4 italic">"It started with a gap in the track."</h3>
                <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed mb-6">
                  In 2020, our founders—passionate athletes themselves—noticed that high-performance gear was
                  becoming increasingly gated by high price tags and elitism. They saw a need for a destination
                  that combined technical expertise with local inclusivity.
                </p>
                <div className="bg-mountain-gray p-6 rounded-xl border-l-4 border-sunset-orange">
                  <p className="font-lato font-bold text-forest-green italic text-sm sm:text-base">
                    "We didn't just want to sell balls and rackets; we wanted to fuel the fire that makes someone get up at 5 AM to train."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section: Card Grid */}
      <section className="py-16 sm:py-20 bg-forest-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl mb-4">
              THE <span className="text-sunset-orange">VALUES</span> THAT GUIDE US
            </h2>
            <p className="font-lato text-base sm:text-lg text-green-100 max-w-2xl mx-auto">
              Our culture is built on four pillars that ensure we never lose sight of our purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: 'Quality', icon: '⭐', desc: 'Every product is tested by pros before it reaches our shop.' },
              { title: 'Innovation', icon: '🚀', desc: 'Curating the latest in sports biotech and fabric engineering.' },
              { title: 'Community', icon: '🤝', desc: 'Proudly sponsoring local youth leagues and community tournaments.' },
              { title: 'Nature', icon: '🌱', desc: 'Committed to sustainable shipping and eco-friendly manufacturing.' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white hover:text-forest-green transition-all duration-500"
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                <h3 className="font-nunito font-black text-xl mb-3">{value.title}</h3>
                <p className="font-lato text-xs sm:text-sm text-green-100 group-hover:text-earth-brown leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section: Individual Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl text-forest-green mb-4">
                MEET THE <span className="text-sunset-orange">EXPERTS</span>
              </h2>
              <p className="font-lato text-base sm:text-lg text-earth-brown">
                Our staff isn't just retail experts—they're world-class coaches, trainers, and athletes.
              </p>
            </div>
            <Link to="/contact" className="text-sunset-orange font-bold hover:underline mb-2 text-sm">Speak with a specialist →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                role: 'Founder & Trail Runner',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
              },
              {
                name: 'Sarah Johnson',
                role: 'Head of Gear Strategy',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
              },
              {
                name: 'Mike Chen',
                role: 'Performance Analyst',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl bg-white shadow-xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-forest-green to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-nunito font-bold text-lg">{member.name}</h3>
                  <p className="font-lato text-green-200 text-xs uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-16 sm:py-20 bg-white" >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mountain-gray rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-sunset-orange/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-6">
                READY TO <span className="text-sunset-orange">GO PRO</span>?
              </h2>
              <p className="font-lato text-base sm:text-lg text-earth-brown mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of athletes who transformed their performance with our gear.
                Whether you're starting today or competing tomorrow, we're with you.
              </p>
              <Link to="/shop">
                <Button variant="primary" size="xl" className="px-10 rounded-full shadow-2xl hover:shadow-orange-500/20">
                  Browse Collection
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default About;
