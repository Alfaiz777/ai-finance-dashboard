import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyExpenses } from "@/data/dummy";
import { Card, CardContent } from "@/components/ui/card";

const RecentTransaction = () => {
  const recentTransactions = [...dummyExpenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.merchant}</TableCell>
                <TableCell>{txn.category}</TableCell>
                <TableCell className="text-right">
                  ₹ {txn.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
