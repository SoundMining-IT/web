// CorporateAdvisoryData.js
import React from 'react'; // Keep if needed by components like AnimatedButton if used here directly (unlikely now)
// Assuming AnimatedButton is imported within the component that uses it

// --- Individual Item Arrays (Keep As Is) ---
export const CorporateStrategyItems = [
  { inactiveIcon: "/images/NotSelected1.svg", activeIcon: "/images/Selected1.svg", label: "Banks" },
  { inactiveIcon: "/images/NotSelected2.svg", activeIcon: "/images/Selected2.svg", label: "Private equity firms" },
  { inactiveIcon: "/images/NotSelected3.svg", activeIcon: "/images/Selected3.svg", label: "Stock exchanges" },
  { inactiveIcon: "/images/NotSelected4.svg", activeIcon: "/images/Selected4.svg", label: "International funds" },
  { inactiveIcon: "/images/NotSelected5.svg", activeIcon: "/images/Selected5.svg", label: "Legal firms" },
];

export const CorporateRiskItems = [
  { inactiveIcon: "/images/Group2NotActive1.svg", activeIcon: "/images/Group2Active1.svg", label: "Technical risks" },
  { inactiveIcon: "/images/Group2NotActive2.svg", activeIcon: "/images/Group2Active2.svg", label: "Financial risks" },
  { inactiveIcon: "/images/Group2NotActive3.svg", activeIcon: "/images/Group2Active3.svg", label: "Economic risks" },
  { inactiveIcon: "/images/Group2NotActive4.svg", activeIcon: "/images/Group2Active4.svg", label: "Environmental risks" },
  { inactiveIcon: "/images/Group2NotActive5.svg", activeIcon: "/images/Group2Active5.svg", label: "Social risks" },
  { inactiveIcon: "/images/Group2NotActive6.svg", activeIcon: "/images/Group2Active6.svg", label: "Governance risks" },
  { inactiveIcon: "/images/Group2NotActive7.svg", activeIcon: "/images/Group2Active7.svg", label: "Management and mitigation of risks" },
];

export const ValuationsItems = [
  { inactiveIcon: "/images/NotSelected1.svg", activeIcon: "/images/Selected1.svg", label: "SAMVAL" },
  { inactiveIcon: "/images/NotSelected2.svg", activeIcon: "/images/Selected2.svg", label: "Canadian Institute of Mining" }, // Assuming label was intended
  { inactiveIcon: "/images/NotSelected3.svg", activeIcon: "/images/Selected3.svg", label: "IMVAL" },
  { inactiveIcon: "/images/NotSelected4.svg", activeIcon: "/images/Selected4.svg", label: "VALMIN" },
];

export const MineralItems = [
  { inactiveIcon: "/images/Group4NotActive1.svg", activeIcon: "/images/Group4Active1.svg", label: "Code-compliant and comprehensive estimates" },
  { inactiveIcon: "/images/Group4NotActive2.svg", activeIcon: "/images/Group4Active2.svg", label: "Incorporating mine designs, schedules, and modifying factors." },
  { inactiveIcon: "/images/Group4NotActive3.svg", activeIcon: "/images/Group4Active3.svg", label: "Effective Planning with Clear understanding of resources" },
  { inactiveIcon: "/images/Group4NotActive4.svg", activeIcon: "/images/Group4Active4.svg", label: "Industry Best Practice" },
];

export const ReportsItems = [
  { inactiveIcon: "/images/Group5NotActive1.svg", activeIcon: "/images/Group5Active1.svg", label: "SAMREC" },
  { inactiveIcon: "/images/Group5NotActive2.svg", activeIcon: "/images/Group5Active2.svg", label: "NI 43-101" },
  { inactiveIcon: "/images/Group5NotActive3.svg", activeIcon: "/images/Group5Active3.svg", label: "SK 1300" },
  { inactiveIcon: "/images/Group5NotActive4.svg", activeIcon: "/images/Group5Active4.svg", label: "JORC" },
];

