import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Initial state for form data
const initialFormData = {
  basicInfo: {
    name: '',
    department: '',
    designation: '',
    qualification: '',
    empId: 'DGT-009',
    dateOfJoin: '',
    dateOfConfirmation: '',
    previousYearsExp: '',
    roName: '',
    roDesignation: '',
  },
  kra: [
    { id: 1, area: 'Production Quality', kpi: 'Quality', weightage: 30, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 1.1, area: '', kpi: 'TAT (turn around time)', weightage: 30, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 2, area: 'Process Improvement', kpi: 'PMS, New Ideas', weightage: 10, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 3, area: 'Team Management', kpi: 'Team Productivity, dynamics, attendance, attrition', weightage: 5, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 4, area: 'Knowledge Sharing', kpi: 'Sharing the knowledge for team productivity', weightage: 5, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 5, area: 'Reporting and Communication', kpi: 'Emails/Calls/Reports and Other Communication', weightage: 5, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
  ],
  personal: [
    { id: 1, attr: 'Attendance', kpi: 'Planned or Unplanned Leaves', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 1.1, attr: '', kpi: 'Time Consciousness', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 2, attr: 'Attitude & Behavior', kpi: 'Team Collaboration', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 2.1, attr: '', kpi: 'Professionalism & Responsiveness', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 3, attr: 'Policy & Procedures', kpi: 'Adherence to policies and procedures', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 4, attr: 'Initiatives', kpi: 'Special Efforts, Suggestions, Ideas, etc.', weightage: 2, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
    { id: 5, attr: 'Continuous Skill Improvement', kpi: 'Preparedness to move to next level & Training utilization', weightage: 3, selfPercent: '', selfPoints: '', roPercent: '', roPoints: '' },
  ],
  totalPercentage: '',
  grade: '',
  specialInitiatives: Array(5).fill({ bySelf: '', roComment: '', hodComment: '' }),
  roleComments: Array(5).fill({ bySelf: '', roComment: '', hodComment: '' }),
  selfStrengthsAreas: Array(5).fill({ strengths: '', areas: '' }),
  roStrengthsAreas: Array(3).fill({ strengths: '', areas: '' }),
  hodStrengthsAreas: Array(3).fill({ strengths: '', areas: '' }),
  personalGoals: Array(3).fill({ lastYear: '', currentYear: '' }),
  personalUpdates: [
    { id: 1, lastYear: 'Married/Engaged?', lastYesNo: '', lastDetails: '', currentYear: 'Marriage Plans', currentYesNo: '', currentDetails: '' },
    { id: 2, lastYear: 'Higher Studies/Certifications?', lastYesNo: '', lastDetails: '', currentYear: 'Plans For Higher Study', currentYesNo: '', currentDetails: '' },
    { id: 3, lastYear: 'Health Issues?', lastYesNo: '', lastDetails: '', currentYear: 'Certification Plans', currentYesNo: '', currentDetails: '' },
    { id: 4, lastYear: 'Others', lastYesNo: '', lastDetails: '', currentYear: 'Others', currentYesNo: '', currentDetails: '' },
  ],
  profGoalsLastYear: Array(5).fill({ bySelf: '', roComment: '', hodComment: '' }),
  profGoalsCurrentYear: Array(5).fill({ bySelf: '', roComment: '', hodComment: '' }),
  trainingReq: Array(5).fill({ bySelf: '', roComment: '', hodComment: '' }),
  generalComments: Array(5).fill({ self: '', ro: '', hod: '' }),
  roUseOnly: {
    workIssues: { yesNo: '', details: '' },
    leaveIssues: { yesNo: '', details: '' },
    stabilityIssues: { yesNo: '', details: '' },
    nonSupportive: { yesNo: '', details: '' },
    otherPoints: { yesNo: '', details: '' },
    overallComment: '',
  },
  hrdUseOnly: {
    krasPoints: { available: '', scored: '', comment: '' },
    profSkills: { available: '', scored: '', comment: '' },
    personalSkills: { available: '', scored: '', comment: '' },
    specialAchievements: { available: '', scored: '', comment: '' },
    totalScore: '',
  },
  signatures: {
    employee: { name: '', signature: '', date: '' },
    ro: { name: '', signature: '', date: '' },
    hod: { name: '', signature: '', date: '' },
    hrd: { name: '', signature: '', date: '' },
  },
};

const PerformanceReview = () => {
  const [formData, setFormData] = useState(initialFormData);

  // Update form data
  const updateFormData = (section, indexOrKey, field, value) => {
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (Array.isArray(newData[section])) {
        newData[section][indexOrKey] = { ...newData[section][indexOrKey], [field]: value };
      } else if (typeof indexOrKey === 'object') {
        newData[section] = { ...newData[section], ...indexOrKey };
      } else {
        newData[section][indexOrKey] = { ...newData[section][indexOrKey], [field]: value };
      }
      return newData;
    });
  };

  // Calculate total points and grade
  const calculateTotals = () => {
    const kraPoints = formData.kra.reduce((sum, item) => {
      const points = (parseFloat(item.roPercent) / 100) * item.weightage || 0;
      return sum + points;
    }, 0);
    const personalPoints = formData.personal.reduce((sum, item) => {
      const points = (parseFloat(item.roPercent) / 100) * item.weightage || 0;
      return sum + points;
    }, 0);
    const total = kraPoints + personalPoints;
    const totalWeightage = formData.kra.reduce((sum, item) => sum + item.weightage, 0) + formData.personal.reduce((sum, item) => sum + item.weightage, 0);
    const totalPercentage = (total / totalWeightage) * 100 || 0;

    let grade = 'Poor';
    if (totalPercentage > 92) grade = 'Excellent';
    else if (totalPercentage >= 85) grade = 'Good';
    else if (totalPercentage >= 75) grade = 'Satisfactory';
    else if (totalPercentage >= 65) grade = 'Average';

    setFormData((prev) => ({
      ...prev,
      totalPercentage: totalPercentage.toFixed(2),
      grade,
      kra: prev.kra.map((item) => ({
        ...item,
        selfPoints: ((parseFloat(item.selfPercent) / 100) * item.weightage || 0).toFixed(2),
        roPoints: ((parseFloat(item.roPercent) / 100) * item.weightage || 0).toFixed(2),
      })),
      personal: prev.personal.map((item) => ({
        ...item,
        selfPoints: ((parseFloat(item.selfPercent) / 100) * item.weightage || 0).toFixed(2),
        roPoints: ((parseFloat(item.roPercent) / 100) * item.weightage || 0).toFixed(2),
      })),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Employee Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Employee Basic Information</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input value={formData.basicInfo.name} onChange={(e) => updateFormData('basicInfo', { name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Department</label>
                <Input value={formData.basicInfo.department} onChange={(e) => updateFormData('basicInfo', { department: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Designation</label>
                <Input value={formData.basicInfo.designation} onChange={(e) => updateFormData('basicInfo', { designation: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Qualification</label>
                <Input value={formData.basicInfo.qualification} onChange={(e) => updateFormData('basicInfo', { qualification: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Emp ID</label>
                <Input value={formData.basicInfo.empId} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Join</label>
                <Input type="date" value={formData.basicInfo.dateOfJoin} onChange={(e) => updateFormData('basicInfo', { dateOfJoin: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Date of Confirmation</label>
                <Input type="date" value={formData.basicInfo.dateOfConfirmation} onChange={(e) => updateFormData('basicInfo', { dateOfConfirmation: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">Previous years of Exp</label>
                <Input value={formData.basicInfo.previousYearsExp} onChange={(e) => updateFormData('basicInfo', { previousYearsExp: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">RO's Name</label>
                <Input value={formData.basicInfo.roName} onChange={(e) => updateFormData('basicInfo', { roName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium">RO Designation</label>
                <Input value={formData.basicInfo.roDesignation} onChange={(e) => updateFormData('basicInfo', { roDesignation: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Excellence */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Excellence</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Key Result Area</TableHead>
                  <TableHead>Key Performance Indicators</TableHead>
                  <TableHead>Weightage</TableHead>
                  <TableHead>Percentage achieved (self Score)</TableHead>
                  <TableHead>Points Scored (self)</TableHead>
                  <TableHead>Percentage achieved (RO's Score)</TableHead>
                  <TableHead>Points Scored (RO)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.kra.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.area}</TableCell>
                    <TableCell>{item.kpi}</TableCell>
                    <TableCell>{item.weightage}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.selfPercent}
                        onChange={(e) => updateFormData('kra', index, 'selfPercent', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={item.selfPoints} readOnly />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.roPercent}
                        onChange={(e) => updateFormData('kra', index, 'roPercent', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={item.roPoints} readOnly />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>{formData.kra.reduce((sum, item) => sum + item.weightage, 0)}</TableCell>
                  <TableCell colSpan={4}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Personal Excellence */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Excellence</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Personal Attributes</TableHead>
                  <TableHead>Key Indicators</TableHead>
                  <TableHead>Weightage</TableHead>
                  <TableHead>Percentage achieved (self Score)</TableHead>
                  <TableHead>Points Scored (self)</TableHead>
                  <TableHead>Percentage achieved (RO's Score)</TableHead>
                  <TableHead>Points Scored (RO)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.personal.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.attr}</TableCell>
                    <TableCell>{item.kpi}</TableCell>
                    <TableCell>{item.weightage}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.selfPercent}
                        onChange={(e) => updateFormData('personal', index, 'selfPercent', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={item.selfPoints} readOnly />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.roPercent}
                        onChange={(e) => updateFormData('personal', index, 'roPercent', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input value={item.roPoints} readOnly />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>{formData.personal.reduce((sum, item) => sum + item.weightage, 0)}</TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell>Total Percentage (%):</TableCell>
                  <TableCell>
                    <Input value={formData.totalPercentage} readOnly />
                    <Badge className="ml-2">{formData.grade}</Badge>
                    <p className="text-sm text-gray-500 mt-2">
                      Below 65 Poor | 65-74 Average | 75-84 Satisfactory | 85-92 Good | Above 92 Excellent
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button onClick={calculateTotals} className="mt-4">Calculate Totals</Button>
          </CardContent>
        </Card>

        {/* Special Initiatives */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Special Initiatives, Achievements, contributions if any</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>By Self</TableHead>
                  <TableHead>RO's Comment</TableHead>
                  <TableHead>HOD's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.specialInitiatives.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.bySelf}
                        onChange={(e) => updateFormData('specialInitiatives', index, 'bySelf', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.roComment}
                        onChange={(e) => updateFormData('specialInitiatives', index, 'roComment', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hodComment}
                        onChange={(e) => updateFormData('specialInitiatives', index, 'hodComment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Comments on the Role */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comments on the role</CardTitle>
            <CardDescription>alterations if any required like addition/deletion of responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>By Self</TableHead>
                  <TableHead>RO's Comment</TableHead>
                  <TableHead>HOD's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.roleComments.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.bySelf}
                        onChange={(e) => updateFormData('roleComments', index, 'bySelf', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.roComment}
                        onChange={(e) => updateFormData('roleComments', index, 'roComment', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hodComment}
                        onChange={(e) => updateFormData('roleComments', index, 'hodComment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Self Strengths and Areas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comments on the role</CardTitle>
            <CardDescription>alterations if any required like addition/deletion of responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Strengths</TableHead>
                  <TableHead>Area's for Improvement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.selfStrengthsAreas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.strengths}
                        onChange={(e) => updateFormData('selfStrengthsAreas', index, 'strengths', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.areas}
                        onChange={(e) => updateFormData('selfStrengthsAreas', index, 'areas', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RO Strengths and Areas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appraisee's Strengths and Areas for Improvement perceived by the Reporting officer</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Strengths</TableHead>
                  <TableHead>Area's for Improvement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.roStrengthsAreas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.strengths}
                        onChange={(e) => updateFormData('roStrengthsAreas', index, 'strengths', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.areas}
                        onChange={(e) => updateFormData('roStrengthsAreas', index, 'areas', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* HOD Strengths and Areas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appraisee's Strengths and Areas for Improvement perceived by the Head of the Department</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Strengths</TableHead>
                  <TableHead>Area's for Improvement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.hodStrengthsAreas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.strengths}
                        onChange={(e) => updateFormData('hodStrengthsAreas', index, 'strengths', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.areas}
                        onChange={(e) => updateFormData('hodStrengthsAreas', index, 'areas', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Personal Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Goals</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Goal Achieved during last year</TableHead>
                  <TableHead>Goal set for current year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.personalGoals.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.lastYear}
                        onChange={(e) => updateFormData('personalGoals', index, 'lastYear', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.currentYear}
                        onChange={(e) => updateFormData('personalGoals', index, 'currentYear', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Personal Updates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Updates</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Last Year</TableHead>
                  <TableHead>Yes/No</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Current Year</TableHead>
                  <TableHead>Yes/No</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.personalUpdates.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.lastYear}</TableCell>
                    <TableCell>
                      <Select
                        value={item.lastYesNo}
                        onValueChange={(value) => updateFormData('personalUpdates', item.id - 1, 'lastYesNo', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.lastDetails}
                        onChange={(e) => updateFormData('personalUpdates', item.id - 1, 'lastDetails', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>{item.currentYear}</TableCell>
                    <TableCell>
                      <Select
                        value={item.currentYesNo}
                        onValueChange={(value) => updateFormData('personalUpdates', item.id - 1, 'currentYesNo', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.currentDetails}
                        onChange={(e) => updateFormData('personalUpdates', item.id - 1, 'currentDetails', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Professional Goals Achieved Last Year */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Goals Achieved for last year</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>By Self</TableHead>
                  <TableHead>RO's Comment</TableHead>
                  <TableHead>HOD's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.profGoalsLastYear.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.bySelf}
                        onChange={(e) => updateFormData('profGoalsLastYear', index, 'bySelf', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.roComment}
                        onChange={(e) => updateFormData('profGoalsLastYear', index, 'roComment', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hodComment}
                        onChange={(e) => updateFormData('profGoalsLastYear', index, 'hodComment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Professional Goals for Forthcoming Year */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Professional Goals for the forthcoming year</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>By Self</TableHead>
                  <TableHead>RO's Comment</TableHead>
                  <TableHead>HOD's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.profGoalsCurrentYear.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.bySelf}
                        onChange={(e) => updateFormData('profGoalsCurrentYear', index, 'bySelf', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.roComment}
                        onChange={(e) => updateFormData('profGoalsCurrentYear', index, 'roComment', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hodComment}
                        onChange={(e) => updateFormData('profGoalsCurrentYear', index, 'hodComment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Training Requirements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Training Requirements</CardTitle>
            <CardDescription>if any to achieve the Performance Standard Targets completely</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>By Self</TableHead>
                  <TableHead>RO's Comment</TableHead>
                  <TableHead>HOD's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.trainingReq.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.bySelf}
                        onChange={(e) => updateFormData('trainingReq', index, 'bySelf', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.roComment}
                        onChange={(e) => updateFormData('trainingReq', index, 'roComment', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hodComment}
                        onChange={(e) => updateFormData('trainingReq', index, 'hodComment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* General Comments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Any other general comments, observations, suggestions etc.</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Self</TableHead>
                  <TableHead>RO</TableHead>
                  <TableHead>HOD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.generalComments.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Textarea
                        value={item.self}
                        onChange={(e) => updateFormData('generalComments', index, 'self', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.ro}
                        onChange={(e) => updateFormData('generalComments', index, 'ro', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.hod}
                        onChange={(e) => updateFormData('generalComments', index, 'hod', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* For RO's Use Only */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>For RO's Use Only</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Yes/No</TableHead>
                  <TableHead>If Yes - Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { label: 'The Team member has Work related Issues', key: 'workIssues' },
                  { label: 'The Team member has Leave Issues', key: 'leaveIssues' },
                  { label: 'The team member has Stability Issues', key: 'stabilityIssues' },
                  { label: 'The Team member exhibits non-supportive attitude', key: 'nonSupportive' },
                  { label: 'Any other points in specific to note about the team member', key: 'otherPoints' },
                ].map(({ label, key }) => (
                  <TableRow key={key}>
                    <TableCell>{label}</TableCell>
                    <TableCell>
                      <Select
                        value={formData.roUseOnly[key].yesNo}
                        onValueChange={(value) => updateFormData('roUseOnly', key, 'yesNo', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={formData.roUseOnly[key].details}
                        onChange={(e) => updateFormData('roUseOnly', key, 'details', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Overall Comment /Performance of the team member</TableCell>
                  <TableCell colSpan={2}>
                    <Textarea
                      value={formData.roUseOnly.overallComment}
                      onChange={(e) => updateFormData('roUseOnly', 'overallComment', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* For HRD's Use Only */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>For HRD's Use Only</CardTitle>
            <CardDescription>Lorem ipsum dollar</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Overall Parameters</TableHead>
                  <TableHead>Available Points</TableHead>
                  <TableHead>Points Scored</TableHead>
                  <TableHead>RO's Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { label: 'KRAs Target Achievement Points', key: 'krasPoints' },
                  { label: 'Professional Skills Scores', key: 'profSkills' },
                  { label: 'Personal Skills Scores', key: 'personalSkills' },
                  { label: 'Special Achievements Score', key: 'specialAchievements' },
                ].map(({ label, key }) => (
                  <TableRow key={key}>
                    <TableCell>{label}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={formData.hrdUseOnly[key].available}
                        onChange={(e) => updateFormData('hrdUseOnly', key, 'available', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={formData.hrdUseOnly[key].scored}
                        onChange={(e) => updateFormData('hrdUseOnly', key, 'scored', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={formData.hrdUseOnly[key].comment}
                        onChange={(e) => updateFormData('hrdUseOnly', key, 'comment', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Overall Total Score</TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell>
                    <Input
                      value={formData.hrdUseOnly.totalScore}
                      onChange={(e) => updateFormData('hrdUseOnly', 'totalScore', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Signatures */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Signature</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['employee', 'ro', 'hod', 'hrd'].map((role) => (
                  <TableRow key={role}>
                    <TableCell>{role.charAt(0).toUpperCase() + role.slice(1)}</TableCell>
                    <TableCell>
                      <Input
                        value={formData.signatures[role].name}
                        onChange={(e) => updateFormData('signatures', role, 'name', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={formData.signatures[role].signature}
                        onChange={(e) => updateFormData('signatures', role, 'signature', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={formData.signatures[role].date}
                        onChange={(e) => updateFormData('signatures', role, 'date', e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Button onClick={() => console.log(formData)}>Submit Review</Button>
      </div>
    </div>
  );
};

export default PerformanceReview;