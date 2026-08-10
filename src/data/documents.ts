import { DocumentItem } from '../constants/types';

export const DOCUMENTS: DocumentItem[] = [
  {
    id: '1',
    title: 'Código Procesal Penal de Honduras',
    subtitle: 'Vigente - Texto Oficial',
    type: 'PDF',
    tag: 'Oficial',
    pdfFile: require('../../assets/pdfs/Codigo-Procesal-Penal-Honduras.pdf'),
  },
  {
    id: '2',
    title: 'Código Civil de Honduras',
    subtitle: 'Completo con reformas',
    type: 'PDF',
    pdfFile: require('../../assets/pdfs/codigo_civil_honduras.pdf'),
  },
  {
    id: '3',
    title: 'Diccionario Jurídico',
    subtitle: 'Materia Laboral - Despido',
    type: 'PDF',
    pdfFile: require('../../assets/pdfs/DICCIONARIO _JURIDICO.pdf'),
  },
  {
    id: '4',
    title: 'Ley de la Propiedad',
    subtitle: 'Formato editable Mutuo Acuerdo',
    type: 'DOCX',
    pdfFile: require('../../assets/pdfs/Ley_de_la_Propiedad.pdf'),
  },
  {
    id: '5',
    title: 'Ley de Tránsito',
    subtitle: 'Formato editable Mutuo Acuerdo',
    type: 'DOCX',
    pdfFile: require('../../assets/pdfs/Ley-de-Transito.pdf'),
  },
];