export const DilligenceItems = [
  { inactiveIcon: "/images/Group6NotActive1.svg", activeIcon: "/images/Group6Active1.svg", label: "Legal and financial standing" },
  { inactiveIcon: "/images/Group6NotActive2.svg", activeIcon: "/images/Group6Active2.svg", label: "Technical feasibility" },
  { inactiveIcon: "/images/Group6NotActive3.svg", activeIcon: "/images/Group6Active3.svg", label: " Environmental compliance" }, // Note leading space in original label
  // { inactiveIcon: "/images/Group6NotActive4.svg", activeIcon: "/images/SGroup6Active4.svg", label: "Operational risks" },
  { inactiveIcon: "/images/Group6NotActive5.svg", activeIcon: "/images/Group6Active5.svg", label: "Social impact and community relations" },
  { inactiveIcon: "/images/Group6NotActive6.svg", activeIcon: "/images/Group6Active6.svg", label: "Resource and reserve verification" },
  { inactiveIcon: "/images/Group6NotActive7.svg", activeIcon: "/images/Group6Active7.svg", label: "Licensing and regulatory requirements" },
  { inactiveIcon: "/images/Group6NotActive8.svg", activeIcon: "/images/Group6Active8.svg", label: "Health and safety standards" },
  { inactiveIcon: "/images/Group6NotActive9.svg", activeIcon: "/images/Group6Active9.svg", label: "Market and economic factors" },
];

// --- Tab Names ---
export const CorporateAdvisorytabs = [
  "Corporate Strategy",
  "Risk Identification and Management",
  "Valuations",
  "Mineral Resource and Reserve Estimates",
  "Competent Person's Reports",
  "Due Diligence",
];



