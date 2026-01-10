import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const About = () => {
  return (
    <div className="min-h-screen bg-mountain-gray">
      {/* Hero Section */}
      <section className="bg-forest-green text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              ABOUT <span className="text-sunset-orange">SPORTSEQUIP</span>
            </h1>
            <p className="font-lato text-base sm:text-lg text-mountain-gray max-w-4xl mx-auto mb-4">
              Empowering athletes worldwide with premium outdoor sports equipment and gear
            </p>
            <p className="font-lato text-sm sm:text-base text-green-100 max-w-4xl mx-auto">
              Since our founding in 2020, SPORTSEQUIP has been dedicated to providing athletes of all levels with 
              access to the finest sports equipment available. We believe that every athlete, from weekend enthusiasts 
              to professional competitors, deserves gear that enhances their performance and supports their passion for sports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-6 sm:mb-8">
              OUR <span className="text-sunset-orange">MISSION</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                At SPORTSEQUIP, we believe that every athlete deserves access to high-quality equipment that enhances 
                their performance. Founded in 2020, we've been committed to providing premium sports gear to athletes 
                of all levels, from beginners taking their first steps into sports to professionals competing at the 
                highest levels.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                Our mission is to fuel your passion for sports by offering carefully curated products from trusted brands, 
                ensuring quality, durability, and performance in every purchase. We understand that sports equipment is 
                more than just gear—it's an extension of your dedication, your commitment to excellence, and your journey 
                toward achieving your goals.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                That's why we meticulously select each product in our catalog, partnering only with manufacturers who 
                share our values of quality, innovation, and athlete-centric design. Every item we offer has been tested 
                and approved by our team of sports experts, ensuring that you receive equipment that meets the highest 
                standards of performance and reliability.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                We are committed to making premium sports equipment accessible to everyone, regardless of their budget 
                or skill level. Through competitive pricing, flexible payment options, and comprehensive customer support, 
                we ensure that every athlete can find the gear they need to succeed.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glossy-card overflow-hidden max-w-4xl mx-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800"
              alt="Athletes"
              className="w-full h-64 sm:h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-6 sm:mb-8">
              OUR <span className="text-sunset-orange">STORY</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                SPORTSEQUIP was born from a simple yet powerful idea: every athlete, regardless of their level or 
                background, should have access to equipment that helps them perform at their best. What started as a 
                small venture in 2020 has grown into a trusted name in the sports equipment industry, serving thousands 
                of customers across the globe.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                Our founders, passionate athletes themselves, recognized a gap in the market for high-quality, accessible 
                sports equipment. They envisioned a platform where athletes could find everything they need in one place, 
                backed by expert knowledge and exceptional customer service. What began as a dream to democratize access 
                to premium sports gear has evolved into a comprehensive online destination for athletes worldwide.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                Over the years, we've built strong relationships with leading sports equipment manufacturers, allowing us 
                to offer an extensive catalog of products at competitive prices. Our team has grown from a small group of 
                enthusiasts to a dedicated workforce of sports experts, customer service professionals, and logistics specialists, 
                all united by a shared passion for helping athletes achieve their goals.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                Today, we serve thousands of customers worldwide, from weekend warriors to professional athletes, helping 
                them achieve their goals one piece of equipment at a time. Our commitment to excellence remains unwavering, 
                and we continue to expand our offerings while maintaining the quality and service standards that define us. 
                We're proud of how far we've come, but we're even more excited about where we're going.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800"
                alt="Our Story"
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20 bg-forest-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
              OUR <span className="text-sunset-orange">VALUES</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-green-100 max-w-3xl mx-auto mb-8">
              The principles that guide everything we do. These core values shape our decisions, drive our actions, 
              and define our commitment to excellence in every aspect of our business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              {
                title: 'Quality',
                description:
                  'We source only the finest products from reputable brands, ensuring durability and performance. Every item in our catalog undergoes rigorous quality checks to meet our high standards. Quality isn\'t just a promise—it\'s our foundation, and we never compromise on the excellence of the products we offer to our customers.',
                icon: '⭐',
              },
              {
                title: 'Innovation',
                description:
                  'We stay ahead of the curve, offering the latest in sports technology and design. Our team constantly researches new products and technologies to bring you cutting-edge equipment. Innovation drives us forward, and we\'re always exploring new ways to enhance athletic performance through advanced equipment and technology.',
                icon: '🚀',
              },
              {
                title: 'Community',
                description:
                  'We support athletes at every level, from beginners to professionals, building a stronger sports community. We believe in giving back and supporting local sports initiatives. Our commitment extends beyond sales—we actively participate in community events, sponsor local teams, and contribute to sports development programs.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white text-forest-green p-6 sm:p-8 glossy-card min-h-[320px] flex flex-col text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-nunito font-extrabold text-xl sm:text-2xl text-sunset-orange mb-4">
                  {value.title}
                </h3>
                <p className="font-lato text-earth-brown leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: 'Customer Service',
                description:
                  'Your satisfaction is our priority. Our dedicated support team is always ready to help you find the perfect equipment, answer questions, and ensure you have the best shopping experience possible. We believe that exceptional customer service is the cornerstone of a great business, and we\'re committed to going above and beyond to exceed your expectations.',
                icon: '💬',
              },
              {
                title: 'Sustainability',
                description:
                  'We\'re committed to environmental responsibility. We partner with eco-conscious brands and implement sustainable practices in our operations to protect the planet we all love to explore. From eco-friendly packaging to supporting brands that prioritize sustainability, we\'re working towards a greener future for sports and outdoor activities.',
                icon: '🌱',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm text-white p-6 sm:p-8 rounded-lg border border-white border-opacity-20 min-h-[320px] flex flex-col text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-nunito font-extrabold text-xl sm:text-2xl text-sunset-orange mb-4">
                  {value.title}
                </h3>
                <p className="font-lato text-green-100 leading-relaxed text-sm sm:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-4">
              MEET OUR <span className="text-sunset-orange">TEAM</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto mb-4">
              Passionate athletes and sports enthusiasts dedicated to serving you
            </p>
            <p className="font-lato text-sm sm:text-base text-earth-brown max-w-3xl mx-auto">
              Our team is comprised of experienced professionals who share a deep passion for sports and a commitment 
              to helping athletes achieve their goals. Each member brings unique expertise and dedication to ensuring 
              you receive the best products and service possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'John Smith',
                role: 'Founder & CEO',
                bio: 'Former professional athlete with 15+ years in sports retail. Passionate about helping athletes reach their full potential. John\'s vision and leadership have been instrumental in building SPORTSEQUIP into the trusted brand it is today.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
              },
              {
                name: 'Sarah Johnson',
                role: 'Head of Product',
                bio: 'Sports equipment expert with a keen eye for quality. Ensures every product meets our high standards. With over a decade of experience in product selection and quality assurance, Sarah ensures that only the best equipment makes it to our catalog.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
              },
              {
                name: 'Mike Chen',
                role: 'Customer Success',
                bio: 'Dedicated to ensuring every customer finds exactly what they need. Your success is our success. Mike leads our customer service team with a focus on building lasting relationships and ensuring complete customer satisfaction.',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white glossy-card p-6 sm:p-8 text-center min-h-[350px] flex flex-col"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sunset-orange"
                />
                <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-2">
                  {member.name}
                </h3>
                <p className="font-lato font-semibold text-sunset-orange text-sm sm:text-base mb-3">
                  {member.role}
                </p>
                <p className="font-lato text-earth-brown text-sm sm:text-base leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20 bg-mountain-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-4">
              WHY CHOOSE <span className="text-sunset-orange">SPORTSEQUIP</span>
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown max-w-3xl mx-auto mb-8">
              We're not just another sports equipment retailer. We're your partners in athletic excellence, 
              committed to providing you with the tools you need to succeed. Here's what sets us apart from the competition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Wide Selection',
                description: 'Over 500+ products across all major sports categories, carefully curated to meet diverse athletic needs and preferences.',
                icon: '📦',
              },
              {
                title: 'Expert Advice',
                description: 'Our team of sports experts ready to guide your purchase, providing personalized recommendations based on your specific needs.',
                icon: '🎯',
              },
              {
                title: 'Fast Shipping',
                description: 'Free shipping on orders over $50, delivered within 2-5 days. We ensure your equipment arrives quickly and safely.',
                icon: '🚚',
              },
              {
                title: 'Easy Returns',
                description: '30-day return policy, no questions asked. We stand behind our products and want you to be completely satisfied.',
                icon: '↩️',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white glossy-card p-6 sm:p-8 text-center min-h-[240px] flex flex-col justify-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-forest-green mb-2">
                  {feature.title}
                </h3>
                <p className="font-lato text-earth-brown text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-6 sm:mb-8">
              OUR <span className="text-sunset-orange">COMMITMENT</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                At SPORTSEQUIP, we're committed to more than just selling equipment. We're dedicated to being your 
                trusted partner in your athletic journey. Whether you're training for your first 5K, preparing for 
                a championship game, or simply enjoying weekend activities, we're here to support you every step of the way.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                Our commitment extends to every aspect of your experience with us. From the moment you browse our catalog 
                to the day your equipment arrives at your door, we ensure that you receive exceptional service, quality 
                products, and the support you need to succeed. We continuously invest in improving our website, expanding 
                our product range, and enhancing our customer service to better serve you.
              </p>
              <p className="font-lato text-base sm:text-lg text-earth-brown leading-relaxed">
                We believe that sports have the power to transform lives, build communities, and inspire greatness. 
                That's why we're not just in the business of selling equipment—we're in the business of empowering 
                athletes to achieve their dreams. Every product we sell, every customer we serve, and every interaction 
                we have is guided by this fundamental belief.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-nunito font-extrabold text-2xl sm:text-3xl md:text-4xl text-forest-green mb-4 sm:mb-6">
              READY TO ELEVATE YOUR <span className="text-sunset-orange">GAME</span>?
            </h2>
            <p className="font-lato text-base sm:text-lg text-earth-brown mb-4">
              Explore our collection of premium sports equipment and find the perfect gear for your next challenge. 
              Join thousands of satisfied customers who trust SPORTSEQUIP for all their sports equipment needs.
            </p>
            <p className="font-lato text-sm sm:text-base text-earth-brown mb-6 sm:mb-8">
              From professional-grade equipment to beginner-friendly gear, we have everything you need to take your 
              athletic performance to the next level. Start shopping today and discover why athletes worldwide choose 
              SPORTSEQUIP as their trusted partner in sports excellence.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="xl">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
