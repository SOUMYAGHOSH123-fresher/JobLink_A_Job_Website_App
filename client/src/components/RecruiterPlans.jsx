// // components/RecruiterPlans.jsx
// import { motion } from "framer-motion";
// import { CheckCircle2 } from "lucide-react";

// const recruiterPlans = [
//   {
//     title: "Basic Recruiter",
//     price: "₹1,499/month",
//     features: [
//       "Post up to 20 job listings",
//       "Access basic candidate profiles",
//       "Email support",
//     ],
//     action: "Start Hiring",
//   },
//   {
//     title: "Pro Recruiter",
//     price: "₹4,999/month",
//     features: [
//       "Unlimited job listings",
//       "Highlighted job posts",
//       "Advanced resume filters",
//       "Priority customer support",
//     ],
//     action: "Upgrade Now",
//     highlight: true,
//   },
//   {
//     title: "Enterprise",
//     price: "Contact Sales",
//     features: [
//       "Dedicated account manager",
//       "Customized hiring solutions",
//       "Analytics and reporting",
//       "API access for ATS integration",
//     ],
//     action: "Request Demo",
//   },
// ];

// export function RecruiterPlans() {
//   return (
//     <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold text-pink-900 dark:text-white mb-4">
//           Plans for Recruiters
//         </h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
//           Find the best talent faster with the right tools and support.
//         </p>
//         <div className="grid md:grid-cols-3 gap-10">
//           {recruiterPlans.map((plan, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.2 }}
//               className={`rounded-2xl p-8 shadow-xl relative transition-transform hover:scale-105 border-2 dark:bg-zinc-900 dark:border-zinc-700 ${
//                 plan.highlight ? "border-pink-600 bg-pink-50 dark:bg-pink-950" : "border-gray-200 bg-white dark:bg-zinc-800"
//               }`}
//             >
//               <h3 className="text-2xl font-semibold text-pink-800 dark:text-white mb-2">
//                 {plan.title}
//               </h3>
//               <p className="text-3xl font-bold text-pink-900 dark:text-white mb-6">
//                 {plan.price}
//               </p>
//               <ul className="text-left space-y-3">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
//                     <CheckCircle2 className="text-green-500 mt-1" size={20} />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <button className="mt-8 inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium transition">
//                 {plan.action}
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
