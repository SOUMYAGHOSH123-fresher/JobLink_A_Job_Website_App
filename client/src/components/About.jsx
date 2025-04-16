import React from 'react'

function About() {
  return (
    <div className="pt-24 px-4 md:px-16 bg-white text-black">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">FIND YOUR DREAM JOB TODAY</h1>
        <p className="text-xl text-gray-600 font-medium">
          Connecting Talent with Opportunities Across the Nation for Every Skill Level
        </p>
      </section>

      {/* Highlight Section */}
      <section className="bg-yellow-300 rounded-3xl px-8 py-6 text-center text-black mb-16 max-w-4xl mx-auto">
        <p className="text-lg">
          Explore a vast array of job listings in diverse industries. Whether you're a seasoned professional or just starting out, find the perfect role to advance your career. Our platform makes job searching easy and efficient, bringing you closer to your next big opportunity.
        </p>
      </section>

      {/* Top Niches */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">TOP NICHES</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'SOFTWARE DEVELOPMENT',
              desc: 'Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.',
            },
            {
              title: 'WEB DEVELOPMENT',
              desc: 'Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.',
            },
            {
              title: 'DATA SCIENCE',
              desc: 'Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.',
            },
            {
              title: 'CLOUD COMPUTING',
              desc: 'Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.',
            },
            {
              title: 'DEVOPS',
              desc: 'DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.',
            },
            {
              title: 'MOBILE APP DEVELOPMENT',
              desc: 'Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.',
            },
          ].map((item, index) => (
            <div key={index} className="bg-black text-white rounded-lg p-6 text-left">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-yellow-300 py-10 px-4 text-black">
        <h2 className="text-2xl font-bold text-center mb-8">HOW DOES IT WORK?</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {[
            {
              title: 'Create an Account',
              desc: 'Sign up for a free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs. Customize your profile to highlight your skills or requirements.',
              icon: '👥',
              dark: true,
            },
            {
              title: 'Post or Browse Jobs',
              desc: 'Employers can post detailed job descriptions, and job seekers can browse a comprehensive list of available positions. Utilize filters to find jobs that match your skills and preferences.',
              icon: '📝',
              dark: false,
            },
            {
              title: 'Hire or Get Hired',
              desc: 'Employers can shortlist candidates and extend job offers. Job seekers can review job offers and accept positions that align with their career goals.',
              icon: '👍',
              dark: false,
            },
          ].map((step, index) => (
            <div
              key={index}
              className={`rounded-lg p-6 flex items-start gap-4 ${step.dark ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              <div className="text-4xl md:text-5xl">{step.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-3xl">👥</span>
              <h3 className="text-xl font-bold">Niche Nest</h3>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <p>Street No.007 Shahrah-e-Faisal Delhi, India</p>
            <p>gsoumya670@gmail.com</p>
            <p>+92 9861598082</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <p>Home</p>
            <p>Jobs</p>
            <p>Dashboard</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <p>Twitter (X)</p>
            <p>Instagram</p>
            <p>Youtube</p>
            <p>LinkedIn</p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">© CopyRight 2024. All Rights Reserved By GhoshBoss</p>
      </footer>
    </div>
  )
}

export default About