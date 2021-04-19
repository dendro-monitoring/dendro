// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import getLogEvents from "../../aws/cloudwatch/getLogEvents";
import getLogEvents from "../../aws/orchestrator/getLogEvents";

export default async (req, res) => {
  const logs = await getLogEvents();
  res.status(200).json({ logs });
};
