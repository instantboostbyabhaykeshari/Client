import React from "react";
import Bottom from "../bottom";

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I contact support?",
      answer: "You can contact support by emailing us at support@example.com or using the live chat feature.",
    },
    {
      question: "How can I update my profile information?",
      answer: "Go to the Settings page, and you can update your username, email, or preferences.",
    },
    {
      question: "How do I enable dark mode?",
      answer: "Go to the Settings page under Preferences and enable the Dark Mode toggle.",
    },
    {
      question: "How to contact FoodFun Store Owner?",
      answer: "Go to the Address page under Profile and you can contact on provided mobile number.",
    },
  ];

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
      lineHeight: "1.6",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "#4faf5a",
      marginBottom: "10px",
    },
    description: {
      textAlign: "center",
      fontSize: "16px",
      marginBottom: "30px",
      color: "#555",
    },
    section: {
      marginBottom: "40px",
    },
    sectionTitle: {
      fontSize: "22px",
      marginBottom: "15px",
      color: "#4faf5a",
    },
    faqItem: {
      marginBottom: "20px",
    },
    question: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    answer: {
      fontSize: "16px",
      color: "#555",
    },
    contactList: {
      listStyle: "none",
      padding: "0",
    },
    contactItem: {
      fontSize: "16px",
      marginBottom: "10px",
    },
    contactLink: {
      color: "#4faf5a",
      textDecoration: "none",
    },
    contactLinkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Help & Support</h1>
      <p style={styles.description}>
        Here you can find answers to common questions or reach out to us for further assistance.
      </p>

      {/* FAQs Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <h3 style={styles.question}>{faq.question}</h3>
            <p style={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Need More Help?</h2>
        <p style={styles.answer}>
          If you can't find the answer you're looking for, feel free to reach out to us:
        </p>
        <ul style={styles.contactList}>
          <li style={styles.contactItem}>
            Email:{" "}
            <a
              href="mailto:BiteTasty@gmail.com"
              style={styles.contactLink}
            >
              BiteTasty@gmail.com
            </a>
          </li>
          <li style={styles.contactItem}>
            Phone:{" "}
            <a href="tel:9870667515" style={styles.contactLink}>
              9870667515 (Toll-Free)
            </a>
          </li>
        </ul>
      </div>
      <Bottom/>
    </div>
  );
};

export default HelpPage;
