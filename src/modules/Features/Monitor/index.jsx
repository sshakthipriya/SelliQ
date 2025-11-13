import React, { useState } from "react";
import "./index.scss";

const Monitor = () => {
  const data = [
    {
      id: 1,
      name: "Vercel",
      description:
        "Vercel is a cloud platform for static sites and Serverless Functions. It enables developers to deploy websites instantly with zero configuration, integrates seamlessly with Git, and provides serverless APIs and edge functions for dynamic experiences.",
      recentLinks: ["https://www.linkedin.com/posts/vercel_how-nous-research-used-botid-to-block-automated-activity-7394503278987878400-_nrd/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADCtlOgB-McCJjdv-NQXpM2_m2HrkcGBkQU", "https://www.linkedin.com/posts/vercel_vercel-the-anti-vendor-lock-in-cloud-vercel-activity-7393778486882050048-Ykxx?utm_source=share&utm_medium=member_desktop&rcm=ACoAADCtlOgB-McCJjdv-NQXpM2_m2HrkcGBkQU"],
      updates:
        "Pricing for Pro plan updated to $20/month.",
    },
    {
      id: 2,
      name: "Render",
      description:
        "Render provides cloud hosting for web apps, APIs, and static sites with automated deploys from Git. Developers can use managed databases, cron jobs, and private services easily.",
      recentLinks: ["https://render.com/blog/1", "https://render.com/blog/2"],
      updates:
        "Feature update: Background jobs can now run longer than 15 minutes. Pricing for Starter plan adjusted. Added support for automatic TLS certificate renewal for custom domains.",
    },
    {
      id: 3,
      name: "Stacktape",
      description:
        "Stacktape helps monitor deployments and logs in one place.",
      recentLinks: [
        "https://stacktape.com/blog/1",
        "https://stacktape.com/blog/2",
      ],
      updates:
        "New feature: Real-time alert notifications via Slack. Dashboard redesigned for better usability. Pricing for Enterprise plan updated to include unlimited logs and integrations.",
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="monitor-container">
      <h2>Competitors</h2>
      <div className="cards">
        {data.map((item) => (
          <div key={item.id} className="card" onClick={() => setSelected(item)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <h4>Recent Posts:</h4>
            <ul>
              {selected.recentLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <h4>Updates</h4>
            <p>{selected.updates}</p>
            <button className="close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitor;