// --- Structured Tab Content Data ---
export const CorporateAdvisoryTabData = {
  "Corporate Strategy": {
    type: "standard", // Identifier for the rendering component/layout
    logoTitle: "Corporate Strategy",
    image: "/images/Group 1 icon.svg",
    altText: "Corporate Strategy Graphic",
    heading: "INDEPENDENT CORPORATE STRATEGY SERVICES FOR THE FINANCING AND STRATEGIC DEVELOPMENT OF MINERAL ASSETS.",
    p1Strong: "Navigating the complexities of mineral financing and development can be daunting.",
    p1Regular: "With deep insights into the requirements of funding institutions, Sound Mining ensures you have the insights and connections needed to evaluate opportunities and secure funding. By leveraging deep industry expertise, you’re equipped to make informed decisions that unlock the true potential of your mineral projects.",
    subHeading: "Successful financing and development of mineral assets in collaboration with:",
    items: CorporateStrategyItems, // Use the specific items array
    ctaText: "Speak to an Expert", // Assuming CTA from original HTML structure
    ctaHref: "/contact" // Assuming CTA href from original
  },
  "Risk Identification and Management": {
    type: "standard",
    logoTitle: "Risk Identification", // Adjust if needed
    image: "/images/Group 2 icon.svg",
    altText: "Risk Management Graphic",
    heading: "Protect investments with tailored strategies that mitigate risks across technical, financial, and environmental challenges, enabling smarter decisions.",
    p1Strong: "Mineral projects come with a host of risks—technical, financial, environmental, and beyond.",
    p1Regular: "Sound Mining’s comprehensive risk assessments and expert guidance help you identify and mitigate these challenges with confidence. From due diligence to governance analysis, each service is designed to strengthen your position and safeguard your investments with a trusted, data-driven approach.",
    subHeading: "Risk assessments to identify:",
    items: CorporateRiskItems,
    ctaText: "Speak to an Expert",
    ctaHref: "/contact"
  },
  "Valuations": {
  type: "standard",
  logoTitle: "Valuations",
  image: "/images/Group 3 icon.svg",
  altText: "Valuations Graphic",
  heading: "Make informed decisions with clarity informed by precise, globally compliant valuations that enhance the value and potential of mineral assets.",
  p1Strong: "Understanding the true value of your mineral assets is critical for strategic decision-making.",
  p1Regular: "Sound Mining provides globally recognised, code-compliant valuations aligned with standards like SAMVAL, CIMVAL, and VALMIN. These reliable valuations not only comply with international best practices but also deliver clarity and confidence for investors, enabling you to maximise asset value.",
  extraImage: "/updatedImages/IMVAL.webp", // Your custom image here
  ctaText: "Speak to an Expert",
  ctaHref: "/contact"
},

  // "Valuations": {
  //   type: "standard",
  //   logoTitle: "Valuations",
  //   image: "/images/Group 3 icon.svg",
  //   altText: "Valuations Graphic",
  //   heading: "Make informed decisions with clarity informed by precise, globally compliant valuations that enhance the value and potential of mineral assets.",
  //   p1Strong: "Understanding the true value of your mineral assets is critical for strategic decision-making.",
  //   p1Regular: "Sound Mining provides globally recognised, code-compliant valuations aligned with standards like SAMVAL, CIMVAL, and VALMIN. These reliable valuations not only comply with international best practices but also deliver clarity and confidence for investors, enabling you to maximise asset value.",
  //   subHeading: "Compliant with following international standards:",
  //   items: ValuationsItems,
  //   ctaText: "Speak to an Expert",
  //   ctaHref: "/"
  // },
   "Mineral Resource and Reserve Estimates": {
    type: "standard",
    logoTitle: "Resource Estimates",
    image: "/images/Group 4 icon.svg",
    altText: "Mineral Resource Estimates Graphic",
    heading: "Leverage accurate, code-compliant resource estimates to plan and optimise mining operations with clarity and precision.",
    // Removed p1Strong as it was empty in the original HTML string
    // Combined p1Regular from original subHeading and empty paragraph
    p1Regular: "Accurate resource and reserve estimates form the foundation of any successful mining operation. Sound Mining delivers detailed estimates incorporating mine designs, schedules, and modifying factors, ensuring you have a clear understanding of resources for effective planning and optimal development, following industry best practices.",
    subHeading: "Key aspects include:", // Using the non-empty text as the subheading
    items: MineralItems,
    ctaText: "Speak to an Expert",
    ctaHref: "/contact"
  },
  "Competent Person's Reports": {
    type: "standard",
    logoTitle: "CPR Reports",
    image: "/images/Group 5 icon.svg",
    altText: "Competent Person's Reports Graphic",
    heading: "Achieve credibility and meet industry standards with detailed, compliant reports recognised by investors and regulators worldwide.",
    p1Strong: "Regulatory compliance and investor trust hinge on high-quality reporting.",
    p1Regular: "Sound Mining’s Competent Person’s Reports adhere to international best practice standards, backed by years of experience. These reports give you the credibility to meet regulatory requirements and establish confidence with stakeholders, whether for exploration or project development.",
    subHeading: "Reports compiled based on:",
    items: ReportsItems,
    ctaText: "Speak to an Expert",
    ctaHref: "/contact"
  },
  "Due Diligence": {
    type: "standard",
    logoTitle: "Due Diligence",
    image: "/images/Group 6 icon.svg",
    altText: "Due Diligence Graphic",
    heading: "Make informed decisions with thorough due diligence, ensuring compliance, risk mitigation, and investor confidence.",
    p1Strong: "Mitigate risk and secure investment with expert due diligence.",
    p1Regular: "Sound Mining independently verifies mineral resources, valuations, and compliance, ensuring informed decision-making. Our thorough assessments identify risks, validate technical data, and align projects with industry standards, giving investors confidence in project viability.",
    subHeading: "Our due diligence studies assess a wide range of factors, such as:",
    items: DilligenceItems,
    ctaText: "Speak to an Expert",
    ctaHref: "/contact"
  },
};

// REMOVED the combined CorporateAdvisoryItems export as it's no longer needed.