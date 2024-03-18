"use client";
import React, { useState } from "react";

// Define a type for individual FAQ items
type FaqItem = {
  question: string;
  answer: string;
};
const FaqList = [
  {
    question: "What is Campy?",
    answer:
      "Campy is a social networking platform designed exclusively for the camping community. It offers a rich array of features aimed at enhancing campers' experiences by facilitating connections, sharing resources, finding help for chores, borrowing items, and organizing outdoor activities. With Campy, the beauty of camping meets the convenience of modern technology.",
  },
  {
    question: "How does Campy work?",
    answer:
      "After signing up, you can join various group chats based on your interests, location, or camping needs. Whether you're looking to meet new people, share or borrow camping gear, or organize an outdoor adventure, Campy makes it easy.",
  },
  {
    question: "Is Campy free to use?",
    answer:
      "Yes, Campy is completely free to join and use. We believe in building a community where campers can connect, share, and explore the great outdoors together without any barriers.",
  },
  {
    question: "How can I meet new people on Campy?",
    answer:
      "Campy's group chats are the perfect way to meet fellow campers. You can join chats based on shared interests, activities, or even specific camping sites. It's a great way to make new friends, plan joint camping trips, or simply share experiences and tips.",
  },
  //   {
  //     question: "Can Campy help me plan my camping trips?",
  //     answer:
  //       "Absolutely! Campy allows you to organize outdoor activities through its platform. You can create or join existing plans, manage invitations, and coordinate with other campers. Additionally, the camping alerts feature ensures you stay informed about any conditions that might affect your trip.",
  //   },
  {
    question: "How does Campy ensure the safety and privacy of its users?",
    answer:
      "We take the safety and privacy of our users seriously. Campy has implemented robust security measures to protect personal information and user data. Furthermore, our community guidelines promote a respectful and safe environment for all members. Users can also report any concerns directly through the app.",
  },
  {
    question: "Can I use Campy to borrow or lend camping equipment?",
    answer:
      "Yes, one of Campy's core features is facilitating the sharing of camping gear among community members. Whether you need to borrow an item for your next trip or you're willing to lend your gear to fellow campers, Campy's platform makes it simple and secure to manage these exchanges.",
  },
  //   {
  //     question: "How do I receive camping alerts?",
  //     answer:
  //       "Once you're a Campy member, you can opt-in to receive camping alerts through the app settings. These alerts can be customized based on your location, preferred camping sites, and the type of information you wish to receive, ensuring you're always prepared for your next adventure.",
  //   },
  {
    question: "How can I contribute to the Campy community?",
    answer:
      "Apart from engaging in group chats and activities, you can contribute by sharing your camping experiences, tips, and resources. You can also help fellow campers by lending equipment, offering advice. Every contribution enriches the Campy experience for all.",
  },
  {
    question: "Who can join Campy?",
    answer:
      "Campy is open to everyone who shares a passion for camping, whether you're a seasoned camper, a nature enthusiast, or someone looking to explore the outdoors for the first time. Our community is diverse, inclusive, and ready to welcome you.",
  },
];

// Component Props type, if you plan to pass props to your FAQ component
type FaqProps = {
  // Example prop; you can remove or modify this according to your needs
  faqs?: FaqItem[];
};

const Faq: React.FC<FaqProps> = ({ faqs = FaqList }) => {
  // State to manage the currently active FAQ item for accordion-like behavior
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle function to expand/collapse FAQ items
  const toggleFaqItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gray-800 rounded py-10 px-8 md:py-16 md:px-12 shadow-2xl overflow-hidden">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <ul>
            {faqs.map((faq, index) => (
              <li
                key={index}
                className={`border-b border-gray-700 last:border-0 ${
                  activeIndex === index ? "mb-4" : "mb-2"
                }`}
              >
                <button
                  onClick={() => toggleFaqItem(index)}
                  className="py-4 w-full text-left text-white focus:outline-none hover:text-blue-400 transition-colors duration-150"
                >
                  <div className="font-bold leading-snug tracking-tight mb-1">
                    {faq.question}
                  </div>
                </button>
                <div
                  className={`text-gray-300 text-sm pl-4 pr-2 mb-3 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Faq;
