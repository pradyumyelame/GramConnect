import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function generatePDF(certificate) {
  return new Promise((resolve, reject) => {
    try {
      // Create PDF directory if not exists
      const pdfDir = path.join(__dirname, '../../public/certificates');
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      const fileName = `certificate_${certificate._id}.pdf`;
      const filePath = path.join(pdfDir, fileName);
      const doc = new PDFDocument({ size: 'A4', margin: 50 });

      // Setup file stream
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Add certificate content
      doc.fontSize(20).text('OFFICIAL CERTIFICATE', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`Type: ${certificate.formattedType}`, { align: 'center' });
      doc.moveDown(2);

      // Add applicant details
      doc.fontSize(14).text('Applicant Details:', { underline: true });
      doc.moveDown(0.5);
      doc.text(`Name: ${certificate.details.fullName}`);
      doc.text(`Father's Name: ${certificate.details.fatherName}`);
      // Add more details as needed...

      // Add official seal and signatures
      doc.moveDown(3);
      doc.text('Official Seal:', 100, doc.y);
      doc.text('_________________________', 350, doc.y);
      doc.text('Authorized Signatory', 350, doc.y + 20);

      // Finalize PDF
      doc.end();

      stream.on('finish', () => resolve(`/certificates/${fileName}`));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}