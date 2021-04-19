import query from "../../aws/orchestrator/query";

export default async (req, res) => {
  const q = JSON.parse(req.body).query;
  const results = await query(q);
  res.status(200).json({ data: results });
};
