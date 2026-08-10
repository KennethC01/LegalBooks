export interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'PDF' | 'DOCX';
  tag?: string;
  pdfFile?: any;
}