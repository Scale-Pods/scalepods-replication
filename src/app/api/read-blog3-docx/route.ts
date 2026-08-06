import { NextResponse } from 'next/server';
import fs from 'fs';
import zlib from 'zlib';

export async function GET(): Promise<NextResponse> {
  const docxPath = `C:\\Users\\hrish\\Downloads\\ScalePods AI ROI - Blog 3.docx`;
  const outPath = `C:\\Users\\hrish\\.gemini\\antigravity-ide\\brain\\946f1797-9e13-4550-8e4e-8747d34da859\\scratch\\blog3_extracted.txt`;

  try {
    const buf = fs.readFileSync(docxPath);
    let offset = 0;
    let documentXmlBuffer: Buffer | null = null;

    while (offset < buf.length - 30) {
      if (buf[offset] === 0x50 && buf[offset+1] === 0x4b && buf[offset+2] === 0x03 && buf[offset+3] === 0x04) {
        const compMethod = buf.readUInt16LE(offset + 8);
        const compSize = buf.readUInt32LE(offset + 18);
        const fileNameLen = buf.readUInt16LE(offset + 26);
        const extraLen = buf.readUInt16LE(offset + 28);
        const fileName = buf.toString('utf8', offset + 30, offset + 30 + fileNameLen);
        
        const dataOffset = offset + 30 + fileNameLen + extraLen;
        
        if (fileName === 'word/document.xml') {
          const compressedData = buf.slice(dataOffset, dataOffset + compSize);
          if (compMethod === 8) {
            documentXmlBuffer = zlib.inflateRawSync(compressedData);
          } else if (compMethod === 0) {
            documentXmlBuffer = compressedData;
          }
          break;
        }
        offset = dataOffset + compSize;
      } else {
        offset++;
      }
    }

    if (documentXmlBuffer) {
      const xml = documentXmlBuffer.toString('utf8');
      const paragraphs = xml.split(/<\/w:p>/);
      const textLines: string[] = [];
      
      for (const p of paragraphs) {
        const matches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (matches) {
          const pText = matches.map(m => m.replace(/<[^>]+>/g, '')).join('');
          if (pText.trim()) {
            textLines.push(pText.trim());
          }
        }
      }
      
      fs.writeFileSync(outPath, textLines.join('\n\n'), 'utf8');
      return NextResponse.json({ success: true, count: textLines.length, textLines });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }

  return NextResponse.json({ success: false, error: 'Not found' });
}
