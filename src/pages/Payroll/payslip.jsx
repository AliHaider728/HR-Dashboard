import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Progress } from "../../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // نیا import
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Calendar,
  DollarSign,
  FileDown,
  Users,
  TrendingUp,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

// Mock Data
const mockData = {
  contacts: [
    {
      id: 1,
      name: "Darlee Robertson",
      title: "Facility Manager",
      email: "darlee.robertson@example.com",
      phone: "(163) 2459 315",
      createdAt: "14 Jan 2024",
      image: "https://picsum.photos/40/40",
    },
    {
      id: 2,
      name: "Sharon Roy",
      title: "Installer",
      email: "sharon.roy@example.com",
      phone: "(146) 1249 296",
      createdAt: "15 Jan 2024",
      image: "https://picsum.photos/40/40",
    },
    {
      id: 3,
      name: "Vaughan Lewis",
      title: "Senior Manager",
      email: "vaughan.lewis@example.com",
      phone: "(135) 3489 516",
      createdAt: "16 Jan 2024",
      image: "https://picsum.photos/40/40",
    },
    {
      id: 4,
      name: "Jessica Louise",
      title: "Test Engineer",
      email: "jessica.louise@example.com",
      phone: "(123) 4567 890",
      createdAt: "17 Jan 2024",
      image: "https://picsum.photos/40/40",
    },
    {
      id: 5,
      name: "Carol Thomas",
      title: "UI /UX Designer",
      email: "carol.thomas@example.com",
      phone: "(196) 4862 196",
      createdAt: "18 Jan 2024",
      image: "https://picsum.photos/40/40",
    },
  ],
  deals: [
    {
      id: 1,
      name: "Collins",
      stage: "Quality To Buy",
      value: 450000,
      owner: "",
      closedDate: "14 Jan 2024",
    },
    {
      id: 2,
      name: "Konopelski",
      stage: "Proposal Made",
      value: 315000,
      owner: "",
      closedDate: "21 Jan 2024",
    },
    {
      id: 3,
      name: "Adams",
      stage: "Contact Made",
      value: 840000,
      owner: "",
      closedDate: "20 Feb 2024",
    },
    {
      id: 4,
      name: "Schumm",
      stage: "Quality To Buy",
      value: 610000,
      owner: "",
      closedDate: "15 Mar 2024",
    },
  ],
  leads: [
    {
      id: 1,
      name: "Collins",
      company: "",
      stage: "Contacted",
      createdDate: "14 Jan 2024",
      owner: "Hendry",
    },
    {
      id: 2,
      name: "Konopelski",
      company: "",
      stage: "Closed",
      createdDate: "21 Jan 2024",
      owner: "Guilory",
    },
    {
      id: 3,
      name: "Adams",
      company: "",
      stage: "Lost",
      createdDate: "20 Feb 2024",
      owner: "Jami",
    },
    {
      id: 4,
      name: "Schumm",
      company: "",
      stage: "Not Contacted",
      createdDate: "15 Mar 2024",
      owner: "Theresa",
    },
  ],
  companies: [
    {
      id: 1,
      name: "Company One",
      email: "company1@example.com",
      phone: "(163) 2459 315",
      createdAt: "14 Jan 2024",
    },
    {
      id: 2,
      name: "Company Two",
      email: "company2@example.com",
      phone: "(146) 1249 296",
      createdAt: "15 Jan 2024",
    },
    {
      id: 3,
      name: "Company Three",
      email: "company3@example.com",
      phone: "(148) 1229 235",
      createdAt: "17 Jan 2024",
    },
  ],
  conversionStats: {
    total: 4589979,
    conversion: 48,
    calls: 24,
    email: 39,
    chats: 25,
  },
  statusDistribution: {
    google: 40,
    paid: 35,
    campaigns: 15,
    referrals: 10,
  },
};

