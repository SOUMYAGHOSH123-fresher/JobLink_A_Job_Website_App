// // components/JobSeekerPlans.jsx
// import { motion } from "framer-motion";
// import { CheckCircle2 } from "lucide-react";

// const seekerPlans = [
//   {
//     title: "Starter",
//     price: "Free",
//     features: [
//       "Create your profile",
//       "Apply to limited jobs",
//       "Basic resume feedback",
//     ],
//     action: "Get Started",
//   },
//   {
//     title: "Pro Seeker",
//     price: "₹999/month",
//     features: [
//       "Unlimited job applications",
//       "AI-powered resume booster",
//       "Priority visibility to recruiters",
//       "Premium support",
//     ],
//     action: "Upgrade Now",
//     highlight: true,
//   },
// ];

// export default function JobSeekerPlans() {
//   return (
//     <section className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-4xl font-bold text-indigo-900 dark:text-white mb-4">
//           Plans for Job Seekers
//         </h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
//           Unlock better opportunities with the right tools and visibility.
//         </p>
//         <div className="grid md:grid-cols-2 gap-10">
//           {seekerPlans.map((plan, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.2 }}
//               className={`rounded-2xl p-8 shadow-xl relative transition-transform hover:scale-105 border-2 dark:bg-zinc-900 dark:border-zinc-700 ${
//                 plan.highlight ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950" : "border-gray-200 bg-white dark:bg-zinc-800"
//               }`}
//             >
//               <h3 className="text-2xl font-semibold text-indigo-800 dark:text-white mb-2">
//                 {plan.title}
//               </h3>
//               <p className="text-3xl font-bold text-indigo-900 dark:text-white mb-6">
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
//               <button className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition">
//                 {plan.action}
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
