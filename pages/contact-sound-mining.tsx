import React, { useEffect } from "react";

const RedirectPage = () => {
  useEffect(() => {
    window.location.href = "https://soundmining.com/contact";
  }, []);

  return <div>Redirecting to contact page...</div>;
};

export default RedirectPage;