// Custom Toast Component
const Toast = ({ message, type = "success", duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(!!message);
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm animate-in slide-in-from-right duration-300`}
    >
      <DollarSign className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// FIXED Payslip Modal Component
const PayslipModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  const payslipData = {
    payslipNo: "PS4283",
    salaryMonth: "October 2024",
    company: {
      name: "XYZ Technologies",
      address: "2077 Chicago Avenue Orosi, CA 93647",
      email: "xyztech@example.com",
      phone: "+1 987 654 3210",
    },
    employee: {
      name: employee.name || "Anthony Lewis",
      designation: employee.designation || "Web Designer",
      email: employee.email || "anthony@example.com",
      phone: employee.phone || "+1 458 268 4738",
    },
    earnings: {
      basicSalary: 3000,
      hra: 1000,
      conveyance: 200,
      otherAllowance: 100,
      total: 4300,
    },
    deductions: {
      tds: 200,
      providentFund: 300,
      esi: 150,
      loan: 50,
      total: 700,
    },
    netSalary: 3600,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] overflow-y-auto p-0">
        {/* Accessibility کے لیے DialogTitle اور DialogDescription */}
        <VisuallyHidden>
          <DialogTitle>Payslip for {payslipData.employee.name}</DialogTitle>
          <DialogDescription>
            Payslip details for {payslipData.employee.name} for the month of {payslipData.salaryMonth}
          </DialogDescription>
        </VisuallyHidden>

        <div className="p-6 space-y-6 bg-white">
          {/* Header with Company Address */}
          <div className="text-center border-b pb-4">
            <div className="text-sm text-gray-600 mb-2">3099 Kennedy Court Framingham, MA 01702</div>
            <div className="text-xl font-bold mb-4">Payslip No #{payslipData.payslipNo}</div>
            <div className="text-sm text-gray-600 mb-6">Salary Month: {payslipData.salaryMonth}</div>
          </div>

          {/* From & To Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* From Company */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">From</h3>
              <div className="space-y-1 text-sm">
                <div className="font-medium text-gray-900">{payslipData.company.name}</div>
                <div className="text-gray-600">{payslipData.company.address}</div>
                <div className="text-gray-600">Email: {payslipData.company.email}</div>
                <div className="text-gray-600">Phone: {payslipData.company.phone}</div>
              </div>
            </div>

            {/* To Employee */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">To</h3>
              <div className="space-y-1 text-sm">
                <div className="font-medium text-gray-900">{payslipData.employee.name}</div>
                <div className="text-gray-600">{payslipData.employee.designation}</div>
                <div className="text-gray-600">Email: {payslipData.employee.email}</div>
                <div className="text-gray-600">Phone: {payslipData.employee.phone}</div>
              </div>
            </div>
          </div>

          {/* Payslip Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Payslip for the month of October 2024</h2>
          </div>

          {/* Earnings & Deductions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Earnings Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Basic Salary</span>
                  <span className="font-medium">$3000</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>House Rent Allowance (H.R.A.)</span>
                  <span className="font-medium">$1000</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Conveyance</span>
                  <span className="font-medium">$200</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Other Allowance</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between text-base font-semibold text-gray-900">
                    <span>Total Earnings</span>
                    <span>$4300</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deductions Section */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Deductions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Tax Deducted at Source (T.D.S.)</span>
                  <span className="font-medium">$200</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Provident Fund</span>
                  <span className="font-medium">$300</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>ESI</span>
                  <span className="font-medium">$150</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Loan</span>
                  <span className="font-medium">$50</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between text-base font-semibold text-gray-900">
                    <span>Total Deductions</span>
                    <span>$700</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Net Salary */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6 pb-6">
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Net Salary</span>
                <span>${payslipData.netSalary} (Three thousand six hundred only)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="pt-6 border-t">
          <Button variant="outline" onClick={onClose} className="mr-auto">
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileDown className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PayslipDashboard = () => {
  const [contacts, setContacts] = useState(mockData.contacts);
  const [deals, setDeals] = useState(mockData.deals);
  const [leads, setLeads] = useState(mockData.leads);
  const [companies, setCompanies] = useState(mockData.companies);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" }); // Toast کے لیے نیا state

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeals = deals.filter((deal) =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter((company) =>
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGeneratePayslip = (employee) => {
    setSelectedEmployee(employee);
    setIsPayslipOpen(true);
    setToast({ message: `Payslip opened for ${employee.name}`, type: "success" }); // Toast message
  };

  const getStageBadge = (stage) => {
    const variants = {
      "Quality To Buy": "bg-green-100 text-green-800",
      "Proposal Made": "bg-blue-100 text-blue-800",
      "Contact Made": "bg-yellow-100 text-yellow-800",
    };
    return variants[stage] || "bg-gray-100 text-gray-800";
  };

  const getLeadStageBadge = (stage) => {
    const variants = {
      Contacted: "bg-blue-100 text-blue-800",
      Closed: "bg-green-100 text-green-800",
      Lost: "bg-red-100 text-red-800",
      "Not Contacted": "bg-gray-100 text-gray-800",
    };
    return variants[stage] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} duration={3000} />
      <PayslipModal
        isOpen={isPayslipOpen}
        onClose={() => setIsPayslipOpen(false)}
        employee={selectedEmployee}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payslip Dashboard</h1>
            <p className="text-gray-600">Manage employee payslips and salary records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Recently Created Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Recently Created Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.slice(0, 5).map((contact) => (
                    <TableRow key={contact.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.image} />
                            <AvatarFallback className="bg-blue-100 text-blue-800">
                              {contact.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{contact.email}</TableCell>
                      <TableCell className="text-sm text-gray-600">{contact.phone}</TableCell>
                      <TableCell className="text-sm text-gray-500">{contact.createdAt}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGeneratePayslip(contact)}
                        >
                          Generate Payslip
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stages Won This Year */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Stages Won This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-green-600">$45,899.79</div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">12% vs last year</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Conversion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-blue-600">48%</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Calls</span>
                  <span>{mockData.conversionStats.calls}%</span>
                </div>
                <Progress value={mockData.conversionStats.calls * 2} className="h-1" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Email</span>
                  <span>{mockData.conversionStats.email}%</span>
                </div>
                <Progress value={mockData.conversionStats.email * 2} className="h-1" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Chats</span>
                  <span>{mockData.conversionStats.chats}%</span>
                </div>
                <Progress value={mockData.conversionStats.chats * 2} className="h-1" />
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Google</span>
                  <span>{mockData.statusDistribution.google}%</span>
                </div>
                <Progress value={mockData.statusDistribution.google} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Paid</span>
                  <span>{mockData.statusDistribution.paid}%</span>
                </div>
                <Progress value={mockData.statusDistribution.paid} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Campaigns</span>
                  <span>{mockData.statusDistribution.campaigns}%</span>
                </div>
                <Progress value={mockData.statusDistribution.campaigns} className="h-1" />
                <div className="flex justify-between text-sm">
                  <span>Referrals</span>
                  <span>{mockData.statusDistribution.referrals}%</span>
                </div>
                <Progress value={mockData.statusDistribution.referrals} className="h-1" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Deals */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Deals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredDeals.slice(0, 2).map((deal) => (
                <div key={deal.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div className="space-y-1">
                    <div className="font-medium">{deal.name}</div>
                    <div className="text-sm">
                      <Badge className={getStageBadge(deal.stage)} variant="secondary">
                        {deal.stage}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium">${deal.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{deal.closedDate}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads & Companies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Leads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recent Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead Name</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Lead Owner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{lead.company || "—"}</TableCell>
                        <TableCell>
                          <Badge className={getLeadStageBadge(lead.stage)} variant="secondary">
                            {lead.stage}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{lead.createdDate}</TableCell>
                        <TableCell className="text-sm font-medium">{lead.owner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recently Created Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recently Created Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Created at</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow key={company.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{company.name || "—"}</TableCell>
                        <TableCell className="text-sm text-gray-600">{company.email}</TableCell>
                        <TableCell className="text-sm text-gray-600">{company.phone}</TableCell>
                        <TableCell className="text-sm text-gray-500">{company.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search across contacts, deals, leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PayslipDashboard;