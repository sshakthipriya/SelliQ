import React, { useEffect, useState } from "react";
import { Table, Spin, Tag, Typography, Alert } from "antd";
import "./index.scss";

const { Text } = Typography;

const sampleData = [
  {
    key: "1",
    name: "Customer A",
    email: "customerA@example.com",
    response: {
      reconstructed_email_thread: "Email thread with Customer A discussing the new product launch.",
      lead_score_breakdown: {
        base_score: 100,
        response_rate_points: 15,
        avg_response_time_points: 10,
        positive_sentiment_points: 10,
        budget_discussed_points: 15,
        multiple_stakeholders_points: 10,
        meeting_scheduled_points: 15,
        technical_questions_points: 10,
        company_size_points: 5,
        decision_maker_points: 10,
        no_response_penalty: 0,
        negative_sentiment_penalty: 0,
        price_objection_penalty: 0,
        ghosting_penalty: 0,
        final_score: 95
      },
      conversion_likelihood: { category: "Hot Lead", reason: "Fast response, meeting scheduled, budget discussed" },
      lead_fit_analysis: { fit_rating: "Excellent", budget_alignment: "Aligned", technical_alignment: "High", company_stage_alignment: "Mid-market", overall_fit_reason: "Decision maker involved and responsive" },
      pitch_quality_evaluation: { strengths: "Clear explanation of product value", weaknesses: "Needs deeper technical details", missed_opportunities: "Upsell options not discussed", recommended_focus_areas: "Technical demo" },
      next_steps: { followup_messages: ["Send demo", "Confirm next meeting", "Share proposal"], ghosting_nudges: ["Follow-up email after 3 days"], strong_conversion_attempt: "Schedule final negotiation call", value_reinforcement_message: "Highlight cost savings" }
    }
  },
  {
    key: "2",
    name: "Customer B",
    email: "customerB@example.com",
    response: {
      reconstructed_email_thread: "Customer B asked about integrations and pricing tiers.",
      lead_score_breakdown: {
        base_score: 100,
        response_rate_points: 10,
        avg_response_time_points: 5,
        positive_sentiment_points: 10,
        budget_discussed_points: 0,
        multiple_stakeholders_points: 5,
        meeting_scheduled_points: 10,
        technical_questions_points: 10,
        company_size_points: 5,
        decision_maker_points: 5,
        no_response_penalty: 0,
        negative_sentiment_penalty: 0,
        price_objection_penalty: -10,
        ghosting_penalty: 0,
        final_score: 60
      },
      conversion_likelihood: { category: "Warm Lead", reason: "Some engagement, but pricing concerns" },
      lead_fit_analysis: { fit_rating: "Moderate", budget_alignment: "Partial", technical_alignment: "High", company_stage_alignment: "SMB", overall_fit_reason: "Technical interest but price objections" },
      pitch_quality_evaluation: { strengths: "Responsive and detailed questions", weaknesses: "Budget not fully aligned", missed_opportunities: "Upsell not introduced", recommended_focus_areas: "Address pricing concerns" },
      next_steps: { followup_messages: ["Send pricing breakdown", "Schedule technical Q&A"], ghosting_nudges: ["Gentle reminder email after 3 days"], strong_conversion_attempt: "Offer discount or package deal", value_reinforcement_message: "Highlight ROI" }
    }
  },
  {
    key: "3",
    name: "Customer C",
    email: "customerC@example.com",
    response: {
      reconstructed_email_thread: "Customer C initially showed interest but did not respond after proposal.",
      lead_score_breakdown: {
        base_score: 100,
        response_rate_points: 0,
        avg_response_time_points: 0,
        positive_sentiment_points: 0,
        budget_discussed_points: 0,
        multiple_stakeholders_points: 0,
        meeting_scheduled_points: 0,
        technical_questions_points: 0,
        company_size_points: 5,
        decision_maker_points: 0,
        no_response_penalty: -10,
        negative_sentiment_penalty: -15,
        price_objection_penalty: 0,
        ghosting_penalty: -20,
        final_score: 30
      },
      conversion_likelihood: { category: "Low Priority", reason: "No response after proposal, negative sentiment detected" },
      lead_fit_analysis: { fit_rating: "Poor", budget_alignment: "Unknown", technical_alignment: "Unknown", company_stage_alignment: "SMB", overall_fit_reason: "Ghosted after proposal" },
      pitch_quality_evaluation: { strengths: "Initial engagement", weaknesses: "No follow-up received", missed_opportunities: "N/A", recommended_focus_areas: "Passive nurturing" },
      next_steps: { followup_messages: ["Send gentle reminder after 2 weeks"], ghosting_nudges: ["Check back after 1 month"], strong_conversion_attempt: "N/A", value_reinforcement_message: "N/A" }
    }
  }
];


const EmailTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const fetchData = async () => {
      try {
        const res = await fetch("https://api.example.com/customers", { signal: controller.signal });
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        // Map API data to table structure
        const tableData = json.map((item, idx) => ({
          key: idx + 1,
          name: item.name,
          email: item.email,
          response: item.response
        }));

        setData(tableData);
      } catch (err) {
        console.error(err);
        setError(true);
        setData(sampleData); // fallback
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    fetchData();

    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text copyable>{text}</Text>
    },
    {
      title: "Final Score",
      dataIndex: ["response", "lead_score_breakdown", "final_score"],
      key: "final_score",
      render: (score) => (
        <Tag color={score > 80 ? "green" : score > 60 ? "orange" : "volcano"}>{score}</Tag>
      )
    },
    {
      title: "Lead Category",
      dataIndex: ["response", "conversion_likelihood", "category"],
      key: "category",
      render: (cat) => (
        <Tag color={cat === "Hot Lead" ? "red" : cat === "Warm Lead" ? "orange" : "blue"}>{cat || "N/A"}</Tag>
      )
    }
  ];

  return (
    <div style={{ padding: 20 , marginLeft: "20rem"}} className="tableLayout">
      <h2 style={{ marginBottom: 20, color: "#1f2937", fontSize: "28px" }}>
        Turn Conversations into Insights — Track, Score, and Prioritize Your Leads
      </h2>

      {loading && (
        <Spin tip="Loading..." style={{ marginTop: 50, display: "block", textAlign: "center" }} />
      )}

      {!loading && (
        <>

          <Table
            columns={columns}
            dataSource={data}
            bordered
            expandable={{
              expandedRowRender: (record) => {
                const { response } = record;
                return (
                  <div style={{ background: "#f9f9f9", padding: 15 }}>
                    <h4>Reconstructed Email Thread</h4>
                    <p>{response.reconstructed_email_thread || "N/A"}</p>

                    <h4>Lead Score Breakdown</h4>
                    <ul>
                      {Object.entries(response.lead_score_breakdown).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v}
                        </li>
                      ))}
                    </ul>

                    <h4>Conversion Likelihood</h4>
                    <p>
                      <strong>Category:</strong> {response.conversion_likelihood.category || "N/A"} <br />
                      <strong>Reason:</strong> {response.conversion_likelihood.reason || "N/A"}
                    </p>

                    <h4>Lead Fit Analysis</h4>
                    <ul>
                      {Object.entries(response.lead_fit_analysis).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v || "N/A"}
                        </li>
                      ))}
                    </ul>

                    <h4>Pitch Quality Evaluation</h4>
                    <ul>
                      {Object.entries(response.pitch_quality_evaluation).map(([k, v]) => (
                        <li key={k}>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v || "N/A"}
                        </li>
                      ))}
                    </ul>

                    <h4>Next Steps</h4>
                    <p>
                      <strong>Follow-up Messages:</strong> {response.next_steps.followup_messages.join(", ") || "N/A"}
                      <br />
                      <strong>Ghosting Nudges:</strong> {response.next_steps.ghosting_nudges.join(", ") || "N/A"}
                      <br />
                      <strong>Strong Conversion Attempt:</strong> {response.next_steps.strong_conversion_attempt || "N/A"}
                      <br />
                      <strong>Value Reinforcement Message:</strong> {response.next_steps.value_reinforcement_message || "N/A"}
                    </p>
                  </div>
                );
              },
              rowExpandable: (record) => true
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
