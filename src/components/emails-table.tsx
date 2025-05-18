import api from "@/axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Prediction = {
  _id: string;
  confidence: number;
  original_text: string;
  prediction: "Safe Email" | "Phishing Email";
  created_at: string;
};

const EmailsTable = async () => {
  const response = await api.get("/predictions");
  const data = response.data as Prediction[];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Recent Predictions</h2>
      <Table>
        <TableCaption>A list of recent email predictions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email Preview</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead className="text-right">Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No predictions found
              </TableCell>
            </TableRow>
          ) : (
            data.map((prediction) => (
              <TableRow key={prediction._id}>
                <TableCell className="align-top whitespace-normal break-words max-w-md">
                  <div className="max-h-32 overflow-y-auto">
                    {prediction.original_text}
                  </div>
                </TableCell>
                <TableCell>
                  {prediction.prediction === "Phishing Email" ? (
                    <Badge variant="destructive">Phishing Email</Badge>
                  ) : (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Safe Email
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {prediction.confidence}%
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailsTable;
