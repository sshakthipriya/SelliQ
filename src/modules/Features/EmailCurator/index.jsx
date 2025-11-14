import React, { useEffect, useState } from "react";
import { Table, Spin, Tag, Typography, Alert } from "antd";
import "./index.scss";
import axios from "axios";

const { Text } = Typography;

const sampleData = {
  results: [
    {
      client_name: "scrapez",
      client_email: "lavak2509@gmail.com",
      reconstructed_email_thread:
        "Exploring Compatibility with Revolte Cloud Platform\n\n[Me] Hi there,\nI hope this message finds you well! I wanted to reach out and introduce you to Revolte, a cloud platform designed specifically for modern web development needs. We’ve helped companies like yours transition to more scalable and secure cloud-based solutions.\n\n[Lead] Thanks for reaching out! Can you provide more details on how Revolte can benefit a large-scale tech enterprise like us?\n\n[Me] Absolutely! Revolte offers a variety of features aimed at enhancing development speed and operational security. For example, our platform supports a range of frameworks and integrates seamlessly with CI/CD processes. Moreover, we prioritize security with built-in DDoS protection and comprehensive auditing capabilities.\n\n[Lead] That sounds interesting. We place a strong emphasis on security and compliance. How does Revolte ensure data security, particularly for sensitive information?\n\n[Me] Great question! Revolte employs a multi-layered security model, ensuring that data is encrypted both at rest and in transit. We also offer customizable access controls to manage permissions effectively. Would you be available for a quick meeting to discuss this further?\n\n[Lead] I can do a meeting next week. Let’s schedule a time!\n\n[Me] Perfect! I’ll send a calendar invite for next week. Looking forward to our conversation.\n\n[Lead] Sounds good. Looking forward to it as well.",
      lead_score_breakdown: {
        base_score: 100,
        response_rate_points: 15,
        avg_response_time_points: 0,
        positive_sentiment_points: 10,
        budget_discussed_points: 0,
        multiple_stakeholders_points: 0,
        meeting_scheduled_points: 15,
        technical_questions_points: 10,
        company_size_points: 10,
        decision_maker_points: 0,
        no_response_penalty: 0,
        negative_sentiment_penalty: 0,
        price_objection_penalty: 0,
        ghosting_penalty: 0,
        final_score: 140,
      },
      conversion_likelihood: {
        category: "HOT LEAD",
        reason:
          "The lead has shown a high level of engagement, technical interest, and has scheduled a meeting.",
      },
      lead_fit_analysis: {
        fit_rating: "Excellent",
        budget_alignment:
          "Strong alignment with potential for enterprise pricing discussions.",
        technical_alignment:
          "High, as they require capabilities in web development and cloud applications.",
        company_stage_alignment:
          "Perfect fit for their stage as a large-scale technology enterprise needing robust cloud solutions.",
        overall_fit_reason:
          "Scrapez's focus on modern technologies and the large skilled workforce aligns well with Revolte's offerings.",
      },
      pitch_quality_evaluation: {
        strengths:
          "The pitch effectively highlighted security features, scalability, and alignment with modern development workflows.",
        weaknesses:
          "Could improve on discussing pricing structures for enterprise clients.",
        missed_opportunities:
          "Opportunity to elaborate on community support and onboarding processes.",
        recommended_focus_areas:
          "Emphasize cost savings by consolidating tools and the value of high-level enterprise support.",
      },
      next_steps: {
        followup_messages: [
          "Looking forward to our meeting next week! Please let me know your preferred time.",
          "After our discussion, I will provide tailored case studies relevant to Scrapez's use cases.",
          "If you have any questions before our meeting, feel free to reach out!",
        ],
        ghosting_nudges: [
          "Just checking in regarding our proposed meeting next week!",
          "I hope all is well! Looking forward to our conversation about Revolte.",
        ],
        strong_conversion_attempt:
          "I'm excited about the potential for Revolte to enhance your operations at Scrapez. Let's discuss how we can customize our offerings to drive significant value for your team.",
        value_reinforcement_message:
          "Revolte can help your team innovate faster while ensuring security and compliance—setting the stage for long-term success.",
      },
    },
    {
      client_name: "twellix",
      client_email: "srinithiarangannal@gmail.com",
      reconstructed_email_thread:
        "Hi Srinithi,\n\nI hope this message finds you well. I wanted to reach out to discuss how Revolte can help Twellix streamline its web development processes and enhance the digital experiences you offer to your clients.\n\nAt Revolte, we specialize in providing a cloud platform tailored for developers. Our solutions ensure that you can focus on building fast and reliable applications while we take care of the underlying infrastructure and security. Given Twellix’s focus on building user-friendly digital products, I believe a partnership could be beneficial.\n\nLooking forward to hearing your thoughts.\n\nBest,\n[Your Name]\n\n---\n\nHi [Your Name],\n\nThanks for reaching out! I’m interested in learning how Revolte’s platform can assist us in improving our development workflows. Could you provide more details around your features, especially regarding security and pricing?\n\nCheers,\nSrinithi\n\n---\n\nHi Srinithi,\n\nAbsolutely! Our platform offers a robust security model and various pricing options that could fit a startup like Twellix. We emphasize flexibility and affordability while ensuring strong security protocols are in place. Let’s set up a call to discuss your specific needs and how Revolte can align with your goals.\n\nBest,\n[Your Name]\n\n---\n\nHi [Your Name],\n\nThat sounds good. How about we schedule a meeting for later this week?\n\nThanks,\nSrinithi",
      lead_score_breakdown: {
        base_score: 100,
        response_rate_points: 15,
        avg_response_time_points: 10,
        positive_sentiment_points: 10,
        budget_discussed_points: 0,
        multiple_stakeholders_points: 0,
        meeting_scheduled_points: 15,
        technical_questions_points: 0,
        company_size_points: 5,
        decision_maker_points: 10,
        no_response_penalty: 0,
        negative_sentiment_penalty: 0,
        price_objection_penalty: 0,
        ghosting_penalty: 0,
        final_score: 145,
      },
      conversion_likelihood: {
        category: "HOT LEAD",
        reason:
          "Strong interest shown in the product and a scheduled meeting indicates high potential for conversion.",
      },
      lead_fit_analysis: {
        fit_rating: "Good",
        budget_alignment: "Budget discussed but specifics not provided.",
        technical_alignment:
          "Twellix's web development focus aligns well with Revolte's features for developers.",
        company_stage_alignment:
          "Emerging startup fits with Revolte's scalable solutions for growth.",
        overall_fit_reason:
          "Twellix's needs for fast and reliable digital product development align with Revolte's capabilities.",
      },
      pitch_quality_evaluation: {
        strengths:
          "Focused on relevancy to Twellix, highlighting benefits of flexibility and security.",
        weaknesses:
          "Could provide more specific examples of similar case studies or success stories.",
        missed_opportunities:
          "Opportunity to elaborate on the pricing structure to address any cost concerns.",
        recommended_focus_areas:
          "Highlight security features, integration capabilities, and provide specific pricing options relevant to startups.",
      },
      next_steps: {
        followup_messages: [
          "Hi Srinithi, just checking in to see if you had a chance to review our features before our call.",
          "Hello! I want to ensure we are prepared for our discussion. Is there anything specific you would like to address?",
          "Hi, I'm looking forward to our meeting! Please let me know if you would like to explore other features.",
        ],
        ghosting_nudges: [
          "Hi Srinithi, I haven’t heard back from you after our last conversation. Is there anything more you need?",
          "Just a quick reminder of our upcoming meeting. Looking forward to our chat!",
        ],
        strong_conversion_attempt:
          "I'm excited to see how Revolte can empower Twellix to reach its full potential in web development, especially as you grow.",
        value_reinforcement_message:
          "Revolte's platform not only enhances deployment efficiency but also significantly reduces operational costs through streamlined infrastructure management.",
      },
    },
  ],
};

const EmailTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const timeout = setTimeout(() => controller.abort(), 10000);

  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("https://your-api-url.com/investors")
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       const json = await res.json();

  //       // Map API data to table structure
  //       const tableData = json.map((item, idx) => ({
  //         key: idx + 1,
  //         name: item.name,
  //         email: item.email,
  //         response: item.response,
  //       }));

  //       setData(tableData);
  //     } catch (err) {
  //       console.error(err);
  //       setError(true);
  //       setData(sampleData); // fallback
  //     } finally {
  //       setLoading(false);
  //       clearTimeout(timeout);
  //     }
  //   };

  //   fetchData();

  //   return () => clearTimeout(timeout);
  // }, []);

  useEffect(() => {
    axios
      .get("https://953dba5921e5.ngrok-free.app/api/v1/emailInsight")
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching investors:", error);
        setData(sampleData?.results);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="Investor">
        <p>Loading investor suggestions...</p>
      </div>
    );
  }

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "client_name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "client_email",
      key: "email",
      render: (text) => <Text copyable>{text}</Text>,
    },
    {
      title: "Final Score",
      dataIndex: ["lead_score_breakdown", "final_score"],
      key: "final_score",
      render: (score) => (
        <Tag color={score > 80 ? "green" : score > 60 ? "orange" : "volcano"}>
          {score}
        </Tag>
      ),
    },
    {
      title: "Lead Category",
      dataIndex: ["conversion_likelihood", "category"],
      key: "category",
      render: (cat) => (
        <Tag
          color={
            cat === "Hot Lead" ? "red" : cat === "Warm Lead" ? "orange" : "blue"
          }
        >
          {cat || "N/A"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, marginLeft: "20rem" }} className="tableLayout">
      <h2 style={{ marginBottom: 20, color: "#1f2937", fontSize: "28px" }}>
        Turn Conversations into Insights — Track, Score, and Prioritize Your
        Leads
      </h2>

      {loading && (
        <Spin
          tip="Loading email insights..."
          style={{ marginTop: 50, display: "block", textAlign: "center" }}
        />
      )}

      {!loading && (
        <>
          <Table
            columns={columns}
            dataSource={data?.map((d, index) => ({ ...d, key: index + 1 }))}
            bordered
            expandable={{
              expandedRowRender: (record) => {
                const {
                  lead_score_breakdown,
                  conversion_likelihood,
                  lead_fit_analysis,
                  pitch_quality_evaluation,
                  next_steps,
                } = record;
                return (
                  <div style={{ background: "#f9f9f9", padding: 15 }}>
                    <h4>Lead Score Breakdown</h4>
                    <ul>
                      {Object.entries(lead_score_breakdown).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v}
                        </li>
                      ))}
                    </ul>

                    <h4>Conversion Likelihood</h4>
                    <p>
                      <strong>Category:</strong>{" "}
                      {conversion_likelihood.category || "N/A"} <br />
                      <strong>Reason:</strong>{" "}
                      {conversion_likelihood.reason || "N/A"}
                    </p>

                    <h4>Lead Fit Analysis</h4>
                    <ul>
                      {Object.entries(lead_fit_analysis).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v || "N/A"}
                        </li>
                      ))}
                    </ul>

                    <h4>Pitch Quality Evaluation</h4>
                    <ul>
                      {Object.entries(pitch_quality_evaluation).map(
                        ([k, v]) => (
                          <li key={k}>
                            <strong>{k.replace(/_/g, " ")}:</strong>{" "}
                            {v || "N/A"}
                          </li>
                        )
                      )}
                    </ul>

                    <h4>Next Steps</h4>
                    <p>
                      <strong>Follow-up Messages:</strong>{" "}
                      {next_steps.followup_messages.join(", ") || "N/A"}
                      <br />
                      <strong>Ghosting Nudges:</strong>{" "}
                      {next_steps.ghosting_nudges.join(", ") || "N/A"}
                      <br />
                      <strong>Strong Conversion Attempt:</strong>{" "}
                      {next_steps.strong_conversion_attempt || "N/A"}
                      <br />
                      <strong>Value Reinforcement Message:</strong>{" "}
                      {next_steps.value_reinforcement_message || "N/A"}
                    </p>
                  </div>
                );
              },
              rowExpandable: (record) => true,
            }}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </>
      )}
    </div>
  );
};

export default EmailTable;
