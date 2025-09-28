import { Routes, Route ,useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/layout/theme-provider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import Layout from "./components/layout/Layout.jsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard.jsx";
import DealsDashboard from "./pages/dashboards/DealsDashboard.jsx";
import Employees from "./pages/employees/Employees.jsx" 
import EmployeeDetails from "./pages/employees/EmployeeDetails.jsx";
import Departments from "./pages/employees/Departments.jsx";
import Designations from "./pages/employees/Designations.jsx";
import Clients from "./pages/projects/Clients.jsx";
import Projects from "./pages/projects/Projects.jsx";
import Tasks from "./pages/projects/Tasks.jsx";
import Contacts from "./pages/crm/Contacts.jsx";
import Companies from "./pages/crm/Companies.jsx";
import Deals from "./pages/crm/Deals.jsx";
import Leads from "./pages/crm/Leads.jsx";
import Performance from "./pages/performance/Performance.jsx";
import Chat from "./pages/applications/Chat.jsx";
import Calendar from "./pages/applications/Calendar.jsx";
import Email from "./pages/applications/Email.jsx";
import FileManager from "./pages/applications/FileManager.jsx";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard.jsx";
import LeadsDashboard from "./pages/dashboards/LeadsDashboard.jsx";
import SupersCompanies from "./pages/SuperAdmin/SuperCompanies.jsx";
import Packages from "./pages/SuperAdmin/Packages.jsx";
import PurchaseTransaction from "./pages/SuperAdmin/PurchaseTransaction.jsx";
import Domain from "./pages/SuperAdmin/Domain.jsx";
import SuperDashboard from "./pages/SuperAdmin/Dashboard.jsx";
import Subscription from "./pages/SuperAdmin/Subscription.jsx";
import Holidays from "./pages/employees/Holidays.jsx";
import Leaves from "./pages/employees/Leaves.jsx";
import Overtime from "./pages/employees/Overtime.jsx";
import Users from "./pages/UsersMangament/User.jsx";
import RolesPermissions from "./pages/UsersMangament/roles-permissions.jsx";
import Todo from "./pages/applications/Todo.jsx";
import SocialFeed from "./pages/applications/social-feed.jsx";
import KanbanView  from "./pages/applications/kanban.jsx";
import EmployeeGrid from "./pages/employees/EmployeesGride.jsx";
import GoalTracking from "./pages/performance/GoalTracking.jsx"; 
import GoalType from "./pages/performance/GoalType.jsx";
import PerformanceIndicator from "./pages/performance/performanceindicator.jsx";
import PerformanceReview from "./pages/performance/performance-review.jsx";
import VoiceCall from "./pages/applications/voice-call.jsx";
import Pipeline from "./pages/crm/Pipeline.jsx";
import JobGrid from "./pages/RECRUITMENT/JobGrid.jsx";
import CandidatesGrid from "./pages/RECRUITMENT/CandidatesGrid.jsx";
import Referrals from "./pages/RECRUITMENT/Referrals.jsx";
import Tickets from "./pages/HRM/tickets.jsx";
import TicketDetails from "./pages/HRM/ticketsDeatil.jsx";
import AttendanceAdmin from "./pages/HRM/AttendanceAdmin.jsx";
import AttendanceEmployee from "./pages/HRM/AttendanceEmployee.jsx";
import Timesheets from "./pages/HRM/Timesheets.jsx";
import Promotion from "./pages/HRM/Promotion.jsx";
import Resignation from "./pages/HRM/Resignation.jsx";
import Termination from "./pages/HRM/Termination.jsx";
import Training from "./pages/HRM/Training.jsx";
import Trainers from "./pages/HRM/Trainers.jsx";
import TrainingType from "./pages/HRM/TrainingType.jsx";
import Estimates from "./pages/FINANCE-ACCOUNTS/Estimates.jsx"
import FiancePayments from "./pages/FINANCE-ACCOUNTS/Payments.jsx";
import Invoices from "./pages/FINANCE-ACCOUNTS/Invoices.jsx";
import Expenses from "./pages/FINANCE-ACCOUNTS/Expenses.jsx";
import ProvidentFund from "./pages/FINANCE-ACCOUNTS/ProvidentFund.jsx";
import Taxes from "./pages/FINANCE-ACCOUNTS/Taxes.jsx";
import Categories from "./pages/Accounting/categories.jsx";
import Budgets from "./pages/Accounting/budgets.jsx";
import BudgetExpenses from "./pages/Accounting/budget-expenses.jsx";
import BudgetRevenues from "./pages/Accounting/budget-revenues.jsx";
import EmployeeSalary  from "./pages/Payroll/employee-salary.jsx"
import PayslipDashboard from "./pages/Payroll/payslip.jsx";
import PayrollItem from "./pages/Payroll/Payrolitem.jsx";
import AssetCategories from "./pages/Assets/assetsCategories.jsx";
import AssetManagement from "./pages/Assets/assets.jsx";
import Knowledgebase from "./pages/Help-Supports/knowledge-base.jsx";
import ActivityPage from "./pages/Help-Supports/activity.jsx";
import ExpensesReport from "./pages/REPORTS/expenses-report.jsx";
import InvoiceReport from "./pages/REPORTS/Reportsinvoice.jsx";
import PaymentReport from "./pages/REPORTS/payment-report.jsx";
import ProjectReport from "./pages/REPORTS/project-report.jsx";
import TaskReportDashboard from "./pages/REPORTS/task-report.jsx";
import UserReportDashboard from "./pages/REPORTS/user-report.jsx";
import EmployeeReport from "./pages/REPORTS/employee-report.jsx";
import PayslipReport from "./pages/REPORTS/reportspayslip.jsx";
import AttendanceReport from "./pages/REPORTS/AttendanceReport.jsx";
import LeaveReport from "./pages/REPORTS/Reportsleave.jsx";
import DailyReport from "./pages/REPORTS/DailyReport.jsx";
import ProfileSettings from "./pages/SETTINGS/profile-settings.jsx";
import SecuritySettings from "./pages/SETTINGS/security-settings.jsx";
import NotificationSettings from "./pages/SETTINGS/notification-settings.jsx";
import ConnectedApps from "./pages/SETTINGS/connected-apps.jsx";
import BusinessSettings from "./pages/SETTINGS/Website-Settings/bussiness-settings.jsx";
import SeoSettings from "./pages/SETTINGS/Website-Settings/seo-settings.jsx";
import PerformanceAppraisal from "./pages/SETTINGS/Website-Settings/performance-appraisal.jsx";
import LanguageSettings from "./pages/SETTINGS/Website-Settings/language.jsx";
import SalarySettings from "./pages/SETTINGS/APP-Settings/salary-settings.jsx";
import ApprovalSettings from "./pages/SETTINGS/APP-Settings/approval.jsx";
import EmailSettings from "./pages/SETTINGS/SYSTEM-SALARY/email-settings.jsx";
import SmsSettings from "./pages/SETTINGS/SYSTEM-SALARY/sms-settings.jsx";
import OtpSettings from "./pages/SETTINGS/SYSTEM-SALARY/otp-settings.jsx";
import PaymentGateways from "./pages/SETTINGS/FINANCIAL-SETTING/payment-gateways.jsx";
import TaxRates from "./pages/SETTINGS/FINANCIAL-SETTING/tax-rate.jsx";
import Currencies from "./pages/SETTINGS/FINANCIAL-SETTING/Currencies.jsx";
import Pages from "./pages/CONTENT/pages.jsx"
import Blogs from "./pages/CONTENT/BLOG/AllBlogs.jsx";
import BlogCategories from "./pages/CONTENT/BLOG/BlogCategories.jsx";
import BlogComments from "./pages/CONTENT/BLOG/blog-comments.jsx";
import BlogTags from "./pages/CONTENT/BLOG/blog-tags.jsx";
import Countries from "./pages/CONTENT/LOCATION/countries.jsx";
import States from "./pages/CONTENT/LOCATION/states.jsx";
import Cities from "./pages/CONTENT/LOCATION/cities.jsx";
import Testimonials from "./pages/CONTENT/Testimonials.jsx";
import FAQ from "./pages/CONTENT/FAQ.jsx";  
import VideoCall from "./pages/applications/video-call.jsx";
import OutgoingCall from "./pages/applications/outgoing-call.jsx";
import IncomingCall from "./pages/applications/incoming-call.jsx";
import CallHistory from "./pages/applications/call-history.jsx";
import TaskBoard from "./pages/projects/TaskBoard.jsx";
import NotesApp from "./pages/applications/NotesApp.jsx";
import AnalyticsDashboard from "./pages/applications/Analytics.jsx";
import { useEffect } from "react";
import ScheduleTiming from "./pages/HRM/ScheduleTiming.jsx";
import LeavesEmployee from "./pages/HRM/leaveRequests.jsx";


function App() {
 const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    
    <ThemeProvider defaultTheme="light">
      <Layout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/DealsDasboard" element={<DealsDashboard />} />
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/LeadsDashboard" element={<LeadsDashboard />} />
          {/* Super Admin Dashborad */}
          <Route path="/super-admin/companies" element={<SupersCompanies />} />
          <Route path="/super-admin/packages" element={<Packages />} />
          <Route
            path="/super-admin/purchase-transaction"
            element={<PurchaseTransaction />}
          />
          <Route path="/super-admin/domain" element={<Domain />} />
          <Route path="/super-admin/dashboard" element={<SuperDashboard />} />
          <Route path="/super-admin/subscription" element={<Subscription />} />

          {/* Employee Management */}
          <Route path="/Employees" element={<Employees />} />
          <Route path="/employeesDetails" element={<EmployeeDetails />} />
          <Route path="/EmployeesGrid" element={<EmployeeGrid/>} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/designations" element={<Designations />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/overtime" element={<Overtime/>} />

          {/* Projects */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task-board" element={<TaskBoard/>} />

          {/* CRM */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          
          <Route path="/leads" element={<Leads />} />
          <Route path="/pipeline" element={<Pipeline/>} />
        

        {/* HRM */}
          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/tickets/details" element={<TicketDetails/>} />
          <Route path="/attendance/admin" element={<AttendanceAdmin/>} />
          <Route path="/attendance/employee" element={<AttendanceEmployee/>} />
          <Route path="/timesheets" element={<Timesheets/>} />
          <Route path="/promotion" element={<Promotion/>} />
          <Route path="/resignation" element={<Resignation/>} />
          <Route path="/termination" element={<Termination/>} />
          <Route path="/training" element={<Training/>} />
          <Route path="/training/trainers" element={<Trainers/>} />
          <Route path="/training/types" element={<TrainingType/>} />
          <Route path="/shift-schedule" element={<ScheduleTiming/>} />
          <Route path="/attendance/leaves/employee" element={<LeavesEmployee />} />
          


          {/* RECRUITMENT */}
          <Route path="/Jobs" element={<JobGrid/>} />
          <Route path="/Candidates" element={<CandidatesGrid/>} />
          <Route path="/Referrals" element={<Referrals/>} />
          
         {/* REPORTS */}
         <Route path="/reports/expense" element={<ExpensesReport/>} />
         <Route path="/reports/invoice" element={<InvoiceReport/>} />
         <Route path="/reports/payment"  element={<PaymentReport/>} />
         <Route path="/reports/project" element={<ProjectReport/>} />
         <Route path="/reports/task" element={<TaskReportDashboard/>} />
         <Route path="/reports/user" element={<UserReportDashboard/>} />
         <Route path="/reports/employee" element={<EmployeeReport/>} />
         <Route path="/reports/payslip" element={<PayslipReport/>} />
         <Route path="/reports/attendance" element={<AttendanceReport/>} />
         <Route path="/reports/leave" element={<LeaveReport/>} />
         <Route path="/reports/DailyReport" element={<DailyReport/>} />

         {/* SETTINGS */}
         <Route path="/profile" element={<ProfileSettings/>} />
         <Route path="/security" element={<SecuritySettings/>} />
         <Route path="/notifications" element={<NotificationSettings/>} />
         <Route path="/connected-apps" element={<ConnectedApps/>} />
        
         {/* WEBSITE SETTING */}
         <Route path="/settings/website/business" element={<BusinessSettings/>} />
         <Route path="/settings/website/seo" element={<SeoSettings/>} />
         <Route path="/settings/website/appearance" element={<PerformanceAppraisal/>} />
         <Route path="/settings/website/language" element={<LanguageSettings/>} />


         {/* APP SETTING */}
         <Route path="/settings/app/salary" element={<SalarySettings/>} />
         <Route path="/settings/app/approval" element={<ApprovalSettings/>} />


         {/* SYSTEM SALARY  */}
         <Route path="/settings/system/email" element={<EmailSettings/>} />
         <Route path="/settings/system/sms" element={<SmsSettings/>} />
         <Route path="/settings/system/otp" element={<OtpSettings/>} />

         {/* FINANCIAL SETTING */}
         <Route path="/settings/financial/payment-gateways" element={<PaymentGateways/>} />
         <Route path="/settings/financial/tax-rate" element={<TaxRates/>} />
         <Route path="/settings/financial/currencies" element={<Currencies/>} />

         {/* CONTENT */}
         <Route path="/content/pages" element={<Pages/>} />
         {/* BLOGS */}
         <Route path="/content/blogs/all" element={<Blogs/>}  />
         <Route path="/content/blogs/categories" element={<BlogCategories/>} />
         <Route path="/content/blogs/comments" element={<BlogComments/>} />
         <Route path="/content/blogs/tags" element={<BlogTags/>} />

         {/* Locations */}
         <Route path="/content/locations/countries" element={<Countries/>} />
         <Route path="/content/locations/states" element={<States />} />
         <Route path="/content/locations/cities" element={<Cities />} />
         {/*Testimonials*/}
         <Route path="/content/testimonials" element={<Testimonials />} />
         {/* FAQ */}
         <Route path="/content/faqs" element={<FAQ />} />

         

          {/* User Managment */}
          <Route path="/users" element={<Users/>} />
          <Route path="/roles-permissions" element={<RolesPermissions/>} />


           {/* Performance */}
           <Route path="/performance/appraisal" element={<Performance/>} />
           <Route path="/performance/goals" element={<GoalTracking/>} />
           <Route path="/performance/goal-types" element={<GoalType/>} />
           <Route path="/performance/indicator" element={<PerformanceIndicator/>} />
           <Route path="/performance/review" element={<PerformanceReview/>} />

            {/* FINANCE-ACCOUNTS */}
            <Route path="/estimates" element={<Estimates/>} />
            <Route path="/invoices" element={<Invoices/>} />
            <Route path="/payments" element={<FiancePayments/>} />
            <Route path="/expenses" element={<Expenses/>} />
            <Route path="/ProvidentFund" element={<ProvidentFund/>} />
            <Route path="/taxes" element={<Taxes/>} />
            {/* Accounting */}
            <Route path="/accounting/categories" element={<Categories/>} />
            <Route path="/accounting/budgets" element={<Budgets/>} />
            <Route path="/accounting/budget-expenses" element={<BudgetExpenses/>} />
            <Route path="/budget-revenues" element={<BudgetRevenues/>} />

            {/* Payroll */}
            <Route path="/employee-salary" element={<EmployeeSalary/>} />
            <Route path="/payslip" element={<PayslipDashboard/>} />
            <Route path="/payroll/items" element={<PayrollItem/>} />

            {/* Asset */}
            <Route path="/Assets" element={<AssetManagement/>} />
            <Route path="/assets/categories" element={<AssetCategories/>} />

            {/* Help & Supports */}
            <Route path="/help/knowledge-base" element={<Knowledgebase/>} />
            <Route path="/help/activities" element={<ActivityPage/>}  />

          {/* Applications */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/calls/voice-call" element={<VoiceCall/>} />
          <Route path="/calls/video-call" element={<VideoCall />} />
          <Route path="/calls/outgoing-call" element={<OutgoingCall/>} />
          <Route path="/calls/incoming-call" element={<IncomingCall/>} />
          <Route path="/calls/call-history" element={<CallHistory/>} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={< NotesApp />} />
          <Route path="/email" element={<Email />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/SocialFeed" element={<SocialFeed/>} />
          <Route path="/kanban" element={<KanbanView/>} />
        </Routes>
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
