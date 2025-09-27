import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Pipeline data from the document
const pipelineData = [
  { name: 'Sales', totalDealValue: '$4,50,000', noOfDeals: 315, stages: 'Won', createdDate: '14 Jan 2024', status: 'Active' },
  { name: 'Marketing', totalDealValue: '$3,15,000', noOfDeals: 447, stages: 'In Pipeline', createdDate: '21 Jan 2024', status: 'Active' },
  { name: 'Calls', totalDealValue: '$8,40,000', noOfDeals: 654, stages: 'Won', createdDate: '20 Feb 2024', status: 'Active' },
  { name: 'Email', totalDealValue: '$6,10,000', noOfDeals: 545, stages: 'Conversation', createdDate: '15 Mar 2024', status: 'Active' },
  { name: 'Chats', totalDealValue: '$4,70,000', noOfDeals: 787, stages: 'Won', createdDate: '12 Apr 2024', status: 'Active' },
  { name: 'Operational', totalDealValue: '$5,50,000', noOfDeals: 787, stages: 'Follow Up', createdDate: '20 Apr 2024', status: 'Active' },
  { name: 'Collabrative', totalDealValue: '$5,00,000', noOfDeals: 315, stages: 'Won', createdDate: '06 Jul 2024', status: 'Inactive' },
  { name: 'Differentiate', totalDealValue: '$4,50,000', noOfDeals: 478, stages: 'Schedule servise', createdDate: '02 Sep 2024', status: 'Active' },
  { name: 'Interact', totalDealValue: '$6,20,000', noOfDeals: 664, stages: 'Won', createdDate: '15 Nov 2024', status: 'Active' },
];

const Pipeline = () => {
  return (
    <div className="mt-3 space-y-6 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pipeline Name</TableHead>
                  <TableHead>Total Deal Value</TableHead>
                  <TableHead>No of Deals</TableHead>
                  <TableHead>Stages</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pipelineData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.totalDealValue}</TableCell>
                    <TableCell>{item.noOfDeals}</TableCell>
                    <TableCell>{item.stages}</TableCell>
                    <TableCell>{item.createdDate}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Active' ? 'default' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;