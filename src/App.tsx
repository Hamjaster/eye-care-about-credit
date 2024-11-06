import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginSignup from "./pages/LoginSignupPage";
import PricingPage from "./pages/PricingPage";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./components/dashboard/Dashboard";
import Clients from "./components/dashboard/Clients";
import DisputeLetters from "./components/dashboard/DisputeLetters";
import MyCompany from "./components/dashboard/MyCompany";
import RolesAndPermission from "./components/dashboard/MyCompany/Roles";
import AccountPage from "./components/dashboard/MyAcoount";
import Documents from "./components/dashboard/Documents";
import ClientDashboard from "./components/dashboard/ClientDashboard/ClientDashboard";
import ProgressPage from "./components/dashboard/Documents/ProgressPage";
import TasksPage from "./components/dashboard/Documents/TasksPage";
import FilesPage from "./components/dashboard/Documents/FilesPage";
import MessagesPage from "./components/dashboard/Messages";
import DisputeWorkflow from "./components/dashboard/DisputeWorkflow";
import DisputeLetter from "./components/dashboard/DisputeWorkflow/DisputeLetter";
import SendLetter from "./components/dashboard/DisputeWorkflow/SendLetter";
import PreviewLetters from "./components/dashboard/DisputeWorkflow/PreviewLetters";
import ClientPortal from "./components/client portal";
import Home from "./components/client portal/Home";
import DisputeDetails from "./components/client portal/DisputeDetails";
import Settings from "./components/client portal/Settings";
import Invoices from "./components/dashboard/Invoices";
import ContactPage from "./components/Contact";
import DisputeWorkflowLayout from "./components/dashboard/DisputeWorkflow/DisputeWorkflowLayout";
import Creditors from "./components/dashboard/Creditors";

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="contact" element={<ContactPage />} />
          <Route index element={<Dashboard />} /> {/* Default dashboard page */}
          <Route path="clients" element={<Clients />} />
          <Route path="creditors" element={<Creditors />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="client-credit" element={<ClientDashboard />} />
          <Route
            path="client-credit/dispute-items"
            element={<DisputeWorkflowLayout />}
          >
            <Route index element={<DisputeWorkflow />} />
            <Route path="letter" element={<DisputeLetter />} />
            <Route path="send-letters" element={<SendLetter />} />
          </Route>
          {/* <Route
            path="client-credit/dispute/letter"
            element={<DisputeLetter />}
          />
          <Route
            path="client-credit/dispute/letter/send"
            element={<SendLetter />}
          /> */}
          <Route path="dispute-letters" element={<DisputeLetters />} />
          <Route path="my-company" element={<MyCompany />} />
          <Route path="my-account" element={<AccountPage />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/progress" element={<ProgressPage />} />
          <Route path="documents/tasks" element={<TasksPage />} />
          <Route path="documents/files" element={<FilesPage />} />
        </Route>
        <Route path="/client-portal" element={<ClientPortal />}>
          <Route index element={<Home />} /> {/* Default client portal page */}
          <Route path="dispute-details" element={<DisputeDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
