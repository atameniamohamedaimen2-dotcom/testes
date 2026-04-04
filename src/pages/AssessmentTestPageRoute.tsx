import { useParams } from "react-router-dom";
import AssessmentTestPage from "./AssessmentTestPage";

export default function AssessmentTestPageRoute() {
  const params = useParams();
  return <AssessmentTestPage key={params.assessmentId ?? ""} />;
}
