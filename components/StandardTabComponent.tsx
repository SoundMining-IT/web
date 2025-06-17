// StandardTabsComponent.tsx
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Type definitions (ensure these match or are imported if defined elsewhere)
type TabItemOriginal = {
  // Renamed to avoid conflict if StandardTabContent also defines TabItem
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

export type TabContentData = {
  type: string; // e.g., "standard"
  items?: TabItemOriginal[]; // Used for the subtabs within StandardTabContent
  logoTitle?: string;
  image: string;
  altText: string;
  heading: string;
  p1Strong?: string;
  p1Regular: string;
  subHeading?: string;
  extraImage?: string;
  ctaText: string;
  ctaHref: string;
};

export type TabsProps = {
  tabs: string[]; // Names of the main tabs
  tabContents: { [key: string]: TabContentData }; // Data for each main tab
};

// Dynamically import StandardTabContent
// The props type for StandardTabContent is TabContentData because that's what we spread onto it
const DynamicStandardTabContent = dynamic<TabContentData>(
  () => import("./StandardTabContent"), // Path to your StandardTabContent.tsx
  {
    loading: () => (
      <p style={{ textAlign: "center", padding: "20px" }}>Loading section...</p>
    ),
    ssr: false, // Consider ssr: false if content is very client-interactive and not needed for SEO
  }
);

const StandardTabsComponent: React.FC<TabsProps> = ({ tabs, tabContents }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    const currentTabName = tabs[activeTab];
    const contentData = tabContents[currentTabName];

    if (!contentData) {
      return <p>No content available for {currentTabName}.</p>;
    }

    if (contentData.type === "standard") {
      // Pass all contentData as props to the dynamically loaded component
      return <DynamicStandardTabContent {...contentData} />;
    } else {
      console.warn(
        `Unknown tab content type: ${contentData.type} for tab ${currentTabName}`
      );
      return <p>Content format not recognized for {currentTabName}.</p>;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <span>{tab}</span>
          </div>
        ))}
      </div>
      <div className="tabs-content">
        <div className="content-area">
          <Suspense
            fallback={
              <p style={{ textAlign: "center", padding: "20px" }}>
                Please wait...
              </p>
            }
          >
            {renderTabContent()}
          </Suspense>
        </div>
      </div>
      <style jsx>{`
        .tabs-header {
          display: flex; /* Basic flex layout for tabs */
        }

        .tab-item:hover {
          color: #000;
        }
        .tab-item.active {
          color: #990033; /* Active tab text color */
        }
        .tab-item.active::after {
          content: "";
          position: absolute;
          bottom: -1px; /* Align with the border-bottom of .tabs-header */
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #990033;
        }
        .tabs-content {
          padding-top: 25px;
        }
        /* .content-area styling can be added if needed */
      `}</style>
    </div>
  );
};

export default StandardTabsComponent;
