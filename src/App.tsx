import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import AssessmentInfoPage from "./pages/AssessmentInfoPage";
import AssessmentTestPageRoute from "./pages/AssessmentTestPageRoute";
import AssessmentsPage from "./pages/AssessmentsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="assessments/iq" element={<Navigate to="/" replace />} />
        <Route path="assessments/iq/test" element={<Navigate to="/test" replace />} />
        <Route path="assessments/:assessmentId" element={<AssessmentInfoPage />} />
        <Route path="assessments/:assessmentId/test" element={<AssessmentTestPageRoute />} />

        <Route path="iq" element={<Navigate to="/" replace />} />
        <Route path="iq/test" element={<Navigate to="/test" replace />} />
        <Route path="mbti" element={<Navigate to="/assessments/mbti" replace />} />
        <Route path="mbti/test" element={<Navigate to="/assessments/mbti/test" replace />} />
        <Route path="big-five" element={<Navigate to="/assessments/big-five" replace />} />
        <Route path="big-five/test" element={<Navigate to="/assessments/big-five/test" replace />} />
        <Route path="disc" element={<Navigate to="/assessments/disc" replace />} />
        <Route path="disc/test" element={<Navigate to="/assessments/disc/test" replace />} />
        <Route path="enneagram" element={<Navigate to="/assessments/enneagram" replace />} />
        <Route path="enneagram/test" element={<Navigate to="/assessments/enneagram/test" replace />} />
        <Route path="holland" element={<Navigate to="/assessments/holland" replace />} />
        <Route path="holland/test" element={<Navigate to="/assessments/holland/test" replace />} />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
