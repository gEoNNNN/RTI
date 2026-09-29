import React from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import GenericCategoryPage from './GenericCategoryPage';
import categories from '../data/categories_full.json';
import CatAccesoriiAntifurt from './categories/CatAccesoriiAntifurt';
import CatAccesoriiAudio from './categories/CatAccesoriiAudio';
import CatAccesoriiDeParcare from './categories/CatAccesoriiDeParcare';
import CatAmplificatoareAudio from './categories/CatAmplificatoareAudio';
import CatAnteneAntifurtAm from './categories/CatAnteneAntifurtAm';
import CatAnteneAntifurtRf from './categories/CatAnteneAntifurtRf';
import CatBarieraAutomata from './categories/CatBarieraAutomata';
import CatCamereVideoPtz from './categories/CatCamereVideoPtz';
import CatCantareComerciale from './categories/CatCantareComerciale';
import CatCardpassRparking from './categories/CatCardpassRparking';
import CatCaseDeAutodeservire from './categories/CatCaseDeAutodeservire';
import CatDetacher from './categories/CatDetacher';
import CatDibal500 from './categories/CatDibal500';
import CatDibal900 from './categories/CatDibal900';
import CatDifuzoareAudio from './categories/CatDifuzoareAudio';
import CatEchipamenteDeParcare from './categories/CatEchipamenteDeParcare';
import CatEchipamenteFiscale from './categories/CatEchipamenteFiscale';
import CatEchipamentePosSuplimentare from './categories/CatEchipamentePosSuplimentare';
import CatImprimanteDeCarduri from './categories/CatImprimanteDeCarduri';
import CatImprimanteDeEtichete from './categories/CatImprimanteDeEtichete';
import CatImprimanteIndustriale from './categories/CatImprimanteIndustriale';
import CatImprimantePortabile from './categories/CatImprimantePortabile';
import CatImprimanteTermice from './categories/CatImprimanteTermice';
import CatImprimante from './categories/CatImprimante';
import CatIpCamereDeExterior from './categories/CatIpCamereDeExterior';
import CatIpCamereDeInterior from './categories/CatIpCamereDeInterior';
import CatPcBased from './categories/CatPcBased';
import CatPospcSpecializat from './categories/CatPospcSpecializat';
import CatSafer from './categories/CatSafer';
import CatScanereBiOptic from './categories/CatScanereBiOptic';
import CatScanereCoduriDeBare from './categories/CatScanereCoduriDeBare';
import CatScanereDeMasa from './categories/CatScanereDeMasa';
import CatScanereIncorporate from './categories/CatScanereIncorporate';
import CatScanereManuale from './categories/CatScanereManuale';
import CatSistemAntifurt from './categories/CatSistemAntifurt';
import CatSistemControlAcces from './categories/CatSistemControlAcces';
import CatSistemNumarareVizitatori from './categories/CatSistemNumarareVizitatori';
import CatSistemPos from './categories/CatSistemPos';
import CatSistemeAudio from './categories/CatSistemeAudio';
import CatSistemeNvr from './categories/CatSistemeNvr';
import CatSistemeSupraveghereVideo from './categories/CatSistemeSupraveghereVideo';
import CatSolutiiHoreca from './categories/CatSolutiiHoreca';
import CatSolutiiRetail from './categories/CatSolutiiRetail';
import CatTerminalDePlata from './categories/CatTerminalDePlata';
import CatTerminaleChainway from './categories/CatTerminaleChainway';
import CatTerminaleColectareDate from './categories/CatTerminaleColectareDate';
import CatTerminaleDatalogic from './categories/CatTerminaleDatalogic';
import CatTicketSystem from './categories/CatTicketSystem';
import CatTurnichete from './categories/CatTurnichete';

const categoryMap = {
  'accesorii-antifurt': CatAccesoriiAntifurt,
  'accesorii-audio': CatAccesoriiAudio,
  'accesorii-de-parcare': CatAccesoriiDeParcare,
  'amplificatoare-audio': CatAmplificatoareAudio,
  'antene-antifurt-am': CatAnteneAntifurtAm,
  'antene-antifurt-rf': CatAnteneAntifurtRf,
  'bariera-automata': CatBarieraAutomata,
  'camere-video-ptz': CatCamereVideoPtz,
  'cantare-comerciale': CatCantareComerciale,
  'cardpass-rparking': CatCardpassRparking,
  'case-de-autodeservire': CatCaseDeAutodeservire,
  'detacher': CatDetacher,
  'dibal-500': CatDibal500,
  'dibal-900': CatDibal900,
  'difuzoare-audio': CatDifuzoareAudio,
  'echipamente-de-parcare': CatEchipamenteDeParcare,
  'echipamente-fiscale': CatEchipamenteFiscale,
  'echipamente-pos-suplimentare': CatEchipamentePosSuplimentare,
  'imprimante-de-carduri': CatImprimanteDeCarduri,
  'imprimante-de-etichete': CatImprimanteDeEtichete,
  'imprimante-industriale': CatImprimanteIndustriale,
  'imprimante-portabile': CatImprimantePortabile,
  'imprimante-termice': CatImprimanteTermice,
  'imprimante': CatImprimante,
  'ip-camere-de-exterior': CatIpCamereDeExterior,
  'ip-camere-de-interior': CatIpCamereDeInterior,
  'pc-based': CatPcBased,
  'pospc-specializat': CatPospcSpecializat,
  'safer': CatSafer,
  'scanere-bi-optic': CatScanereBiOptic,
  'scanere-coduri-de-bare': CatScanereCoduriDeBare,
  'scanere-de-masa': CatScanereDeMasa,
  'scanere-incorporate': CatScanereIncorporate,
  'scanere-manuale': CatScanereManuale,
  'sistem-antifurt': CatSistemAntifurt,
  'sistem-control-acces': CatSistemControlAcces,
  'sistem-numarare-vizitatori': CatSistemNumarareVizitatori,
  'sistem-pos': CatSistemPos,
  'sisteme-audio': CatSistemeAudio,
  'sisteme-nvr': CatSistemeNvr,
  'sisteme-supraveghere-video': CatSistemeSupraveghereVideo,
  'solutii-horeca': CatSolutiiHoreca,
  'solutii-retail': CatSolutiiRetail,
  'terminal-de-plata': CatTerminalDePlata,
  'terminale-chainway': CatTerminaleChainway,
  'terminale-colectare-date': CatTerminaleColectareDate,
  'terminale-datalogic': CatTerminaleDatalogic,
  'ticket-system': CatTicketSystem,
  'turnichete': CatTurnichete,
};

export default function CategoryPage() {
  const { slug } = useParams();
  const Selected = slug && categoryMap[slug];
  if (Selected) return <Selected />;
  if (slug && categories[slug]) return <GenericCategoryPage slug={slug} />;
  return <NotFoundPage />;
}
